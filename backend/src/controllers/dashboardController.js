const { query } = require('../config/db');
const { projectIdeas, interviewPrep } = require('../data/seedData');
const { guidanceCategories } = require('../data/guidanceData');
const codingExercises = require('../data/codingPracticeData');


// GET /api/dashboard/summary (Requires Auth)
async function getDashboardSummary(req, res, next) {
  try {
    const studentId = req.student.id;

    // 1. Fetch Student Info
    const students = await query(
      `SELECT s.id, s.full_name, s.email, s.branch, s.academic_year, s.areas_of_interest, s.target_career_id,
              c.title as target_career_title, c.slug as target_career_slug, c.category as target_career_category
       FROM students s
       LEFT JOIN career_paths c ON s.target_career_id = c.id
       WHERE s.id = ?`,
      [studentId]
    );

    if (students.length === 0) {
      return res.status(404).json({ success: false, message: 'Student not found.' });
    }

    const student = students[0];

    // 2. Fetch Roadmap Progress
    let totalCareerTopics = 0;
    let completedCareerTopics = 0;
    let roadmapPercentage = 0;
    let completedTopicsList = [];
    let nextRecommendedTopic = null;

    if (student.target_career_id) {
      const topicCount = await query(
        'SELECT COUNT(*) as count FROM roadmap_topics WHERE career_id = ?',
        [student.target_career_id]
      );
      totalCareerTopics = topicCount[0].count;

      const completedTopics = await query(
        `SELECT rt.id, rt.topic_name, rt.year_level, rt.order_num, sp.completed_at
         FROM student_progress sp
         JOIN roadmap_topics rt ON sp.topic_id = rt.id
         WHERE sp.student_id = ? AND sp.completed = 1 AND rt.career_id = ?
         ORDER BY rt.year_level ASC, rt.order_num ASC`,
        [studentId, student.target_career_id]
      );

      completedTopicsList = completedTopics;
      completedCareerTopics = completedTopics.length;

      if (totalCareerTopics > 0) {
        roadmapPercentage = Math.round((completedCareerTopics / totalCareerTopics) * 100);
      }

      // Query real next recommended uncompleted topic from MySQL
      const nextTopicResult = await query(
        `SELECT rt.id, rt.topic_name, rt.year_level, rt.order_num, rt.description, rt.importance, rt.suggested_next_step
         FROM roadmap_topics rt
         LEFT JOIN student_progress sp ON rt.id = sp.topic_id AND sp.student_id = ? AND sp.completed = 1
         WHERE rt.career_id = ? AND sp.id IS NULL
         ORDER BY rt.year_level ASC, rt.order_num ASC
         LIMIT 1`,
        [studentId, student.target_career_id]
      );

      if (nextTopicResult && nextTopicResult.length > 0) {
        nextRecommendedTopic = nextTopicResult[0];
      }
    }

    // 3. Saved Resources
    const savedResources = await query(
      `SELECT r.id, r.title, r.category, r.difficulty_level, r.external_url, r.provider, sr.saved_at
       FROM saved_resources sr
       JOIN learning_resources r ON sr.resource_id = r.id
       WHERE sr.student_id = ?
       ORDER BY sr.saved_at DESC
       LIMIT 5`,
      [studentId]
    );

    const savedCount = await query(
      'SELECT COUNT(*) as count FROM saved_resources WHERE student_id = ?',
      [studentId]
    );

    // 4. Upcoming Opportunities (Active or Upcoming)
    const upcomingOpportunities = await query(
      `SELECT id, title, category, deadline, status, application_url, is_verified
       FROM opportunities
       WHERE status IN ('Active', 'Upcoming')
       ORDER BY (deadline IS NULL), deadline ASC
       LIMIT 4`
    );

    // 5. Recent Quiz Attempts
    const recentQuizzes = await query(
      `SELECT id, topic, score, total_questions, percentage, attempted_at
       FROM quiz_attempts
       WHERE student_id = ?
       ORDER BY attempted_at DESC
       LIMIT 3`,
      [studentId]
    );

    // 6. Generate Contextual Recommended Next Actions based on Academic Year & Progress
    const recommendations = [];

    if (!student.target_career_id) {
      recommendations.push({
        action: 'Choose Target Career Path',
        tip: 'Take the Interest Finder questionnaire to receive tailored recommendations based on your strengths.',
        link: '/interest-finder',
        badge: 'Crucial'
      });
    } else if (roadmapPercentage === 0) {
      recommendations.push({
        action: 'Begin First Year Roadmap Topic',
        tip: `You have selected ${student.target_career_title}. Start with Year 1 foundational topics to build momentum.`,
        link: `/career-roadmap/${student.target_career_slug}`,
        badge: 'Priority'
      });
    } else {
      recommendations.push({
        action: 'Continue Career Roadmap',
        tip: `You are ${roadmapPercentage}% complete! Continue to your next roadmap milestone.`,
        link: `/career-roadmap/${student.target_career_slug}`,
        badge: 'In Progress'
      });
    }

    if (student.academic_year === 1) {
      recommendations.push({
        action: 'Master C/C++ & Git',
        tip: 'First year is ideal for mastering core procedural programming and setting up your GitHub profile.',
        link: '/learning-resources',
        badge: 'Year 1 Focus'
      });
    } else if (student.academic_year === 2) {
      recommendations.push({
        action: 'Solve 100 DSA Problems',
        tip: 'Second year is the sweet spot for Data Structures & Algorithms. Practice arrays, trees, and recursion.',
        link: '/tests-practice',
        badge: 'Year 2 Focus'
      });
    } else if (student.academic_year === 3) {
      recommendations.push({
        action: 'Build Portfolio & Hunt Internships',
        tip: 'Third year is the peak time to apply for Summer Internships and build full-stack or hardware capstones.',
        link: '/opportunities',
        badge: 'Internship Season'
      });
    } else if (student.academic_year === 4) {
      recommendations.push({
        action: 'Placement Prep & Mock Interviews',
        tip: 'Revise core CS/core engineering, take mock aptitude tests, and polish your 1-page resume.',
        link: '/project-prep',
        badge: 'Placement Drive'
      });
    }

    return res.json({
      success: true,
      dashboard: {
        student: {
          id: student.id,
          full_name: student.full_name,
          email: student.email,
          branch: student.branch,
          academic_year: student.academic_year,
          areas_of_interest: student.areas_of_interest,
          target_career_id: student.target_career_id,
          target_career_title: student.target_career_title,
          target_career_slug: student.target_career_slug,
          target_career_category: student.target_career_category
        },
        roadmap: {
          total_topics: totalCareerTopics,
          completed_topics_count: completedCareerTopics,
          completion_percentage: roadmapPercentage,
          completed_topics: completedTopicsList,
          next_recommended_topic: nextRecommendedTopic
        },
        saved_resources: {
          total_count: savedCount[0].count,
          items: savedResources
        },
        upcoming_opportunities: upcomingOpportunities,
        recent_quizzes: recentQuizzes,
        recommended_actions: recommendations
      }
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/dashboard/prep-materials
async function getPrepMaterials(req, res, next) {
  try {
    return res.json({
      success: true,
      project_ideas: projectIdeas,
      interview_prep: interviewPrep,
      coding_practice: codingExercises
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/dashboard/coding-practice
async function getCodingPractice(req, res, next) {
  try {
    const { language, difficulty, search } = req.query;
    let list = [...codingExercises];

    if (language && language !== 'All') {
      list = list.filter(e => e.language.toLowerCase() === language.toLowerCase());
    }

    if (difficulty && difficulty !== 'All') {
      list = list.filter(e => e.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.topic.toLowerCase().includes(q) ||
        e.problem_statement.toLowerCase().includes(q)
      );
    }

    return res.json({
      success: true,
      exercises: list,
      total: list.length
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/dashboard/guidance
async function getGuidanceCenter(req, res, next) {
  try {
    return res.json({
      success: true,
      categories: guidanceCategories
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDashboardSummary,
  getPrepMaterials,
  getCodingPractice,
  getGuidanceCenter
};

