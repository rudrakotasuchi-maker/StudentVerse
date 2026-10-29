const express = require('express');
const router = express.Router();
const { getQuizQuestions, submitQuizAttempt, getQuizHistory } = require('../controllers/quizController');
const { authenticateToken } = require('../middleware/auth');

router.get('/questions', getQuizQuestions);
router.post('/submit', authenticateToken, submitQuizAttempt);
router.get('/history', authenticateToken, getQuizHistory);

module.exports = router;
