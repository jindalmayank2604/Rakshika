import { getAISafetyResponse, classifyIncidentText } from '../services/geminiService.js';

export const chatWithAI = async (req, res, next) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message text is required.' });
    }

    const reply = await getAISafetyResponse(message, conversationHistory || []);

    return res.status(200).json({
      success: true,
      reply,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

export const classifyIncident = async (req, res, next) => {
  try {
    const { text, category } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: 'Incident text is required.' });
    }

    const analysis = await classifyIncidentText(text, category);

    return res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    next(error);
  }
};
