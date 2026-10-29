const express = require('express');
const router = express.Router();
const { getStudentProgress, toggleTopicCompletion, setTargetCareer } = require('../controllers/progressController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, getStudentProgress);
router.post('/toggle-topic', authenticateToken, toggleTopicCompletion);
router.post('/set-career', authenticateToken, setTargetCareer);

module.exports = router;
