# StudentVerse - B.Tech Guidance, Coding Practice & Placement Preparation Platform 🎓

> **Empowering Engineering Undergraduates from Year 1 Foundations to Career Launch**

StudentVerse is an end-to-end full-stack platform specifically architected for B.Tech engineering students. From their first semester to campus placement drives, StudentVerse bridges the gap between college curricula and industry expectations by providing branch-specific career exploration, rule-based career interest discovery, 4-year detailed learning roadmaps with concrete technology subtopic breakdowns, hands-on multi-language coding practice, tiered project blueprints, and structured placement interview preparation.

---

## 📌 Problem Statement & Motivation

Engineering students across India and worldwide face critical challenges:
1. **First-Year Confusion:** Students enter college without clear visibility into what their branch (CSE, AI&DS, AI&ML, IT, ECE, EEE, Mechanical, Civil) actually entails versus industry reality.
2. **Abstract Learning Roadmaps:** Most online roadmaps say "Learn Java" or "Learn React" without detailing the specific foundational subtopics, prerequisites, drills, and interview questions students must master.
3. **Fragmented Preparation:** Students juggle multiple disjointed websites for coding problems, interview FAQs, semester roadmaps, resume tips, and internships.
4. **Lack of Transparent Guidance:** Many tools offer proprietary black-box career advice or fake job tracking. StudentVerse provides deterministic, rule-based career recommendations with explainable matching factors and authentic educational resources.

---

## 👥 Target Users & Real-World Use Case

* **1st Year B.Tech Students:** Overcoming transition hurdles, understanding branch scopes, building procedural coding logic, and establishing Git/GitHub habits.
* **2nd Year B.Tech Students:** Transitioning into core Data Structures & Algorithms (DSA), Object-Oriented Programming, and database modeling.
* **3rd Year B.Tech Students:** Accelerating practical full-stack/system project deliverables, targeting summer internships, and contributing to open source.
* **4th Year B.Tech Students:** Placement screening drills, quantitative aptitude, core CS subject revisions (OS, DBMS, Networks), ATS resume optimization, and mock technical/HR interviews.
* **Non-CS Engineering Students:** Structured transition roadmaps to software, data science, or core engineering with transparent prerequisite guidance.

---

## ✨ Main Features

| Feature Module | Capabilities |
|---|---|
| **Branch Explorer** | Deep dive into 8 B.Tech branches: CSE, AI&DS, AI&ML, IT, ECE, EEE, Mechanical, and Civil. Details professional roles, skills, 4-year learning orders, projects, and non-branch transitions. |
| **Career Interest Discovery** | 8-dimension transparent questionnaire (Coding, Math/Stats, AI/ML, Data Analysis, Hardware, Networks/Cybersecurity, UI/UX Design, Problem Solving) with weighted rankings and explainable factors. |
| **13 Career Roadmaps** | 4-year sequential roadmaps across 13 engineering tracks with 220+ milestones. Includes ordered syllabi, prerequisites, estimated effort, and completion criteria. |
| **Concrete Subtopic Breakdown** | In-depth concept checklists for Java, Python, HTML, CSS, JavaScript, React, Node.js/Express, and MySQL embedded directly into milestone modals. |
| **Coding Practice Area** | 15 curated coding exercises across Java, Python, C/C++, JavaScript, SQL, and Web/React with difficulty filters, expandable hints, solutions, and quick external links to LeetCode, HackerRank, GeeksforGeeks, CodeChef, and freeCodeCamp. |
| **Tiered Project Hub** | Beginner, Intermediate, and Advanced capstone project blueprints with problem statements, required tech, step-by-step implementation sequences, expected outcomes, demonstrated skills, interview questions, and interactive status tracking (`Not Started`, `In Progress`, `Completed`). |
| **Technical Interview Q&A** | 17 comprehensive interview questions and answers categorized across DSA, OOP, SQL, Web/React, Node/APIs, AI/ML, OS, Networks, and HR (STAR technique) with search and filter pills. |
| **Placement Strategy Guide** | 6-stage structured sequence (Programming & DSA, SQL & Databases, Core CS, Aptitude & Reasoning, Resume & GitHub, HR/Behavioral interviews). |
| **Opportunities Hub** | Curated listings for summer internships (GSoC, ISRO, DRDO), hackathons (Smart India Hackathon), scholarships (NSP), and GATE schedules with verified badges and official redirection links. |
| **Student Dashboard** | Personalized authenticated overview showing student branch, target career, MySQL-persisted completion percentage, completed milestones list, saved resources, and recommended next topic. |

