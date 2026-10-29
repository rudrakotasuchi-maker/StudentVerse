const { query } = require('../config/db');

// GET /api/progress
async function getStudentProgress(req, res, next) {
  try {
    const studentId = req.student.id;

    // Get student info with target career
    const students = await query(
      `SELECT s.id, s.target_career_id, c.title as career_title, c.slug as career_slug
       FROM students s
       LEFT JOIN career_paths c ON s.target_career_id = c.id
       WHERE s.id = ?`,
      [studentId]
    );

    const student = students[0];

    // Get completed topic IDs
    const completedRecords = await query(
      `SELECT sp.topic_id, sp.completed_at, rt.topic_name, rt.year_level, rt.career_id
       FROM student_progress sp
       JOIN roadmap_topics rt ON sp.topic_id = rt.id
       WHERE sp.student_id = ? AND sp.completed = 1
       ORDER BY sp.completed_at DESC`,
      [studentId]
    );

    const completedTopicIds = completedRecords.map(r => r.topic_id);

    // If student has a target career, calculate percentage
    let totalCareerTopics = 0;
    let completedCareerTopics = 0;
    let percentage = 0;

    if (student && student.target_career_id) {
      const topicCount = await query(
        'SELECT COUNT(*) as count FROM roadmap_topics WHERE career_id = ?',
        [student.target_career_id]
      );
      totalCareerTopics = topicCount[0].count;

      if (totalCareerTopics > 0) {
        const completedInCareer = await query(
          `SELECT COUNT(*) as count
           FROM student_progress sp
           JOIN roadmap_topics rt ON sp.topic_id = rt.id
           WHERE sp.student_id = ? AND sp.completed = 1 AND rt.career_id = ?`,
          [studentId, student.target_career_id]
        );
        completedCareerTopics = completedInCareer[0].count;
        percentage = Math.round((completedCareerTopics / totalCareerTopics) * 100);
      }
    }

    return res.json({
      success: true,
      target_career_id: student ? student.target_career_id : null,
      target_career_title: student ? student.career_title : null,
      target_career_slug: student ? student.career_slug : null,
      total_career_topics: totalCareerTopics,
      completed_career_topics: completedCareerTopics,
      completion_percentage: percentage,
      completed_topic_ids: completedTopicIds,
      completed_records: completedRecords
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/progress/toggle-topic
async function toggleTopicCompletion(req, res, next) {
  try {
    const studentId = req.student.id;
    const { topic_id } = req.body;

    if (!topic_id) {
      return res.status(400).json({
        success: false,
        message: 'Topic ID is required.'
      });
    }

    // Check if progress row already exists
    const existing = await query(
      'SELECT id, completed FROM student_progress WHERE student_id = ? AND topic_id = ?',
      [studentId, topic_id]
    );

    let isCompleted = true;

    if (existing.length > 0) {
      // Toggle state
      const current = existing[0].completed;
      isCompleted = !current;
      await query(
        'UPDATE student_progress SET completed = ?, completed_at = CURRENT_TIMESTAMP WHERE id = ?',
        [isCompleted ? 1 : 0, existing[0].id]
      );
    } else {
      // Insert new
      await query(
        'INSERT INTO student_progress (student_id, topic_id, completed) VALUES (?, ?, 1)',
        [studentId, topic_id]
      );
      isCompleted = true;
    }

    return res.json({
      success: true,
      message: isCompleted ? 'Topic marked as completed!' : 'Topic marked as incomplete.',
      topic_id,
      completed: isCompleted
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/progress/set-career
async function setTargetCareer(req, res, next) {
  try {
    const studentId = req.student.id;
    const { career_id } = req.body;

    if (!career_id) {
      return res.status(400).json({
        success: false,
        message: 'Career ID is required.'
      });
    }

    // Verify career exists
    const careers = await query('SELECT id, title, slug FROM career_paths WHERE id = ?', [career_id]);
    if (careers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Career path not found.'
      });
    }

    await query('UPDATE students SET target_career_id = ? WHERE id = ?', [career_id, studentId]);

    return res.json({
      success: true,
      message: `Selected "${careers[0].title}" as your primary career path!`,
      career: careers[0]
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getStudentProgress,
  toggleTopicCompletion,
  setTargetCareer
};
