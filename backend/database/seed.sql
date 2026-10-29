-- ============================================================
-- StudentVerse Database Seed Data
-- ============================================================
USE studentverse_db;

-- 1. Insert Career Paths
INSERT INTO career_paths (id, slug, title, category, branch_affinity, short_description, full_overview, key_skills, avg_package_range, roles, icon) VALUES
(1, 'software-engineering', 'Software Development & Engineering', 'Software & Tech', 'CSE,AI&DS,ECE,EEE,Mechanical Engineering,Civil Engineering',
 'Build enterprise-grade web, mobile, and distributed systems using modern programming stacks.',
 'Software Engineering focuses on designing, developing, testing, and maintaining software applications. From frontend interfaces to resilient backend microservices and databases, this pathway is the cornerstone of the tech industry with high placement demand across all B.Tech branches.',
 'Data Structures & Algorithms, Java/C++/Python, Web Development, System Design, SQL, Git & CI/CD',
 '6 LPA - 28 LPA', 'Software Development Engineer (SDE), Full-Stack Developer, Backend Engineer, Frontend Specialist', 'Code'),

(2, 'ai-machine-learning', 'AI & Machine Learning Specialist', 'AI & Data', 'AI&DS,CSE,ECE',
 'Architect intelligent algorithms, neural networks, predictive models, and GenAI solutions.',
 'Artificial Intelligence and Machine Learning transform raw data into intelligent decision-making systems. Students in this track master linear algebra, statistical learning, deep learning frameworks, NLP, and computer vision to build state-of-the-art intelligent software.',
 'Python, NumPy, Pandas, Scikit-Learn, PyTorch/TensorFlow, Deep Learning, Mathematics & Probability, MLOps',
 '8 LPA - 32 LPA', 'ML Engineer, AI Research Associate, Computer Vision Specialist, NLP Engineer', 'Cpu'),

(3, 'data-analytics', 'Data Analytics & Business Intelligence', 'AI & Data', 'CSE,AI&DS,ECE,EEE,Mechanical Engineering,Civil Engineering',
 'Transform complex business datasets into actionable insights, dashboards, and growth metrics.',
 'Data Analysts bridge the gap between technical metrics and strategic business decisions. By mastering SQL, data cleaning, statistical modeling, and visualization suites, students prepare for high-impact analytical roles across tech, finance, and consulting.',
 'SQL, Advanced Excel, Python/R, Power BI, Tableau, Statistical Modeling, Data Warehousing',
 '5.5 LPA - 18 LPA', 'Data Analyst, BI Developer, Product Analyst, Quantitative Associate', 'BarChart3'),

(4, 'cybersecurity', 'Cybersecurity & Ethical Hacking', 'Software & Tech', 'CSE,AI&DS,ECE',
 'Protect network infrastructures, audit security vulnerabilities, and safeguard sensitive data.',
 'With the exponential rise in cyber threats, cybersecurity engineers specialize in defensive security, network packet analysis, cryptography, application penetration testing, and security compliance.',
 'Network Protocols, Linux Internals, Cryptography, Burp Suite, Wireshark, Python Scripting, SIEM',
 '6 LPA - 22 LPA', 'Security Analyst, Penetration Tester, Incident Responder, Cloud Security Associate', 'ShieldCheck'),

(5, 'embedded-systems-vlsi', 'Embedded Systems & VLSI Design', 'Electronics & Hardware', 'ECE,EEE',
 'Design semiconductors, integrated circuits, microcontrollers, and IoT hardware solutions.',
 'This pathway is tailored for electronics and electrical engineers interested in silicon chips, RTL design, FPGA synthesis, and microcontroller programming for automotive, consumer electronics, and defense.',
 'Embedded C, Verilog/VHDL, Microcontrollers (ARM/ESP32), Computer Architecture, PCB Design, RTOS',
 '6 LPA - 25 LPA', 'VLSI Design Engineer, Embedded Firmware Engineer, Hardware Verification Engineer, IoT Developer', 'Zap'),

(6, 'electrical-smart-grid', 'Power Systems & EV Technology', 'Core Engineering', 'EEE,Mechanical Engineering',
 'Pioneer renewable energy grids, battery management systems, and electric vehicle powertrains.',
 'Addresses modern electrical challenges including smart metering, solar/wind renewable integration, motor drives, power electronics converters, and EV battery systems.',
 'MATLAB/Simulink, Power Electronics, Battery Management Systems (BMS), PLC/SCADA, Control Systems',
 '5 LPA - 18 LPA', 'EV Powertrain Engineer, Power Systems Engineer, Control Systems Specialist, Energy Consultant', 'BatteryCharging'),

