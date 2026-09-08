# 🛡️ RAKSHIKA — Modern AI-Powered Women's & Community Safety Platform

> **Protect. Prevent. Empower.**  
> *Smart safety for every journey.*

Rakshika is a modern, venture-grade installable Progressive Web Application (PWA) engineered to help women prevent unsafe situations, report street hazards, understand community safety conditions, access emergency support, and navigate with confidence.

---

## 🌟 Key Product Features

### 1. 🚨 Press-and-Hold 3-Second SOS Trigger
- Large radial countdown interaction prevents accidental panic activations.
- Dispatches emergency alert payload with live GPS coordinates (`latitude`, `longitude`, `address`).
- Simulates automated SMS broadcasts to designated primary and secondary emergency contacts.

### 2. 🗺️ Interactive Community Safety Map
- Powered by Leaflet & OpenStreetMap with custom category-colored map pins.
- Filter by category: **Poor Lighting**, **Harassment**, **Suspicious Activity**, **Broken CCTV**, **Isolated Area**, and **Other**.
- Live GPS user locator pin, search bar, and incident inspection sheet.

### 3. 📝 5-Step Incident Reporting Wizard
- **Step 1:** Categorization with visual icons & severity assessment.
- **Step 2:** Detailed description & incident title.
- **Step 3:** Interactive pin-on-map / live GPS location picker.
- **Step 4:** Photo evidence upload with client-side preview.
- **Step 5:** AI incident classification preview & reassuring success modal.

### 4. 🤖 Rakshika AI Safety Companion (Gemini Integrated)
- 24/7 situational guidance for late-night transit, cab inspection checklists, and panic de-escalation.
- Auto-evaluates reported hazards to assist community moderation and verify incident severity.

### 5. 📊 Community Safety Insight (Safety Index)
- Contextual score calculated dynamically based on verified local reports and resolved street lighting defects.

### 6. 🛡️ Admin Moderation & Verification Portal
- Live analytics charts (Recharts) detailing weekly volume, resolution rates, and category distribution.
- Audit-friendly verification queue with 1-click status actions (**Verify**, **Mark Resolved**, **Flag / Reject**) and administrative audit notes.

### 7. 📱 Progressive Web App (PWA) Architecture
- `manifest.json`, Service Worker offline caching (`sw.js`), and unobtrusive install prompt banner.
- Responsive across Desktop, Laptop, Tablet, and Mobile with a dedicated bottom navigation bar.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, Tailwind CSS (Glassmorphism design tokens), React Router 6, Lucide Icons, Leaflet, React-Leaflet, Recharts.
- **Backend:** Node.js, Express.js, JWT, bcryptjs, Multer, CORS, Google Gemini AI (`@google/generative-ai`).
- **Database:** MySQL relational schema with full foreign keys and audit history (`schema.sql` & `seed.sql`).
- **Storage Strategy:** Dual-Mode architecture (seamless auto-switching between Express REST APIs and client-side storage for zero-config demos).

---

## 🚀 Getting Started

### 1. Start Frontend Web Application
```bash
cd client
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 2. Start Backend API Server (Optional)
```bash
cd server
npm install
npm start
```
Server runs at **`http://localhost:5000`**.

### 3. Database Setup (MySQL)
Execute the scripts located in `server/database/`:
```bash
mysql -u root -p < server/database/schema.sql
mysql -u root -p < server/database/seed.sql
```

---

## 🔑 Demo Credentials

| Role | Email | Password | Description |
| :--- | :--- | :--- | :--- |
| **User** | `priya@example.com` | `Password123!` | Standard commuter account with contacts & reports |
| **Admin** | `admin@rakshika.org` | `Password123!` | Moderation role with verification & analytics access |

---

## 🔒 Safety & Responsible AI Disclaimer
Rakshika is a safety empowerment platform and web technology prototype. In life-threatening emergencies, commuters should immediately contact emergency services (**112** National Emergency / **1091** Women Helpline).
