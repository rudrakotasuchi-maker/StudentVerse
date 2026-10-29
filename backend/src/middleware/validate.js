const validBranches = [
  'CSE',
  'AI&DS',
  'AI&ML',
  'IT',
  'ECE',
  'EEE',
  'Mechanical Engineering',
  'Civil Engineering'
];

function validateRegistration(req, res, next) {
  const { full_name, email, password, branch, academic_year } = req.body;

  if (!full_name || typeof full_name !== 'string' || full_name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Full name is required and must be at least 2 characters.'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long.'
    });
  }

  if (!branch || !validBranches.includes(branch)) {
    return res.status(400).json({
      success: false,
      message: `Invalid branch. Allowed branches: ${validBranches.join(', ')}`
    });
  }

  const year = parseInt(academic_year, 10);
  if (isNaN(year) || year < 1 || year > 4) {
    return res.status(400).json({
      success: false,
      message: 'Academic year must be between 1 and 4.'
    });
  }

  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Both email and password are required.'
    });
  }

  next();
}

module.exports = {
  validateRegistration,
  validateLogin,
  validBranches
};
