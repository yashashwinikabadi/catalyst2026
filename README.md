# 🌿 SAANIDHYA

**Together in care. Independent in life.**

Developed for the **Catalyst 2026 AI Hackathon**.

## 📖 Overview

**SAANIDHYA** is an elderly-care and medication-management platform designed to connect elderly individuals, family members and caregivers through a shared care experience.

Its goal is to support elderly independence while making everyday care coordination easier for families and caregivers.

### Core capabilities

- **Elder Mode:** An accessible interface with large controls, medication tracking and a one-touch assistance request.
- **Family & Caregiver Mode:** A dashboard for reviewing medication status, care handovers, appointments and assistance requests.
- **Medication Management:** Record medication actions such as Taken, Skipped and Remind Me Later.
- **Care Handover:** Create caregiver handover records and allow incoming caregivers to acknowledge responsibility.
- **Assistance Requests:** Elder Mode can submit requests that appear in the caregiver dashboard.
- **Care History:** Maintain records of medication actions and care coordination events.

## 🎨 Design Direction & Palette

SAANIDHYA uses a calm, premium and accessible visual identity.

| Colour | Hex | Purpose |
|---|---|---|
| Deep Forest Green | `#173C38` | Trust and stability |
| Warm Ivory | `#E9E4D8` | Comfortable backgrounds |
| Sage | `#A9BDA9` | Calm accents |
| Champagne | `#C7A36C` | Warm highlights |

The interface uses generous spacing, readable typography, clear visual hierarchy and accessible controls.

## 🏗️ Technology Stack

- **Frontend:** React, Vite, JavaScript and CSS
- **Backend:** Node.js and Express.js
- **Data storage:** Local JSON files for the current prototype
- **API communication:** REST endpoints
- **Development tools:** VS Code, npm and GitHub

## 🧩 Project Structure

```text
Catalyst2026/
├── backend/
│   ├── data/
│   │   ├── medications.json
│   │   ├── careHandovers.json
│   │   └── helpRequests.json
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── routes/
│   │   │   ├── health.js
│   │   │   ├── api.js
│   │   │   ├── medications.js
│   │   │   ├── careHandovers.js
│   │   │   └── helpRequests.js
│   │   ├── services/
│   │   │   ├── medicationService.js
│   │   │   ├── careHandoverService.js
│   │   │   ├── firebaseService.js
│   │   │   └── geminiService.js
│   │   └── app.js
│   ├── server.js
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── caregiver/
│   │   │   ├── common/
│   │   │   ├── elder/
│   │   │   └── landing/
│   │   ├── context/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Local Setup

### Prerequisites

- Node.js 18 or later
- npm
- Git

On Windows PowerShell, use `npm.cmd` if PowerShell blocks `npm.ps1`.

### 1. Clone the repository

```bash
git clone https://github.com/yashashwinikabadi/catalyst2026.git
cd catalyst2026
```

### 2. Install dependencies

```powershell
npm.cmd run setup
```

### 3. Start the backend

Open a PowerShell terminal in the project root:

```powershell
npm.cmd run backend:dev
```

Backend health check:

`http://localhost:8080/health`

### 4. Start the frontend

Open a second PowerShell terminal in the project root:

```powershell
npm.cmd run frontend:dev
```

Open the application:

`http://localhost:5173/`

## 🔌 Current API Capabilities

| Endpoint | Method | Purpose |
|---|---|---|
| `/health` | GET | Backend health check |
| `/api/medications` | GET | Retrieve medication records |
| `/api/medications` | POST | Create a medication record |
| `/api/medications/:id/action` | POST | Record a medication action |
| `/api/care-handovers` | GET | Retrieve handover records |
| `/api/care-handovers` | POST | Create a care handover |
| `/api/care-handovers/:id/acknowledge` | POST | Acknowledge a handover |
| `/api/help-requests` | GET | Retrieve assistance requests |
| `/api/help-requests` | POST | Create an assistance request |
| `/api/help-requests/:id/resolve` | POST | Resolve an assistance request |

## 🔐 Safety, Privacy & Prototype Limitations

- The current prototype uses local JSON storage, not a production cloud database.
- Sample personas and records are illustrative demonstration data, not real patient information.
- Assistance requests appear in the caregiver dashboard, but do not dispatch real emergency calls, SMS or push notifications.
- Medication records reflect user-reported actions; they do not prove that medication was physically taken.
- Firebase Authentication, Cloud Firestore and Gemini API integration are not yet active.
- No biometric sensors are connected.
- The platform does not diagnose conditions, prescribe medication or change medical instructions.

A future production version can introduce secure identity management, cloud-based shared storage, configured reminders and carefully controlled AI assistance.

## ☁️ Deployment & Future Scope

The backend includes a Dockerfile for container-based deployment. The current architecture can be extended with:

- Firebase Authentication and Cloud Firestore.
- Google Gemini for simplifying doctor-provided instructions.
- Configured email reminders and caregiver notifications.
- Secure role-based access for elderly users, family members and caregivers.
- Persistent cloud storage and production monitoring.

These are planned integrations, not currently active features.

---

**SAANIDHYA — Care that supports independence, dignity and connection.**