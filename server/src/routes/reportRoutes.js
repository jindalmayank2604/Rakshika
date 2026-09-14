import { Router } from 'express';
import { 
  getAllReports, 
  getReportById, 
  createReport, 
  updateReport, 
  deleteReport, 
  checkDuplicates 
} from '../controllers/reportController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

// Publicly viewable community reports for map
router.get('/', getAllReports);
router.get('/:id', getReportById);

// Protected report actions
router.post('/', authenticateToken, createReport);
router.put('/:id', authenticateToken, updateReport);
router.delete('/:id', authenticateToken, deleteReport);
router.post('/check-duplicates', checkDuplicates);

export default router;

