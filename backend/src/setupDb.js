// Standalone database setup and verification script
const { initializeDatabase, query } = require('./config/db');

async function run() {
  console.log('--- Initializing StudentVerse MySQL Database ---');
  const pool = await initializeDatabase();
  if (pool) {
    try {
      const careers = await query('SELECT COUNT(*) as count FROM career_paths');
      const topics = await query('SELECT COUNT(*) as count FROM roadmap_topics');
      const resources = await query('SELECT COUNT(*) as count FROM learning_resources');
      const opportunities = await query('SELECT COUNT(*) as count FROM opportunities');
      const questions = await query('SELECT COUNT(*) as count FROM quiz_questions');

      console.log('--- Database Verification Report ---');
      console.log(`Careers Seeded:       ${careers[0].count}`);
      console.log(`Roadmap Topics:       ${topics[0].count}`);
      console.log(`Learning Resources:   ${resources[0].count}`);
      console.log(`Opportunities:        ${opportunities[0].count}`);
      console.log(`Quiz Questions:       ${questions[0].count}`);
      console.log('------------------------------------');
      console.log('StudentVerse Database is READY!');
      process.exit(0);
    } catch (e) {
      console.error('Verification query failed:', e.message);
      process.exit(1);
    }
  } else {
    console.error('Failed to establish database connection. Please check your DB_PASSWORD in backend/.env');
    process.exit(1);
  }
}

run();
