import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

let genAI = null;
let model = null;

if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
  try {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('✅ Google Gemini AI Service initialized.');
  } catch (err) {
    console.warn('⚠️ Gemini AI init error:', err.message);
  }
}

/**
 * Classify a safety incident text
 */
export const classifyIncidentText = async (text, categoryHint = '') => {
  if (model) {
    try {
      const prompt = `You are Rakshika AI, an intelligent community safety assistant.
Analyze the following user-submitted safety incident description:
"${text}"

Provide a JSON output with the following format (ONLY valid JSON, no markdown codeblocks):
{
  "category": "Harassment" | "Poor Lighting" | "Unsafe Area" | "Suspicious Activity" | "Broken CCTV" | "Isolated Area" | "Other",
  "severity": "Low" | "Medium" | "High" | "Critical",
  "summary": "Brief 1-line objective summary of the concern",
  "recommendedAction": "Actionable safety recommendation for the admin / commuter",
  "confidence": 0.85 to 0.99
}`;
      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim();
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (e) {
      console.warn('Fallback classification triggered:', e.message);
    }
  }

  // Fallback heuristic classification
  const lower = text.toLowerCase();
  let category = categoryHint || 'Unsafe Area';
  let severity = 'Medium';
  let summary = text.slice(0, 100);
  let recommendedAction = 'Mark for verification and notify nearby community members.';

  if (lower.includes('light') || lower.includes('dark') || lower.includes('lamp') || lower.includes('bulb')) {
    category = 'Poor Lighting';
    severity = 'Medium';
    summary = 'Reported defective or non-functional lighting along the pedestrian corridor.';
    recommendedAction = 'Forward municipal ticket to local street lighting maintenance team.';
  } else if (lower.includes('follow') || lower.includes('stalk') || lower.includes('comment') || lower.includes('harass') || lower.includes('teas')) {
    category = 'Harassment';
    severity = 'High';
    summary = 'Reported inappropriate behavior and harassment towards commuters.';
    recommendedAction = 'Flag for community alert and patrol cell attention.';
  } else if (lower.includes('camera') || lower.includes('cctv') || lower.includes('surveillance')) {
    category = 'Broken CCTV';
    severity = 'Low';
    summary = 'Reported damaged surveillance equipment or blind spot.';
    recommendedAction = 'Notify transit security for equipment inspection.';
  } else if (lower.includes('isolated') || lower.includes('bush') || lower.includes('desert') || lower.includes('shortcut')) {
    category = 'Isolated Area';
    severity = 'Medium';
    summary = 'Reported secluded pathway with restricted visibility.';
    recommendedAction = 'Advise commuters to use main arterial roads during evening hours.';
  } else if (lower.includes('group') || lower.includes('suspicious') || lower.includes('bike') || lower.includes('men')) {
    category = 'Suspicious Activity';
    severity = 'High';
    summary = 'Reported unauthorized group loitering exhibiting suspicious behavior.';
    recommendedAction = 'Increase periodic patrols during specified hours.';
  }

  return {
    category,
    severity,
    summary,
    recommendedAction,
    confidence: 0.92
  };
};

/**
 * Conversational safety assistant responses
 */
export const getAISafetyResponse = async (message, conversationHistory = []) => {
  if (model) {
    try {
      const chat = model.startChat({
        history: conversationHistory.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        })),
        generationConfig: {
          maxOutputTokens: 600,
          temperature: 0.7,
        }
      });

      const systemContext = `You are Rakshika AI, a calm, trustworthy, empowering, and protective safety companion for women and commuters.
CRITICAL GUIDELINES:
1. Always communicate with confidence, empathy, and practical guidance.
2. NEVER claim 100% guarantee of safety or replace emergency services.
3. For immediate physical danger, always emphasize calling emergency numbers (112, 1091 Women Helpline) and activating the Rakshika SOS button immediately.
4. Provide structured, calming, actionable steps for journey preparation, feeling uncomfortable, or assessing reports.`;

      const prompt = `${systemContext}\n\nUser Question: ${message}`;
      const result = await chat.sendMessage(prompt);
      return result.response.text();
    } catch (e) {
      console.warn('Gemini chat error, using expert rule base:', e.message);
    }
  }

  // Empathetic smart fallback responses
  const lower = message.toLowerCase();

  if (lower.includes('followed') || lower.includes('following') || lower.includes('behind me')) {
    return `### Immediate Action Steps If You Feel Followed:
1. **Head toward light and crowds:** Turn toward an open store, pharmacy, metro station, or illuminated restaurant immediately.
2. **Change your pace or cross the street:** This confirms if someone is intentionally following without confrontation.
3. **Make a loud phone call:** Call a trusted contact or fake a call stating clearly: *"I'm just turning the corner onto [Street Name], I see you waiting outside."*
4. **Hold Rakshika SOS Ready:** Keep the app open on your screen and your thumb near the SOS hold circle.
5. **If in immediate danger:** Dial **112** or **1091** and seek help from security guards or shopkeepers nearby.`;
  }

  if (lower.includes('late night') || lower.includes('journey') || lower.includes('cab') || lower.includes('taxi')) {
    return `### Safe Late-Night Travel Checklist:
- **Share Live Trip:** Share your live journey link with your primary emergency contact before getting into the vehicle.
- **Verify Cab Details:** Always check the license plate, driver photo, and ask *"Who are you picking up?"* before entering.
- **Sit in the Rear Passenger Seat:** Gives you view of the driver, access to both doors, and prevents close physical reach.
- **Keep Phone Battery High & Accessible:** Avoid using earphones at full volume so you maintain situational awareness.
- **Trust Your Instincts:** If something feels off, ask the driver to stop at a well-lit public spot immediately.`;
  }

  if (lower.includes('unsafe') || lower.includes('area') || lower.includes('safe route')) {
    return `### Assessing Area Safety with Rakshika:
- **Check the Safety Map:** Review recent community reports for poor lighting, isolated pathways, or harassment spots in this neighborhood.
- **Stick to Arterial Roads:** Even if shortcuts look faster on navigation, choose roads with operational streetlights, open shops, and regular traffic.
- **Travel in Pairs or Groups:** If transiting after 9 PM, consider waiting for fellow commuters at well-lit transit hubs.
- **File a Report:** If you notice a broken streetlight or isolated stretch, submit a quick report to alert fellow community members.`;
  }

  return `I'm here with you. As your **Rakshika AI Safety Companion**, I'm designed to help you navigate journeys calmly, prepare for travel, evaluate community safety reports, and stay protected.

How can I support you right now?
• Get tips on **traveling late at night**
• Check what to do if you **feel uncomfortable or followed**
• Understand how to **prepare for a new commute route**
• Learn how community safety reports are verified

*(Note: For life-threatening emergencies, please dial **112 / 1091** or hold the SOS button on your dashboard immediately.)*`;
};
