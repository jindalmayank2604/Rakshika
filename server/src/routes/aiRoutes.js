import { Router } from 'express';
import { chatWithAI, classifyIncident } from '../controllers/aiController.js';

const router = Router();

router.post('/chat', chatWithAI);
router.post('/classify', classifyIncident);

export default router;