(7, 'mechanical-design-robotics', 'CAD/CAM, Robotics & Automation', 'Core Engineering', 'Mechanical Engineering,EEE',
 'Engineer physical components, robotic arms, finite element simulations, and smart manufacturing.',
 'Combines mechanical engineering fundamentals with computational automation. Students master 3D CAD modeling, structural finite element analysis, computational fluid dynamics (CFD), and kinematic robotics.',
 'SolidWorks, AutoCAD, ANSYS FEA/CFD, GD&T, Mechatronics, Python for Automation, Additive Manufacturing',
 '4.5 LPA - 16 LPA', 'CAD Design Engineer, FEA/CFD Analyst, Robotics Engineer, Manufacturing Specialist', 'Wrench'),

(8, 'civil-structural-bim', 'Structural Engineering & BIM Design', 'Core Engineering', 'Civil Engineering',
 'Design smart infrastructure, execute structural load analyses, and coordinate Building Information Modeling.',
 'Focuses on sustainable urban infrastructure, modern transportation systems, earthquake-resistant design, and digital construction project management via 3D/4D BIM.',
 'AutoCAD, Revit BIM, STAAD.Pro, ETABS, Geotechnical Mechanics, Project Estimation & Primavera',
 '4.5 LPA - 15 LPA', 'Structural Engineer, BIM Coordinator, Site Project Manager, Geotechnical Consultant', 'Building2'),

(9, 'gate-higher-studies', 'GATE & Higher Studies (M.Tech / MS / PhD)', 'Govt & Higher Studies', 'CSE,AI&DS,ECE,EEE,Mechanical Engineering,Civil Engineering',
 'Crack GATE with top AIR for admissions to IITs, IISc, PSU recruitments, or top global universities.',
 'A disciplined academic trajectory focused on mastering fundamental B.Tech core syllabus subjects, previous year questions (PYQs), mock test series, and research methodology for PSU roles or premier postgraduate research.',
 'Core Engineering Mathematics, Branch Subject Fundamentals, Time Management, Numerical Problem Solving',
 'PSU: 12-20 LPA / Post-Grad: 18-40 LPA', 'PSU Executive Engineer (IOCL, ONGC, NTPC, BHEL), IIT Research Fellow, Global Master of Science', 'GraduationCap'),

(10, 'civil-services-govt-exams', 'UPSC, IES & Government Engineering Services', 'Govt & Higher Studies', 'CSE,AI&DS,ECE,EEE,Mechanical Engineering,Civil Engineering',
 'Prepare for Indian Engineering Services (ESE), State PSCs, RRB SSE, and administrative civil services.',
 'Guides engineering students aiming for leadership in public administration, railways, defense research, and public works through comprehensive GS, aptitude, and technical paper preparation.',
 'General Studies, Engineering Aptitude, Technical Subject Depth, Essay Writing, Interview Etiquette',
 'Central Govt Pay Band-3 (Approx 10-15 LPA + Govt Perks)', 'Assistant Executive Engineer (CPWD, MES, Railways), Section Officer, State Gazetted Engineer', 'Award')
ON DUPLICATE KEY UPDATE title=VALUES(title);

