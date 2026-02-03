# TalentGate

**TalentGate** is a production-grade hiring platform where **job seekers maintain a single evolving profile** and **employers hire faster** using role-based dashboards and (soon) swipe-style review workflows.

The goal: **reduce application friction**, **speed up hiring decisions**, and introduce **AI-assisted matching** — while keeping humans in control.

---

## 🚀 Current Status

🟢 **Actively in development**

### ✅ Completed milestones:
- JWT-based authentication (signup / login)
- Role-based access (Job Seeker / Employer)
- Protected routes & dashboards
- MongoDB-backed backend with Express
- Clean, responsive frontend with React + Tailwind
- API health checks & structured routing
- **Verification gate (read-only until verified)** *(core platform rule)*

### 🎯 Next milestones:
- Jobs API (CRUD)
- Job listings page
- Apply-to-job workflow
- Employer job posting + applicant viewing
- Living profile expansion (education / experience / resumes)

---

## 🧠 Core Concepts:

### 1) One Living Profile (Job Seekers)
- Identity, resume, and application data stored once
- Apply to multiple jobs without rewriting the basics
- Resume versions per role *(planned)*
- ATS score + AI resume improvements *(planned)*

### 2) Verification Gate (Both Roles)
After signup:
- **Not verified → browse only (read-only)**
- **Verified → full access** (apply/post/interact)

Verification includes:
- Name, age, email, phone  
Future goal: **one account per person/company**

### 3) Recruiter Review Workflow (Employers)
- Role-based employer dashboard
- Applicant review with clear qualification signals
- Benchmark-based shortlisting *(planned)*
- Swipe review (shortlist/reject) *(planned)*

### 4) AI-Assisted (Upcoming)
- Resume ATS analysis
- Job–candidate fit signals
- Explainable recommendations (**AI assists, humans decide**)

---

## 🛠 Tech Stack:

### Frontend
- React + TypeScript
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication

### Tooling
- Git & GitHub (feature-branch workflow)
- WebStorm
- MongoDB Compass

---

## 🔐 Authentication Overview:
- JWT-based authentication
- Tokens stored client-side
- Role-based route protection
- Verification gating (unverified users are read-only)
- Separate seeker/employer dashboards

---

## 📦 Local Setup:

### Prerequisites:
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### Backend:
```
cd server
npm install
npm run dev
```

### Frontend
```
cd client
npm install
npm run dev
```
---

## 📜 License

All Rights Reserved

This project is proprietary.
The source code is provided for viewing and educational purposes only.

You may not use, copy, modify, or redistribute this code or any derivative works without explicit written permission from the author.

---

## 👤 Author
### Ryanrixx

Founder-minded Full-Stack Developer

GitHub: https://github.com/Ryanrixx

Portfolio: https://ryanrixx.netlify.app

---

## ✨ Vision

TalentGate is being built as a real-world scalable system — not a demo project.
The goal is to ship features incrementally, test them end-to-end, and grow the platform with production discipline.

---

## 🔒 This repository contains the private production code..

 A public technical showcase is available here:
 
👉 https://github.com/Ryanrixx/TalentGate-Showcase

---

---
