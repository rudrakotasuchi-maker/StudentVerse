// Predefined structured seed data for StudentVerse
// Comprehensive 4-Year B.Tech Career Guidance Dataset with verified resources

const careerPaths = [
  {
    id: 1,
    slug: 'software-engineering',
    title: 'Software Development & Engineering',
    category: 'Software & Tech',
    branch_affinity: 'CSE,AI&DS,AI&ML,IT,ECE,EEE,Mechanical Engineering,Civil Engineering',
    prerequisites_non_branch: 'Non-CSE/IT students need: 1. Programming fundamentals (C++ or Java), 2. Basic Data Structures & Algorithms, 3. Relational Database (SQL) concepts. No hardware background required.',
    short_description: 'Build enterprise-grade desktop, web, and distributed systems using modern programming stacks.',
    full_overview: 'Software Engineering focuses on designing, developing, testing, and maintaining software applications. From algorithms to resilient backend microservices and databases, this pathway is the cornerstone of the tech industry with high placement demand across all B.Tech branches.',
    key_skills: 'Data Structures & Algorithms, Java/C++/Python, Object-Oriented Design, System Design, SQL, Git & CI/CD',
    avg_package_range: '6 LPA - 28 LPA',
    roles: 'Software Development Engineer (SDE I/II), Backend Engineer, Application Developer, Systems Analyst',
    icon: 'Code'
  },
  {
    id: 2,
    slug: 'full-stack-developer',
    title: 'Full Stack Web & Cloud Developer',
    category: 'Software & Tech',
    branch_affinity: 'CSE,AI&DS,AI&ML,IT,ECE,EEE,Mechanical Engineering,Civil Engineering',
    prerequisites_non_branch: 'Accessible to all branches: Learn HTML5, CSS3, JavaScript (ES6+), and basic client-server HTTP communication.',
    short_description: 'Architect complete web applications from interactive user interfaces to cloud-backed REST APIs.',
    full_overview: 'Full Stack Developers bridge frontend user experiences with scalable backend services and databases. Highly valued in startups, product firms, and tech consultancies for rapid end-to-end prototyping.',
    key_skills: 'React.js, Node.js, Express.js, TypeScript, RESTful APIs, MySQL/PostgreSQL, Docker, AWS/Vercel',
    avg_package_range: '5.5 LPA - 24 LPA',
    roles: 'Full Stack Developer, Frontend Engineer, MERN/PERN Stack Specialist, Cloud App Developer',
    icon: 'Layers'
  },
  {
    id: 3,
    slug: 'ai-machine-learning',
    title: 'AI & Machine Learning Specialist',
    category: 'AI & Data',
    branch_affinity: 'AI&DS,AI&ML,CSE,IT,ECE',
    prerequisites_non_branch: 'Requires strong mathematical foundation: Linear Algebra (matrices), Probability & Statistics, Multivariable Calculus, and fluent Python programming.',
    short_description: 'Architect intelligent algorithms, neural networks, predictive models, and GenAI solutions.',
    full_overview: 'Artificial Intelligence and Machine Learning transform raw data into intelligent decision-making systems. Students in this track master linear algebra, statistical learning, deep learning frameworks, NLP, and computer vision to build state-of-the-art intelligent software.',
    key_skills: 'Python, NumPy, Pandas, Scikit-Learn, PyTorch/TensorFlow, Deep Learning, Mathematics & Probability, MLOps',
    avg_package_range: '8 LPA - 32 LPA',
    roles: 'ML Engineer, AI Research Associate, Computer Vision Specialist, NLP Engineer',
    icon: 'Cpu'
  },
  {
    id: 4,
    slug: 'data-analytics',
    title: 'Data Analytics & Business Intelligence',
    category: 'AI & Data',
    branch_affinity: 'CSE,AI&DS,AI&ML,IT,ECE,EEE,Mechanical Engineering,Civil Engineering',
    prerequisites_non_branch: 'Low technical barrier: Analytical thinking, Advanced Excel, basic SQL, and business curiosity. Highly recommended for students transitioning from core branches into analytics.',
    short_description: 'Transform complex business datasets into actionable insights, dashboards, and growth metrics.',
    full_overview: 'Data Analysts bridge the gap between technical metrics and strategic business decisions. By mastering SQL, data cleaning, statistical modeling, and visualization suites, students prepare for high-impact analytical roles across tech, finance, and consulting.',
    key_skills: 'SQL, Advanced Excel, Python/R, Power BI, Tableau, Statistical Modeling, Data Warehousing',
    avg_package_range: '5.5 LPA - 18 LPA',
    roles: 'Data Analyst, BI Developer, Product Analyst, Quantitative Associate',
    icon: 'BarChart3'
  },
  {
    id: 5,
    slug: 'data-scientist',
    title: 'Data Scientist & Predictive Modeler',
    category: 'AI & Data',
    branch_affinity: 'AI&DS,AI&ML,CSE,IT,ECE,EEE',
    prerequisites_non_branch: 'Rigorous probability, hypothesis testing, A/B experiment design, Python programming, and data wrangling.',
    short_description: 'Discover hidden patterns, build statistical simulations, and deploy machine learning models on big data.',
    full_overview: 'Data Scientists combine scientific experimentation, statistics, and machine learning algorithms to solve ambiguous problems, forecast churn, and build recommender engines.',
    key_skills: 'Python/R, Statistical Inference, Supervised/Unsupervised ML, Big Data (Spark), Feature Engineering, Storytelling',
    avg_package_range: '7.5 LPA - 30 LPA',
    roles: 'Data Scientist, Applied Scientist, Quantitative Strategist, Research Analyst',
    icon: 'TrendingUp'
  },
  {
    id: 6,
    slug: 'cybersecurity',
    title: 'Cybersecurity Analyst & Ethical Hacker',
    category: 'Software & Tech',
    branch_affinity: 'CSE,AI&DS,AI&ML,IT,ECE',
    prerequisites_non_branch: 'Requires solid Computer Networking (TCP/IP, OSI, DNS), Linux command-line fluency, and basic scripting in Python/Bash.',
    short_description: 'Protect network infrastructures, audit security vulnerabilities, and safeguard sensitive data.',
    full_overview: 'With the exponential rise in cyber threats, cybersecurity engineers specialize in defensive security, network packet analysis, cryptography, application penetration testing, and security compliance.',
    key_skills: 'Network Protocols, Linux Internals, Cryptography, Burp Suite, Wireshark, Python Scripting, SIEM',
    avg_package_range: '6 LPA - 22 LPA',
    roles: 'Security Analyst, Penetration Tester, Incident Responder, Cloud Security Associate',
    icon: 'ShieldCheck'
  },
  {
    id: 7,
    slug: 'cloud-devops',
    title: 'Cloud & DevOps Engineer',
    category: 'Software & Tech',
    branch_affinity: 'CSE,AI&DS,AI&ML,IT,ECE,EEE',
    prerequisites_non_branch: 'Linux system administration, basic shell scripting, networking concepts (VPC, CIDR, Load Balancing), and Git workflow.',
    short_description: 'Automate build pipelines, manage cloud infrastructure, and guarantee 99.99% system availability.',
    full_overview: 'Cloud and DevOps engineers bridge development with IT operations. They manage automated CI/CD pipelines, containerize microservices using Docker/Kubernetes, and provision cloud resources via Terraform.',
    key_skills: 'Linux, Docker, Kubernetes, CI/CD (GitHub Actions/Jenkins), AWS/Azure/GCP, Terraform, Monitoring (Prometheus/Grafana)',
    avg_package_range: '6.5 LPA - 26 LPA',
    roles: 'DevOps Engineer, Cloud Architect, Site Reliability Engineer (SRE), Platform Engineer',
    icon: 'Cloud'
  },
  {
    id: 8,
    slug: 'embedded-systems-vlsi',
    title: 'Embedded Systems & VLSI Design',
    category: 'Electronics & Hardware',
    branch_affinity: 'ECE,EEE',
    prerequisites_non_branch: 'Requires digital electronics, Boolean algebra, CMOS fundamentals, and microcontroller architecture.',
    short_description: 'Design semiconductors, integrated circuits, microcontrollers, and IoT hardware solutions.',
    full_overview: 'This pathway is tailored for electronics and electrical engineers interested in silicon chips, RTL design, FPGA synthesis, and microcontroller programming for automotive, consumer electronics, and defense.',
    key_skills: 'Embedded C, Verilog/VHDL, Microcontrollers (ARM/ESP32), Computer Architecture, PCB Design, RTOS',
    avg_package_range: '6 LPA - 25 LPA',
    roles: 'VLSI Design Engineer, Embedded Firmware Engineer, Hardware Verification Engineer, IoT Developer',
    icon: 'Zap'
  },
  {
    id: 9,
    slug: 'electrical-smart-grid',
    title: 'Power Systems & EV Technology',
    category: 'Core Engineering',
    branch_affinity: 'EEE,Mechanical Engineering',
    prerequisites_non_branch: 'Requires circuit theory, electrical machines, power electronics, and control system fundamentals.',
    short_description: 'Pioneer renewable energy grids, battery management systems, and electric vehicle powertrains.',
    full_overview: 'Addresses modern electrical challenges including smart metering, solar/wind renewable integration, motor drives, power electronics converters, and EV battery systems.',
    key_skills: 'MATLAB/Simulink, Power Electronics, Battery Management Systems (BMS), PLC/SCADA, Control Systems',
    avg_package_range: '5 LPA - 18 LPA',
    roles: 'EV Powertrain Engineer, Power Systems Engineer, Control Systems Specialist, Energy Consultant',
    icon: 'BatteryCharging'
  },
  {
    id: 10,
    slug: 'mechanical-design-robotics',
    title: 'CAD/CAM, Robotics & Automation',
    category: 'Core Engineering',
    branch_affinity: 'Mechanical Engineering,EEE',
    prerequisites_non_branch: 'Engineering mechanics, engineering graphics, strength of materials, and kinematic fundamentals.',
    short_description: 'Engineer physical components, robotic arms, finite element simulations, and smart manufacturing.',
    full_overview: 'Combines mechanical engineering fundamentals with computational automation. Students master 3D CAD modeling, structural finite element analysis, computational fluid dynamics (CFD), and kinematic robotics.',
    key_skills: 'SolidWorks, AutoCAD, ANSYS FEA/CFD, GD&T, Mechatronics, Python for Automation, Additive Manufacturing',
    avg_package_range: '4.5 LPA - 16 LPA',
    roles: 'CAD Design Engineer, FEA/CFD Analyst, Robotics Engineer, Manufacturing Specialist',
    icon: 'Wrench'
  },
  {
    id: 11,
    slug: 'civil-structural-bim',
    title: 'Structural Engineering & BIM Design',
    category: 'Core Engineering',
    branch_affinity: 'Civil Engineering',
    prerequisites_non_branch: 'Engineering mechanics, structural analysis, basic building materials, and survey drawings.',
    short_description: 'Design smart infrastructure, execute structural load analyses, and coordinate Building Information Modeling.',
    full_overview: 'Focuses on sustainable urban infrastructure, modern transportation systems, earthquake-resistant design, and digital construction project management via 3D/4D BIM.',
    key_skills: 'AutoCAD, Revit BIM, STAAD.Pro, ETABS, Geotechnical Mechanics, Project Estimation & Primavera',
    avg_package_range: '4.5 LPA - 15 LPA',
    roles: 'Structural Engineer, BIM Coordinator, Site Project Manager, Geotechnical Consultant',
    icon: 'Building2'
  },
  {
    id: 12,
    slug: 'gate-higher-studies',
    title: 'GATE & Higher Studies (M.Tech / MS / PhD)',
    category: 'Govt & Higher Studies',
    branch_affinity: 'CSE,AI&DS,AI&ML,IT,ECE,EEE,Mechanical Engineering,Civil Engineering',
    prerequisites_non_branch: 'Open to all branches: prepare for your undergraduate branch paper code (CS, EC, EE, ME, CE) or multidisciplinary papers (DA - Data Analytics).',
    short_description: 'Crack GATE with top AIR for admissions to IITs, IISc, PSU recruitments, or top global universities.',
    full_overview: 'A disciplined academic trajectory focused on mastering fundamental B.Tech core syllabus subjects, previous year questions (PYQs), mock test series, and research methodology for PSU roles or premier postgraduate research.',
    key_skills: 'Core Engineering Mathematics, Branch Subject Fundamentals, Time Management, Numerical Problem Solving',
    avg_package_range: 'PSU: 12-20 LPA / Post-Grad: 18-40 LPA',
    roles: 'PSU Executive Engineer (IOCL, ONGC, NTPC, BHEL), IIT Research Fellow, Global Master of Science',
    icon: 'GraduationCap'
  },
  {
    id: 13,
    slug: 'civil-services-govt-exams',
    title: 'UPSC, IES & Government Engineering Services',
    category: 'Govt & Higher Studies',
    branch_affinity: 'CSE,AI&DS,AI&ML,IT,ECE,EEE,Mechanical Engineering,Civil Engineering',
    prerequisites_non_branch: 'Open to all Indian engineering degree holders: General Studies, Current Affairs, Indian Constitution, and core engineering paper depth.',
    short_description: 'Prepare for Indian Engineering Services (ESE), State PSCs, RRB SSE, and administrative civil services.',
    full_overview: 'Guides engineering students aiming for leadership in public administration, railways, defense research, and public works through comprehensive GS, aptitude, and technical paper preparation.',
    key_skills: 'General Studies, Engineering Aptitude, Technical Subject Depth, Essay Writing, Interview Etiquette',
    avg_package_range: 'Central Govt Pay Band-3 (Approx 10-15 LPA + Govt Perks)',
    roles: 'Assistant Executive Engineer (CPWD, MES, Railways), Section Officer, State Gazetted Engineer',
    icon: 'Award'
  }
];

