# 🌿 SAANIDHYA

> **"Together in care. Independent in life."**  
> *Developed for the Catalyst 2026 AI Hackathon.*

---

## 📖 Overview

**SAANIDHYA** is a premium, dignified healthcare and family-care companion platform. It reconciles two essential human needs:
1. **Elderly Independence**: An ultra-accessible interface with large high-contrast controls, single-touch emergency SOS, gentle well-being check-ins, and intuitive medication tracking.
2. **Family Peace of Mind**: A real-time caregiver observability dashboard providing biometric vitals telemetry, daily routine adherence streams, and predictive Gemini AI care briefs.

---

## 🎨 Design Direction & Palette

Designed for calmness, clarity, and trust:
* **Deep Forest Green** (`#173C38`): Anchor color signifying stability, longevity, and clinical trust.
* **Warm Ivory** (`#E9E4D8`): Soothing base background reducing eye strain for elderly users.
* **Sage** (`#A9BDA9`): Subtle restorative accent for badges, borders, and wellness metrics.
* **Champagne** (`#C7A36C`): Warm highlight for primary action triggers and AI highlights.

Generous whitespace, readable typography (Plus Jakarta Sans & Playfair Display), subtle borders, and soft shadows provide an unhurried, reassuring experience.

---

## 🏗️ Project Architecture

```text
Catalyst2026/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── env.js            # Environment configuration & service checks
│   │   ├── middleware/
│   │   │   └── errorHandler.js   # Centralized error handling
│   │   ├── routes/
│   │   │   ├── api.js            # Base capability routes
│   │   │   └── health.js         # GET /health health-check endpoint
│   │   ├── services/
│   │   │   ├── firebaseService.js # Firebase Auth & Firestore architecture stub
│   │   │   └── geminiService.js   # Google Gemini API integration stub
│   │   └── app.js                # Express app setup with CORS & JSON parsing
│   ├── server.js                 # Server entrypoint with graceful shutdown
│   ├── Dockerfile                # Production Dockerfile for Google Cloud Run
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── caregiver/        # Caregiver dashboard, vitals, activity stream
│   │   │   ├── common/           # Reusable Button, Card, Header, StatusBadge
│   │   │   ├── elder/            # Elder dashboard, high-contrast SOS modal
│   │   │   └── landing/          # Overview hero & dual entry portal
│   │   ├── context/
│   │   │   └── ModeContext.jsx   # State management & live backend health check
│   │   ├── App.jsx               # Main application container
│   │   ├── main.jsx              # React DOM root entry
│   │   └── index.css             # Full design system & accessible themes
│   ├── index.html
│   ├── vite.config.js            # Vite configuration with API proxying
│   ├── package.json
│   └── .env.example
├── .gitignore
├── .env.example
├── package.json                  # Root orchestration scripts
└── README.md
```

---

## 🚀 Quickstart & Setup

### Prerequisites
* **Node.js**: v18.0.0 or later (tested on Node v24)
* **Windows Note**: In PowerShell, if script execution is restricted for `npm.ps1`, use `npm.cmd`.

### 1. Install Dependencies
Run in two separate terminals, or sequentially:

**Backend:**
```powershell
cd backend
npm.cmd install
```

**Frontend:**
```powershell
cd frontend
npm.cmd install
```

### 2. Configure Environment (Optional for initial run)
Copy `.env.example` templates:
```powershell
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env
```

### 3. Start Development Servers

**Start Backend (Port 8080):**
```powershell
cd backend
npm.cmd run dev
```
*Health check URL: `http://localhost:8080/health`*  
*API info URL: `http://localhost:8080/api/info`*

**Start Frontend (Port 5173):**
```powershell
cd frontend
npm.cmd run dev
```
*Open `http://localhost:5173` in your browser.*

---

## ☁️ Cloud & AI Integration Readiness

* **Google Cloud Run**: Includes `backend/Dockerfile` configured with multi-stage production build and automatic `PORT=8080` compliance.
* **Google Gemini API**: Service layer is scaffolded in `backend/src/services/geminiService.js` to ingest health telemetry and generate natural language summaries without exposing API keys in code.
* **Firebase & Cloud Firestore**: Architecture is ready in `backend/src/services/firebaseService.js` and frontend config templates for token verification and real-time syncing.

---

## 🔒 Security & Best Practices
* Zero secrets or API keys are committed. All integrations use `.env` files.
* Repository includes comprehensive `.gitignore` preventing accidental check-ins of keys, logs, or `node_modules`.
