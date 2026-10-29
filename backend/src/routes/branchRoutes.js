const express = require('express');
const router = express.Router();
const { getBranches, getBranchByCode } = require('../controllers/branchController');

router.get('/', getBranches);
router.get('/:code', getBranchByCode);

module.exports = router;
