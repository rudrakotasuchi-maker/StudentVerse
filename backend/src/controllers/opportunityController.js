const { query } = require('../config/db');

// GET /api/opportunities
async function getOpportunities(req, res, next) {
  try {
    const { category, status, verified, search } = req.query;

    let sql = 'SELECT * FROM opportunities WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (status && status !== 'All') {
      sql += ' AND status = ?';
      params.push(status);
    }

    if (verified !== undefined && verified !== 'All') {
      sql += ' AND is_verified = ?';
      params.push(verified === 'true' ? 1 : 0);
    }

    if (search && search.trim() !== '') {
      sql += ' AND (title LIKE ? OR description LIKE ? OR eligibility LIKE ?)';
      const term = `%${search.trim()}%`;
      params.push(term, term, term);
    }

    sql += ' ORDER BY (deadline IS NULL), deadline ASC, id DESC';
    const opportunities = await query(sql, params);

    return res.json({
      success: true,
      count: opportunities.length,
      opportunities
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/opportunities
async function createOpportunity(req, res, next) {
  try {
    const {
      title,
      category,
      description,
      eligibility,
      deadline,
      official_source_url,
      application_url,
      status,
      is_verified
    } = req.body;

    if (!title || !category || !description || !eligibility || !official_source_url) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, description, eligibility, and official source URL are required.'
      });
    }

    const validCategories = [
      'Internships',
      'Hackathons',
      'Coding competitions',
      'Scholarships',
      'Jobs',
      'Government opportunities',
      'GATE and higher studies'
    ];

    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category. Must be one of: ${validCategories.join(', ')}`
      });
    }

    const result = await query(
      `INSERT INTO opportunities (title, category, description, eligibility, deadline, official_source_url, application_url, status, is_verified)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title.trim(),
        category,
        description.trim(),
        eligibility.trim(),
        deadline || null,
        official_source_url.trim(),
        (application_url || official_source_url).trim(),
        status || 'Active',
        is_verified !== false ? 1 : 0
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'Opportunity listing created successfully!',
      opportunity_id: result.insertId
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getOpportunities,
  createOpportunity
};
