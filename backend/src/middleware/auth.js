const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'studentverse_super_secret_jwt_key_2026_secure';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer <TOKEN>

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Authentication token required.'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.student = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired authentication session. Please log in again.'
    });
  }
}

module.exports = {
  authenticateToken,
  JWT_SECRET
};