const roadmapTopics = require('./roadmapData');


const learningResources = [
  // Programming & DSA
  {
    id: 1,
    title: 'Harvard CS50: Introduction to Computer Science',
    category: 'Programming languages',
    description: 'World-renowned introductory course covering C, Python, SQL, algorithms, and fundamental computer science concepts with high-rigor problem sets.',
    difficulty_level: 'Beginner',
    external_url: 'https://pll.harvard.edu/course/cs50-introduction-computer-science',
    provider: 'Harvard University / edX',
    is_free: true
  },
  {
    id: 2,
    title: 'GeeksforGeeks Complete DSA Guide',
    category: 'Data structures and algorithms',
    description: 'Comprehensive tutorials, visual diagrams, and code implementations in C++, Java, and Python for arrays, trees, dynamic programming, and graphs.',
    difficulty_level: 'Intermediate',
    external_url: 'https://www.geeksforgeeks.org/data-structures/',
    provider: 'GeeksforGeeks',
    is_free: true
  },
  {
    id: 3,
    title: 'LeetCode Problem Solving Platform',
    category: 'Data structures and algorithms',
    description: 'Industry-standard platform for practicing algorithmic coding questions categorized by tags, company interview frequencies, and difficulty levels.',
    difficulty_level: 'Intermediate',
    external_url: 'https://leetcode.com/problemset/all/',
    provider: 'LeetCode',
    is_free: true
  },
  // Web Development
  {
    id: 4,
    title: 'MDN Web Docs (Mozilla Developer Network)',
    category: 'Web development',
    description: 'The authoritative reference documentation and learning path for HTML5 semantic markup, modern CSS layouts (Flexbox & Grid), and modern JavaScript APIs.',
    difficulty_level: 'Beginner',
    external_url: 'https://developer.mozilla.org/en-US/docs/Learn',
    provider: 'Mozilla',
    is_free: true
  },
  {
    id: 5,
    title: 'React Official Documentation & Interactive Tour',
    category: 'Web development',
    description: 'Official guides for building single-page user interfaces using React components, JSX, hooks (useState, useEffect), and state management.',
    difficulty_level: 'Intermediate',
    external_url: 'https://react.dev/learn',
    provider: 'React Core Team',
    is_free: true
  },
  {
    id: 6,
    title: 'Node.js & Express.js Backend Guide',
    category: 'Web development',
    description: 'Official guide on asynchronous event-driven I/O, Express routing, middleware architecture, REST API design, and database connectivity.',
    difficulty_level: 'Intermediate',
    external_url: 'https://expressjs.com/en/starter/installing.html',
    provider: 'Express.js Foundation',
    is_free: true
  },
  // AI & ML
  {
    id: 7,
    title: 'Machine Learning Specialization by Andrew Ng',
    category: 'AI and machine learning',
    description: 'Foundational 3-course series by Stanford professor Andrew Ng covering supervised learning, neural networks, unsupervised algorithms, and recommender systems.',
    difficulty_level: 'Beginner',
    external_url: 'https://www.deeplearning.ai/courses/machine-learning-specialization/',
    provider: 'DeepLearning.AI / Coursera',
    is_free: true
  },
  {
    id: 8,
    title: 'Kaggle Learn Free Interactive Micro-Courses',
    category: 'Data analytics',
    description: 'Hands-on browser-based interactive notebooks for Python, Pandas data cleaning, Data Visualization with Seaborn, and SQL fundamentals.',
    difficulty_level: 'Beginner',
    external_url: 'https://www.kaggle.com/learn',
    provider: 'Kaggle',
    is_free: true
  },
  // Cybersecurity
  {
    id: 9,
    title: 'TryHackMe Pre-Security & Defensive Pathways',
    category: 'Cybersecurity',
    description: 'Gamified hands-on cybersecurity labs covering networking fundamentals, web application security, Linux privilege escalation, and vulnerability scanning.',
    difficulty_level: 'Beginner',
    external_url: 'https://tryhackme.com/path/outline/pre-security',
    provider: 'TryHackMe',
    is_free: true
  },
  // Core Engineering
  {
    id: 10,
    title: 'NPTEL (National Programme on Technology Enhanced Learning)',
    category: 'Core engineering subjects',
    description: 'Government of India funded premier open courseware taught by IIT and IISc professors across electrical, electronics, mechanical, and civil disciplines.',
    difficulty_level: 'Intermediate',
    external_url: 'https://nptel.ac.in/courses',
    provider: 'Ministry of Education, Govt of India / IITs',
    is_free: true
  },
  {
    id: 11,
    title: 'MIT OpenCourseWare (Engineering)',
    category: 'Core engineering subjects',
    description: 'Free lecture notes, exam papers, and syllabus material from MIT undergraduate engineering courses including circuits, dynamics, and structures.',
    difficulty_level: 'Advanced',
    external_url: 'https://ocw.mit.edu/search/?d=Engineering',
    provider: 'Massachusetts Institute of Technology',
    is_free: true
  },
  // Aptitude & Interview Prep
  {
    id: 12,
    title: 'IndiaBIX Quantitative Aptitude & Reasoning',
    category: 'Aptitude',
    description: 'Standard practice problems with step-by-step solutions for campus placement aptitude tests, numerical ability, logical deduction, and verbal exams.',
    difficulty_level: 'Beginner',
    external_url: 'https://www.indiabix.com/aptitude/questions-and-answers/',
    provider: 'IndiaBIX',
    is_free: true
  },
  {
    id: 13,
    title: 'Tech Interview Handbook & Curated Cheatsheet',
    category: 'Technical interviews',
    description: 'Open-source guide covering algorithms study plans, behavioral STAR preparation, resume formatting tips, and negotiation tactics.',
    difficulty_level: 'Intermediate',
    external_url: 'https://www.techinterviewhandbook.org/',
    provider: 'Tech Interview Handbook Community',
    is_free: true
  },
  // GATE Preparation
  {
    id: 14,
    title: 'GATE Overflow Free Previous Year Questions & Discussion',
    category: 'GATE preparation',
    description: 'Extensive community-verified solutions for all previous years GATE papers, subject-wise categorizations, and syllabus tracking.',
    difficulty_level: 'Advanced',
    external_url: 'https://gateoverflow.in/',
    provider: 'GATE Overflow Community',
    is_free: true
  }
];