---

## 🛠️ Technology Stack & Rationale

* **Frontend: React.js (v18+) with Vite**
  * *Why:* Fast hot-module replacement (HMR), component-based reusability, and clean state handling using React Hooks and Context API.
* **Styling: Vanilla CSS with Custom CSS Variables**
  * *Why:* Clean, zero-dependency styling with custom design tokens, responsive flex/grid layouts, smooth animations, and high performance without bulky CSS frameworks.
* **Backend: Node.js with Express.js**
  * *Why:* Lightweight, event-driven, asynchronous I/O runtime ideal for RESTful JSON API services and modular controller/route architecture.
* **Database: MySQL (via `mysql2/promise`)**
  * *Why:* ACID-compliant relational data modeling with normalized schemas, foreign key constraints (`ON DELETE CASCADE`), connection pooling, and resilient data persistence for student accounts, progress, bookmarks, and quiz scores.
* **Security & Authentication: JSON Web Tokens (JWT) & `bcryptjs`**
  * *Why:* Stateless token authentication for protected endpoints and one-way salted password hashing (10 salt rounds) ensuring credentials are never stored in plaintext.

---

## 🏛️ System Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────┐
│              Client Layer (React.js + Vite)             │
│   SPA Router (react-router-dom) & Auth Context Provider │
│    UI Components, Modals, Category Filters & Bookmarks  │
└────────────────────────────┬────────────────────────────┘
                             │ HTTP REST API (JSON)
                             │ Bearer JWT in Headers
┌────────────────────────────▼────────────────────────────┐
│          Backend API Layer (Node.js + Express)          │
│   ├── CORS, JSON Body Parser & Request Logger           │
│   ├── JWT Authentication Middleware (`authenticateToken`)│
│   ├── Input Validation & Error Handling Middleware      │
│   └── Modular Controllers (Auth, Branch, Career, etc.) │
└────────────────────────────┬────────────────────────────┘
                             │ Parameterized SQL Queries (?)
                             │ Connection Pooling (mysql2)
