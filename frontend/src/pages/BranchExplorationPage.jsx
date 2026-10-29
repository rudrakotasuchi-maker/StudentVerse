import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import {
  Compass,
  BookOpen,
  Briefcase,
  Award,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  CheckCircle,
  HelpCircle,
  Sparkles,
  GraduationCap,
  Hammer,
  Globe2,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Project readiness suggestions mapped by career slug
const readinessProjects = {
  'software-engineering': 'Distributed Task Scheduler or In-Memory Key-Value Cache with concurrent lock handling in C++/Go/Java.',
  'full-stack-developer': 'Production E-Commerce Platform with React UI, Express REST API, MySQL transactions, and JWT authentication.',
  'ai-machine-learning': 'Deep Learning Medical Image Classifier with Grad-CAM heatmaps or an End-to-End RAG LLM Documentation Assistant.',
  'data-analytics': 'Interactive Executive Sales & Churn Analytics Dashboard in Power BI with complex SQL CTE cohort queries.',
  'data-scientist': 'Customer Churn Predictive Pipeline with SHAP model explainability and containerized FastAPI model serving.',
  'cybersecurity': 'Vulnerability Assessment Audit of a complex web app with Burp Suite, plus custom Python port scanning tools.',
  'cloud-devops': 'Multi-Environment AWS Infrastructure provisioned via Terraform with GitHub Actions CI/CD and ArgoCD GitOps.',
  'embedded-systems-vlsi': 'Bare-metal STM32 FreeRTOS sensor hub with SPI/I2C drivers, or a synthesizable 5-stage RISC-V core in Verilog.',
  'electrical-smart-grid': 'Closed-loop Field-Oriented Control (FOC) PMSM motor drive in Simulink, and a 10 kW grid-tied solar MPPT inverter.',
  'mechanical-design-robotics': 'Complete 3D CAD design and ANSYS FEA stress verification of a 6-DOF robotic arm or autonomous mobile robot (AMR).',
  'civil-structural-bim': 'Structural seismic analysis of a G+10 framed building in ETABS with ductile reinforcement detailing and 4D Revit BIM schedule.',
  'gate-higher-studies': 'Systematic 100% syllabus mastery binder, 20-year solved PYQs, and high-percentile national mock exam attempts.',
  'civil-services-govt-exams': 'Structured General Studies issue dossiers, ESE conventional step-by-step papers, and administrative case study analyses.'
};

const careerGuidanceDetails = {
  'software-engineering': {
    whatDoes: 'Designs, writes, tests, and maintains scalable backend services, system software, databases, and microservices.',
    techToLearn: ['Java / C++ / Python', 'Data Structures & Algorithms', 'MySQL / PostgreSQL', 'Git & GitHub', 'Docker', 'Linux CLI'],
    learningOrder: '1. Programming Fundamentals -> 2. DSA & Core CS (OS/DBMS/Networks) -> 3. Backend APIs & Databases -> 4. System Design & Placements',
    exampleProjects: 'In-Memory Key-Value Store with TTL, Distributed Task Scheduler, URL Shortener Microservice',
    codingPractice: 'LeetCode 75 (Arrays, Hash Maps, Two Pointers, Trees, Graphs), HackerRank Problem Solving',
    interviewPrep: 'Master Time & Space complexity analysis, OOP pillars, database indexing, process vs thread, and clean code principles.',
    relatedOpps: 'Google Summer of Code, Amazon WOW, TCS CodeVita, Microsoft Learn Student Ambassador'
  },
  'full-stack-developer': {
    whatDoes: 'Constructs complete end-to-end web applications, from responsive user interfaces to cloud-connected REST APIs and databases.',
    techToLearn: ['HTML5, CSS3, Modern JavaScript (ES6+)', 'React.js', 'Node.js & Express.js', 'MySQL / MongoDB', 'REST APIs', 'Cloud Deployment (Vercel/AWS)'],
    learningOrder: '1. Semantic Web & Modern JS -> 2. Frontend Frameworks (React) -> 3. Backend APIs & Databases (Express, MySQL) -> 4. Full-Stack Integration & Cloud Deployment',
    exampleProjects: 'E-Commerce Platform with Cart & Checkout, Campus Placement & Roadmap Tracker (StudentVerse), Real-Time Chat Application',
    codingPractice: 'JavaScript algorithms (Debounce, Throttle, Closures), DOM Manipulation exercises, CRUD API integration tasks',
    interviewPrep: 'Explain Virtual DOM, React Hooks lifecycle, Event Loop microtasks vs macrotasks, CORS, and SQL transactions.',
    relatedOpps: 'Smart India Hackathon, MLH Global Hackathons, GitHub Campus Expert'
  },
  'ai-machine-learning': {
    whatDoes: 'Develops mathematical models, neural networks, computer vision algorithms, and predictive intelligence pipelines.',
    techToLearn: ['Python', 'NumPy, Pandas, Scikit-Learn', 'PyTorch / TensorFlow', 'Mathematics (Linear Algebra, Calculus, Probability)', 'FastAPI Model Serving', 'Docker'],
    learningOrder: '1. Python & Applied Mathematics -> 2. Exploratory Data Analysis & Scikit-Learn -> 3. Deep Learning & Computer Vision/NLP -> 4. MLOps & Production Model Serving',
    exampleProjects: 'Medical Image Classifier with Grad-CAM Explainability, Sentiment Analysis Pipeline, End-to-End RAG LLM Documentation Assistant',
    codingPractice: 'Matrix operations in NumPy, implementing gradient descent from scratch, Kaggle competition challenges',
    interviewPrep: 'Bias-Variance tradeoff, Precision vs Recall, Overfitting mitigation (Regularization/Dropout), Gradient Descent mechanics.',
    relatedOpps: 'Kaggle Competitions, DRDO Research Internship, Google Summer of Code (AI orgs)'
  },
  'data-analytics': {
    whatDoes: 'Cleans, transforms, and analyzes complex business datasets to build executive dashboards and drive data-backed strategic decisions.',
    techToLearn: ['SQL (Advanced Joins, Window Functions, CTEs)', 'Advanced Excel (Power Query, VLOOKUP)', 'Power BI / Tableau', 'Python for Data Analysis (Pandas, Seaborn)'],
    learningOrder: '1. Advanced Excel & Business Metrics -> 2. SQL Query Mastery & Relational Schemas -> 3. BI Visualization (Power BI/Tableau) -> 4. Python Data Wrangling',
    exampleProjects: 'E-Commerce Churn & Cohort Retention Dashboard, Global Supply Chain Logistics Monitor, Financial KPI Tracker',
    codingPractice: 'SQL LeetCode/HackerRank 50 (Aggregations, Window Functions, Joins, Group By)',
    interviewPrep: 'Explain differences between WHERE and HAVING, Window Functions vs GROUP BY, Star vs Snowflake schemas, and KPI storytelling.',
    relatedOpps: 'Google Data Analytics Certificate, Flipkart GRiD, Corporate BI internships'
  },
  'data-scientist': {
    whatDoes: 'Conducts statistical hypothesis tests, discovers non-obvious data correlations, and builds predictive machine learning simulations on big data.',
    techToLearn: ['Python / R', 'Inferential Statistics & Probability', 'Feature Engineering', 'Supervised & Unsupervised ML', 'Big Data (Apache Spark)', 'Streamlit'],
    learningOrder: '1. Statistics & Probability -> 2. Feature Engineering & Exploratory Analysis -> 3. Machine Learning Algorithms -> 4. Big Data & Model Validation',
    exampleProjects: 'Credit Card Fraud Detection Engine, Customer Lifetime Value Predictor, Algorithmic Trading Simulation',
    codingPractice: 'Statistical modeling scripts, Pandas data wrangling exercises, algorithmic model evaluation metrics',
    interviewPrep: 'Central Limit Theorem, p-values and A/B test design, Confusion Matrix metrics, ROC-AUC curve interpretation.',
    relatedOpps: 'ISRO Data Science Internship, Kaggle Competitions, Open-source data science tools'
  },
  'cybersecurity': {
    whatDoes: 'Protects enterprise networks, performs penetration testing and vulnerability scans, and responds to digital security incidents.',
    techToLearn: ['Computer Networking (TCP/IP, OSI, DNS)', 'Linux Internals & Bash Scripting', 'Burp Suite & OWASP Top 10', 'Wireshark Packet Analysis', 'Python Security Scripting', 'Cryptography'],
    learningOrder: '1. Networking Protocols & Linux -> 2. Web Application Security (OWASP) -> 3. Penetration Testing & Tools (Burp/Wireshark) -> 4. SIEM & Defensive Operations',
    exampleProjects: 'Vulnerability Assessment of a Web Application, Custom Port Scanner in Python, Network Packet Sniffer',
    codingPractice: 'Bash automation scripts, Python socket programming, solving TryHackMe / HackTheBox capture-the-flag (CTF) rooms',
    interviewPrep: 'Explain TCP 3-way handshake, SQL injection prevention, XSS vs CSRF, public key cryptography, and firewall architectures.',
    relatedOpps: 'National Cyber Security Hackathons, DRDO Cyber Internship, CompTIA Security+ prep'
  },
  'cloud-devops': {
    whatDoes: 'Automates software build and release pipelines, provisions scalable cloud infrastructure, and ensures 99.99% system availability.',
    techToLearn: ['Linux Administration', 'Docker & Containerization', 'Kubernetes', 'CI/CD (GitHub Actions / Jenkins)', 'AWS / Azure / GCP', 'Terraform (IaC)', 'Prometheus & Grafana'],
    learningOrder: '1. Linux & Git Discipline -> 2. Containerization (Docker) -> 3. Cloud Fundamentals (AWS/Azure) & CI/CD -> 4. Kubernetes Orchestration & Terraform',
    exampleProjects: 'Automated Multi-Environment CI/CD Pipeline on AWS, Containerized Microservice Cluster with Kubernetes, Infrastructure as Code with Terraform',
    codingPractice: 'Shell scripting for log parsing, writing Dockerfiles and multi-stage builds, writing GitHub Actions workflow YAMLs',
    interviewPrep: 'Differences between containers and VMs, Blue-Green vs Canary deployments, Kubernetes Pod lifecycle, and disaster recovery strategies.',
    relatedOpps: 'AWS Student Community Days, CNCF Mentorships, Cloud certification challenges'
  },
  'embedded-systems-vlsi': {
    whatDoes: 'Designs semiconductor chips, microcontrollers, embedded firmware, IoT sensor networks, and hardware circuits.',
    techToLearn: ['Embedded C / C++', 'Microcontrollers (STM32 / ESP32 / Arduino)', 'Verilog / VHDL & FPGA Synthesis', 'I2C, SPI, UART Protocols', 'FreeRTOS', 'KiCAD PCB Design'],
    learningOrder: '1. C Programming & Digital Logic -> 2. Microcontroller Hardware & Bare-Metal Programming -> 3. Communication Protocols & RTOS -> 4. Verilog RTL Synthesis & PCB Layout',
    exampleProjects: 'Smart Health Monitoring IoT Hub with FreeRTOS, Bare-Metal STM32 Weather Station, 5-Stage Pipelined RISC-V CPU in Verilog',
    codingPractice: 'Bitwise operations in C, writing peripheral drivers (ADC, Timer, PWM), hardware state machines in Verilog',
    interviewPrep: 'Volatile keyword in C, interrupt service routine (ISR) constraints, setup and hold time violations in VLSI, SPI vs I2C trade-offs.',
    relatedOpps: 'ISRO / DRDO Student Research Schemes, Texas Instruments Innovation Challenge, Cadence Design Contests'
  },
  'electrical-smart-grid': {
    whatDoes: 'Engineers electric vehicle powertrains, high-voltage battery management systems, renewable solar/wind grids, and power electronics.',
    techToLearn: ['MATLAB & Simulink', 'Power Electronics (Inverters, DC-DC Converters)', 'Battery Management Systems (BMS)', 'Motor Drives & FOC Control', 'Smart Grid SCADA', 'Electrical Machines'],
    learningOrder: '1. Circuit Theory & Electrical Machines -> 2. Power Electronics & Simulation -> 3. EV Powertrains & Battery Chemistry -> 4. Smart Grids & Industrial Automation',
    exampleProjects: 'Simulink Closed-Loop Motor Drive with FOC, 10 kW Grid-Tied Solar MPPT Inverter, Li-Ion Battery State of Charge (SOC) Estimator',
    codingPractice: 'Simulink modeling algorithms, MATLAB numerical scripts for transient power flow analysis',
    interviewPrep: 'Buck-Boost converter working, Space Vector PWM, regenerative braking mechanics, and grid synchronization criteria.',
    relatedOpps: 'Schneider Electric Go Green, NTPC / BHEL Engineering Trainee, Renewable energy student initiatives'
  },
  'mechanical-design-robotics': {
    whatDoes: 'Designs mechanical machinery, autonomous robotic assemblies, 3D CAD mechanisms, and conducts finite element structural/thermal simulations.',
    techToLearn: ['SOLIDWORKS / Autodesk Fusion 360', 'ANSYS Mechanical (FEA & CFD)', 'ROS (Robot Operating System)', 'Python for Robotics', 'GD&T Standards', 'Additive Manufacturing (3D Printing)'],
    learningOrder: '1. Engineering Graphics & Mechanics -> 2. 3D Parametric CAD Modeling -> 3. FEA Stress & Thermal Analysis -> 4. Robotics Kinematics & Autonomous Control',
    exampleProjects: '6-DOF Robotic Arm with Inverse Kinematics, Autonomous Mobile Robot (AMR) with LiDAR SLAM, Drone Frame Weight Optimization with FEA',
    codingPractice: 'Python kinematics solvers, OpenSCAD procedural modeling scripts, ROS navigation configuration',
    interviewPrep: 'Stress-strain diagrams, Mohr circle derivations, Degrees of Freedom in linkages, and DFMA (Design for Manufacturing and Assembly) rules.',
    relatedOpps: 'RoboCon India, SAE BAJA / Formula Bharat student competitions, ISRO propulsion projects'
  },
  'civil-structural-bim': {
    whatDoes: 'Plans sustainable urban infrastructure, executes seismic load calculations for buildings and bridges, and manages 3D/4D Building Information Modeling.',
    techToLearn: ['AutoCAD & Revit BIM', 'ETABS / STAAD.Pro', 'Structural RCC & Steel Design', 'Geotechnical Mechanics', 'Primavera P6 / MS Project', 'GIS Mapping'],
    learningOrder: '1. Surveying & Building Materials -> 2. Structural Analysis & CAD Drawings -> 3. Seismic Analysis in ETABS -> 4. 4D BIM Scheduling & Project Management',
    exampleProjects: 'G+10 Framed Building Seismic Load Analysis in ETABS, 4D Revit BIM Construction Schedule, Green Building Rainwater Harvesting Design',
    codingPractice: 'Computational matrix stiffness scripts in Python, Excel macro sheets for RCC beam reinforcement calculation',
    interviewPrep: 'Explain shear force vs bending moment, limit state vs working stress method, ductile detailing as per IS 13920, and BIM LOD levels.',
    relatedOpps: 'Smart Cities Mission projects, Larsen & Toubro Build India Scholarship, CPWD / NHAI traineeships'
  },
  'gate-higher-studies': {
    whatDoes: 'Masters core undergraduate engineering syllabus deeply to secure top All India Ranks in GATE for admissions to IITs, IISc, or direct PSU recruitment.',
    techToLearn: ['Engineering Mathematics & Discrete Math', 'General Aptitude & Verbal Ability', 'Branch-Specific Core Subjects (Complete Syllabus)', 'Previous Year Questions (PYQs 2000-2026)', 'National Mock Test Series'],
    learningOrder: '1. Engineering Math & 1st Core Subject -> 2. Branch Major Subjects & Notes Synthesis -> 3. Solved PYQ Compilation -> 4. Timed Full-Length Mock Exams & Revision',
    exampleProjects: 'Comprehensive 100% Core Syllabus Formula Binder, 20-Year Solved GATE Question Bank with Error Log',
    codingPractice: 'Solving high-rigor numerical problems within 3-minute timed constraints without graphical calculator',
    interviewPrep: 'Direct academic derivations, fundamental textbook theorem proofs, and engineering research proposal defense.',
    relatedOpps: 'IISc / IIT Summer Research Fellowships, PSU Recruitment Drives (IOCL, NTPC, ONGC, BHEL, BARC)'
  },
  'civil-services-govt-exams': {
    whatDoes: 'Prepares for administrative leadership in government public works, railways, defence production, and state engineering departments.',
    techToLearn: ['General Studies (Polity, Economy, Geography, History)', 'Indian Constitution & Public Policy', 'Current Affairs & Editorials', 'Engineering Aptitude & Ethics', 'ESE Conventional Subject Papers'],
    learningOrder: '1. NCERT Fundamentals & General Studies -> 2. Core Technical Syllabus for ESE/State PSC -> 3. Essay & Conventional Answer Writing -> 4. Mock Interviews & Personality Development',
    exampleProjects: 'Socio-Economic Infrastructure Policy Analysis Dossier, Public Works Budget Allocation Simulation',
    codingPractice: 'Logical reasoning speed drills, data interpretation sets, and structured answer writing in under 7 minutes',
    interviewPrep: 'Administrative case study solutions, ethics dilemmas, situational crisis management, and current national events.',
    relatedOpps: 'UPSC Civil Services, Indian Engineering Services (ESE), State Public Service Commissions (PSC), RRB Senior Section Engineer'
  }
};

export default function BranchExplorationPage() {
  const { student, updateStudentProfile } = useAuth();
  const [branches, setBranches] = useState([]);
  const [activeCode, setActiveCode] = useState('CSE');
  const [branchDetail, setBranchDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState('');
  const [showOtherCareers, setShowOtherCareers] = useState(false);

  // Set default active branch to student's registered branch if available
  useEffect(() => {
    if (student?.branch) {
      const codeMap = {
        'CSE': 'CSE',
        'AI&DS': 'AI&DS',
        'AI&ML': 'AI&ML',
        'IT': 'IT',
        'ECE': 'ECE',
        'EEE': 'EEE',
        'Mechanical Engineering': 'Mechanical Engineering',
        'Civil Engineering': 'Civil Engineering'
      };
      if (codeMap[student.branch]) {
        setActiveCode(student.branch);
      }
    }
  }, [student]);

  // Fetch branches list
  useEffect(() => {
    async function loadBranches() {
      try {
        const res = await api.get('/branches');
        if (res.success && res.branches) {
          setBranches(res.branches);
        }
      } catch (err) {
        console.error('Failed to load branches:', err);
      }
    }
    loadBranches();
  }, []);

  // Fetch branch detail whenever activeCode changes
  useEffect(() => {
    async function loadBranchDetail() {
      try {
        setIsLoading(true);
        const res = await api.get(`/branches/${encodeURIComponent(activeCode)}`);
        if (res.success && res.branch) {
          setBranchDetail(res.branch);
        }
      } catch (err) {
        console.error('Failed to load branch detail:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadBranchDetail();
  }, [activeCode]);

  const handleSetMyBranch = async () => {
    if (!student) return;
    try {
      setIsUpdating(true);
      await updateStudentProfile({ branch: activeCode });
      setUpdateMsg(`Updated your active student profile branch to ${activeCode}!`);
      setTimeout(() => setUpdateMsg(''), 4000);
    } catch (e) {
      setUpdateMsg('Could not update profile branch.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="branch-page">
      {/* Page Header */}
      <section className="page-header-banner">
        <div className="container">
          <span className="badge badge-primary">BRANCH EXPLORATION & CAREER DISCOVERY</span>
          <h1 className="page-header-title">Explore Engineering Disciplines & Industry Career Pathways</h1>
          <p className="page-header-subtitle">
            Discover real-world career roles, professional day-to-day responsibilities, required skills, and 4-year learning roadmaps for every branch—separated from standard university coursework.
          </p>
        </div>
      </section>

      <div className="container section-padding">
        {updateMsg && (
          <div className="alert alert-success" role="alert" style={{ marginBottom: '1.5rem' }}>
            <CheckCircle size={20} />
            <div>{updateMsg}</div>
          </div>
        )}

        {/* Branch Selector Tabs */}
        <div className="branch-selector-tabs" role="tablist">
          {branches.map((b) => {
            const isActive = activeCode === b.code;
            const isUserBranch = student?.branch === b.code;
            return (
              <button
                key={b.code}
                role="tab"
                aria-selected={isActive}
                className={`branch-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveCode(b.code);
                  setShowOtherCareers(false);
                }}
              >
                <span className="tab-code">{b.code}</span>
                {isUserBranch && <span className="tab-indicator">Your Branch</span>}
              </button>
            );
          })}
        </div>

        {/* Branch Content Container */}
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading comprehensive branch guidance & career pathways...</p>
          </div>
        ) : branchDetail ? (
          <div className="branch-detail-container">
            {/* Main Overview Card */}
            <div className="card branch-hero-card">
              <div className="branch-hero-header">
                <div>
                  <span className="badge badge-secondary">{branchDetail.code} Department</span>
                  <h2 className="branch-name">{branchDetail.name}</h2>
                  <p className="branch-tagline-text">{branchDetail.tagline}</p>
                </div>
                {student && student.branch !== activeCode && (
                  <button
                    onClick={handleSetMyBranch}
                    disabled={isUpdating}
                    className="btn btn-outline"
                    title="Change your registered branch to this branch"
                  >
                    <CheckCircle size={16} />
                    <span>Switch My Profile to {branchDetail.code}</span>
                  </button>
                )}
              </div>
            </div>

            {/* ========================================================= */}
            {/* PROMINENT SECTION 1: INDUSTRY CAREER PATHWAYS FOR THIS BRANCH */}
            {/* ========================================================= */}
            <div className="card" style={{ marginTop: '1.5rem', border: '1px solid var(--border-medium)' }}>
              <div className="card-section-title" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                <Briefcase size={26} className="text-primary" />
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                    Industry Career Pathways for {branchDetail.code} Students
                  </h3>
                  <p className="text-muted" style={{ fontSize: '0.92rem', marginTop: '0.25rem' }}>
                    Explore where {branchDetail.code} graduates work in industry. Review professional duties, entry-level roles, skills, and 4-year roadmaps before choosing your specialization:
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {branchDetail.matching_careers && branchDetail.matching_careers.map((career) => {
                  const skillsList = career.key_skills ? career.key_skills.split(',').map(s => s.trim()) : [];
                  const readinessProject = readinessProjects[career.slug] || 'Comprehensive capstone demonstration with documented GitHub code and architecture schematics.';
                  const guide = careerGuidanceDetails[career.slug] || {};

                  return (
                    <div
                      key={career.id}
                      className="career-summary-card card"
                      style={{
                        padding: '1.75rem',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      {/* Top Badges */}
                      <div className="career-card-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                          <span className="badge badge-primary">{career.category}</span>
                          <span className="badge badge-info">Affinity: {career.branch_affinity?.includes(branchDetail.code) ? 'Direct Core Pathway' : 'Allied Pathway'}</span>
                        </div>
                        <span className="salary-badge" style={{ fontWeight: 700, color: 'var(--primary)', background: 'var(--primary-light)', padding: '0.25rem 0.75rem', borderRadius: '1rem' }}>
                          Avg Package: {career.avg_package_range}
                        </span>
                      </div>

                      {/* Career Title & Short Description */}
                      <h4 className="career-card-title" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                        {career.title}
                      </h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                        {career.short_description}
                      </p>

                      {/* 1. What Professionals In This Career Actually Do */}
                      <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', borderLeft: '4px solid var(--primary)' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Compass size={16} />
                          <span>1. What Professionals In This Career Actually Do</span>
                        </div>
                        <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.5, margin: 0 }}>
                          {guide.whatDoes || career.full_overview}
                        </p>
                      </div>

                      {/* 2. Technologies to Learn & Skills Required */}
                      <div style={{ marginBottom: '1.25rem' }}>
                        <strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                          2. Key Technologies to Learn & Core Skills:
                        </strong>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                          {(guide.techToLearn || skillsList).map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              style={{
                                fontSize: '0.82rem',
                                padding: '0.25rem 0.65rem',
                                borderRadius: '4px',
                                background: 'var(--border-light)',
                                color: 'var(--text-main)',
                                fontWeight: 600
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 3. Recommended Learning Order */}
                      {guide.learningOrder && (
                        <div style={{ marginBottom: '1.25rem', background: 'var(--bg-main)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}>
                          <strong style={{ fontSize: '0.85rem', color: 'var(--primary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                            3. Recommended Learning Order Across B.Tech:
                          </strong>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', margin: 0, fontWeight: 500 }}>
                            {guide.learningOrder}
                          </p>
                        </div>
                      )}

                      {/* 4. Example Projects & Relevant Coding Practice */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                        <div style={{ background: 'rgba(79, 70, 229, 0.05)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                            <Hammer size={16} />
                            <span>4. Example Practical Projects:</span>
                          </div>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', margin: 0 }}>
                            {guide.exampleProjects || readinessProject}
                          </p>
                        </div>

                        <div style={{ background: 'rgba(16, 185, 129, 0.06)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                            <TrendingUp size={16} />
                            <span>5. Relevant Coding Practice:</span>
                          </div>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', margin: 0 }}>
                            {guide.codingPractice || 'Data Structures & Algorithms problem solving on LeetCode/HackerRank.'}
                          </p>
                        </div>
                      </div>

                      {/* 5. Interview Prep & Related Opportunities */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                        <div style={{ background: 'var(--bg-main)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                          <strong style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                            6. Interview Preparation Focus:
                          </strong>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', margin: 0 }}>
                            {guide.interviewPrep || 'Core CS fundamentals, algorithmic complexity analysis, and system architecture.'}
                          </p>
                        </div>

                        <div style={{ background: 'var(--bg-main)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                          <strong style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                            7. Related Opportunities & Programs:
                          </strong>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', margin: 0 }}>
                            {guide.relatedOpps || 'Summer internships, hackathons, and corporate developer challenges.'}
                          </p>
                        </div>
                      </div>

                      {/* Non-Branch Student Transition Reassurance */}
                      <div style={{ marginBottom: '1.25rem', padding: '0.75rem 1rem', background: 'rgba(245, 158, 11, 0.08)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #f59e0b' }}>
                        <strong style={{ fontSize: '0.82rem', color: '#b45309', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                          Cross-Branch Transition Pathway:
                        </strong>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', margin: 0 }}>
                          {career.prerequisites_non_branch || 'Your undergraduate branch does NOT restrict you from entering this career. Anyone can transition by mastering the core technical skills.'}
                        </p>
                      </div>

                      {/* Action: Link to Career-Specific 4-Year Roadmap */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <Link to="/coding-practice" className="btn btn-outline" style={{ padding: '0.6rem 1.1rem' }}>
                          <span>Practice Relevant Coding</span>
                        </Link>
                        <Link to={`/career-roadmap/${career.slug}`} className="btn btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
                          <span>Explore 4-Year Roadmap</span>
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ========================================================= */}
            {/* PROMINENT SECTION 2: CROSS-BRANCH CAREER EXPLORATION */}
            {/* ========================================================= */}
            {branchDetail.other_careers && branchDetail.other_careers.length > 0 && (
              <div className="card" style={{ marginTop: '1.5rem', border: '1px dashed var(--border-medium)' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                  onClick={() => setShowOtherCareers(!showOtherCareers)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Globe2 size={24} className="text-secondary" />
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
                        Cross-Branch Career Exploration ({branchDetail.other_careers.length} Pathways Outside {branchDetail.code})
                      </h3>
                      <p className="text-muted" style={{ fontSize: '0.88rem', margin: 0 }}>
                        Interested in switching or broadening your scope? Explore how {branchDetail.code} students can enter other technical fields.
                      </p>
                    </div>
                  </div>
                  <button className="btn btn-sm btn-outline">
                    {showOtherCareers ? (
                      <>
                        <span>Hide Pathways</span>
                        <ChevronUp size={16} />
                      </>
                    ) : (
                      <>
                        <span>Explore Cross-Branch Careers</span>
                        <ChevronDown size={16} />
                      </>
                    )}
                  </button>
                </div>

                {showOtherCareers && (
                  <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="alert alert-info" style={{ marginBottom: '0.5rem' }}>
                      <HelpCircle size={18} />
                      <span>
                        Students are <strong>not forced to choose a career now</strong>. You can freely explore any engineering path and prepare the bridge skills outlined below.
                      </span>
                    </div>

                    <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                      {branchDetail.other_careers.map((career) => (
                        <div
                          key={career.id}
                          className="card"
                          style={{
                            padding: '1.25rem',
                            border: '1px solid var(--border-light)',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                              <span className="badge badge-neutral">{career.category}</span>
                              <span className="salary-badge" style={{ fontSize: '0.8rem' }}>{career.avg_package_range}</span>
                            </div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{career.title}</h4>
                            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                              {career.short_description}
                            </p>
                            <div style={{ background: 'var(--bg-main)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem' }}>
                              <strong style={{ fontSize: '0.8rem', color: 'var(--primary)', display: 'block', marginBottom: '0.2rem' }}>
                                Additional Skills You Need to Transition:
                              </strong>
                              <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', margin: 0 }}>
                                {career.prerequisites_non_branch || 'Requires self-paced core foundations.'}
                              </p>
                            </div>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
                            <Link to={`/career-roadmap/${career.slug}`} className="btn btn-sm btn-outline">
                              <span>View 4-Year Roadmap</span>
                              <ArrowRight size={14} />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* SEPARATE SECTION 3: BRANCH CURRICULUM (ACADEMIC SUBJECTS) */}
            {/* ========================================================= */}
            <div style={{ marginTop: '2rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <span className="badge badge-secondary" style={{ marginBottom: '0.25rem' }}>ACADEMIC FOUNDATIONS</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                  Branch Academic Curriculum (University Coursework & Degree Requirements)
                </h3>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                  These are the mandatory university semester subjects and recommended credentials for the {branchDetail.code} degree:
                </p>
              </div>

              {/* Two Column Layout: Subjects & Certifications */}
              <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
                <div className="card">
                  <div className="card-section-title" style={{ marginBottom: '0.75rem' }}>
                    <BookOpen size={20} className="text-primary" />
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Core University Subjects</h4>
                  </div>
                  <p className="text-muted" style={{ fontSize: '0.88rem', marginBottom: '1rem' }}>
                    University semester subjects studied across all 4 years:
                  </p>
                  <ul className="subject-list">
                    {branchDetail.core_subjects.map((sub, i) => (
                      <li key={i} className="subject-item">
                        <span className="subject-bullet"></span>
                        <span style={{ fontWeight: 600 }}>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card">
                  <div className="card-section-title" style={{ marginBottom: '0.75rem' }}>
                    <Award size={20} className="text-secondary" />
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recommended Industry Certifications</h4>
                  </div>
                  <p className="text-muted" style={{ fontSize: '0.88rem', marginBottom: '1rem' }}>
                    Recognized credentials that strengthen your campus placement resume:
                  </p>
                  <div className="cert-tags-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    {branchDetail.recommended_certifications.map((cert, i) => (
                      <div key={i} className="cert-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.75rem', background: 'var(--border-light)', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: 600 }}>
                        <Award size={15} className="text-secondary" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>

                  <div className="helper-callout" style={{ background: 'var(--bg-main)', padding: '0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <HelpCircle size={18} className="text-primary" />
                    <span style={{ fontSize: '0.88rem' }}>
                      Unsure whether {branchDetail.code} or an alternative path fits your goals? Take our transparent questionnaire.
                    </span>
                  </div>
                  <Link to="/interest-finder" className="btn btn-secondary btn-block" style={{ marginTop: '1rem' }}>
                    <TrendingUp size={18} />
                    <span>Take Interest Finder Assessment</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