const opportunities = [
  {
    id: 1,
    title: 'Google Summer of Code (GSoC) 2026',
    category: 'Internships',
    description: 'Global online mentoring program bringing student developers into open-source software development with international stipends.',
    eligibility: 'Enrolled college students aged 18+. All B.Tech branches eligible. Requires open source proposal.',
    deadline: '2026-04-15',
    official_source_url: 'https://summerofcode.withgoogle.com/',
    application_url: 'https://summerofcode.withgoogle.com/get-started',
    status: 'Upcoming',
    is_verified: true
  },
  {
    id: 2,
    title: 'Smart India Hackathon (SIH) – Student Edition',
    category: 'Hackathons',
    description: 'Nationwide initiative by Ministry of Education providing students a platform to solve pressing problems of ministries and industries.',
    eligibility: 'B.Tech teams of 6 students (at least 1 female teammate mandatory). Valid college ID required.',
    deadline: '2026-09-30',
    official_source_url: 'https://www.sih.gov.in/',
    application_url: 'https://www.sih.gov.in/',
    status: 'Upcoming',
    is_verified: true
  },
  {
    id: 3,
    title: 'ISRO Student Internship & Project Work Scheme',
    category: 'Internships',
    description: 'Research project training and internship opportunities at ISRO centers (VSSC, URSC, SAC, NRSC) for engineering undergraduate students.',
    eligibility: 'B.Tech students with minimum 60% or 6.32/10 CGPA in branches: ECE, EEE, Mechanical, CSE, Civil.',
    deadline: '2026-11-15',
    official_source_url: 'https://www.isro.gov.in/Careers.html',
    application_url: 'https://www.isro.gov.in/Internship.html',
    status: 'Active',
    is_verified: true
  },
  {
    id: 4,
    title: 'TCS CodeVita – Global Coding Contest',
    category: 'Coding competitions',
    description: 'Recognized by Guinness World Records as the world’s largest computer programming competition, offering direct interview opportunities at TCS.',
    eligibility: 'Pre-final and final year B.Tech students from any recognized university.',
    deadline: '2026-08-20',
    official_source_url: 'https://campuscommune.tcs.com/en-in/intro/contests/codevita',
    application_url: 'https://campuscommune.tcs.com/en-in/intro/contests/codevita',
    status: 'Upcoming',
    is_verified: true
  },
  {
    id: 5,
    title: 'DRDO Research Internship Scheme',
    category: 'Government opportunities',
    description: 'Undergraduate project training in state-of-the-art defense laboratories in avionics, radar systems, robotics, and cyber defense.',
    eligibility: 'Regular full-time B.Tech 3rd & 4th year students with no backlogs and high academic standing.',
    deadline: '2026-10-31',
    official_source_url: 'https://www.drdo.gov.in/careers',
    application_url: 'https://www.drdo.gov.in/student-corner',
    status: 'Active',
    is_verified: true
  },
  {
    id: 6,
    title: 'GATE 2027 Official Notification & Registration',
    category: 'GATE and higher studies',
    description: 'Graduate Aptitude Test in Engineering for admissions to Master’s programs and direct recruitment into premier Public Sector Undertakings (PSUs).',
    eligibility: 'Candidates currently in the 3rd year or higher of any undergraduate degree program in Engineering/Technology.',
    deadline: '2026-09-28',
    official_source_url: 'https://gate.iitk.ac.in/',
    application_url: 'https://gate.iitk.ac.in/',
    status: 'Upcoming',
    is_verified: true
  },
  {
    id: 7,
    title: 'National Scholarship Portal (NSP) Post-Matric & Merit Schemes',
    category: 'Scholarships',
    description: 'Central and state government financial assistance scholarships for meritorious technical education students across India.',
    eligibility: 'Enrolled B.Tech students satisfying family annual income thresholds and minimum score criteria.',
    deadline: '2026-12-15',
    official_source_url: 'https://scholarships.gov.in/',
    application_url: 'https://scholarships.gov.in/',
    status: 'Active',
    is_verified: true
  },
  {
    id: 8,
    title: 'Amazon WOW (Women of the World) Mentorship Program',
    category: 'Internships',
    description: 'Mentorship and coding skill acceleration initiative for women engineering students, providing coding workshops and internship opportunities.',
    eligibility: 'Female students pursuing B.Tech in CSE, IT, ECE, EEE or allied technical fields.',
    deadline: '2026-07-31',
    official_source_url: 'https://www.amazon.jobs/en/landing_pages/amazon-wow',
    application_url: 'https://www.amazon.jobs/en/landing_pages/amazon-wow',
    status: 'Upcoming',
    is_verified: true
  }
];