┌────────────────────────────▼────────────────────────────┐
│              Database Layer (MySQL 8.0+)                │
│   ├── `students` (User accounts, branch, hashed pwd)    │
│   ├── `career_paths` (13 industry tracks & affinities)  │
│   ├── `roadmap_topics` (220+ milestones with syllabi)   │
│   ├── `student_progress` (Milestone completion records) │
│   ├── `learning_resources` & `saved_resources`          │
│   ├── `quizzes`, `quiz_questions` & `quiz_attempts`     │
│   └── `opportunities` (Verified internship/hackathons)  │
└─────────────────────────────────────────────────────────┘
```

---

## 📂 Project Folder Structure

```
StudentVerse/
├── .gitignore                    # Root ignore file (excludes secrets, node_modules, build outputs)
├── README.md                     # Comprehensive technical documentation
├── backend/
│   ├── .env.example              # Documented environment variable template
│   ├── package.json              # Express, mysql2, bcryptjs, jsonwebtoken, cors, dotenv
│   ├── database/
│   │   ├── schema.sql            # Normalized DDL schema for MySQL
│   │   └── seed.sql              # Insert statements for branches, careers, resources, quizzes
│   └── src/
│       ├── config/
│       │   └── db.js             # MySQL pool connection with resilient query handling
│       ├── controllers/
│       │   ├── authController.js        # Register, login, profile management
│       │   ├── branchController.js      # Branch details & department career mapping
│       │   ├── careerController.js      # Career roadmaps & 8-dimension interest scoring
│       │   ├── dashboardController.js   # Aggregated student metrics, coding practice & prep
│       │   ├── opportunityController.js  # Internships, hackathons & submission handler
│       │   ├── progressController.js     # Roadmap milestone completion tracking in MySQL
│       │   ├── quizController.js         # MCQ scoring, explanations & score history
│       │   └── resourceController.js     # Searchable resources & bookmarking
│       ├── data/
│       │   ├── codingPracticeData.js    # 15 multi-language coding exercises & solutions
│       │   ├── guidanceData.js          # Academic guidance and transition roadmaps
│       │   ├── roadmaps/                # Detailed roadmap datasets for all 13 careers
│       │   └── seedData.js              # Branches, careers, projects, interview questions
│       ├── middleware/
│       │   ├── auth.js                  # Bearer JWT verification guard
│       │   └── validate.js              # Request body validation
│       ├── routes/                      # Express route endpoints
│       ├── server.js                    # Express application entrypoint (Port 5000)
│       └── setupDb.js                   # Standalone database migration runner
│
└── frontend/
    ├── index.html                # HTML5 entry with Inter & Outfit typography
    ├── package.json              # React 18+, Vite, React Router, Lucide Icons
    ├── vite.config.js            # Vite build configuration
    └── src/
        ├── App.jsx               # Navigation routing & protected routes
        ├── App.css               # Layout grids & component styling
        ├── index.css             # Design tokens & color system
        ├── main.jsx              # React root DOM mount
        ├── components/
        │   ├── Navbar.jsx        # Responsive navigation with mobile drawer
        │   ├── Footer.jsx        # Footer with quick links and branch tags
        │   └── ProtectedRoute.jsx# Auth route guard
        ├── context/
        │   └── AuthContext.jsx   # Global student session provider
        ├── services/
        │   └── api.js            # Fetch API client with automatic JWT injection
        └── pages/
            ├── HomePage.jsx               # Landing page, stats, blueprint & features
            ├── LoginPage.jsx              # Student authentication
            ├── RegisterPage.jsx           # Student registration (8 branches, Year, Interests)
            ├── BranchExplorationPage.jsx  # Detailed explorer for 8 B.Tech branches
            ├── InterestFinderPage.jsx     # 8-dimension transparent questionnaire
            ├── CareerRoadmapPage.jsx      # 4-Year milestone timelines & technology checklists
            ├── CodingPracticePage.jsx     # Multi-language exercises, hints & solutions
            ├── LearningResourcesPage.jsx  # Verified educational resource library
            ├── OpportunitiesHubPage.jsx   # Verified internships, hackathons & contests
            ├── TestsPracticePage.jsx      # Timed MCQ quizzes & past score history
            ├── ProjectPlacementPrepPage.jsx# Tiered projects, Interview Q&As & Placement Strategy
            ├── DashboardPage.jsx          # MySQL-backed personalized student dashboard
            └── ProfilePage.jsx            # Account settings & target career editor
```

---

## ⚡ Prerequisites & Setup Instructions

### 1. Prerequisites
* **Node.js** v18.0.0 or higher (`node -v`)
* **npm** v9.0.0 or higher (`npm -v`)
* **MySQL Server** v8.0 or higher running locally on port `3306`

---

### 2. Environment Variables Configuration (Safe Setup)

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Copy the sample environment file to create your active configuration:
   ```bash
   cp .env.example .env
   ```
   *(On Windows Command Prompt: `copy .env.example .env`)*
3. Open `backend/.env` in your editor and configure your local MySQL credentials:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MySQL Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_actual_mysql_password
   DB_NAME=studentverse_db
   DB_PORT=3306

   # JWT Authentication
   JWT_SECRET=your_custom_secure_jwt_secret_key_here
   JWT_EXPIRES_IN=7d

   # Frontend Client URL (for CORS)
   CLIENT_URL=http://localhost:5173
   ```
