const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const seedData = require('../data/seedData');

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'studentverse_db',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

let pool = null;
let isConnected = false;

// Fallback in-memory store in case MySQL credentials are yet to be entered by the student
const fallbackStore = {
  students: [],
  career_paths: [...seedData.careerPaths],
  roadmap_topics: [...seedData.roadmapTopics.map((t, idx) => ({ id: idx + 1, ...t }))],
  learning_resources: [...seedData.learningResources],
  saved_resources: [],
  opportunities: [...seedData.opportunities],
  quiz_questions: [...seedData.quizQuestions],
  quiz_attempts: [],
  student_progress: []
};

let nextStudentId = 1;
let nextAttemptId = 1;
let nextProgressId = 1;
let nextSavedId = 1;
let nextOppId = 20;

// Initialize Database connection and auto-create tables if needed
async function initializeDatabase() {
  try {
    // 1. Connect without database selected to ensure database exists
    const rootConnection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      port: dbConfig.port
    });

    await rootConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await rootConnection.end();

    // 2. Create the connection pool with the database
    pool = mysql.createPool(dbConfig);

    // Test connection
    const testConn = await pool.getConnection();
    console.log(`[Database] Successfully connected to MySQL database "${dbConfig.database}" at ${dbConfig.host}:${dbConfig.port}`);
    testConn.release();

    isConnected = true;

    // 3. Create tables if they do not exist
    await createTablesIfNotExist();

    // 4. Ensure schema columns exist (safe migration for MySQL 8.0)
    await ensureColumnsExist();

    // 5. Seed initial data if tables are empty or need sync
    await seedInitialData();

    return pool;
  } catch (error) {
    console.warn(`[Database Warning] MySQL connection failed (${error.code || error.message}).`);
    console.warn('[Database Notice] Running with in-memory persistence fallback. Update DB_PASSWORD in backend/.env to connect to live MySQL.');
    isConnected = false;
    return null;
  }
}

