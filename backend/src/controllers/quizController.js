const { query } = require('../config/db');

// GET /api/quizzes/questions
async function getQuizQuestions(req, res, next) {
  try {
    const { topic } = req.query;

    let sql = 'SELECT id, topic, question_text, option_a, option_b, option_c, option_d FROM quiz_questions WHERE 1=1';
    const params = [];

    if (topic && topic !== 'All') {
      sql += ' AND topic = ?';
      params.push(topic);
    }

    sql += ' ORDER BY id ASC';
    const questions = await query(sql, params);

    return res.json({
      success: true,
      count: questions.length,
      questions
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/quizzes/submit (Requires Auth)
async function submitQuizAttempt(req, res, next) {
  try {
    const studentId = req.student.id;
    const { topic, answers } = req.body;
    // answers format: { question_id: selected_option } e.g. { "1": "C", "2": "B" }

    if (!topic || !answers || typeof answers !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Topic and an object containing answers are required.'
      });
    }

    // Fetch original questions from DB with correct_option and explanation
    const questionIds = Object.keys(answers).map(id => parseInt(id, 10)).filter(id => !isNaN(id));

    if (questionIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No answers provided.'
      });
    }

    const placeholders = questionIds.map(() => '?').join(',');
    const questions = await query(
      `SELECT id, question_text, correct_option, explanation, option_a, option_b, option_c, option_d
       FROM quiz_questions
       WHERE id IN (${placeholders})`,
      questionIds
    );

    let score = 0;
    const totalQuestions = questions.length;
    const detailedResults = [];

    for (const q of questions) {
      const selectedOption = (answers[q.id] || '').trim().toUpperCase();
      const isCorrect = selectedOption === q.correct_option;
      if (isCorrect) score += 1;

      detailedResults.push({
        question_id: q.id,
        question_text: q.question_text,
        selected_option: selectedOption || 'Unanswered',
        correct_option: q.correct_option,
        is_correct: isCorrect,
        explanation: q.explanation
      });
    }

    const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(2) : 0;

    // Save attempt in MySQL
    await query(
      `INSERT INTO quiz_attempts (student_id, topic, score, total_questions, percentage)
       VALUES (?, ?, ?, ?, ?)`,
      [studentId, topic, score, totalQuestions, percentage]
    );

    return res.json({
      success: true,
      message: `Quiz completed! You scored ${score} out of ${totalQuestions} (${percentage}%).`,
      result: {
        topic,
        score,
        total_questions: totalQuestions,
        percentage: parseFloat(percentage),
        details: detailedResults
      }
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/quizzes/history (Requires Auth)
async function getQuizHistory(req, res, next) {
  try {
    const studentId = req.student.id;

    const attempts = await query(
      `SELECT id, topic, score, total_questions, percentage, attempted_at
       FROM quiz_attempts
       WHERE student_id = ?
       ORDER BY attempted_at DESC`,
      [studentId]
    );

    return res.json({
      success: true,
      attempts
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getQuizQuestions,
  submitQuizAttempt,
  getQuizHistory
};