> **Security Note:** Real passwords and secrets are strictly excluded from version control via `.gitignore`. Never commit `.env` to Git.

---

### 3. MySQL Database Setup

1. Verify your MySQL service is running:
   ```bash
   # Windows PowerShell (if running as a Windows service)
   Get-Service MySQL*
   ```
2. Execute the schema migration and data seeding script:
   ```bash
   cd backend
   node src/setupDb.js
   ```
   *Alternatively, import `backend/database/schema.sql` followed by `backend/database/seed.sql` inside MySQL Workbench or the `mysql` CLI.*

---

### 4. Running the Application

Open two terminal windows:

#### Terminal 1: Backend Server
```bash
cd backend
npm install
npm start
```
* Backend runs at: `http://localhost:5000`
* Health check: `http://localhost:5000/api/health`

#### Terminal 2: Frontend Client
```bash
cd frontend
npm install
npm run dev
```
* Frontend runs at: `http://localhost:5173`

---

## 📡 REST API Overview

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | System status and database connectivity check |
| `POST` | `/api/auth/register` | Public | Registers a new student profile in MySQL |
| `POST` | `/api/auth/login` | Public | Verifies bcrypt hash and issues JWT token |
| `GET` | `/api/branches` | Public | Lists all 8 supported B.Tech engineering branches |
| `GET` | `/api/careers` | Public | Lists all 13 supported career tracks |
| `GET` | `/api/careers/:slug` | Public | Retrieves 4-year milestone roadmap for a career |
| `POST` | `/api/careers/evaluate-interests`| Public | Evaluates 8 interest dimensions with weighted ranking |
| `GET` | `/api/dashboard/summary` | Protected | Aggregates progress percentage, completed topics, and next step |
| `GET` | `/api/dashboard/coding-practice` | Public | Returns 15 structured multi-language coding exercises |
| `GET` | `/api/dashboard/prep-materials` | Public | Returns tiered project blueprints, 17 interview Q&As, and resume rules |
| `POST` | `/api/progress/toggle-topic` | Protected | Toggles completion status of a roadmap topic in MySQL |
| `POST` | `/api/progress/set-career` | Protected | Updates student's selected target career path |
| `GET` | `/api/resources` | Public | Search and filter curated learning resources |
| `POST` | `/api/resources/toggle-save` | Protected | Bookmarks or unbookmarks a learning resource in MySQL |
| `GET` | `/api/opportunities` | Public | Lists verified internships, hackathons, and scholarships |
| `POST` | `/api/opportunities` | Public | Submits a new opportunity listing to MySQL |
| `GET` | `/api/quizzes` | Public | Retrieves practice MCQs by category |
| `POST` | `/api/quizzes/submit` | Protected | Scores an MCQ quiz attempt and records history in MySQL |

---

## 🔐 Authentication & Progress Persistence

1. **Authentication Flow:**
   * When registering or logging in, the backend hashes passwords using `bcryptjs` (salt rounds: 10).
   * Upon successful credential verification, a JSON Web Token (JWT) is signed containing `{ id, email, branch }`.
   * The client stores the JWT in `localStorage` and automatically attaches it as an `Authorization: Bearer <token>` header for protected requests.

2. **Progress Persistence Flow:**
   * Student milestone completions are stored in the MySQL relational table `student_progress (student_id, topic_id, completed, completed_at)`.
   * When a student clicks "Mark as Completed" inside any roadmap milestone, an authenticated `POST /api/progress/toggle-topic` updates the database.
   * The `GET /api/dashboard/summary` endpoint computes the percentage of completed topics relative to the student's target career in real time. Progress persists across browser restarts and device logins.