const quizQuestions = [
  // Programming
  {
    id: 1,
    topic: 'Programming',
    question_text: 'In C/C++, what is the time complexity of searching an element in a balanced Binary Search Tree (BST) with n nodes?',
    option_a: 'O(1)',
    option_b: 'O(n)',
    option_c: 'O(log n)',
    option_d: 'O(n log n)',
    correct_option: 'C',
    explanation: 'A balanced BST divides the search space in half at each step, yielding logarithmic time O(log n).'
  },
  {
    id: 2,
    topic: 'Programming',
    question_text: 'Which data structure is inherently used to implement recursion and function call stacks in modern computers?',
    option_a: 'Queue',
    option_b: 'Stack',
    option_c: 'Hash Table',
    option_d: 'Min Heap',
    correct_option: 'B',
    explanation: 'Function frames follow a Last-In, First-Out (LIFO) pattern, which is managed by a Call Stack.'
  },
  {
    id: 3,
    topic: 'Programming',
    question_text: 'What will be the output of typeof null in standard JavaScript?',
    option_a: '"null"',
    option_b: '"undefined"',
    option_c: '"object"',
    option_d: '"number"',
    correct_option: 'C',
    explanation: 'In JavaScript, typeof null returning "object" is a historic legacy bug that has been preserved for backward compatibility.'
  },
  // SQL & Databases
  {
    id: 4,
    topic: 'SQL',
    question_text: 'Which SQL clause is strictly used to filter rows based on aggregated values like COUNT() or AVG()?',
    option_a: 'WHERE',
    option_b: 'HAVING',
    option_c: 'GROUP BY',
    option_d: 'ORDER BY',
    correct_option: 'B',
    explanation: 'The WHERE clause cannot be used with aggregate functions; the HAVING clause is specifically designed to filter groups after aggregation.'
  },
  {
    id: 5,
    topic: 'SQL',
    question_text: 'What does the "I" stand for in ACID properties of relational database management systems?',
    option_a: 'Integrity',
    option_b: 'Indexing',
    option_c: 'Isolation',
    option_d: 'Iteration',
    correct_option: 'C',
    explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability.'
  },
  // Aptitude
  {
    id: 6,
    topic: 'Aptitude',
    question_text: 'A train 120 meters long passes a telegraph pole in 6 seconds. What is the speed of the train in km/hr?',
    option_a: '60 km/hr',
    option_b: '72 km/hr',
    option_c: '80 km/hr',
    option_d: '90 km/hr',
    correct_option: 'B',
    explanation: 'Speed = Distance / Time = 120m / 6s = 20 m/s. Converting to km/hr: 20 * (18/5) = 72 km/hr.'
  },
  {
    id: 7,
    topic: 'Aptitude',
    question_text: 'If A can finish a work in 12 days and B can finish the same work in 24 days, how many days will they take working together?',
    option_a: '6 days',
    option_b: '8 days',
    option_c: '10 days',
    option_d: '18 days',
    correct_option: 'B',
    explanation: 'Combined daily work = 1/12 + 1/24 = (2 + 1)/24 = 3/24 = 1/8. Total days = 8 days.'
  },
  // Technical Fundamentals
  {
    id: 8,
    topic: 'Technical Fundamentals',
    question_text: 'Which layer of the OSI model is responsible for end-to-end reliable data delivery, flow control, and port addressing?',
    option_a: 'Network Layer',
    option_b: 'Data Link Layer',
    option_c: 'Transport Layer',
    option_d: 'Session Layer',
    correct_option: 'C',
    explanation: 'The Transport Layer (Layer 4, e.g., TCP) handles end-to-end communication, segmentation, flow control, and port numbers.'
  },
  {
    id: 9,
    topic: 'Technical Fundamentals',
    question_text: 'In Operating Systems, what is the situation called when two or more processes are unable to proceed because each is waiting for the other to release a resource?',
    option_a: 'Starvation',
    option_b: 'Deadlock',
    option_c: 'Thrashing',
    option_d: 'Context Switch',
    correct_option: 'B',
    explanation: 'A deadlock occurs when processes hold resources while waiting for other resources held by other processes in a circular chain.'
  },
  {
    id: 10,
    topic: 'Technical Fundamentals',
    question_text: 'Which semiconductor device operates in the reverse breakdown region to provide a stable reference voltage?',
    option_a: 'Schottky Diode',
    option_b: 'Zener Diode',
    option_c: 'Varactor Diode',
    option_d: 'LED',
    correct_option: 'B',
    explanation: 'A Zener Diode is specifically designed to conduct in reverse breakdown, maintaining an almost constant voltage for regulation.'
  }
];

