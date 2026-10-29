-- ============================================================
-- StudentVerse Database Schema
-- Database Name: studentverse_db
-- ============================================================

CREATE DATABASE IF NOT EXISTS studentverse_db;
USE studentverse_db;

-- 1. Students Table
CREATE TABLE IF NOT EXISTS students (
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
  INDEX idx_student_branch (branch)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Career Paths Table
CREATE TABLE IF NOT EXISTS career_paths (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(150) NOT NULL,
  category VARCHAR(100) NOT NULL,
  branch_affinity VARCHAR(255) NOT NULL,
  short_description TEXT NOT NULL,
  full_overview TEXT NOT NULL,
  key_skills TEXT NOT NULL,
  avg_package_range VARCHAR(100) NOT NULL,
  roles VARCHAR(255) NOT NULL,
  icon VARCHAR(50) DEFAULT 'Compass',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_career_slug (slug),
  INDEX idx_career_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add Foreign Key to students for target_career_id
ALTER TABLE students
  ADD CONSTRAINT fk_students_target_career
  FOREIGN KEY (target_career_id) REFERENCES career_paths(id)
  ON DELETE SET NULL;

-- 3. Roadmap Topics Table
CREATE TABLE IF NOT EXISTS roadmap_topics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  career_id INT NOT NULL,
  year_level INT NOT NULL CHECK (year_level BETWEEN 1 AND 4),
  order_num INT NOT NULL DEFAULT 1,
  topic_name VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  recommended_resources TEXT NOT NULL,
  suggested_next_step TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (career_id) REFERENCES career_paths(id) ON DELETE CASCADE,
  INDEX idx_roadmap_career_year (career_id, year_level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Student Progress Table
CREATE TABLE IF NOT EXISTS student_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  topic_id INT NOT NULL,
  completed BOOLEAN DEFAULT TRUE,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_student_topic (student_id, topic_id),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (topic_id) REFERENCES roadmap_topics(id) ON DELETE CASCADE,
  INDEX idx_progress_student (student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Learning Resources Table
CREATE TABLE IF NOT EXISTS learning_resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  difficulty_level ENUM('Beginner', 'Intermediate', 'Advanced') NOT NULL DEFAULT 'Beginner',
  external_url VARCHAR(500) NOT NULL,
  provider VARCHAR(100) NOT NULL,
  is_free BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_resource_category (category),
  INDEX idx_resource_difficulty (difficulty_level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Saved Resources Table (Bookmarks)
CREATE TABLE IF NOT EXISTS saved_resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  resource_id INT NOT NULL,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_student_resource (student_id, resource_id),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (resource_id) REFERENCES learning_resources(id) ON DELETE CASCADE,
  INDEX idx_saved_student (student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Opportunities Table
CREATE TABLE IF NOT EXISTS opportunities (
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
  INDEX idx_opportunity_category (category),
  INDEX idx_opportunity_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Quiz Questions Table
CREATE TABLE IF NOT EXISTS quiz_questions (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Quiz Attempts Table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  topic VARCHAR(100) NOT NULL,
  score INT NOT NULL,
  total_questions INT NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  INDEX idx_attempt_student (student_id),
  INDEX idx_attempt_topic (topic)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
