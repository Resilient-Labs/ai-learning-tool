# Sprint 1 Brief: AI Learning Platform Foundation

**Week 1 of 8 | Team: 18 Engineers | Duration: 5 Days | Task Size: 2–3 hours each**.

---

## 🎯 Sprint Goals

### Primary Objectives

1. **Establish Core Infrastructure** – Auth provider integration, database schema, API foundation.  
2. **Enable Basic AI Tutoring** – Chat interface with LLM integration.  
3. **Build Analytics Foundation** – Instructor dashboard for student activity.  
4. **Ensure System Reliability** – CI/CD pipeline, monitoring, and serverless deployment.  

### Success Definition

- Students can register, log in, and chat with the AI tutor.  
- Instructors can view basic student activity metrics.  
- App deployed to Vercel (frontend) and AWS Lambda (backend) with monitoring.  
- Foundation ready for Sprint 2 development.  

---

## ⚠️ Key Risks

1. **LLM Provider Decision Delay** – Must pick OpenAI vs Anthropic Day 1.  
2. **Schema Over-Engineering** – Keep minimal, refine in Sprint 2.  
3. **Large Team Coordination** – Daily 15-min standups + API contracts.  
4. **AI Response Quality** – Mitigate with simple prompt engineering.  
5. **Auth Provider Integration** – Validate setup Day 1.  

---

## 📊 Success Metrics

### User Experience

- **Student Flow:** Register → Login → Chat.  
- **Instructor Flow:** Login → View student list → See metrics.  
- **Error Handling:** Graceful messages.  
- **Responsive:** Works on desktop + tablet.  

### Team Process

- **Completion:** 80%+ of tasks delivered.  
- **Integration:** No major frontend/backend blockers.  
- **Docs:** Setup + API guide complete.  
- **Velocity:** Baseline set for Sprint 2.  

---

## 🏗️ Team Organization & Responsibilities

## 🔹 Frontend Team (6 Engineers)

### **Team A (3 Engineers): Authentication & Student Experience**

- **Engineer 1**  
  - Auth provider integration on frontend.  (Clerk or Auth0)
  - Registration + login forms.  
  - Role-based redirects.  

- **Engineer 2**  
  - Chat UI (message bubbles + state mgmt).  
  - Conversation history view.  
  - Hook into chatbot API.  

- **Engineer 3**  
  - Student dashboard layout.  
  - Progress indicators (sessions, time).  
  - Accessibility + responsive polish.  

---

### **Team B (3 Engineers): Admin Dashboard & Integration**

- **Engineer 4**  
  - Admin dashboard shell (navigation + layout).  
  - Lesson CRUD UI.  

- **Engineer 5**  
  - Analytics visualizations (tables, charts).  

- **Engineer 6**  
  - Responsive design QA.  
  - Frontend integration testing (Playwright/Cypress).  
  - Bug fixes + polish.  

---

## 🔹 Backend Team (6 Engineers)

### **Team C (3 Engineers): Authentication & User Management**

- **Engineer 7**  
  - Auth provider backend hooks (user creation, login/logout). (Clerk or Auth0)
  - Role enforcement (Student vs. Admin)

- **Engineer 8**  
  - Password reset flow using provider API.  
  - Rate-limiting middleware.  

- **Engineer 9**  
  - Postgres schema for users (student/admin).  
  - Auth provider → DB sync.  
  - API tests for user flows.  

---

### **Team D (3 Engineers): Chatbot & Analytics**

- **Engineer 10**  
  - Integrate Vercel AI SDK for chatbot responses (using a model provider like OpenAI/Anthropic).  
  - Implement streaming chat responses via Vercel SDK so UI shows incremental replies.  
  - Ensure conversation history is stored in DB for each chat session.

- **Engineer 11**  
  - Analytics API (aggregate progress).  
  - Build `GET /api/analytics/students` to return student summaries: `total_sessions`, `avg_session_length`, `last_active_at`.

- **Engineer 12**  
  - Ensure conversation history is stored in DB for each chat session.
  - Implement error handling + logging middleware.  

---

## 🔹 DevOps Team (3 Engineers)

- **Engineer 13**  
  - Postgres instance setup.  
  - Code Reviews

- **Engineer 14**  
  - Build GitHub Actions CI/CD pipeline for automated testing + deploys to Vercel (frontend + serverless backend).  
  - Configure staging and production environments in Vercel.  
  - Manage environment variables/secrets through Vercel dashboard.  
  - Code Reviews

- **Engineer 15**  
  - Implement monitoring + logging using Vercel Analytics and Vercel Logs.  
  - Own production deployments (review + promote from staging to prod).  
  - Code Reviews

**Additional DevOps Responsibility:**  

- Review **all pull requests** across teams to enforce code quality, testing, and security standards.  

---

## 🔹 Full-Stack / Integration Team (3 Engineers)

- **Engineer 16**  
  - End-to-end integration testing (student + admin flows).  
  - Coordinate bug triage.  

- **Engineer 17**  
  - Performance testing + optimization.  
  - Identify backend bottlenecks.  

- **Engineer 18**  
  - Developer documentation (setup + contribution guide).  
  - Demo prep (seed users, sample lessons).  

---

## 🔹 Notes

- DevOps reviews **all PRs**.  
- Engineers work in **3-person pods** for collaboration.  
- Integration team ensures no drift across features.  
- Scope = MVP only: chatbot, dashboards, progress tracking, analytics.  

---

## 🚀 Definition of Done

**For Each Task**:

- Code written + self-reviewed.  
- Functionality manually tested.  
- No lint errors.  
- PR reviewed + merged.  

**For Sprint Completion**:

- Student can register, login, chat.  
- Instructor can login, view student metrics.  
- Deployed to prod with monitoring.  
- Demo-ready by Friday 1 PM.  

---

**Sprint 1 = Solid Foundation for the Learning Platform** 🚀

## ✅ Features IN Scope

### Authentication & User Management

- Integrate with an auth provider (Auth0, Clerk, or Supabase).  
- Support student vs. admin roles.  
- Password reset + email integration via provider.  

### Basic AI Chat System

- Chat UI with message bubbles.  
- LLM integration (OpenAI/Anthropic TBD).  
- Store and retrieve conversation history.  

### Student Dashboard

- Student dashboard shell.  
- Conversation history viewer.  
- Simple progress indicators (sessions count, time spent).  

### Instructor Analytics

- Admin dashboard layout.  
- Student activity metrics (active users, session counts).  
- Export functionality (CSV).  

### Infrastructure & DevOps

- Postgres setup with minimal schemas.  
- GitHub Actions CI/CD to Vercel + AWS Lambda.  
- Monitoring/alerts with Vercel Analytics + CloudWatch.  

---

## ❌ Features OUT of Scope

- Real-time WebSockets (use polling).  
- Advanced personalization or AI memory.  
- MFA (single sign-on only).  
- Horizontal scaling (serverless covers MVP load).  
- Mobile native apps (web responsive only).  
- Advanced analytics or predictive insights.  