const branches = [
  {
    code: 'CSE',
    name: 'Computer Science & Engineering',
    tagline: 'Leading software architecture, algorithms, cloud systems, and scalable digital platforms.',
    popular_careers: ['Software Development & Engineering', 'Full Stack Web & Cloud Developer', 'AI & Machine Learning Specialist', 'Cybersecurity Analyst & Ethical Hacker'],
    core_subjects: ['Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems', 'Computer Networks', 'Compiler Design'],
    recommended_certifications: ['AWS Certified Cloud Practitioner', 'Oracle Certified Java Programmer', 'Meta Frontend/Backend Professional']
  },
  {
    code: 'AI&DS',
    name: 'Artificial Intelligence & Data Science',
    tagline: 'Empowering intelligent automation, predictive systems, big data computing, and neural architectures.',
    popular_careers: ['AI & Machine Learning Specialist', 'Data Scientist & Predictive Modeler', 'Data Analytics & Business Intelligence', 'Full Stack Web & Cloud Developer'],
    core_subjects: ['Linear Algebra & Probability', 'Machine Learning', 'Deep Learning & Neural Networks', 'Big Data Analytics', 'Natural Language Processing'],
    recommended_certifications: ['TensorFlow Developer Certificate', 'DeepLearning.AI Specialization', 'Google Data Analytics Professional']
  },
  {
    code: 'AI&ML',
    name: 'Artificial Intelligence & Machine Learning',
    tagline: 'Designing deep neural networks, computer vision, natural language processing, and autonomous cognitive systems.',
    popular_careers: ['AI & Machine Learning Specialist', 'Data Scientist & Predictive Modeler', 'Software Development & Engineering', 'Full Stack Web & Cloud Developer'],
    core_subjects: ['Linear Algebra & Matrix Computation', 'Deep Learning & Neural Networks', 'Computer Vision & NLP', 'Probabilistic Graphical Models', 'Reinforcement Learning'],
    recommended_certifications: ['DeepLearning.AI TensorFlow Developer', 'AWS Certified Machine Learning - Specialty', 'Google Professional ML Engineer']
  },
  {
    code: 'IT',
    name: 'Information Technology',
    tagline: 'Building enterprise software, cloud infrastructure, network architectures, and information security.',
    popular_careers: ['Software Development & Engineering', 'Full Stack Web & Cloud Developer', 'Cloud & DevOps Engineer', 'Cybersecurity Analyst & Ethical Hacker'],
    core_subjects: ['Web Technologies & Frameworks', 'Cloud Computing & Virtualization', 'Information Security', 'Database Management & Data Warehousing', 'Distributed Systems'],
    recommended_certifications: ['AWS Certified Solutions Architect', 'CompTIA Security+', 'Red Hat Certified System Administrator (RHCSA)']
  },
  {
    code: 'ECE',
    name: 'Electronics & Communication Engineering',
    tagline: 'Connecting hardware and high-speed communication: microchips, RF design, 5G, and IoT.',
    popular_careers: ['Embedded Systems & VLSI Design', 'Software Development & Engineering', 'GATE & Higher Studies (M.Tech / MS)'],
    core_subjects: ['Digital Signal Processing', 'Analog & Digital Communication', 'VLSI Design & Verilog', 'Microprocessors & Microcontrollers', 'Electromagnetic Waves'],
    recommended_certifications: ['Cadence / Synopsys VLSI Certified', 'Arm Accredited Engineer', 'Cisco CCNA']
  },
  {
    code: 'EEE',
    name: 'Electrical & Electronics Engineering',
    tagline: 'Powering electric vehicles, smart power grids, renewable energy, and industrial automation.',
    popular_careers: ['Power Systems & EV Technology', 'Embedded Systems & VLSI Design', 'UPSC, IES & Government Engineering Services'],
    core_subjects: ['Power Electronics', 'Electrical Machines', 'Control Systems', 'Power System Analysis & Smart Grids', 'Renewable Energy Systems'],
    recommended_certifications: ['MATLAB Certified Associate', 'PLC/SCADA Automation Certification', 'Solar PV Design Specialist']
  },
  {
    code: 'Mechanical Engineering',
    name: 'Mechanical Engineering',
    tagline: 'Designing thermal engines, automated robotics, aeronautics, and smart CAD/CAM manufacturing.',
    popular_careers: ['CAD/CAM, Robotics & Automation', 'Power Systems & EV Technology', 'UPSC, IES & Government Engineering Services'],
    core_subjects: ['Thermodynamics & Heat Transfer', 'Fluid Mechanics', 'Strength of Materials', 'Kinematics & Dynamics of Machines', 'Finite Element Analysis (FEA)'],
    recommended_certifications: ['Certified SOLIDWORKS Associate (CSWA)', 'ANSYS Certified FEA Professional', 'Autodesk Certified Professional']
  },
  {
    code: 'Civil Engineering',
    name: 'Civil Engineering',
    tagline: 'Constructing modern smart cities, sustainable bridges, transportation, and structural marvels.',
    popular_careers: ['Structural Engineering & BIM Design', 'UPSC, IES & Government Engineering Services', 'GATE & Higher Studies (M.Tech / MS)'],
    core_subjects: ['Structural Analysis', 'Geotechnical & Soil Mechanics', 'Reinforced Concrete Design (RCC)', 'Transportation Engineering', 'Environmental Engineering'],
    recommended_certifications: ['Autodesk Revit BIM Certified', 'STAAD.Pro Structural Engineer', 'Primavera P6 Project Management']
  }
];

