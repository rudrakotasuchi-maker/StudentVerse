const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/db');
const { JWT_SECRET } = require('../middleware/auth');

// POST /api/auth/register
async function register(req, res, next) {
  try {
    const { full_name, email, password, branch, academic_year, areas_of_interest } = req.body;
    const cleanEmail = email.trim().toLowerCase();

    // Check if email already exists
    const existing = await query('SELECT id FROM students WHERE email = ?', [cleanEmail]);
    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists. Please log in.'
      });
    }

    // Hash password securely (10 salt rounds)
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const interestString = Array.isArray(areas_of_interest)
      ? areas_of_interest.join(', ')
      : (areas_of_interest || '');

    const result = await query(
      `INSERT INTO students (full_name, email, password_hash, branch, academic_year, areas_of_interest)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [full_name.trim(), cleanEmail, password_hash, branch, parseInt(academic_year, 10), interestString]
    );

    const newStudentId = result.insertId;

    // Generate JWT token
    const token = jwt.sign(
      { id: newStudentId, email: cleanEmail, branch },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Student account created successfully!',
      token,
      student: {
        id: newStudentId,
        full_name: full_name.trim(),
        email: cleanEmail,
        branch,
        academic_year: parseInt(academic_year, 10),
        areas_of_interest: interestString,
        target_career_id: null
      }
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/auth/login
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const cleanEmail = email.trim().toLowerCase();

    const students = await query(
      `SELECT s.id, s.full_name, s.email, s.password_hash, s.branch, s.academic_year, s.areas_of_interest, s.target_career_id,
              c.title as target_career_title, c.slug as target_career_slug
       FROM students s
       LEFT JOIN career_paths c ON s.target_career_id = c.id
       WHERE s.email = ?`,
      [cleanEmail]
    );

    if (students.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const student = students[0];
    const isMatch = await bcrypt.compare(password, student.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: student.id, email: student.email, branch: student.branch },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return res.json({
      success: true,
      message: 'Login successful!',
      token,
      student: {
        id: student.id,
        full_name: student.full_name,
        email: student.email,
        branch: student.branch,
        academic_year: student.academic_year,
        areas_of_interest: student.areas_of_interest,
        target_career_id: student.target_career_id,
        target_career_title: student.target_career_title,
        target_career_slug: student.target_career_slug
      }
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/auth/profile
async function getProfile(req, res, next) {
  try {
    const studentId = req.student.id;

    const students = await query(
      `SELECT s.id, s.full_name, s.email, s.branch, s.academic_year, s.areas_of_interest, s.target_career_id, s.created_at,
              c.title as target_career_title, c.slug as target_career_slug, c.category as target_career_category
       FROM students s
       LEFT JOIN career_paths c ON s.target_career_id = c.id
       WHERE s.id = ?`,
      [studentId]
    );

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found.'
      });
    }

    return res.json({
      success: true,
      student: students[0]
    });
  } catch (error) {
    next(error);
  }
}

// PUT /api/auth/profile
async function updateProfile(req, res, next) {
  try {
    const studentId = req.student.id;
    const { full_name, branch, academic_year, areas_of_interest, target_career_id } = req.body;

    const updates = [];
    const params = [];

    if (full_name) {
      updates.push('full_name = ?');
      params.push(full_name.trim());
    }
    if (branch) {
      updates.push('branch = ?');
      params.push(branch);
    }
    if (academic_year) {
      updates.push('academic_year = ?');
      params.push(parseInt(academic_year, 10));
    }
    if (areas_of_interest !== undefined) {
      const interestString = Array.isArray(areas_of_interest)
        ? areas_of_interest.join(', ')
        : (areas_of_interest || '');
      updates.push('areas_of_interest = ?');
      params.push(interestString);
    }
    if (target_career_id !== undefined) {
      updates.push('target_career_id = ?');
      params.push(target_career_id ? parseInt(target_career_id, 10) : null);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields provided to update.'
      });
    }

    params.push(studentId);
    await query(`UPDATE students SET ${updates.join(', ')} WHERE id = ?`, params);

    // Fetch updated profile
    const updated = await query(
      `SELECT s.id, s.full_name, s.email, s.branch, s.academic_year, s.areas_of_interest, s.target_career_id,
              c.title as target_career_title, c.slug as target_career_slug
       FROM students s
       LEFT JOIN career_paths c ON s.target_career_id = c.id
       WHERE s.id = ?`,
      [studentId]
    );

    return res.json({
      success: true,
      message: 'Profile updated successfully!',
      student: updated[0]
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};
