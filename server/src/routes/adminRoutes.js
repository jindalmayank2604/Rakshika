import { Router } from 'express';
import { getAdminStats, updateReportStatus } from '../controllers/adminController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/roleMiddleware.js';

const router = Router();

// Protect all admin endpoints
router.use(authenticateToken, requireAdmin);

router.get('/stats', getAdminStats);
router.put('/reports/:id/status', updateReportStatus);

export default router;

