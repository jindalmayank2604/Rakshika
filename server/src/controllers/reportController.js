import pool from '../config/db.js';
import { classifyIncidentText } from '../services/geminiService.js';

let memoryReports = [
  {
    id: 1,
    user_id: 2,
    user_name: 'Priya Sharma',
    title: 'Poor lighting near Sector 12 Bus Stop',
    category: 'Poor Lighting',
    description: 'Three continuous street lamps have been non-functional for past 2 weeks. The stretch from bus stand to metro pillar 42 is completely pitch dark after 7:30 PM.',
    image_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    latitude: 28.535517,
    longitude: 77.391029,
    address: 'Sector 12 Bus Stop, Main Market Road',
    severity: 'Medium',
    status: 'Verified',
    verification_status: 'Community Verified',
    created_at: new Date(Date.now() - 3600 * 1000 * 24 * 2).toISOString(),
    ai_summary: 'Reported infrastructure lighting defect posing evening commute safety risks.'
  },
  {
    id: 2,
    user_id: 2,
    user_name: 'Priya Sharma',
    title: 'Suspicious group gathering near Campus Back Gate',
    category: 'Suspicious Activity',
    description: 'Group of unidentified men loitering on parked motorbikes without number plates, passing unwelcome remarks at passing students between 6 PM - 9 PM.',
    image_url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80',
    latitude: 28.542100,
    longitude: 77.401200,
    address: 'University North Gate Perimeter, Block C',
    severity: 'High',
    status: 'Under Review',
    verification_status: 'Unverified',
    created_at: new Date(Date.now() - 3600 * 1000 * 8).toISOString(),
    ai_summary: 'Identified group loitering and harassment pattern in university vicinity.'
  },
  {
    id: 3,
    user_id: 2,
    user_name: 'Ananya S.',
    title: 'Broken CCTV Camera at Pedestrian Subway',
    category: 'Broken CCTV',
    description: 'The surveillance camera dome at entrance B of the pedestrian underpass has been physically damaged and dislodged.',
    image_url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80',
    latitude: 28.529800,
    longitude: 77.382400,
    address: 'Metro Underpass Exit 3, Central Ring',
    severity: 'Medium',
    status: 'Resolved',
    verification_status: 'Authority Verified',
    created_at: new Date(Date.now() - 3600 * 1000 * 24 * 5).toISOString(),
    ai_summary: 'Damaged surveillance module creating security blindspot.'
  },
  {
    id: 4,
    user_id: 2,
    user_name: 'Ritu K.',
    title: 'Isolated Pathway with dense overgrown bushes',
    category: 'Isolated Area',
    description: 'The pedestrian shortcut connecting the residential complex to the main boulevard is overgrown with bushes and lacks sightlines.',
    image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80',
    latitude: 28.549200,
    longitude: 77.378900,
    address: 'Greenway Corridor Link, Sector 15A',
    severity: 'Low',
    status: 'Verified',
    verification_status: 'Community Verified',
    created_at: new Date(Date.now() - 3600 * 1000 * 24 * 3).toISOString(),
    ai_summary: 'Secluded walkway with obstructed visibility.'
  },
  {
    id: 5,
    user_id: 2,
    user_name: 'Meenakshi V.',
    title: 'Persistent verbal harassment near tea stall corner',
    category: 'Harassment',
    description: 'Repeated catcalling reported by multiple commuters in front of the tea kiosk during evening transit hours.',
    image_url: 'https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?w=600&auto=format&fit=crop&q=80',
    latitude: 28.538700,
    longitude: 77.399500,
    address: 'Commercial Junction Corner, Street 4',
    severity: 'Critical',
    status: 'Under Review',
    verification_status: 'Flagged',
    created_at: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    ai_summary: 'Commuter harassment pattern identified.'
  }
];

