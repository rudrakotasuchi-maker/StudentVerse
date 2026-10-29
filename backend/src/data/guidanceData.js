// B.Tech Student Guidance Center Knowledge Base
// Structured guidance covering 7 foundational student dimensions

const guidanceCategories = [
  {
    id: 'academics',
    title: 'Academics & Semester Exams',
    tagline: 'Mastering course subjects, examination strategy, GPA maintenance & backlog management',
    icon: 'GraduationCap',
    topics: [
      {
        id: 'acad-study-strategy',
        title: 'How to Study Semester Subjects Effectively',
        summary: 'A disciplined semester study blueprint that prevents last-minute cramming and maintains an 8.0+ CGPA.',
        points: [
          'Download the official university syllabus at the beginning of each semester and highlight topics with the highest exam mark distribution.',
          'Adopt standard textbook references (e.g. Morris Mano for Digital Logic, Galvin for OS, Cormen for Algorithms) rather than relying solely on condensed guides.',
          'Maintain concise handwritten running notes during lectures. Summarize each chapter into a 2-page formula & definition revision sheet.',
          'Review each subject once per week for 45 minutes; spaced repetition improves long-term recall for university externals and competitive exams like GATE.'
        ],
        checklist: [
          'Downloaded university syllabus PDF for current semester',
          'Identified 2 recommended textbooks for each subject',
          'Created formula/concept sheet for Unit 1 and Unit 2'
        ]
      },
      {
        id: 'acad-exam-prep',
        title: 'Preparing for Internal & External Examinations',
        summary: 'Proven strategies for cracking internal mid-terms and university end-semester examinations.',
        points: [
          'Analyze the last 5 years of University question papers (PYQs). More than 60-70% of theoretical questions repeat across cyclical examination patterns.',
          'Internal exams (Mid-terms) contribute 20-30% of total marks. Aim for top scores in internals; they act as a safety net for your final semester GPA.',
          'Structure your written answers with neat diagrams, block charts, step-by-step algorithms, and clear equation derivations. Evaluators award marks for structured clarity.',
          'Manage exam time strictly: allot specific minutes per question based on mark weightage (e.g., 20 mins for 10-mark questions; 5 mins for 2-mark definitions).'
        ],
        checklist: [
          'Solved 3 previous year university question papers',
          'Practiced drawing all block diagrams without reference',
          'Timed mock write-up of a 10-mark derivation question'
        ]
      },
      {
        id: 'acad-timetable',
        title: 'Creating a Realistic Study Timetable',
        summary: 'Balancing college attendance, assignments, tech skill acquisition, and relaxation.',
        points: [
          'Avoid rigid 8-hour schedules that lead to burnout. Block 2 focused hours on weekdays for core college subjects and 1.5 hours for coding/practical skills.',
          'Utilize commute and college library free hours for reading standard documentation or revising formula sheets.',
          'Dedicate Saturday mornings to coding projects or hackathon prototyping and Sunday afternoons to weekly academic subject consolidation.'
        ],
        checklist: [
          'Drafted weekly schedule blocking 10 hours for technical skills',
          'Designated a weekly review block on Sunday'
        ]
      },
      {
        id: 'acad-backlogs',
        title: 'How to Manage & Clear Backlogs with Confidence',
        summary: 'A strategic, panic-free recovery plan to clear pending subjects without hurting current semester scores.',
        points: [
          'Analyze why the backlog occurred: was it insufficient preparation, difficult unit choices, or poor presentation in university papers?',
          'Do not study the entire syllabus from scratch when preparing for supplementary exams. Focus deeply on the 3 units that carry guaranteed passing marks.',
          'Dedicate 45 minutes daily to your backlog subject first thing in the morning before starting your regular semester curriculum.',
          'Clear all backlogs before entering your 6th semester. Most tier-1 campus placement drives strictly mandate zero active backlogs at the time of recruitment.'
        ],
        checklist: [
          'Identified 3 highest-yield units for the supplementary exam',
          'Practiced solved papers from previous 3 supplementary drives',
          'Targeted clearance in the immediate next exam window'
        ]
      },
      {
        id: 'acad-labs-viva',
        title: 'Assignments, Lab Records & Viva Voce Preparation',
        summary: 'Securing full internal practical marks and impressing external viva examiners.',
        points: [
          'Never submit copied lab records at the last moment. Complete experiments and observations within the same week the lab is conducted.',
          'For coding and hardware labs, understand the line-by-line working of every program and circuit schematic. External viva examiners specifically probe why a specific function or component was chosen.',
          'In viva voce, maintain composed eye contact, explain the foundational principles first, and acknowledge honestly if you are unsure about an edge-case instead of guessing.',
          'Maintain clean, documented GitHub repositories or code folders for all your lab work—this acts as an immediate reference for technical interviews.'
        ],
        checklist: [
          'Verified code execution for all lab experiments',
          'Reviewed oral viva questions for each experiment',
          'Record file signed and verified before deadline'
        ]
      }
    ]
  },
  {
    id: 'programming',
    title: 'Programming & Technical Skills',
    tagline: 'Language selection, daily coding habits, Data Structures & Algorithms, and portfolio building',
    icon: 'Code',
    topics: [
      {
        id: 'prog-first-language',
        title: 'Which Programming Language Should You Learn First?',
        summary: 'Choosing between C, C++, Java, and Python based on your career goals and college curriculum.',
        points: [
          'First Year Recommendation: Learn C or C++ first. They teach you computer memory pointers, CPU execution, arrays, and memory management that make all future languages trivial.',
          'For Placements & Competitive Programming: C++ (STL) or Java is the industry standard due to fast execution and rich built-in data structure libraries.',
          'For AI/ML & Data Science: Master Python. Its vast ecosystem (NumPy, Pandas, PyTorch) makes it irreplaceable in modern intelligent software.',
          'For Web & Mobile: Master modern JavaScript (ES6+) and TypeScript. One language powers both browser interfaces and backend servers.'
        ],
        checklist: [
          'Selected one primary language for problem solving',
          'Completed foundational syntax, loops, and pointers/objects',
          'Setup local compiler/runtime (GCC, JDK, or Node.js)'
        ]
      },
      {
        id: 'prog-daily-coding',
        title: 'How to Build a Consistent Daily Coding Habit',
        summary: 'Transitioning from tutorial paralysis to solving algorithmic challenges independently.',
        points: [
          'Avoid the "tutorial hell" trap of passively watching coding videos. Write and execute code yourself for every single concept you learn.',
          'Adopt the "One Problem a Day" rule. Solving 1 problem daily on LeetCode/HackerRank yields 365 solved problems in a single year.',
          'When stuck on a problem, try for at least 30-40 minutes before reading the editorial solution. Once you read the solution, close it and re-implement it from scratch.',
          'Maintain a personal "Learnings Journal" noting recurring patterns (e.g. Two Pointers, Sliding Window, Prefix Sums, Binary Search on Answer).'
        ],
        checklist: [
          'Created HackerRank or LeetCode account',
          'Solved first 15 basic algorithmic problems',
          'Committed daily solutions to a GitHub repository'
        ]
      },
      {
        id: 'prog-dsa-roadmap',
        title: 'The Structured Path to Mastering DSA',
        summary: 'Sequential progression from basic arrays to complex dynamic programming and graphs.',
        points: [
          'Phase 1 (Basics): Time and Space Complexity (Big-O notation), Arrays, Strings, Recursion, and Basic Math.',
          'Phase 2 (Linear DS): Linked Lists, Stacks, Queues, and Two-Pointer / Sliding Window patterns.',
          'Phase 3 (Non-Linear DS): Binary Trees, Binary Search Trees, Heaps/Priority Queues, and Hash Maps.',
          'Phase 4 (Advanced): Graphs (BFS, DFS, Dijkstra, Topo Sort) and Dynamic Programming (Memoization & Tabulation).'
        ],
        checklist: [
          'Mastered Big-O complexity analysis',
          'Implemented Linked List and Stack from scratch',
          'Solved top 50 LeetCode patterns (NeetCode 150 list)'
        ]
      },
      {
        id: 'prog-git-github',
        title: 'Mastering Git & GitHub for Engineers',
        summary: 'Version control workflows, commit etiquette, and public technical credibility.',
        points: [
          'Git is not just for backup—it is how global engineering teams collaborate. Learn command-line git: init, clone, add, commit, branch, checkout, merge, and pull request.',
          'Write meaningful commit messages: e.g. "feat: add user authentication with JWT" instead of "update code".',
          'Every repository must have a clear `README.md` with project screenshots, architecture overview, installation instructions, and API documentation.',
          'Contribute to open-source software via "Good First Issue" tags on GitHub to gain real-world collaboration experience.'
        ],
        checklist: [
          'Configured Git user name and email on local machine',
          'Created public GitHub profile with customized README',
          'Pushed at least 2 complete project repositories'
        ]
      }
    ]
  },
  {
    id: 'hackathons',
    title: 'Hackathons & Competitions',
    tagline: 'Team formation, problem selection, prototyping, pitching, and winning national competitions',
    icon: 'Trophy',
    topics: [
      {
        id: 'hack-understanding',
        title: 'What Exactly is a Hackathon and How Does It Work?',
        summary: 'Demystifying the 24-48 hour innovation sprints that accelerate student careers.',
        points: [
          'A hackathon is a time-bound marathon (usually 24 to 36 hours) where teams build a working prototype that solves a specific real-world challenge.',
          'You do not need to be a coding genius to participate. Hackathon teams require diverse skillsets: frontend design, backend logic, presentation, and domain research.',
          'Hackathons are premier hiring grounds. Tech sponsors and judges actively recruit standout participants for paid internships and entry-level engineering roles.'
        ],
        checklist: [
          'Understood hackathon rules and judging criteria',
          'Identified 2 upcoming hackathons on Devfolio or Unstop'
        ]
      },
      {
        id: 'hack-team-formation',
        title: 'How to Form a Balanced Winning Team',
        summary: 'Selecting teammates with complementary technical and presentation strengths.',
        points: [
          'A standard 4-member hackathon team should ideally comprise: 1 Frontend/UI specialist, 1 Backend/Database developer, 1 Domain/API specialist, and 1 Pitch/Presentation lead.',
          'For national hackathons like Smart India Hackathon (SIH), ensure your team complies with official gender diversity criteria (e.g., at least one female team member).',
          'Conduct pre-hackathon dry runs: test communication tools (Discord/Slack), agree on the tech stack in advance, and setup boilerplate GitHub repositories before the event begins.'
        ],
        checklist: [
          'Assembled a team with frontend, backend, and pitch strengths',
          'Conducted a pre-hackathon 2-hour practice sprint'
        ]
      },
      {
        id: 'hack-prototype-pitch',
        title: 'Building the Prototype & Delivering the Winning Pitch',
        summary: 'Turning incomplete code into a compelling 3-minute jury presentation.',
        points: [
          'Scope realistically: A polished, working MVP with 2 core features beats an ambitious system with 10 broken buttons every single time.',
          'Start preparing the slide deck and demo script at least 4 hours before the hackathon deadline. Do not code until the final minute.',
          'Follow the 3-minute pitch structure: 30s Problem context -> 45s Proposed innovation -> 60s Live working demo -> 30s Impact & business feasibility -> 15s Team background.'
        ],
        checklist: [
          'Recorded a 1-minute fallback video demo in case of live server issues',
          'Prepared clean 5-slide presentation deck',
          'Rehearsed 3-minute pitch with timer'
        ]
      }
    ]
  },
  {
    id: 'internships',
    title: 'Internships & Job Opportunities',
    tagline: 'When to apply, ATS resumes, official company portals, and avoiding scam offers',
    icon: 'Briefcase',
    topics: [
      {
        id: 'intern-timeline',
        title: 'When Should B.Tech Students Start Applying for Internships?',
        summary: 'Year-by-year internship roadmap from summer exploration to pre-placement offers (PPO).',
        points: [
          '1st Year Summer: Focus on learning core programming, contributing to open-source, or building basic personal projects.',
          '2nd Year Summer: Target startup internships, open-source programs (Google Summer of Code, Outreachy), and research internships at IITs/NITs.',
          '3rd Year (Crucial Window): On-campus summer internship drives happen in Semester 5 (July-October). Off-campus applications open for product companies 6-8 months in advance.',
          'A successful 3rd-year summer internship frequently converts into a full-time Pre-Placement Offer (PPO), eliminating 4th-year placement stress entirely.'
        ],
        checklist: [
          'Identified key hiring seasons for target industries',
          'Prepared ATS resume by the start of 5th semester',
          'Maintained active LinkedIn and GitHub profiles'
        ]
      },
      {
        id: 'intern-official-applying',
        title: 'How to Find & Apply via Official Channels',
        summary: 'Bypassing noisy job aggregators and getting your application directly to engineering managers.',
        points: [
          'Always apply directly through the company’s official careers portal (e.g. amazon.jobs, careers.google.com, microsoft.com/careers).',
          'Seek employee referrals on LinkedIn: reach out politely to college alumni or engineers working in your target team with a brief message highlighting your matching skills and job ID.',
          'Explore structured student programs: Amazon WOW, Google Summer of Code, ISRO Internship Scheme, DRDO Project Trainee program, and Microsoft Engage.'
        ],
        checklist: [
          'Tracked target companies in an application spreadsheet',
          'Crafted respectful 3-sentence LinkedIn referral request template',
          'Applied to verified openings on official company portals'
        ]
      },
      {
        id: 'intern-fraud-prevention',
        title: 'How to Identify & Avoid Fraudulent Internship Offers',
        summary: 'Protecting your money, personal data, and dignity from predatory training scams.',
        points: [
          'Golden Rule: Legitimate companies PAY you a stipend. Any organization asking you to pay a "registration fee," "training fee," or "security deposit" is a scam.',
          'Check the sender’s email domain: Official communication comes from `@company.com`, never from `@gmail.com`, `@yahoo.com`, or unverified WhatsApp groups.',
          'Verify certificate validity: Certificates from fly-by-night training centers hold zero weight with tier-1 placement interviewers. Genuine skills and working GitHub repositories are what count.'
        ],
        checklist: [
          'Verified company domain and official registration',
          'Rejected any offer requiring payment or training fees',
          'Confirmed mentor background on LinkedIn'
        ]
      }
    ]
  },
  {
    id: 'gate',
    title: 'GATE & Competitive Examinations',
    tagline: 'Structure, syllabus, PSU recruitment, IIT admissions, and previous year paper strategies',
    icon: 'Target',
    topics: [
      {
        id: 'gate-overview',
        title: 'What is GATE and Why Should You Consider It?',
        summary: 'Understanding the premier national gateway to IIT M.Tech programs, PSU jobs, and international research.',
        points: [
          'GATE (Graduate Aptitude Test in Engineering) is conducted jointly by IISc and 7 IITs for admission to Masters programs and recruitment in prestigious Public Sector Undertakings (PSUs).',
          'Top PSUs like IOCL, ONGC, NTPC, BHEL, PowerGrid, and BARC recruit Executive Engineers directly through GATE scores with starting packages of 12-20 LPA plus government housing.',
          'Eligibility: Students in their 3rd year (pre-final) and 4th year (final) of B.Tech are eligible to appear for the exam.'
        ],
        checklist: [
          'Downloaded official GATE information brochure',
          'Reviewed paper code and syllabus for your branch (CS, EC, EE, ME, CE)'
        ]
      },
      {
        id: 'gate-strategy',
        title: 'Creating a Winning 1-Year GATE Preparation Strategy',
        summary: 'Balancing B.Tech coursework with disciplined subject-wise competitive study.',
        points: [
          'Engineering Mathematics (13-15 marks) and General Aptitude (15 marks) account for 28% of total score. Master them early; they are the highest ROI sections.',
          'Target 4-5 high-weightage core subjects first (e.g. for CSE: Algorithms, OS, DBMS, Networks, and Theory of Computation).',
          'Solve the last 20 years of Previous Year Questions (PYQs). Avoid memorizing steps; solve on unruled sheets using the official virtual calculator app.',
          'Enroll in a national online test series (e.g. Made Easy or ACE) 4 months prior to the exam to build 3-hour speed, stamina, and minimize negative marking.'
        ],
        checklist: [
          'Created formula reference handbook for Engineering Mathematics',
          'Solved 10 years of branch-specific GATE PYQs',
          'Practiced using the official GATE Virtual Calculator'
        ]
      }
    ]
  },
  {
    id: 'higher-studies',
    title: 'Higher Studies & Research',
    tagline: 'Postgraduate paths, M.Tech at IITs, MS abroad, research fellowships, and entrance exams',
    icon: 'Award',
    topics: [
      {
        id: 'hs-mtech-ms',
        title: 'M.Tech in India vs MS Abroad: Comprehensive Comparison',
        summary: 'Evaluating costs, scholarships, research opportunities, and global career mobility.',
        points: [
          'M.Tech at Premier Indian Institutes (IITs, IISc, NITs): Funded via GATE monthly stipend (₹12,400/month), low tuition cost, exceptional campus placements in core R&D labs.',
          'MS Abroad (USA, Germany, Singapore, Canada): Outstanding research infrastructure, global industry exposure; requires GRE, TOEFL/IELTS, Letters of Recommendation (LOR), and Statement of Purpose (SOP).',
          'European Public Universities (e.g., Germany) offer zero or near-zero tuition fees, making them highly economical for engineering graduates with strong academic CGPA (8.0+).'
        ],
        checklist: [
          'Checked CGPA eligibility thresholds for target universities',
          'Reviewed entrance requirements (GATE vs GRE/IELTS)'
        ]
      },
      {
        id: 'hs-research-fellowships',
        title: 'Undergraduate Research & Publications',
        summary: 'How to write your first research paper and work with professors.',
        points: [
          'Identify professors in your department whose research matches your interests. Approach them during office hours having read their recent research papers.',
          'Apply for formal Summer Research Fellowships at IISc, IITs (e.g., IIT Delhi SURA, IIT Bombay SFP), or TIFR during your 2nd and 3rd year.',
          'Publishing a paper in a peer-reviewed IEEE or Springer conference drastically boosts your candidacy for top global graduate school admissions.'
        ],
        checklist: [
          'Approached 1 college professor regarding undergraduate research',
          'Read 3 IEEE research papers in your field of interest'
        ]
      }
    ]
  },
  {
    id: 'placement-prep',
    title: 'Placement Preparation & Job Ready Kit',
    tagline: '1-page ATS resumes, LinkedIn networking, aptitude filtration rounds, and HR behavioral questions',
    icon: 'Briefcase',
    topics: [
      {
        id: 'place-resume',
        title: 'Crafting an ATS-Compliant 1-Page B.Tech Resume',
        summary: 'Eliminating disqualification errors and highlighting engineering impact.',
        points: [
          'Strict 1-Page Constraint: Undergraduate engineering resumes must fit on exactly one standard A4 or US Letter page.',
          'Use standard single-column formats. Avoid graphical rating bars, icons, profile photos, or multi-column templates that confuse Applicant Tracking Systems (ATS).',
          'Structure bullet points using the Google "X-Y-Z" formula: "Accomplished [X], as measured by [Y], by doing [Z]". Include concrete metrics (% improvement, latency decrease, users served).',
          'Hyperlink your live demo URLs, GitHub repositories, and LinkedIn profile at the top of the resume.'
        ],
        checklist: [
          'Converted resume to clean 1-page PDF format',
          'Verified all project URLs and GitHub links work',
          'Ran resume through free ATS readability tools'
        ]
      },
      {
        id: 'place-aptitude',
        title: 'Cracking Campus Placement Aptitude Rounds',
        summary: 'Techniques to clear the initial 60-minute quantitative and logical filtration hurdle.',
        points: [
          'More than 70% of engineering students get eliminated in the first round due to quantitative aptitude, not coding.',
          'Master high-frequency topics: Percentages, Profit & Loss, Time & Work, Speed Time & Distance, Permutations & Combinations, and Syllogisms.',
          'Learn shortcut mental arithmetic tricks to solve questions in under 45-60 seconds. IndiaBIX and RS Aggarwal are standard prep sources.'
        ],
        checklist: [
          'Practiced top 10 quantitative aptitude categories',
          'Attempted 3 timed 30-minute aptitude mock tests'
        ]
      },
      {
        id: 'place-interview-hr',
        title: 'Acing Technical & Behavioral HR Interviews',
        summary: 'The STAR framework, mock interviews, and handling tricky questions.',
        points: [
          'Use the STAR Method for behavioral questions: Situation -> Task -> Action -> Result.',
          'When asked "Tell me about yourself", deliver a structured 90-second pitch: 30s background & branch -> 30s top technical project highlights -> 30s why you are excited about this specific role.',
          'Always prepare 2 thoughtful questions for the interviewer at the end of the round (e.g. "What does a typical day look like for a junior engineer on this team?").'
        ],
        checklist: [
          'Drafted and practiced 90-second self-introduction',
          'Prepared 3 project stories using the STAR framework',
          'Scheduled a peer mock interview on Pramp or with seniors'
        ]
      }
    ]
  }
];

module.exports = {
  guidanceCategories
};
