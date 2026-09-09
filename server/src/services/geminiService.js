import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

let genAI = null;
let model = null;

if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
  try {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('✅ Google Gemini AI Service initialized for WeSafe.');
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
      const prompt = `You are WeSafe AI, an intelligent community safety assistant.
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

      const systemContext = `You are WeSafe AI, a calm, trustworthy, empowering, and protective safety companion.
CRITICAL GUIDELINES:
1. Always communicate with confidence, empathy, and practical proactive guidance (Tagline: Protect. Prevent. Empower.).
2. NEVER claim 100% guarantee of safety or replace official emergency services.
3. For immediate physical danger, always emphasize calling emergency numbers (112 National Emergency, 1091 Women Helpline) and activating the WeSafe SOS button immediately.
4. Provide structured, calming, actionable steps for journey preparation, safer route decisions, or assessing community hazard reports.`;

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
1. **Head toward light and verified safe spots:** Turn toward an open 24/7 store, pharmacy, metro station, or illuminated restaurant immediately.
2. **Change your pace or cross the street:** This confirms if someone is intentionally matching your movement without escalating confrontation.
3. **Make a loud phone call:** Call a trusted contact or state clearly: *"I'm just turning the corner onto [Street Name], I see you waiting outside."*
4. **Hold WeSafe SOS Ready:** Keep the app open on your screen with your thumb on the 3-second SOS panic trigger.
5. **If in immediate danger:** Dial **112** or **1091** and seek shelter with security guards or open commercial establishments.`;
  }

  if (lower.includes('late night') || lower.includes('journey') || lower.includes('cab') || lower.includes('taxi') || lower.includes('ride')) {
    return `### Safe Late-Night Travel Checklist:
- **Share Live Trip:** Share your live journey corridor with your primary emergency contact before entering the vehicle.
- **Verify Cab Details:** Always verify the registration plate, driver identity, and ask *"Who are you picking up?"* before entering.
- **Sit in the Rear Passenger Seat:** Gives you a clear view of the driver, access to both doors, and maintains physical distance.
- **Keep Phone Battery High & Accessible:** Avoid using earphones at loud volumes to preserve 360-degree situational awareness.
- **Trust Your Instincts:** If the vehicle departs from well-lit arterial roads, ask the driver to stop at a populated location immediately.`;
  }

  if (lower.includes('unsafe') || lower.includes('area') || lower.includes('safe route') || lower.includes('route')) {
    return `### Assessing Area Safety with WeSafe:
- **Use the Safer Route Planner:** Compare fastest paths against well-lit safety corridors with verified police posts and CCTV coverage.
- **Stick to Arterial Roads:** Avoid dimly lit service lanes or deserted shortcuts, even if navigation saves 3-4 minutes.
- **Identify Safe Havens:** Look for 24-hour pharmacies and transit hubs plotted on the WeSafe map along your route.
- **File a Report:** If you notice a broken streetlight or isolated stretch, submit a quick hazard report to protect fellow community members.`;
  }

  return `I'm here with you. As your **WeSafe AI Safety Companion**, I'm designed to help you navigate journeys calmly, evaluate street hazards, plan safer routes, and stay protected.

How can I support you right now?
• Check how to **evaluate late-night travel routes**
• Get steps if you **feel uncomfortable or suspect you are being followed**
• Learn what to check before **entering a ride-share cab**
• Understand how the **WeSafe community safety index** is calculated

*(Note: For life-threatening emergencies, please dial **112 / 1091** or hold the SOS button on your dashboard immediately.)*`;
};
