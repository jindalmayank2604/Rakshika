import { query } from '../config/db.js';
import { classifyIncidentText } from '../services/geminiService.js';

export const getAllReports = async (req, res, next) => {
  try {
    const { category, severity, status, search, verifiedOnly } = req.query;

    let sql = `
      SELECT 
        r.id,
        r.user_id,
        r.title,
        r.category,
        r.description,
        r.image_url,
        r.latitude,
        r.longitude,
        r.address,
        r.severity,
        r.status,
        r.verification_status,
        r.ai_summary,
        r.created_at,
        r.updated_at,
        COALESCE(u.name, 'Community Member') AS user_name
      FROM reports r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (category && category !== 'All' && category !== 'all') {
      sql += ` AND r.category = $${paramIndex++}`;
      params.push(category);
    }
    if (severity && severity !== 'All' && severity !== 'all') {
      sql += ` AND r.severity = $${paramIndex++}`;
      params.push(severity);
    }
    if (status && status !== 'All' && status !== 'all') {
      sql += ` AND r.status = $${paramIndex++}`;
      params.push(status);
    }
    if (verifiedOnly === 'true') {
      sql += ` AND (r.status = 'Verified' OR r.verification_status ILIKE '%Verified%')`;
    }
    if (search) {
      sql += ` AND (r.title ILIKE $${paramIndex} OR r.address ILIKE $${paramIndex} OR r.description ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    sql += ' ORDER BY r.created_at DESC';

    const result = await query(sql, params);

    return res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

export const getReportById = async (req, res, next) => {
  try {
    const reportId = parseInt(req.params.id, 10);
    if (isNaN(reportId)) {
      return res.status(400).json({ success: false, message: 'Invalid incident ID.' });
    }

    const result = await query(
      `SELECT 
        r.*, 
        COALESCE(u.name, 'Community Member') AS user_name 
      FROM reports r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.id = $1`,
      [reportId]
    );

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Report not found.' });
    }

    return res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const createReport = async (req, res, next) => {
  try {
    // User must be authenticated to submit reports
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Sign in to submit a community safety report.'
      });
    }

    const userId = req.user.id;
    const { title, category, description, image_url, latitude, longitude, address, severity, ai_summary } = req.body;

    if (!title || !category || !description || latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, category, description, and location coordinates.'
      });
    }

    const parsedLat = parseFloat(latitude);
    const parsedLng = parseFloat(longitude);

    if (isNaN(parsedLat) || isNaN(parsedLng)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid latitude or longitude.'
      });
    }

    let summaryText = ai_summary || '';
    if (!summaryText) {
      try {
        const aiAnalysis = await classifyIncidentText(description, category);
        summaryText = aiAnalysis.summary || '';
      } catch {
        summaryText = 'Community hazard logged.';
      }
    }

    // Check 1km proximity consensus (reports within 1km of same category in last 14 days)
    const proximityMatches = await query(
      `SELECT id, user_id, latitude, longitude, category, status 
       FROM reports 
       WHERE category = $1 
         AND ABS(latitude - $2) <= 0.009 
         AND ABS(longitude - $3) <= 0.009
         AND status != 'Resolved'
         AND created_at >= NOW() - INTERVAL '14 days'`,
      [category, parsedLat, parsedLng]
    );

    let initialStatus = 'Submitted';
    let verificationStatus = 'Under Review';
    let isConsensusVerified = false;

    if (proximityMatches.rows && proximityMatches.rows.length > 0) {
      initialStatus = 'Verified';
      verificationStatus = 'Community Verified (2+ Users within 1km)';
      isConsensusVerified = true;
      summaryText = `${summaryText} • [Verified: 2+ independent community reports within 1km]`;

      // Auto-upgrade all matching nearby reports in PostgreSQL database to Verified status as well!
      const matchingIds = proximityMatches.rows.map(r => r.id);
      await query(
        `UPDATE reports 
         SET status = 'Verified', 
             verification_status = 'Community Verified (2+ Users within 1km)',
             updated_at = CURRENT_TIMESTAMP 
         WHERE id = ANY($1::int[])`,
        [matchingIds]
      );
    }

    const result = await query(
      `INSERT INTO reports 
        (user_id, title, category, description, image_url, latitude, longitude, address, severity, status, verification_status, ai_summary)
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        userId,
        title.trim(),
        category,
        description.trim(),
        image_url || null,
        parsedLat,
        parsedLng,
        address ? address.trim() : 'Detected Location',
        severity || 'Medium',
        initialStatus,
        verificationStatus,
        summaryText
      ]
    );

    const createdReport = {
      ...result.rows[0],
      user_name: req.user.name || 'Community Member',
      is_consensus_verified: isConsensusVerified
    };

    return res.status(201).json({
      success: true,
      message: isConsensusVerified
        ? 'Thank you! Matching hazard confirmed within 1km — Report automatically upgraded to Verified Status across the global map!'
        : 'Thank you for helping make your community safer. Your report has been submitted.',
      data: createdReport
    });
  } catch (error) {
    next(error);
  }
};

export const updateReport = async (req, res, next) => {
  try {
    const reportId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const userRole = req.user.role;

    // Check ownership or admin
    const check = await query('SELECT * FROM reports WHERE id = $1', [reportId]);
    if (!check.rows || check.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Report not found.' });
    }

    const report = check.rows[0];
    if (report.user_id !== userId && userRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized to modify this report.' });
    }

    const { title, category, description, severity, address } = req.body;

    const result = await query(
      `UPDATE reports
       SET title = COALESCE($1, title),
           category = COALESCE($2, category),
           description = COALESCE($3, description),
           severity = COALESCE($4, severity),
           address = COALESCE($5, address),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [title, category, description, severity, address, reportId]
    );

    return res.status(200).json({
      success: true,
      message: 'Report updated successfully.',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReport = async (req, res, next) => {
  try {
    const reportId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const userRole = req.user.role;

    const check = await query('SELECT * FROM reports WHERE id = $1', [reportId]);
    if (!check.rows || check.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Report not found.' });
    }

    const report = check.rows[0];
    if (report.user_id !== userId && userRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this report.' });
    }

    await query('DELETE FROM reports WHERE id = $1', [reportId]);

    return res.status(200).json({
      success: true,
      message: 'Report deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};

export const checkDuplicates = async (req, res, next) => {
  try {
    const { category, latitude, longitude } = req.body;
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(200).json({ success: true, hasPotentialDuplicate: false, duplicates: [] });
    }

    // Check for reports within ~500m of identical category in last 7 days
    const result = await query(
      `SELECT * FROM reports 
       WHERE category = $1 
         AND ABS(latitude - $2) < 0.005 
         AND ABS(longitude - $3) < 0.005
         AND created_at >= NOW() - INTERVAL '7 days'
       LIMIT 5`,
      [category, lat, lng]
    );

    return res.status(200).json({
      success: true,
      hasPotentialDuplicate: result.rows.length > 0,
      duplicates: result.rows
    });
  } catch (error) {
    next(error);
  }
};

