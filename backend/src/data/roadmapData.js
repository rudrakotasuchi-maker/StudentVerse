// Comprehensive 4-Year B.Tech Career Roadmap Milestones for All 13 Engineering & Tech Career Paths
// Aggregates modular roadmap files from ./roadmaps/
// Total: 224 Milestones (32 for Software Engineering + 16 for each of the other 12 careers)

const softwareEngineering = require('./roadmaps/softwareEngineering');
const fullStack = require('./roadmaps/fullStack');
const aiMachineLearning = require('./roadmaps/aiMachineLearning');
const dataAnalytics = require('./roadmaps/dataAnalytics');
const dataScience = require('./roadmaps/dataScience');
const cybersecurity = require('./roadmaps/cybersecurity');
const cloudDevops = require('./roadmaps/cloudDevops');
const embeddedVlsi = require('./roadmaps/embeddedVlsi');
const electricalEv = require('./roadmaps/electricalEv');
const mechanicalRobotics = require('./roadmaps/mechanicalRobotics');
const civilBim = require('./roadmaps/civilBim');
const gateHigherStudies = require('./roadmaps/gateHigherStudies');
const govtServices = require('./roadmaps/govtServices');

const allRoadmapTopics = [
  ...softwareEngineering,
  ...fullStack,
  ...aiMachineLearning,
  ...dataAnalytics,
  ...dataScience,
  ...cybersecurity,
  ...cloudDevops,
  ...embeddedVlsi,
  ...electricalEv,
  ...mechanicalRobotics,
  ...civilBim,
  ...gateHigherStudies,
  ...govtServices
];

module.exports = allRoadmapTopics;
