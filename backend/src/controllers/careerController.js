const { query } = require('../config/db');

// GET /api/careers
async function getAllCareers(req, res, next) {
  try {
    const { category, branch } = req.query;
    let sql = 'SELECT id, slug, title, category, branch_affinity, prerequisites_non_branch, short_description, full_overview, key_skills, avg_package_range, roles, icon FROM career_paths WHERE 1=1';
    const params = [];

    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (branch) {
      sql += ' AND branch_affinity LIKE ?';
      params.push(`%${branch}%`);
    }

    sql += ' ORDER BY id ASC';
    const careers = await query(sql, params);

    return res.json({
      success: true,
      careers
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/careers/:slug
async function getCareerBySlug(req, res, next) {
  try {
    const { slug } = req.params;

    const careers = await query('SELECT * FROM career_paths WHERE slug = ?', [slug]);
    if (careers.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Career path with slug "${slug}" not found.`
      });
    }

    const career = careers[0];

    // Fetch all rich pedagogical roadmap topics ordered by year_level and order_num
    const topics = await query(
      `SELECT id, career_id, year_level, order_num, topic_name, learning_objective, description,
              importance, prerequisites, learning_sequence, tools_technologies, recommended_resources,
              practice_exercises, mini_project, completion_criteria, interview_questions,
              estimated_effort, suggested_next_step
       FROM roadmap_topics
       WHERE career_id = ?
       ORDER BY year_level ASC, order_num ASC`,
      [career.id]
    );

    // Group topics by year
    const roadmapByYear = {
      1: topics.filter(t => t.year_level === 1),
      2: topics.filter(t => t.year_level === 2),
      3: topics.filter(t => t.year_level === 3),
      4: topics.filter(t => t.year_level === 4)
    };

    return res.json({
      success: true,
      career,
      roadmap: roadmapByYear,
      allTopics: topics
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/careers/evaluate-interests
// Transparent scoring engine across 7 foundational interest dimensions
async function evaluateInterests(req, res, next) {
  try {
    const body = req.body || {};
    // 8 Core Dimensions from Specification (1-5 rating scale)
    const coding = parseInt(body.coding_software ?? body.programming_logic ?? body.programming_interest, 10) || 3;
    const math = parseInt(body.math_statistics ?? body.math_data ?? body.math_data_interest, 10) || 3;
    const aiml = parseInt(body.ai_ml ?? body.research_experimentation, 10) || 3;
    const data = parseInt(body.data_analysis ?? body.math_data, 10) || 3;
    const hardware = parseInt(body.electronics_hardware ?? body.hardware_interest, 10) || 3;
    const cyber = parseInt(body.networks_cybersecurity ?? body.cybersecurity_investigation, 10) || 3;
    const webDesign = parseInt(body.web_ui_design ?? body.creativity_design ?? body.design_practical, 10) || 3;
    const algorithms = parseInt(body.problem_solving_algorithms ?? body.programming_logic, 10) || 3;
    const comms = parseInt(body.communication_business, 10) || 3;
    const research = parseInt(body.research_experimentation ?? body.govt_higher_studies, 10) || 3;

    // Fetch all careers from DB
    const careers = await query('SELECT * FROM career_paths');

    // Rule-based deterministic scoring map for each slug
    const scores = careers.map(c => {
      let score = 20; // Base baseline score
      const matchingFactors = [];

      switch (c.slug) {
        case 'software-engineering':
          score += coding * 7 + algorithms * 7 + math * 3;
          if (coding >= 4) matchingFactors.push('Strong interest in writing code and building software systems');
          if (algorithms >= 4) matchingFactors.push('High affinity for algorithmic problem solving and logic');
          break;

        case 'full-stack-developer':
          score += coding * 6 + webDesign * 8 + algorithms * 4;
          if (webDesign >= 4) matchingFactors.push('Passion for crafting responsive websites and user interfaces');
          if (coding >= 4) matchingFactors.push('Interest in connecting frontends with backend APIs and databases');
          break;

        case 'ai-machine-learning':
          score += aiml * 9 + math * 6 + algorithms * 4;
          if (aiml >= 4) matchingFactors.push('High curiosity for neural networks, deep learning, and AI models');
          if (math >= 4) matchingFactors.push('Strong foundation in linear algebra, calculus, and probability');
          break;

        case 'data-analytics':
          score += data * 9 + math * 5 + comms * 4;
          if (data >= 4) matchingFactors.push('Enthusiasm for discovering patterns, trends, and business metrics');
          if (math >= 3) matchingFactors.push('Comfort with statistics and visual reporting');
          break;

        case 'data-scientist':
          score += data * 7 + math * 7 + aiml * 5;
          if (data >= 4) matchingFactors.push('Passion for large-scale data wrangling and predictive modeling');
          if (math >= 4) matchingFactors.push('Strong grasp of statistical hypothesis testing and inference');
          break;

        case 'cybersecurity':
          score += cyber * 10 + coding * 4 + algorithms * 3;
          if (cyber >= 4) matchingFactors.push('Fascination with network protocols, ethical hacking, and defense');
          if (coding >= 3) matchingFactors.push('Interest in operating system security and script auditing');
          break;

        case 'cloud-devops':
          score += coding * 5 + cyber * 5 + algorithms * 4 + 10;
          if (coding >= 3) matchingFactors.push('Passion for automation, Linux environments, and CI/CD pipelines');
          if (cyber >= 3) matchingFactors.push('Focus on system reliability, containers, and cloud architecture');
          break;

        case 'embedded-systems-iot':
        case 'embedded-systems-vlsi':
          score += hardware * 11 + coding * 4 + algorithms * 3;
          if (hardware >= 4) matchingFactors.push('Strong passion for physical microcontrollers, sensors, and silicon');
          if (coding >= 3) matchingFactors.push('Interest in low-level C programming and register manipulation');
          break;

        case 'mechanical-automation-robotics':
        case 'mechanical-design-robotics':
          score += webDesign * 6 + hardware * 6 + math * 5;
          if (webDesign >= 4) matchingFactors.push('Aptitude for 3D CAD modeling, mechanics, and physical assemblies');
          if (hardware >= 3) matchingFactors.push('Interest in robotics, motors, and automated manufacturing');
          break;

        case 'civil-smart-infrastructure':
        case 'civil-structural-bim':
          score += webDesign * 7 + comms * 5 + math * 4;
          if (webDesign >= 4) matchingFactors.push('Interest in structural design, 3D/4D BIM models, and blueprints');
          if (comms >= 3) matchingFactors.push('Aptitude for infrastructure project coordination');
          break;

        case 'electrical-ev-power-systems':
        case 'electrical-smart-grid':
          score += hardware * 9 + math * 5 + 10;
          if (hardware >= 4) matchingFactors.push('Interest in electric vehicle powertrains, power grids, and circuits');
          if (math >= 3) matchingFactors.push('Analytical approach to power electronics and renewable energy');
          break;

        case 'gate-higher-studies-research':
        case 'gate-higher-studies':
          score += algorithms * 7 + math * 7 + research * 5;
          if (algorithms >= 4) matchingFactors.push('Dedication to mastering core undergraduate technical subjects');
          if (math >= 4) matchingFactors.push('Solid analytical problem-solving foundation for competitive exams');
          break;

        case 'civil-services-govt-exams':
          score += comms * 8 + research * 6 + 15;
          if (comms >= 4) matchingFactors.push('Desire for public policy, administrative leadership, and governance');
          if (research >= 3) matchingFactors.push('Habit of reading and analyzing national socio-economic issues');
          break;

        default:
          score += 20;
      }

      // Calculate confidence percentage (normalized between 35% and 98%)
      const matchPercentage = Math.min(98, Math.max(35, Math.round((score / 120) * 100)));

      return {
        career_id: c.id,
        slug: c.slug,
        title: c.title,
        category: c.category,
        short_description: c.short_description,
        prerequisites_non_branch: c.prerequisites_non_branch || null,
        avg_package_range: c.avg_package_range,
        icon: c.icon,
        raw_score: score,
        match_percentage: matchPercentage,
        matching_factors: matchingFactors.length > 0 ? matchingFactors : ['Applicable for all engineering disciplines']
      };
    });

    // Sort by match percentage descending
    scores.sort((a, b) => b.match_percentage - a.match_percentage);

    return res.json({
      success: true,
      algorithm: 'Deterministic Multi-Criteria Weighted Assessment',
      disclaimer: 'This assessment provides exploratory guidance based on your stated interests and preferences. It does not dictate your future with certainty. Students are encouraged to explore multiple pathways and choose their preferred career independently.',
      total_careers_evaluated: scores.length,
      recommendations: scores.slice(0, 4), // Top 4 matches
      all_results: scores
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllCareers,
  getCareerBySlug,
  evaluateInterests
};