-- 2. Insert Roadmap Topics
INSERT INTO roadmap_topics (career_id, year_level, order_num, topic_name, description, recommended_resources, suggested_next_step) VALUES
(1, 1, 1, 'Programming Fundamentals (C / C++ / Python)', 'Build strong algorithmic foundations: variables, control flow, loops, functions, memory pointers, and modular programming.', 'Harvard CS50x on edX, W3Schools C++ Tutorial, GeeksforGeeks C Programming basics', 'Solve 30 easy logic problems on HackerRank or LeetCode.'),
(1, 1, 2, 'Discrete Mathematics & Logic Building', 'Understand sets, relations, propositional logic, graph theory basics, and combinatorics essential for computation.', 'MIT OpenCourseWare Mathematics for Computer Science, NPTEL Discrete Mathematics', 'Review truth tables and recurrence relations.'),
(1, 1, 3, 'Version Control with Git & GitHub', 'Learn branching, merging, pull requests, resolving merge conflicts, and publishing your first GitHub repository.', 'GitHub Skills interactive courses, Pro Git free book, freeCodeCamp Git crash course', 'Create a GitHub profile and push daily practice code.'),
(1, 2, 1, 'Data Structures: Arrays, Lists, Stacks & Queues', 'Master linear data structures, internal memory representation, and Big-O asymptotic time/space complexity analysis.', 'GeeksforGeeks DSA Self-Paced, Abdul Bari Algorithms on YouTube, LeetCode Explore Cards', 'Implement custom Linked Lists and Stacks from scratch in your primary language.'),
(1, 2, 2, 'Non-Linear DS: Trees, Heaps, and Graphs', 'Understand binary search trees, AVL balancing, priority queues, BFS, DFS, and shortest path algorithms (Dijkstra).', 'NeetCode 150 Roadmap, MIT OCW Introduction to Algorithms (6.006)', 'Solve 40 tree and graph traversal problems on LeetCode.'),
(1, 2, 3, 'Relational Databases & SQL Mastery', 'Design normalized relational schemas (1NF to BCNF), write complex JOINs, subqueries, indexing, and ACID transactions.', 'Mode Analytics SQL Tutorial, MySQL Official Documentation, SQLZoo interactive tutorials', 'Build a normalized schema with 5 related tables and test queries.'),
(1, 3, 1, 'Full-Stack Web Development & REST APIs', 'Create frontend interfaces with React/JavaScript and RESTful APIs with Node.js/Express with JWT authentication.', 'The Odin Project, MDN Web Docs, freeCodeCamp Full Stack Certification', 'Develop and deploy a complete full-stack web application with user auth.'),
(1, 3, 2, 'Operating Systems & Computer Networks Core', 'Prepare for technical interviews: processes vs threads, CPU scheduling, deadlocks, virtual memory, TCP/IP, DNS, and HTTP/HTTPS.', 'Galvin Operating Systems concepts, Kurose & Ross Computer Networking, Gate Smashers OS playlist', 'Create summary revision sheets for top 50 OS and Networking questions.'),
(1, 3, 3, 'Internship Hunting & Open Source Contributions', 'Craft an ATS-compliant 1-page resume, apply to summer internships via official portals, and contribute to open-source.', 'Harvard Resume Guide, Good First Issue GitHub repo, LinkedIn Networking best practices', 'Apply to at least 15 verified internship openings on official career sites.'),
(1, 4, 1, 'Low-Level & High-Level System Design', 'Learn object-oriented design patterns (SOLID), load balancing, caching (Redis), database sharding, and message queues (Kafka).', 'System Design Primer on GitHub, Gaurav Sen System Design series, Designing Data-Intensive Applications', 'Design a URL shortener and an e-commerce checkout architecture.'),
(1, 4, 2, 'Mock Interviews & Company-Specific Prep', 'Practice timed coding rounds, behavioral STAR method questions, and peer mock interviews for campus and off-campus placements.', 'Pramp free mock interviews, LeetCode Company Tagged Questions, Cracking the Coding Interview book', 'Schedule 3 mock interviews and refine communication clarity.');

