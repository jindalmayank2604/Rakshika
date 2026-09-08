import { Router } from 'express';
import { getAdminStats, updateReportStatus } from '../controllers/adminController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/stats', getAdminStats);
router.put('/reports/:id/status', updateReportStatus);

export default router;
