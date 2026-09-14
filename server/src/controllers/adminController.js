import { query } from '../config/db.js';

export const getAdminStats = async (req, res, next) => {
  try {
    // 1. Total reports
    const totalRes = await query('SELECT COUNT(*) FROM reports');
    const totalReports = parseInt(totalRes.rows[0].count, 10) || 0;

    // 2. Pending reports
    const pendingRes = await query("SELECT COUNT(*) FROM reports WHERE status IN ('Submitted', 'Under Review')");
    const pendingReview = parseInt(pendingRes.rows[0].count, 10) || 0;

    // 3. Verified reports
    const verifiedRes = await query("SELECT COUNT(*) FROM reports WHERE status = 'Verified'");
    const verifiedReports = parseInt(verifiedRes.rows[0].count, 10) || 0;

    // 4. Resolved reports
    const resolvedRes = await query("SELECT COUNT(*) FROM reports WHERE status = 'Resolved'");
    const resolvedReports = parseInt(resolvedRes.rows[0].count, 10) || 0;

    // 5. Total Users
    const usersRes = await query('SELECT COUNT(*) FROM users');
    const activeUsers = parseInt(usersRes.rows[0].count, 10) || 0;

    // 6. High severity count
    const highSevRes = await query("SELECT COUNT(*) FROM reports WHERE severity IN ('High', 'Critical')");
    const highSeverityCount = parseInt(highSevRes.rows[0].count, 10) || 0;

    // 7. Category distribution
    const catRes = await query(`
      SELECT category as name, COUNT(*)::int as count 
      FROM reports 
      GROUP BY category 
      ORDER BY count DESC
    `);

    const colorPalette = {
      'Poor Lighting': '#b47f82',
      'Harassment': '#b91c1c',
      'Suspicious Activity': '#8c5254',
      'Broken CCTV': '#6d2e46',
      'Isolated Area': '#2b7a78',
      'Unsafe Area': '#d97706',
      'Other': '#64748b'
    };

    const categoryDistribution = catRes.rows.map(row => ({
      name: row.name,
      count: row.count,
      color: colorPalette[row.name] || '#a26769'
    }));

    const resolutionRate = totalReports > 0 ? `${Math.round((resolvedReports / totalReports) * 100)}%` : '100%';

    return res.status(200).json({
      success: true,
      stats: {
        totalReports,
        pendingReview,
        verifiedReports,
        resolvedReports,
        activeUsers,
        highSeverityCount,
        resolutionRate
      },
      categoryDistribution: categoryDistribution.length > 0 ? categoryDistribution : [
        { name: 'Poor Lighting', count: 0, color: '#b47f82' },
        { name: 'Harassment', count: 0, color: '#b91c1c' },
        { name: 'Suspicious Activity', count: 0, color: '#8c5254' }
      ]
    });
  } catch (error) {
    next(error);
  }
};

export const updateReportStatus = async (req, res, next) => {
  try {
    const reportId = parseInt(req.params.id, 10);
    const { status, verification_status, notes } = req.body;
    const adminId = req.user.id;

    if (isNaN(reportId)) {
      return res.status(400).json({ success: false, message: 'Invalid report ID.' });
    }

    // Get current report to record audit log
    const prevReportRes = await query('SELECT status FROM reports WHERE id = $1', [reportId]);
    if (!prevReportRes.rows || prevReportRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Report not found.' });
    }
    const previousStatus = prevReportRes.rows[0].status;

    // Update report
    const updateRes = await query(
      `UPDATE reports 
       SET status = COALESCE($1, status), 
           verification_status = COALESCE($2, verification_status),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING *`,
      [status || null, verification_status || null, reportId]
    );

    // Write audit log
    await query(
      `INSERT INTO audit_logs (admin_id, report_id, previous_status, new_status, action_note)
       VALUES ($1, $2, $3, $4, $5)`,
      [adminId, reportId, previousStatus, status || previousStatus, notes || null]
    );

    return res.status(200).json({
      success: true,
      message: `Report #${reportId} status successfully updated to "${status}".`,
      data: updateRes.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