const projectIdeas = [
  {
    id: 1,
    title: 'Student Placement & Roadmap Tracker (StudentVerse)',
    level: 'Intermediate',
    domain: 'Full-Stack Web Development',
    problem_statement: 'Engineering students struggle with fragmented information regarding what to study, when to apply for internships, and how to track 4-year career progress.',
    required_tech: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'JWT'],
    skills_learned: 'Normalized relational database design, JWT authentication, state management, REST API architecture.',
    implementation_steps: [
      'Design normalized MySQL relational database schema with foreign keys for students, roadmaps, and progress.',
      'Develop Express.js REST API with bcrypt password hashing and token-based route protection.',
      'Construct accessible React frontend with interactive progress bars and bookmarking.',
      'Deploy application and verify database persistence across user sessions.'
    ],
    expected_outcome: 'A production-ready full-stack guidance portal with persistent roadmap completion and student dashboard analytics.',
    skills_demonstrated: 'Full-stack engineering, SQL transactions, component reusability, token authorization, responsive web design.',
    possible_interview_questions: [
      'How did you structure your MySQL tables to prevent duplicate student milestone completions?',
      'Why did you choose JWT over server-side session cookies for authentication?',
      'How does your backend handle database connection dropouts or offline modes?'
    ],
    repo_link: 'https://github.com/example/studentverse',
    demo_link: 'http://localhost:5173'
  },
  {
    id: 2,
    title: 'Campus Lost and Found Portal',
    level: 'Beginner',
    domain: 'Web Development',
    problem_statement: 'College campuses lack a centralized digital lost-and-found system, leading to unclaimed valuables and notice board clutter.',
    required_tech: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express', 'MySQL'],
    skills_learned: 'CRUD operations, image uploads, SQL filtering by date and campus location.',
    implementation_steps: [
      'Create responsive form allowing students to submit lost/found items with category tags.',
      'Build Express backend with Multer for secure photo uploads and MySQL storage.',
      'Implement search and category filtration (Electronics, Wallets, IDs, Books).',
      'Add claim verification workflow connecting claimant with item finder securely.'
    ],
    expected_outcome: 'A functional campus portal with search, category filtering, and item claim verification.',
    skills_demonstrated: 'Basic full-stack flow, form validation, multipart file uploads, clean UI styling.',
    possible_interview_questions: [
      'How did you secure image uploads against malicious executable files?',
      'How would you paginate query results if the campus database grew to 50,000 items?'
    ],
    repo_link: 'https://github.com/example/campus-lost-found',
    demo_link: 'https://example.com/lost-found-demo'
  },
  {
    id: 3,
    title: 'Smart Health Monitoring IoT Hub',
    level: 'Intermediate',
    domain: 'Embedded Systems & IoT',
    problem_statement: 'Remote patient vital signs are difficult to monitor continuously in rural health centers without costly equipment.',
    required_tech: ['ESP32', 'Embedded C++', 'MQTT', 'Node.js', 'Chart.js'],
    skills_learned: 'I2C/SPI sensor interfacing, MQTT publish-subscribe telemetry, lightweight dashboard visualizer.',
    implementation_steps: [
      'Connect MAX30102 pulse oximeter and DS18B20 temperature sensor to ESP32 micro-controller.',
      'Write embedded C++ firmware with FreeRTOS tasks to sample vitals every 5 seconds.',
      'Publish telemetry via WiFi over MQTT protocol to an Express.js backend broker.',
      'Render live time-series charts on a web dashboard with automated emergency alert triggers.'
    ],
    expected_outcome: 'Hardware prototype transmitting real-time heart rate and temperature with emergency alert thresholding.',
    skills_demonstrated: 'Hardware-to-cloud telemetry, real-time protocol handling, sensor signal conditioning.',
    possible_interview_questions: [
      'Why choose MQTT over HTTP polling for constrained microcontrollers like ESP32?',
      'How did you handle sensor noise and transient spikes in the optical pulse sensor?'
    ],
    repo_link: 'https://github.com/example/iot-health-hub',
    demo_link: 'https://example.com/health-demo'
  },
  {
    id: 4,
    title: 'E-Commerce Churn Prediction & Cohort Dashboard',
    level: 'Intermediate',
    domain: 'Data Analytics & SQL',
    problem_statement: 'Subscription e-commerce businesses lose revenue without early warning signals of customer disengagement.',
    required_tech: ['SQL (MySQL/PostgreSQL)', 'Python (Pandas, Seaborn)', 'Power BI / Tableau'],
    skills_learned: 'RFM segmentation, window functions, cohort retention analysis, interactive BI storytelling.',
    implementation_steps: [
      'Write complex SQL queries utilizing Window Functions (ROW_NUMBER, LAG, LEAD) and Common Table Expressions (CTEs).',
      'Classify customer base into Recency, Frequency, and Monetary (RFM) behavioral segments.',
      'Design interactive Power BI dashboard featuring dynamic slicers, cohort retention heatmaps, and revenue loss metrics.',
      'Deliver executive recommendations on high-risk customer retention campaigns.'
    ],
    expected_outcome: 'An executive-ready analytics dashboard revealing churn bottlenecks and retention cohorts.',
    skills_demonstrated: 'Advanced analytical SQL, business metric formulation, data visualization, actionable insights.',
    possible_interview_questions: [
      'What is the difference between a Window Function and a GROUP BY aggregation in SQL?',
      'How did you validate that your RFM scoring metric was statistically significant?'
    ],
    repo_link: 'https://github.com/example/churn-analytics-cohort',
    demo_link: 'https://example.com/analytics-demo'
  },
  {
    id: 5,
    title: 'Medical Image Classification with Grad-CAM Explainability',
    level: 'Advanced',
    domain: 'AI & Deep Learning',
    problem_statement: 'Radiologists review thousands of chest X-rays daily; automated preliminary triaging speeds up diagnosis of pulmonary diseases.',
    required_tech: ['Python', 'PyTorch', 'ResNet50', 'FastAPI', 'Docker'],
    skills_learned: 'Transfer learning, convolutional neural networks, Grad-CAM visual explainability, FastAPI model serving.',
    implementation_steps: [
      'Preprocess chest X-ray images with data augmentation (rotations, contrast normalization).',
      'Fine-tune a pre-trained ResNet-50 model on labeled lung disease dataset using cross-entropy loss.',
      'Implement Grad-CAM heatmaps to visually explain which lung regions influenced the prediction.',
      'Wrap PyTorch inference inside a containerized FastAPI endpoint for instant web evaluation.'
    ],
    expected_outcome: 'A trained vision model achieving 92%+ validation ROC-AUC with visual heatmap explanations.',
    skills_demonstrated: 'Deep learning pipeline, model explainability for healthcare, containerization, high-performance API serving.',
    possible_interview_questions: [
      'What is the mathematical principle behind Grad-CAM (Gradient-weighted Class Activation Mapping)?',
      'How did you mitigate class imbalance between rare conditions and normal scans?'
    ],
    repo_link: 'https://github.com/example/xray-ai-classifier',
    demo_link: 'https://example.com/ai-med-demo'
  },
  {
    id: 6,
    title: 'Distributed Microservices Task Queue with Redis',
    level: 'Advanced',
    domain: 'Backend & Cloud Systems',
    problem_statement: 'Synchronous web APIs fail under high concurrency bursts when generating PDF reports or heavy video transcoding jobs.',
    required_tech: ['Node.js', 'Express', 'Redis', 'BullMQ', 'Docker'],
    skills_learned: 'Asynchronous job queues, worker process management, Redis data structures, horizontal scalability.',
    implementation_steps: [
      'Architect an Express producer API that immediately returns job IDs and enqueues heavy tasks in Redis.',
      'Develop background worker processes that dequeue jobs, handle retries with exponential backoff, and update state.',
      'Implement WebSocket notifications pushing real-time progress updates back to frontend clients.',
      'Benchmark throughput under 10,000 simulated concurrent task submissions.'
    ],
    expected_outcome: 'A resilient asynchronous job processing pipeline maintaining sub-50ms API response times under load.',
    skills_demonstrated: 'System design, asynchronous concurrency, queue architectures, resilience patterns.',
    possible_interview_questions: [
      'How does a message queue prevent worker starvation and guarantee at-least-once delivery?',
      'What happens if a worker process crashes mid-execution of a job?'
    ],
    repo_link: 'https://github.com/example/distributed-task-queue',
    demo_link: 'https://example.com/task-queue-demo'
  }
];

