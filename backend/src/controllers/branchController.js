const { branches } = require('../data/seedData');
const { query } = require('../config/db');

// GET /api/branches
async function getBranches(req, res, next) {
  try {
    return res.json({
      success: true,
      branches
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/branches/:code
async function getBranchByCode(req, res, next) {
  try {
    const { code } = req.params;
    const branch = branches.find(b => b.code.toUpperCase() === code.toUpperCase());

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: `Branch "${code}" not found.`
      });
    }

    // Get matching careers from database with comprehensive pathway details
    const matchingCareers = await query(
      `SELECT id, slug, title, category, branch_affinity, prerequisites_non_branch, 
              short_description, full_overview, key_skills, avg_package_range, roles, icon
       FROM career_paths
       WHERE branch_affinity LIKE ?
       ORDER BY id ASC`,
      [`%${branch.code}%`]
    );

    // Get other careers from database for cross-branch exploration with transition prerequisites
    const otherCareers = await query(
      `SELECT id, slug, title, category, branch_affinity, prerequisites_non_branch, 
              short_description, full_overview, key_skills, avg_package_range, roles, icon
       FROM career_paths
       WHERE branch_affinity NOT LIKE ?
       ORDER BY id ASC`,
      [`%${branch.code}%`]
    );

    return res.json({
      success: true,
      branch: {
        ...branch,
        matching_careers: matchingCareers,
        other_careers: otherCareers
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBranches,
  getBranchByCode
};
