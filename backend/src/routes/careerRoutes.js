const express = require('express');
const router = express.Router();
const { getAllCareers, getCareerBySlug, evaluateInterests } = require('../controllers/careerController');

router.get('/', getAllCareers);
router.post('/evaluate-interests', evaluateInterests);
router.get('/:slug', getCareerBySlug);

module.exports = router;