const interviewPrep = {
  technical_questions: [
    // 1. Data Structures & Algorithms
    {
      id: 1,
      category: 'Data Structures & Algorithms',
      question: 'How do you detect a cycle in a singly linked list with O(1) auxiliary space?',
      answer: 'Use Floyd’s Cycle-Finding Algorithm (Tortoise and Hare). Maintain two pointers: a slow pointer moving 1 step and a fast pointer moving 2 steps. If they ever point to the same node, a cycle exists. If the fast pointer reaches NULL, there is no cycle. Time complexity is O(N) and space complexity is strictly O(1).'
    },
    {
      id: 2,
      category: 'Data Structures & Algorithms',
      question: 'What is the time complexity difference between QuickSort and MergeSort? When would you choose one over the other?',
      answer: 'MergeSort has a guaranteed O(N log N) time complexity in worst, average, and best cases, but requires O(N) auxiliary memory. QuickSort has an average time complexity of O(N log N) with O(log N) stack space, but its worst case can degrade to O(N^2) if pivot selection is poor. QuickSort is preferred in-place for arrays due to cache locality, while MergeSort is preferred for linked lists and stable sorting requirements.'
    },

    // 2. Programming Fundamentals & Output Prediction
    {
      id: 3,
      category: 'Programming Fundamentals',
      question: 'What is the difference between == and === in JavaScript? Give an output prediction example.',
      answer: '== performs loose equality with type coercion (e.g. 0 == "" evaluates to true; false == 0 evaluates to true). In contrast, === performs strict equality without coercion, checking both data type and value. For example, null === undefined evaluates to false, while null == undefined evaluates to true. In modern software engineering, === is strictly recommended.'
    },
    {
      id: 4,
      category: 'Programming Fundamentals',
      question: 'Explain what happens during Java garbage collection and what the Mark-and-Sweep algorithm does.',
      answer: 'The Java Virtual Machine (JVM) automatically manages heap memory through the Garbage Collector (GC). The Mark-and-Sweep algorithm runs in two phases: 1. Mark phase: Traverses the object graph starting from "GC Roots" (thread local variables, static fields) and marks all reachable objects as alive. 2. Sweep phase: Reclaims memory allocated to unreferenced (unmarked) objects. Modern JVM collectors like G1GC divide the heap into generations (Eden, Survivor, Tenured) to optimize pauses.'
    },

    // 3. Object-Oriented Programming (OOP)
    {
      id: 5,
      category: 'Object-Oriented Programming',
      question: 'What is the difference between Method Overloading and Method Overriding in OOP?',
      answer: 'Method Overloading (Compile-Time Polymorphism) occurs within the same class where methods share the same name but differ in parameters (number, types, or order). Return type alone cannot overload a method. Method Overriding (Runtime Polymorphism) occurs in a subclass that provides a specific implementation of a method already declared in its superclass using the identical name, parameters, and compatible return type.'
    },
    {
      id: 6,
      category: 'Object-Oriented Programming',
      question: 'Explain the SOLID design principles in simple words.',
      answer: 'S - Single Responsibility: A class should have only one reason to change.\nO - Open/Closed: Software entities should be open for extension but closed for modification.\nL - Liskov Substitution: Subclasses must be substitutable for their base classes without breaking program correctness.\nI - Interface Segregation: Clients should not be forced to depend on interfaces they do not use.\nD - Dependency Inversion: High-level modules should depend on abstractions, not on low-level concrete implementations.'
    },

    // 4. SQL & Database Concepts
    {
      id: 7,
      category: 'DBMS & SQL',
      question: 'What is the key difference between Clustered and Non-Clustered Indexes in MySQL/RDBMS?',
      answer: 'A Clustered Index dictates the actual physical order of rows in the table. Because physical data can only be stored in one order, each table can have only ONE clustered index (in MySQL InnoDB, this is the PRIMARY KEY). A Non-Clustered Index is a separate secondary B-Tree structure containing the indexed column values and pointers back to the clustered index key. A table can possess multiple non-clustered indexes.'
    },
    {
      id: 8,
      category: 'DBMS & SQL',
      question: 'Explain the 4 ACID properties of relational database transactions.',
      answer: 'Atomicity: "All or nothing" — every operation in the transaction succeeds, or the entire transaction is rolled back.\nConsistency: Transactions transition the database from one valid state to another, preserving all schema constraints, checks, and foreign keys.\nIsolation: Concurrent transactions execute independently without dirty reads or phantom data interference.\nDurability: Once a transaction commits, its modifications are permanently recorded in non-volatile storage even if power or server failure occurs.'
    },

    // 5. Web Development & React
    {
      id: 9,
      category: 'Web Development & React',
      question: 'What is the Virtual DOM in React, and how does the reconciliation algorithm work?',
      answer: 'The Virtual DOM is a lightweight, in-memory JavaScript representation of the real DOM tree. When component state or props change, React generates a new Virtual DOM tree, runs a diffing algorithm (reconciliation) comparing it with the previous snapshot, and calculates the minimal batch of changes. React then applies only those precise mutations to the real browser DOM, minimizing costly reflow and repaint operations.'
    },
    {
      id: 10,
      category: 'Web Development & React',
      question: 'What is the difference between useState and useEffect in React, and why is the dependency array critical?',
      answer: 'useState manages reactive component state variables that trigger UI re-renders when updated. useEffect handles side-effects (API calls, subscriptions, timer management, DOM mutations) synchronized with React render cycles. The dependency array specifies when the effect runs: [] runs once on mount; [propA, stateB] re-runs only when those values change; omitting the array runs the effect on every single render, which can trigger infinite loops.'
    },

    // 6. Node.js & Express
    {
      id: 11,
      category: 'Node.js & Express',
      question: 'How does the Node.js Event Loop work with its single-threaded architecture?',
      answer: 'Node.js executes JavaScript on a single main thread, but delegates asynchronous I/O operations (file reading, network calls, database queries) to the OS kernel or the internal libuv C++ thread pool. When an asynchronous operation finishes, libuv places its callback into the Event Loop phase queue (Timers -> I/O Callbacks -> Poll -> Check/setImmediate -> Close). Microtasks (Promises and process.nextTick) are executed immediately between each phase.'
    },
    {
      id: 12,
      category: 'Node.js & Express',
      question: 'What is Express middleware, and why must you call next()?',
      answer: 'Middleware functions in Express have access to the request object (req), response object (res), and the next middleware function in the application’s request-response cycle. They perform logging, body parsing, CORS handling, and authentication verification. If a middleware does not terminate the cycle by sending a response (e.g. res.json()), it must call next() to pass execution control to the subsequent middleware; otherwise, the request hangs indefinitely.'
    },

    // 7. AI/ML & Data Science
    {
      id: 13,
      category: 'AI & Data Science',
      question: 'What is the Bias-Variance tradeoff in Machine Learning?',
      answer: 'Bias refers to errors caused by overly simplistic assumptions in the model, leading to underfitting (poor performance on both training and test data). Variance refers to sensitivity to small fluctuations in training data, leading to overfitting (high training accuracy but poor generalization on test data). The ideal model balances bias and variance to minimize total expected error using techniques like cross-validation, regularization (L1/L2), and ensemble methods.'
    },

    // 8. Core Computer Science Fundamentals
    {
      id: 14,
      category: 'Operating Systems',
      question: 'What are the 4 necessary conditions for a Deadlock (Coffman conditions)?',
      answer: '1. Mutual Exclusion: At least one resource must be non-shareable.\n2. Hold and Wait: A process currently holding resources can request new ones.\n3. No Preemption: Resources cannot be forcibly seized from a process; they must be released voluntarily.\n4. Circular Wait: A closed chain of processes exists where each process holds resources requested by the next process in the cycle.'
    },
    {
      id: 15,
      category: 'Computer Networks',
      question: 'Explain what happens when you type https://google.com into a browser and press Enter.',
      answer: '1. Browser checks cache (Browser DNS, OS cache, Router cache).\n2. DNS Query: Resolves domain to an IP address via recursive and authoritative nameservers.\n3. TCP 3-Way Handshake: Synchronizes sequence numbers (SYN -> SYN-ACK -> ACK).\n4. TLS Handshake: Negotiates cryptographic ciphers, verifies SSL certificate, and generates symmetric session keys.\n5. HTTP GET: Browser transmits an encrypted GET request over port 443.\n6. Web Server Response: Server routes request, queries database, and returns HTTP 200 with HTML.\n7. DOM & CSSOM Parsing: Browser constructs the render tree, executes JavaScript, and paints pixels on screen.'
    },

    // 9. HR & Behavioral Interview Preparation
    {
      id: 16,
      category: 'HR & Behavioral',
      question: 'How should you answer "Tell me about yourself" in a campus placement interview?',
      answer: 'Follow the proven Present-Past-Future structure in 90-120 seconds:\n1. Present: State your name, college, branch, current CGPA, and your primary technical specialization (e.g., "I am a 3rd-year B.Tech CSE student passionate about full-stack engineering and scalable REST APIs").\n2. Past: Highlight 1-2 major achievements, technical milestones, or projects built (e.g., "Recently, I built StudentVerse, an end-to-end guidance platform with React and MySQL").\n3. Future: Connect your skills to the specific company (e.g., "I am eager to contribute my strong algorithmic foundation and backend development skills to your engineering team as an SDE").'
    },
    {
      id: 17,
      category: 'HR & Behavioral',
      question: 'How do you answer behavioral questions using the STAR framework?',
      answer: 'The STAR framework structures behavioral stories concisely:\nS - Situation: Set the scene and context (e.g., "During our college hackathon, our 4-person team had only 24 hours to build an IoT app").\nT - Task: Define your specific goal or challenge (e.g., "I was responsible for developing the real-time sensor API and connecting it with our MySQL database").\nA - Action: Describe the exact steps YOU took (e.g., "When our initial polling failed, I implemented an MQTT broker and optimized SQL indexing").\nR - Result: Conclude with measurable impact (e.g., "Our app achieved sub-second latency, zero crashes during evaluation, and our team placed in the top 5 out of 120 teams").'
    }
  ],
  resume_guidelines: [
    'Keep your resume strictly to 1 page for undergraduate B.Tech campus applications.',
    'Use standard reverse chronological format with legible modern fonts (Calibri, Inter, Roboto).',
    'Follow the Google "X-Y-Z" formula for project bullets: Accomplished [X], as measured by [Y], by doing [Z].',
    'Include live deployment links and GitHub repository links for your top 2-3 technical projects.',
    'List verified technical skills: Languages, Frameworks, Tools, and Database engines. Avoid star or percentage graphics.',
    'Ensure correct branch name, college affiliation, expected graduation month/year, and current CGPA.'
  ],
  placement_checklist: [
    { id: 'c1', task: 'Complete ATS-friendly 1-page PDF resume and get it reviewed by seniors/professors.', phase: '3rd Year Sem 1' },
    { id: 'c2', task: 'Solve at least 150-200 curated DSA problems on LeetCode / GeeksforGeeks.', phase: '3rd Year Sem 2' },
    { id: 'c3', task: 'Build 2 full-fledged portfolio projects with active GitHub repositories and documentation.', phase: '3rd Year' },
    { id: 'c4', task: 'Revise core CS/Engineering fundamentals: OS, DBMS, Networks, and OOP concepts.', phase: '4th Year Sem 1' },
    { id: 'c5', task: 'Practice quantitative aptitude and logical reasoning for campus filtration rounds.', phase: 'Continuous' },
    { id: 'c6', task: 'Prepare answers for standard HR behavioral questions using the STAR framework.', phase: 'Pre-Interview' }
  ]
};

module.exports = {
  careerPaths,
  roadmapTopics,
  learningResources,
  opportunities,
  quizQuestions,
  branches,
  projectIdeas,
  interviewPrep
};
