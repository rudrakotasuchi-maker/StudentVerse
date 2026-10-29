const express = require('express');
const router = express.Router();
const { getDashboardSummary, getPrepMaterials, getCodingPractice, getGuidanceCenter } = require('../controllers/dashboardController');
const { authenticateToken } = require('../middleware/auth');

router.get('/summary', authenticateToken, getDashboardSummary);
router.get('/prep-materials', getPrepMaterials);
router.get('/coding-practice', getCodingPractice);
router.get('/guidance', getGuidanceCenter);

module.exports = router;