-- 3. Insert Learning Resources
INSERT INTO learning_resources (title, category, description, difficulty_level, external_url, provider, is_free) VALUES
('Harvard CS50: Introduction to Computer Science', 'Programming languages', 'World-renowned introductory course covering C, Python, SQL, algorithms, and fundamental computer science concepts with high-rigor problem sets.', 'Beginner', 'https://pll.harvard.edu/course/cs50-introduction-computer-science', 'Harvard University / edX', 1),
('GeeksforGeeks Complete DSA Guide', 'Data structures and algorithms', 'Comprehensive tutorials, visual diagrams, and code implementations in C++, Java, and Python for arrays, trees, dynamic programming, and graphs.', 'Intermediate', 'https://www.geeksforgeeks.org/data-structures/', 'GeeksforGeeks', 1),
('LeetCode Problem Solving Platform', 'Data structures and algorithms', 'Industry-standard platform for practicing algorithmic coding questions categorized by tags, company interview frequencies, and difficulty levels.', 'Intermediate', 'https://leetcode.com/problemset/all/', 'LeetCode', 1),
('MDN Web Docs (Mozilla Developer Network)', 'Web development', 'The authoritative reference documentation and learning path for HTML5 semantic markup, modern CSS layouts (Flexbox & Grid), and modern JavaScript APIs.', 'Beginner', 'https://developer.mozilla.org/en-US/docs/Learn', 'Mozilla', 1),
('React Official Documentation & Interactive Tour', 'Web development', 'Official guides for building single-page user interfaces using React components, JSX, hooks (useState, useEffect), and state management.', 'Intermediate', 'https://react.dev/learn', 'React Core Team', 1),
('Machine Learning Specialization by Andrew Ng', 'AI and machine learning', 'Foundational 3-course series by Stanford professor Andrew Ng covering supervised learning, neural networks, unsupervised algorithms, and recommender systems.', 'Beginner', 'https://www.deeplearning.ai/courses/machine-learning-specialization/', 'DeepLearning.AI / Coursera', 1),
('Kaggle Learn Free Interactive Micro-Courses', 'Data analytics', 'Hands-on browser-based interactive notebooks for Python, Pandas data cleaning, Data Visualization with Seaborn, and SQL fundamentals.', 'Beginner', 'https://www.kaggle.com/learn', 'Kaggle', 1),
('TryHackMe Pre-Security & Defensive Pathways', 'Cybersecurity', 'Gamified hands-on cybersecurity labs covering networking fundamentals, web application security, Linux privilege escalation, and vulnerability scanning.', 'Beginner', 'https://tryhackme.com/path/outline/pre-security', 'TryHackMe', 1),
('NPTEL (National Programme on Technology Enhanced Learning)', 'Core engineering subjects', 'Government of India funded premier open courseware taught by IIT and IISc professors across electrical, electronics, mechanical, and civil disciplines.', 'Intermediate', 'https://nptel.ac.in/courses', 'Ministry of Education, Govt of India / IITs', 1),
('IndiaBIX Quantitative Aptitude & Reasoning', 'Aptitude', 'Standard practice problems with step-by-step solutions for campus placement aptitude tests, numerical ability, logical deduction, and verbal exams.', 'Beginner', 'https://www.indiabix.com/aptitude/questions-and-answers/', 'IndiaBIX', 1),
('Tech Interview Handbook & Curated Cheatsheet', 'Technical interviews', 'Open-source guide covering algorithms study plans, behavioral STAR preparation, resume formatting tips, and negotiation tactics.', 'Intermediate', 'https://www.techinterviewhandbook.org/', 'Tech Interview Handbook Community', 1),
('GATE Overflow Free Previous Year Questions & Discussion', 'GATE preparation', 'Extensive community-verified solutions for all previous years GATE papers, subject-wise categorizations, and syllabus tracking.', 'Advanced', 'https://gateoverflow.in/', 'GATE Overflow Community', 1);

-- 4. Insert Opportunities
INSERT INTO opportunities (title, category, description, eligibility, deadline, official_source_url, application_url, status, is_verified) VALUES
('Google Summer of Code (GSoC) 2026', 'Internships', 'Global online mentoring program focused on bringing student developers into open source software development with international stipends.', 'Enrolled college students or open source beginners aged 18+. All B.Tech branches eligible.', '2026-04-15', 'https://summerofcode.withgoogle.com/', 'https://summerofcode.withgoogle.com/get-started', 'Upcoming', 1),
('Smart India Hackathon (SIH) – Student Edition', 'Hackathons', 'Nationwide initiative by the Ministry of Education to provide students a platform to solve pressing problems of ministries, departments, and industries.', 'B.Tech teams of 6 students (at least 1 female teammate mandatory). Valid college ID required.', '2026-09-30', 'https://www.sih.gov.in/', 'https://www.sih.gov.in/', 'Upcoming', 1),
('ISRO Student Internship & Project Work Scheme', 'Internships', 'Research project training and internship opportunities at ISRO centers (VSSC, URSC, SAC, NRSC) for engineering undergraduate students.', 'B.Tech students with minimum 60% or 6.32/10 CGPA in branches: ECE, EEE, Mechanical, CSE, Civil.', '2026-11-15', 'https://www.isro.gov.in/Careers.html', 'https://www.isro.gov.in/Internship.html', 'Active', 1),
('TCS CodeVita – Global Coding Contest', 'Coding competitions', 'Recognized by Guinness World Records as the world’s largest computer programming competition, offering direct interview opportunities at TCS.', 'Pre-final and final year B.Tech students from any recognized university.', '2026-08-20', 'https://campuscommune.tcs.com/en-in/intro/contests/codevita', 'https://campuscommune.tcs.com/en-in/intro/contests/codevita', 'Upcoming', 1),
('DRDO Research Internship Scheme', 'Government opportunities', 'Undergraduate project training in state-of-the-art defense laboratories in avionics, radar systems, robotics, and cyber defense.', 'Regular full-time B.Tech 3rd & 4th year students with no backlogs and high academic standing.', '2026-10-31', 'https://www.drdo.gov.in/careers', 'https://www.drdo.gov.in/student-corner', 'Active', 1),
('GATE 2027 Official Notification & Registration', 'GATE and higher studies', 'Graduate Aptitude Test in Engineering for admissions to Master’s programs and direct recruitment into premier Public Sector Undertakings (PSUs).', 'Candidates currently in the 3rd year or higher of any undergraduate degree program in Engineering/Technology.', '2026-09-28', 'https://gate.iitk.ac.in/', 'https://gate.iitk.ac.in/', 'Upcoming', 1),
('National Scholarship Portal (NSP) Post-Matric & Merit Schemes', 'Scholarships', 'Central and state government financial assistance scholarships for meritorious technical education students across India.', 'Enrolled B.Tech students satisfying family annual income thresholds and minimum score criteria.', '2026-12-15', 'https://scholarships.gov.in/', 'https://scholarships.gov.in/', 'Active', 1);

