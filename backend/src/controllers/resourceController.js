const { query } = require('../config/db');

// GET /api/resources
async function getResources(req, res, next) {
  try {
    const { category, difficulty, search } = req.query;
    const studentId = req.student ? req.student.id : null;

    let sql = 'SELECT r.* FROM learning_resources r WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      sql += ' AND r.category = ?';
      params.push(category);
    }

    if (difficulty && difficulty !== 'All') {
      sql += ' AND r.difficulty_level = ?';
      params.push(difficulty);
    }

    if (search && search.trim() !== '') {
      sql += ' AND (r.title LIKE ? OR r.description LIKE ? OR r.provider LIKE ?)';
      const term = `%${search.trim()}%`;
      params.push(term, term, term);
    }

    sql += ' ORDER BY r.id ASC';
    const resources = await query(sql, params);

    // If student is logged in, attach is_saved status
    if (studentId) {
      const saved = await query('SELECT resource_id FROM saved_resources WHERE student_id = ?', [studentId]);
      const savedSet = new Set(saved.map(s => s.resource_id));
      const resourcesWithSaved = resources.map(r => ({
        ...r,
        is_saved: savedSet.has(r.id)
      }));
      return res.json({ success: true, resources: resourcesWithSaved });
    }

    return res.json({
      success: true,
      resources: resources.map(r => ({ ...r, is_saved: false }))
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/resources/saved (Requires Auth)
async function getSavedResources(req, res, next) {
  try {
    const studentId = req.student.id;

    const saved = await query(
      `SELECT r.*, sr.saved_at
       FROM saved_resources sr
       JOIN learning_resources r ON sr.resource_id = r.id
       WHERE sr.student_id = ?
       ORDER BY sr.saved_at DESC`,
      [studentId]
    );

    return res.json({
      success: true,
      saved_resources: saved.map(r => ({ ...r, is_saved: true }))
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/resources/toggle-save (Requires Auth)
async function toggleSaveResource(req, res, next) {
  try {
    const studentId = req.student.id;
    const { resource_id } = req.body;

    if (!resource_id) {
      return res.status(400).json({
        success: false,
        message: 'Resource ID is required.'
      });
    }

    const existing = await query(
      'SELECT id FROM saved_resources WHERE student_id = ? AND resource_id = ?',
      [studentId, resource_id]
    );

    let isSaved = false;

    if (existing.length > 0) {
      // Remove bookmark
      await query('DELETE FROM saved_resources WHERE id = ?', [existing[0].id]);
      isSaved = false;
    } else {
      // Add bookmark
      await query(
        'INSERT INTO saved_resources (student_id, resource_id) VALUES (?, ?)',
        [studentId, resource_id]
      );
      isSaved = true;
    }

    return res.json({
      success: true,
      message: isSaved ? 'Resource bookmarked successfully!' : 'Resource removed from bookmarks.',
      resource_id,
      is_saved: isSaved
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getResources,
  getSavedResources,
  toggleSaveResource
};