---

## 🧪 Testing & Validation

### Automated End-to-End Validation
An automated test script is provided in the repository to validate all core student flows:
```bash
node scratch/test_e2e.js
```
**Test Coverage (16/16 Passed):**
* Backend health check verification
* 8 B.Tech branches retrieval
* 13 career tracks integrity check
* Full-stack roadmap milestone loading (16 milestones across 4 years)
* 8-dimension interest assessment evaluation and ranking
* Coding Practice API exercises retrieval (15 exercises)
* Tiered project ideas and 17 interview Q&As retrieval
* Learning resource library retrieval
* Opportunities Hub listings retrieval
* Student registration in MySQL
* Student login with bcrypt hash verification
* Protected dashboard summary with JWT authentication
* Target career setting in MySQL
* Milestone progress toggling in MySQL
* Real-time dashboard progress recalculation

### Frontend Production Build Validation
```bash
cd frontend
npm run build
```
* Compiles all JSX components and bundles CSS with zero errors (built in ~1.18s).

---

## ⚠️ Current Limitations & Future Roadmap

### Current Limitations:
* **Opportunity Listings:** Listings are maintained via a curated directory with verified official application links rather than an automated live web crawler.
* **Coding Practice Execution:** The platform provides problem statements, test cases, hints, and copyable solutions. For in-depth online code execution with hidden test cases, direct integration links to LeetCode and HackerRank are provided.
* **No Job Application Tracker / Assignment Portal:** Omitted during this phase to prioritize core B.Tech guidance, roadmaps, coding practice, and placement preparation.

### Future Improvements:
* **Interactive Code Runner:** Sandboxed in-browser code execution engine for C++, Python, and Java drills.
* **Alumni Mentorship Network:** Peer connection portal connecting senior students and alumni working in industry.
* **Automated ATS Resume Scanner:** File-upload parser analyzing undergraduate resumes against keyword criteria.

---

## 👥 Team Contributions

| Team Member | Role | Key Contributions |
|---|---|---|
| **Member 1 (Suchirmai Rudrakota)** | Full-Stack Lead & Architecture | System architecture, MySQL database design, REST API controllers, Authentication, Career Roadmaps, and Coding Practice module. |
| **Member 2 [Placeholder]** | Frontend Developer | UI/UX responsive design, Branch Explorer, Milestone modals, and Opportunities Hub interface. |
| **Member 3 [Placeholder]** | Content & QA Engineer | Curating 15 coding exercises, 17 interview Q&As, tiered project specifications, and end-to-end integration testing. |

---

## 📸 Screenshots

*(Screenshots can be placed in a `./screenshots/` folder within the repository)*

| Screen | Description | Placeholder |
|---|---|---|
| **Landing Page** | Hero banner, platform statistics, and 4-step B.Tech blueprint | `![Landing Page](./screenshots/home_page.png)` |
| **Branch Explorer** | Detailed 8-branch navigation with 4-year learning orders | `![Branch Explorer](./screenshots/branch_explorer.png)` |
| **Career Roadmaps** | 4-year milestone timeline with technology subtopic breakdowns | `![Roadmaps](./screenshots/career_roadmap.png)` |
| **Coding Practice** | Multi-language coding drills with hints and solutions | `![Coding Practice](./screenshots/coding_practice.png)` |
| **Placement Hub** | Tiered projects, technical interview Q&A filters, and resume guide | `![Placement Hub](./screenshots/placement_prep.png)` |
| **Student Dashboard** | Personalized student metrics, milestone progress, and recommendations | `![Dashboard](./screenshots/dashboard.png)` |

---

## 📜 License & Acknowledgments

This project is built for B.Tech academic evaluation and project demonstration.
Special thanks to educational open-source platforms including MDN Web Docs, Java Dev, Python Software Foundation, React Docs, and Harvard CS50 for verified curriculum standards.