export const getAllReports = async (req, res, next) => {
  try {
    const { category, severity, status, search, verifiedOnly } = req.query;

    let reports = [...memoryReports];

    if (pool) {
      try {
        let query = `
          SELECT r.*, u.name as user_name, ai.summary as ai_summary, ai.confidence as ai_confidence
          FROM reports r
          LEFT JOIN users u ON r.user_id = u.id
          LEFT JOIN ai_analysis ai ON r.id = ai.report_id
          WHERE 1=1
        `;
        const params = [];

        if (category && category !== 'All') {
          query += ' AND r.category = ?';
          params.push(category);
        }
        if (severity && severity !== 'All') {
          query += ' AND r.severity = ?';
          params.push(severity);
        }
        if (status && status !== 'All') {
          query += ' AND r.status = ?';
          params.push(status);
        }
        if (search) {
          query += ' AND (r.title LIKE ? OR r.address LIKE ? OR r.description LIKE ?)';
          params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }
        query += ' ORDER BY r.created_at DESC';

        const [rows] = await pool.query(query, params);
        if (rows.length > 0) {
          return res.status(200).json({ success: true, count: rows.length, data: rows });
        }
      } catch (dbErr) {
        console.warn('DB GetReports fallback:', dbErr.message);
      }
    }

    // Filter memory reports
    if (category && category !== 'All') {
      reports = reports.filter(r => r.category === category);
    }
    if (severity && severity !== 'All') {
      reports = reports.filter(r => r.severity === severity);
    }
    if (status && status !== 'All') {
      reports = reports.filter(r => r.status === status);
    }
    if (verifiedOnly === 'true') {
      reports = reports.filter(r => r.status === 'Verified' || r.verification_status.includes('Verified'));
    }
    if (search) {
      const q = search.toLowerCase();
      reports = reports.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      );
    }

    return res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    next(error);
  }
};

export const getReportById = async (req, res, next) => {
  try {
    const reportId = parseInt(req.params.id, 10);
    const report = memoryReports.find(r => r.id === reportId);

    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found.' });
    }

    return res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    next(error);
  }
};

export const createReport = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;
    const userName = req.user ? req.user.name : 'Anonymous Reporter';
    const { title, category, description, image_url, latitude, longitude, address, severity } = req.body;

    if (!title || !category || !description || !latitude || !longitude) {
      return res.status(400).json({ success: false, message: 'Please provide title, category, description, and location.' });
    }

    // Run AI classification
    const aiAnalysis = await classifyIncidentText(description, category);

    const newReport = {
      id: memoryReports.length + 1,
      user_id: userId,
      user_name: userName,
      title,
      category: category || aiAnalysis.category,
      description,
      image_url: image_url || 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80',
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      address: address || 'Current Location Coordinates',
      severity: severity || aiAnalysis.severity,
      status: 'Submitted',
      verification_status: 'Unverified',
      created_at: new Date().toISOString(),
      ai_summary: aiAnalysis.summary,
      ai_recommended_action: aiAnalysis.recommendedAction
    };

    if (pool) {
      try {
        const [result] = await pool.query(
          `INSERT INTO reports (user_id, title, category, description, image_url, latitude, longitude, address, severity, status, verification_status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Submitted', 'Unverified')`,
          [userId, title, newReport.category, description, newReport.image_url, newReport.latitude, newReport.longitude, newReport.address, newReport.severity]
        );
        newReport.id = result.insertId;

        // Insert AI analysis
        await pool.query(
          `INSERT INTO ai_analysis (report_id, category, severity, summary, confidence) VALUES (?, ?, ?, ?, ?)`,
          [newReport.id, aiAnalysis.category, aiAnalysis.severity, aiAnalysis.summary, aiAnalysis.confidence]
        );
      } catch (dbErr) {
        console.warn('DB createReport fallback:', dbErr.message);
      }
    }

    memoryReports.unshift(newReport);

    return res.status(201).json({
      success: true,
      message: 'Thank you for helping make your community safer. Your report has been submitted.',
      data: newReport,
      aiAnalysis
    });
  } catch (error) {
    next(error);
  }
};

export const checkDuplicates = async (req, res, next) => {
  try {
    const { category, latitude, longitude, description } = req.body;
    
    // Check if any report within ~500m has similar category
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    const matches = memoryReports.filter(r => {
      const distance = Math.sqrt(Math.pow(r.latitude - lat, 2) + Math.pow(r.longitude - lng, 2));
      return distance < 0.01 && (r.category === category || (description && r.description.toLowerCase().includes(description.slice(0, 15).toLowerCase())));
    });

    return res.status(200).json({
      success: true,
      hasPotentialDuplicate: matches.length > 0,
      duplicates: matches
    });
  } catch (error) {
    next(error);
  }
};
