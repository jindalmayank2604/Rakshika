# 🛡️ WESAFE — AI-Powered Community Safety Platform

> **Protect. Prevent. Empower.**  
> *Smart safety for every journey.*

WeSafe is an AI-powered community safety platform that helps users prevent, understand, and respond to safety risks through proactive safety insights, community-based hazard reporting, Mapbox-powered safe routing, and Gemini AI assistance.

---

## 🌟 Key Product Features

### 1. 🚨 Press-and-Hold 3-Second SOS Panic Trigger
- Large radial countdown interaction prevents accidental panic activations.
- Dispatches emergency alert payload with live GPS coordinates (`latitude`, `longitude`, `address`).
- Simulates automated SMS broadcasts to designated primary and secondary emergency contacts in your Safety Circle.

### 2. 🗺️ Interactive Safety Map using Mapbox / MapLibre
- Real-time visualization of crowdsourced hazards, poorly lit pathways, harassment spots, and verified 24/7 Safe Havens (police booths, pharmacies).
- Category filtering: **Poor Lighting**, **Harassment**, **Suspicious Activity**, **Broken CCTV**, **Isolated Area**, and **Other**.
- Live GPS locator, search bar, and incident inspection sheet.

### 3. 🧭 Proactive Safer Route Recommendations
- Compares **Safest Route** (High illumination corridor, police posts, CCTV coverage) vs. **Fastest Route** (Alleyways with reported defects).
- Dynamic Safety Score (0–100) computed based on community hazard density and street lighting uptime.
- Turn-by-turn safe journey tips and 1-click live journey tracker sharing.

### 4. 🤖 WeSafe AI Safety Assistant (Google Gemini 2.0 Integrated)
- 24/7 situational guidance: late-night transit preparation, cab inspection checklists, and panic de-escalation steps.
- Automatic incident classification and severity scoring to support community moderation.

### 5. 📝 5-Step Incident Reporting Wizard with Cloudinary
- Step-by-step reporting with visual icons, severity assessment, interactive map pin picker, and Cloudinary media upload.
- Gemini AI auto-classification and reassuring completion modal.

### 6. 📊 Admin Moderation & Verification Portal
- Live telemetry charts (Recharts) for weekly incident volume, resolution rate, and category distribution.
- Audit queue with 1-click verification status (**Verify**, **Mark Resolved**, **Flag / Reject**) and administrative audit notes.

### 7. 📱 Progressive Web App (PWA) Architecture & Custom Design System
- Custom Light Mode Palette (**Parchment**, **Dust Grey**, **Linen**, **Powder Petal**, **Almond Silk**) and Dark Mode Palette (**Silver**, **Bone**, **Almond Silk**, **Smoky Rose**, **Wine Plum**).
- 3D friendly vector illustrations, selective glassmorphism, responsive across mobile, tablet, and desktop.
- Service Worker offline caching and installable PWA banner.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, Tailwind CSS (Earthy & Rose theme tokens), React Router 6, Lucide Icons, MapLibre GL / Mapbox, Recharts.
- **Backend:** Node.js, Express.js, JWT, bcryptjs, Multer, Cloudinary, CORS, Google Gemini AI (`@google/generative-ai`).
- **Database:** PostgreSQL relational schema with PostGIS coordinates, foreign keys, and audit history (`postgres_schema.sql` & `postgres_seed.sql`).
- **Storage Strategy:** Dual-Mode architecture (seamless auto-switching between Express REST APIs and client-side storage for zero-config demos).

---

## 🎨 Color Palette Reference

### Light Mode:
- **Parchment:** `#edede9`
- **Dust Grey:** `#d6ccc2`
- **Linen:** `#f5ebe0`
- **Powder Petal:** `#e3d5ca`
- **Almond Silk:** `#d5bdaf`

### Dark Mode:
- **Silver:** `#cebebe`
- **Bone:** `#ece2d0`
- **Almond Silk:** `#d5b9b2`
- **Smoky Rose:** `#a26769`
- **Wine Plum:** `#6d2e46`

---

## 🚀 Getting Started

### 1. Start Frontend Web Application
```bash
cd client
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 2. Start Backend API Server
```bash
cd server
npm install
npm start
```
Server runs at **`http://localhost:5000`**.

### 3. Database Setup (PostgreSQL)
Execute the scripts located in `server/database/`:
```bash
psql -U postgres -d wesafe_db -f server/database/postgres_schema.sql
psql -U postgres -d wesafe_db -f server/database/postgres_seed.sql
```

---

## 🔑 Demo Credentials

| Role | Email | Password | Description |
| :--- | :--- | :--- | :--- |
| **User** | `priya@example.com` | `Password123!` | Standard commuter account with contacts, reports, & routes |
| **Admin** | `admin@wesafe.org` | `Password123!` | Moderation role with verification & analytics access |

---

## 🔒 Safety & Responsible AI Disclaimer
WeSafe is a proactive safety empowerment platform and web technology prototype. In life-threatening emergencies, commuters should immediately contact emergency services (**112** National Emergency / **1091** Women Helpline).
