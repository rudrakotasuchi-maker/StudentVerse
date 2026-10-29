const express = require('express');
const router = express.Router();
const { getOpportunities, createOpportunity } = require('../controllers/opportunityController');

router.get('/', getOpportunities);
router.post('/', createOpportunity); // Admin/verified creation endpoint

module.exports = router;