-- 5. Insert Quiz Questions
INSERT INTO quiz_questions (topic, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
('Programming', 'In C/C++, what is the time complexity of searching an element in a balanced Binary Search Tree (BST) with n nodes?', 'O(1)', 'O(n)', 'O(log n)', 'O(n log n)', 'C', 'A balanced BST divides the search space in half at each step, yielding logarithmic time O(log n).'),
('Programming', 'Which data structure is inherently used to implement recursion and function call stacks in modern computers?', 'Queue', 'Stack', 'Hash Table', 'Min Heap', 'B', 'Function frames follow a Last-In, First-Out (LIFO) pattern, which is managed by a Call Stack.'),
('Programming', 'What will be the output of typeof null in standard JavaScript?', '"null"', '"undefined"', '"object"', '"number"', 'C', 'In JavaScript, typeof null returning "object" is a historic legacy bug that has been preserved for backward compatibility.'),
('SQL', 'Which SQL clause is strictly used to filter rows based on aggregated values like COUNT() or AVG()?', 'WHERE', 'HAVING', 'GROUP BY', 'ORDER BY', 'B', 'The WHERE clause cannot be used with aggregate functions; the HAVING clause is specifically designed to filter groups after aggregation.'),
('SQL', 'What does the "I" stand for in ACID properties of relational database management systems?', 'Integrity', 'Indexing', 'Isolation', 'Iteration', 'C', 'ACID stands for Atomicity, Consistency, Isolation, and Durability.'),
('Aptitude', 'A train 120 meters long passes a telegraph pole in 6 seconds. What is the speed of the train in km/hr?', '60 km/hr', '72 km/hr', '80 km/hr', '90 km/hr', 'B', 'Speed = Distance / Time = 120m / 6s = 20 m/s. Converting to km/hr: 20 * (18/5) = 72 km/hr.'),
('Aptitude', 'If A can finish a work in 12 days and B can finish the same work in 24 days, how many days will they take working together?', '6 days', '8 days', '10 days', '18 days', 'B', 'Combined daily work = 1/12 + 1/24 = (2 + 1)/24 = 3/24 = 1/8. Total days = 8 days.'),
('Technical Fundamentals', 'Which layer of the OSI model is responsible for end-to-end reliable data delivery, flow control, and port addressing?', 'Network Layer', 'Data Link Layer', 'Transport Layer', 'Session Layer', 'C', 'The Transport Layer (Layer 4, e.g., TCP) handles end-to-end communication, segmentation, flow control, and port numbers.'),
('Technical Fundamentals', 'In Operating Systems, what is the situation called when two or more processes are unable to proceed because each is waiting for the other to release a resource?', 'Starvation', 'Deadlock', 'Thrashing', 'Context Switch', 'B', 'A deadlock occurs when processes hold resources while waiting for other resources held by other processes in a circular chain.'),
('Technical Fundamentals', 'Which semiconductor device operates in the reverse breakdown region to provide a stable reference voltage?', 'Schottky Diode', 'Zener Diode', 'Varactor Diode', 'LED', 'B', 'A Zener Diode is specifically designed to conduct in reverse breakdown, maintaining an almost constant voltage for regulation.');