async function createTablesIfNotExist() {
  if (!pool) return;

  const queries = [
    `CREATE TABLE IF NOT EXISTS career_paths (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(100) NOT NULL UNIQUE,
      title VARCHAR(150) NOT NULL,
      category VARCHAR(100) NOT NULL,
      branch_affinity VARCHAR(255) NOT NULL,
      prerequisites_non_branch TEXT NULL,
      short_description TEXT NOT NULL,
      full_overview TEXT NOT NULL,
      key_skills TEXT NOT NULL,
      avg_package_range VARCHAR(100) NOT NULL,
      roles VARCHAR(255) NOT NULL,
      icon VARCHAR(50) DEFAULT 'Compass',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_career_slug (slug)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(150) NOT NULL,
      email VARCHAR(191) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      branch ENUM('CSE', 'AI&DS', 'AI&ML', 'IT', 'ECE', 'EEE', 'Mechanical Engineering', 'Civil Engineering') NOT NULL,
      academic_year INT NOT NULL CHECK (academic_year BETWEEN 1 AND 4),
      areas_of_interest TEXT NULL,
      target_career_id INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_student_email (email),
      INDEX idx_student_branch (branch),
      FOREIGN KEY (target_career_id) REFERENCES career_paths(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS roadmap_topics (
      id INT AUTO_INCREMENT PRIMARY KEY,
      career_id INT NOT NULL,
      year_level INT NOT NULL CHECK (year_level BETWEEN 1 AND 4),
      order_num INT NOT NULL DEFAULT 1,
      topic_name VARCHAR(150) NOT NULL,
      learning_objective TEXT NULL,
      description TEXT NOT NULL,
      importance TEXT NULL,
      prerequisites TEXT NULL,
      learning_sequence TEXT NULL,
      tools_technologies TEXT NULL,
      recommended_resources TEXT NOT NULL,
      practice_exercises TEXT NULL,
      mini_project TEXT NULL,
      completion_criteria TEXT NULL,
      interview_questions TEXT NULL,
      estimated_effort VARCHAR(255) NULL,
      suggested_next_step TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (career_id) REFERENCES career_paths(id) ON DELETE CASCADE,
      INDEX idx_roadmap_career_year (career_id, year_level)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS student_progress (
      id INT AUTO_INCREMENT PRIMARY KEY,
      student_id INT NOT NULL,
      topic_id INT NOT NULL,
      completed BOOLEAN DEFAULT TRUE,
      completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uk_student_topic (student_id, topic_id),
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
      FOREIGN KEY (topic_id) REFERENCES roadmap_topics(id) ON DELETE CASCADE,
      INDEX idx_progress_student (student_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS learning_resources (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      category VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      difficulty_level ENUM('Beginner', 'Intermediate', 'Advanced') NOT NULL DEFAULT 'Beginner',
      external_url VARCHAR(500) NOT NULL,
      provider VARCHAR(100) NOT NULL,
      is_free BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_resource_category (category)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS saved_resources (
      id INT AUTO_INCREMENT PRIMARY KEY,
      student_id INT NOT NULL,
      resource_id INT NOT NULL,
      saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uk_student_resource (student_id, resource_id),
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
      FOREIGN KEY (resource_id) REFERENCES learning_resources(id) ON DELETE CASCADE,
      INDEX idx_saved_student (student_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS opportunities (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category ENUM(
        'Internships',
        'Hackathons',
        'Coding competitions',
        'Scholarships',
        'Jobs',
        'Government opportunities',
        'GATE and higher studies'
      ) NOT NULL,
      description TEXT NOT NULL,
      eligibility TEXT NOT NULL,
      deadline DATE NULL,
      official_source_url VARCHAR(500) NOT NULL,
      application_url VARCHAR(500) NOT NULL,
      status ENUM('Active', 'Upcoming', 'Closed') DEFAULT 'Active',
      is_verified BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_opportunity_category (category)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS quiz_questions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      topic VARCHAR(100) NOT NULL,
      question_text TEXT NOT NULL,
      option_a TEXT NOT NULL,
      option_b TEXT NOT NULL,
      option_c TEXT NOT NULL,
      option_d TEXT NOT NULL,
      correct_option CHAR(1) NOT NULL,
      explanation TEXT NOT NULL,
      INDEX idx_quiz_topic (topic)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

    `CREATE TABLE IF NOT EXISTS quiz_attempts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      student_id INT NOT NULL,
      topic VARCHAR(100) NOT NULL,
      score INT NOT NULL,
      total_questions INT NOT NULL,
      percentage DECIMAL(5,2) NOT NULL,
      attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
      INDEX idx_attempt_student (student_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
  ];

  for (const query of queries) {
    try {
      await pool.query(query);
    } catch (err) {
      console.error('[Schema Error]:', err.message);
    }
  }
}

async function ensureColumnsExist() {
  if (!pool) return;
  try {
    // 1. career_paths.prerequisites_non_branch
    const [cpCols] = await pool.query(
      `SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'career_paths'`,
      [dbConfig.database]
    );
    const cpColNames = cpCols.map(c => c.COLUMN_NAME.toLowerCase());
    if (!cpColNames.includes('prerequisites_non_branch')) {
      await pool.query('ALTER TABLE career_paths ADD COLUMN prerequisites_non_branch TEXT NULL AFTER branch_affinity');
      console.log('[Migration] Added column prerequisites_non_branch to career_paths');
    }

    // 2. roadmap_topics rich fields
    const [rtCols] = await pool.query(
      `SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'roadmap_topics'`,
      [dbConfig.database]
    );
    const rtColNames = rtCols.map(c => c.COLUMN_NAME.toLowerCase());

    const neededCols = [
      { name: 'learning_objective', type: 'TEXT NULL' },
      { name: 'importance', type: 'TEXT NULL' },
      { name: 'prerequisites', type: 'TEXT NULL' },
      { name: 'learning_sequence', type: 'TEXT NULL' },
      { name: 'tools_technologies', type: 'TEXT NULL' },
      { name: 'practice_exercises', type: 'TEXT NULL' },
      { name: 'mini_project', type: 'TEXT NULL' },
      { name: 'completion_criteria', type: 'TEXT NULL' },
      { name: 'interview_questions', type: 'TEXT NULL' },
      { name: 'estimated_effort', type: 'VARCHAR(255) NULL' }
    ];

    for (const col of neededCols) {
      if (!rtColNames.includes(col.name.toLowerCase())) {
        await pool.query(`ALTER TABLE roadmap_topics ADD COLUMN \`${col.name}\` ${col.type}`);
        console.log(`[Migration] Added column ${col.name} to roadmap_topics`);
      }
    }
  } catch (err) {
    console.error('[Migration Error]:', err.message);
  }
}

async function seedInitialData() {
  if (!pool) return;

  try {
    const [cCount] = await pool.query('SELECT COUNT(*) as count FROM career_paths');
    const [tCount] = await pool.query('SELECT COUNT(*) as count FROM roadmap_topics');

    if (cCount[0].count < seedData.careerPaths.length || tCount[0].count < seedData.roadmapTopics.length) {
      console.log(`[Database Seeder] Upserting all ${seedData.careerPaths.length} career paths and ${seedData.roadmapTopics.length} roadmap topics into MySQL safely without deleting student progress...`);

      for (const c of seedData.careerPaths) {
        const [existing] = await pool.query('SELECT id FROM career_paths WHERE id = ? OR slug = ?', [c.id, c.slug]);
        if (existing.length > 0) {
          await pool.query(
            `UPDATE career_paths 
             SET slug = ?, title = ?, category = ?, branch_affinity = ?, prerequisites_non_branch = ?, 
                 short_description = ?, full_overview = ?, key_skills = ?, avg_package_range = ?, roles = ?, icon = ?
             WHERE id = ?`,
            [c.slug, c.title, c.category, c.branch_affinity, c.prerequisites_non_branch || '', c.short_description, c.full_overview, c.key_skills, c.avg_package_range, c.roles, c.icon, existing[0].id]
          );
        } else {
          await pool.query(
            `INSERT INTO career_paths (id, slug, title, category, branch_affinity, prerequisites_non_branch, short_description, full_overview, key_skills, avg_package_range, roles, icon)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [c.id, c.slug, c.title, c.category, c.branch_affinity, c.prerequisites_non_branch || '', c.short_description, c.full_overview, c.key_skills, c.avg_package_range, c.roles, c.icon]
          );
        }
      }

      for (const t of seedData.roadmapTopics) {
        const [existing] = await pool.query(
          'SELECT id FROM roadmap_topics WHERE career_id = ? AND year_level = ? AND order_num = ?',
          [t.career_id, t.year_level, t.order_num]
        );
        if (existing.length > 0) {
          await pool.query(
            `UPDATE roadmap_topics 
             SET topic_name = ?, learning_objective = ?, description = ?, importance = ?, prerequisites = ?, 
                 learning_sequence = ?, tools_technologies = ?, recommended_resources = ?, practice_exercises = ?, 
                 mini_project = ?, completion_criteria = ?, interview_questions = ?, estimated_effort = ?, suggested_next_step = ?
             WHERE id = ?`,
            [
              t.topic_name, t.learning_objective || '', t.description, t.importance || '', t.prerequisites || '',
              t.learning_sequence || '', t.tools_technologies || '', t.recommended_resources || '', t.practice_exercises || '',
              t.mini_project || '', t.completion_criteria || '', t.interview_questions || '', t.estimated_effort || '', t.suggested_next_step || '',
              existing[0].id
            ]
          );
        } else {
          await pool.query(
            `INSERT INTO roadmap_topics (career_id, year_level, order_num, topic_name, learning_objective, description, importance, prerequisites, learning_sequence, tools_technologies, recommended_resources, practice_exercises, mini_project, completion_criteria, interview_questions, estimated_effort, suggested_next_step)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              t.career_id, t.year_level, t.order_num, t.topic_name, t.learning_objective || '', t.description,
              t.importance || '', t.prerequisites || '', t.learning_sequence || '', t.tools_technologies || '',
              t.recommended_resources || '', t.practice_exercises || '', t.mini_project || '',
              t.completion_criteria || '', t.interview_questions || '', t.estimated_effort || '', t.suggested_next_step || ''
            ]
          );
        }
      }
      console.log('[Database Seeder] Completed safe upsert of careers and roadmaps!');
    }

    const [existingResources] = await pool.query('SELECT COUNT(*) as count FROM learning_resources');
    if (existingResources[0].count === 0) {
      console.log('[Database Seeder] Seeding learning resources into MySQL...');
      for (const r of seedData.learningResources) {
        await pool.query(
          `INSERT INTO learning_resources (id, title, category, description, difficulty_level, external_url, provider, is_free)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [r.id, r.title, r.category, r.description, r.difficulty_level, r.external_url, r.provider, r.is_free ? 1 : 0]
        );
      }
    }

    const [existingOpps] = await pool.query('SELECT COUNT(*) as count FROM opportunities');
    if (existingOpps[0].count === 0) {
      console.log('[Database Seeder] Seeding opportunities into MySQL...');
      for (const o of seedData.opportunities) {
        await pool.query(
          `INSERT INTO opportunities (id, title, category, description, eligibility, deadline, official_source_url, application_url, status, is_verified)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [o.id, o.title, o.category, o.description, o.eligibility, o.deadline, o.official_source_url, o.application_url, o.status, o.is_verified ? 1 : 0]
        );
      }
    }

    const [existingQuizzes] = await pool.query('SELECT COUNT(*) as count FROM quiz_questions');
    if (existingQuizzes[0].count === 0) {
      console.log('[Database Seeder] Seeding quiz questions into MySQL...');
      for (const q of seedData.quizQuestions) {
        await pool.query(
          `INSERT INTO quiz_questions (id, topic, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [q.id, q.topic, q.question_text, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_option, q.explanation]
        );
      }
    }
  } catch (error) {
    console.error('[Seeding Error]:', error.message);
  }
}

// Wrapper for parameterized queries with graceful fallback
async function query(sql, params = []) {
  if (pool && isConnected) {
    try {
      const [results] = await pool.query(sql, params);
      return results;
    } catch (err) {
      console.error(`[MySQL Query Error]: ${err.message}`);
      throw err;
    }
  }

  // Fallback simulator for offline demonstration mode
  const cleanSql = sql.trim();

  // 1. SELECT students WHERE email = ?
  if (cleanSql.includes('FROM students') && cleanSql.includes('WHERE s.email = ?')) {
    const email = params[0];
    const student = fallbackStore.students.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (!student) return [];
    const career = fallbackStore.career_paths.find(c => c.id === student.target_career_id);
    return [{
      ...student,
      target_career_title: career ? career.title : null,
      target_career_slug: career ? career.slug : null
    }];
  }

  if (cleanSql.includes('FROM students WHERE email = ?')) {
    const email = params[0];
    const student = fallbackStore.students.find(s => s.email.toLowerCase() === email.toLowerCase());
    return student ? [student] : [];
  }

  // 2. INSERT INTO students
  if (cleanSql.startsWith('INSERT INTO students')) {
    const [full_name, email, password_hash, branch, academic_year, areas_of_interest] = params;
    const newStudent = {
      id: nextStudentId++,
      full_name,
      email,
      password_hash,
      branch,
      academic_year,
      areas_of_interest,
      target_career_id: null,
      created_at: new Date()
    };
    fallbackStore.students.push(newStudent);
    return { insertId: newStudent.id, affectedRows: 1 };
  }

  // 3. SELECT students WHERE id = ?
  if (cleanSql.includes('FROM students') && cleanSql.includes('WHERE s.id = ?')) {
    const id = params[0];
    const student = fallbackStore.students.find(s => s.id === id);
    if (!student) return [];
    const career = fallbackStore.career_paths.find(c => c.id === student.target_career_id);
    return [{
      ...student,
      target_career_title: career ? career.title : null,
      target_career_slug: career ? career.slug : null,
      target_career_category: career ? career.category : null
    }];
  }

  // 4. UPDATE students
  if (cleanSql.startsWith('UPDATE students')) {
    const id = params[params.length - 1];
    const student = fallbackStore.students.find(s => s.id === id);
    if (student) {
      if (cleanSql.includes('target_career_id = ?')) {
        student.target_career_id = params[0];
      }
      if (cleanSql.includes('full_name = ?')) {
        let pIdx = 0;
        if (cleanSql.includes('full_name = ?')) student.full_name = params[pIdx++];
        if (cleanSql.includes('branch = ?')) student.branch = params[pIdx++];
        if (cleanSql.includes('academic_year = ?')) student.academic_year = params[pIdx++];
        if (cleanSql.includes('areas_of_interest = ?')) student.areas_of_interest = params[pIdx++];
      }
    }
    return { affectedRows: 1 };
  }

  // 5. SELECT career_paths
  if (cleanSql.includes('FROM career_paths')) {
    if (cleanSql.includes('WHERE slug = ?')) {
      const slug = params[0];
      return fallbackStore.career_paths.filter(c => c.slug === slug);
    }
    if (cleanSql.includes('WHERE id = ?')) {
      const id = params[0];
      return fallbackStore.career_paths.filter(c => c.id === id);
    }
    return [...fallbackStore.career_paths];
  }

  // 6. SELECT roadmap_topics
  if (cleanSql.includes('FROM roadmap_topics')) {
    if (cleanSql.includes('COUNT(*) as count FROM roadmap_topics WHERE career_id = ?')) {
      const cid = params[0];
      const count = fallbackStore.roadmap_topics.filter(t => t.career_id === cid).length;
      return [{ count }];
    }
    if (cleanSql.includes('WHERE career_id = ?')) {
      const cid = params[0];
      return fallbackStore.roadmap_topics.filter(t => t.career_id === cid);
    }
    return [...fallbackStore.roadmap_topics];
  }

  // 7. Student Progress
  if (cleanSql.includes('FROM student_progress')) {
    const sid = params[0];
    if (cleanSql.includes('COUNT(*) as count')) {
      const cid = params[1];
      const matchingTopicIds = new Set(fallbackStore.roadmap_topics.filter(t => t.career_id === cid).map(t => t.id));
      const count = fallbackStore.student_progress.filter(p => p.student_id === sid && p.completed && matchingTopicIds.has(p.topic_id)).length;
      return [{ count }];
    }
    if (cleanSql.includes('WHERE sp.student_id = ? AND sp.completed = 1 AND rt.career_id = ?')) {
      const cid = params[1];
      const matchingTopicIds = new Set(fallbackStore.roadmap_topics.filter(t => t.career_id === cid).map(t => t.id));
      const res = fallbackStore.student_progress
        .filter(p => p.student_id === sid && p.completed && matchingTopicIds.has(p.topic_id))
        .map(p => {
          const t = fallbackStore.roadmap_topics.find(top => top.id === p.topic_id);
          return {
            id: t ? t.id : p.topic_id,
            topic_name: t ? t.topic_name : 'Topic',
            year_level: t ? t.year_level : 1,
            order_num: t ? t.order_num : 1,
            completed_at: p.completed_at
          };
        });
      return res;
    }
    if (cleanSql.includes('WHERE sp.student_id = ? AND sp.completed = 1')) {
      const res = fallbackStore.student_progress
        .filter(p => p.student_id === sid && p.completed)
        .map(p => {
          const t = fallbackStore.roadmap_topics.find(top => top.id === p.topic_id);
          return {
            topic_id: p.topic_id,
            completed_at: p.completed_at,
            topic_name: t ? t.topic_name : 'Topic',
            year_level: t ? t.year_level : 1,
            career_id: t ? t.career_id : 1
          };
        });
      return res;
    }
    if (cleanSql.includes('WHERE student_id = ? AND topic_id = ?')) {
      const [s_id, t_id] = params;
      return fallbackStore.student_progress.filter(p => p.student_id === s_id && p.topic_id === t_id);
    }
  }

  if (cleanSql.startsWith('INSERT INTO student_progress')) {
    const [student_id, topic_id] = params;
    const existing = fallbackStore.student_progress.find(p => p.student_id === student_id && p.topic_id === topic_id);
    if (!existing) {
      fallbackStore.student_progress.push({
        id: nextProgressId++,
        student_id,
        topic_id,
        completed: true,
        completed_at: new Date()
      });
    } else {
      existing.completed = true;
      existing.completed_at = new Date();
    }
    return { affectedRows: 1 };
  }

  if (cleanSql.startsWith('UPDATE student_progress')) {
    const [completed, id] = params;
    const item = fallbackStore.student_progress.find(p => p.id === id);
    if (item) {
      item.completed = completed === 1;
      item.completed_at = new Date();
    }
    return { affectedRows: 1 };
  }

  // 8. Learning Resources
  if (cleanSql.includes('FROM learning_resources')) {
    let list = [...fallbackStore.learning_resources];
    return list;
  }

  // 9. Saved Resources
  if (cleanSql.includes('FROM saved_resources')) {
    const sid = params[0];
    if (cleanSql.includes('COUNT(*) as count')) {
      const count = fallbackStore.saved_resources.filter(s => s.student_id === sid).length;
      return [{ count }];
    }
    if (cleanSql.includes('WHERE sr.student_id = ?')) {
      const items = fallbackStore.saved_resources
        .filter(s => s.student_id === sid)
        .map(s => {
          const res = fallbackStore.learning_resources.find(r => r.id === s.resource_id);
          return { ...res, saved_at: s.saved_at };
        });
      return items;
    }
    return fallbackStore.saved_resources.filter(s => s.student_id === sid);
  }

  if (cleanSql.startsWith('INSERT INTO saved_resources')) {
    const [student_id, resource_id] = params;
    fallbackStore.saved_resources.push({
      id: nextSavedId++,
      student_id,
      resource_id,
      saved_at: new Date()
    });
    return { affectedRows: 1 };
  }

  if (cleanSql.startsWith('DELETE FROM saved_resources')) {
    const id = params[0];
    const idx = fallbackStore.saved_resources.findIndex(s => s.id === id);
    if (idx !== -1) fallbackStore.saved_resources.splice(idx, 1);
    return { affectedRows: 1 };
  }

  // 10. Opportunities
  if (cleanSql.includes('FROM opportunities')) {
    return [...fallbackStore.opportunities];
  }

  if (cleanSql.startsWith('INSERT INTO opportunities')) {
    const [title, category, description, eligibility, deadline, official_source_url, application_url, status, is_verified] = params;
    const opp = {
      id: nextOppId++,
      title,
      category,
      description,
      eligibility,
      deadline,
      official_source_url,
      application_url,
      status,
      is_verified: is_verified === 1,
      created_at: new Date()
    };
    fallbackStore.opportunities.push(opp);
    return { insertId: opp.id, affectedRows: 1 };
  }

  // 11. Quiz Questions & Attempts
  if (cleanSql.includes('FROM quiz_questions')) {
    if (cleanSql.includes('WHERE id IN')) {
      return fallbackStore.quiz_questions.filter(q => params.includes(q.id));
    }
    if (params.length > 0) {
      const topic = params[0];
      return fallbackStore.quiz_questions.filter(q => q.topic.toLowerCase() === topic.toLowerCase());
    }
    return [...fallbackStore.quiz_questions];
  }

  if (cleanSql.startsWith('INSERT INTO quiz_attempts')) {
    const [student_id, topic, score, total_questions, percentage] = params;
    const attempt = {
      id: nextAttemptId++,
      student_id,
      topic,
      score,
      total_questions,
      percentage,
      attempted_at: new Date()
    };
    fallbackStore.quiz_attempts.push(attempt);
    return { insertId: attempt.id, affectedRows: 1 };
  }

  if (cleanSql.includes('FROM quiz_attempts')) {
    const sid = params[0];
    return fallbackStore.quiz_attempts.filter(a => a.student_id === sid).reverse();
  }

  return [];
}

module.exports = {
  initializeDatabase,
  getPool: () => pool,
  isConnected: () => isConnected,
  query
};
