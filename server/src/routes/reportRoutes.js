import { Router } from 'express';
import { getAllReports, getReportById, createReport, checkDuplicates } from '../controllers/reportController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

// Publicly viewable community reports for map
router.get('/', getAllReports);
router.get('/:id', getReportById);

// Submit report
router.post('/', createReport);
router.post('/check-duplicates', checkDuplicates);

export default router;
