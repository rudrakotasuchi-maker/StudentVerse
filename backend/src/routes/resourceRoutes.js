const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getResources, getSavedResources, toggleSaveResource } = require('../controllers/resourceController');
const { authenticateToken, JWT_SECRET } = require('../middleware/auth');

// Optional auth middleware: extracts student if valid token provided, but doesn't block if missing
function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.student = decoded;
    } catch (e) {
      // Continue without user
    }
  }
  next();
}

router.get('/', optionalAuth, getResources);
router.get('/saved', authenticateToken, getSavedResources);
router.post('/toggle-save', authenticateToken, toggleSaveResource);

module.exports = router;
