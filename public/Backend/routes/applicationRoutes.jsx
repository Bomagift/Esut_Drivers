const express = require('express');
const { submitApplication, getApplications, updateApplicationStatus } = require('../controllers/applicationController');
const router = express.Router();

router.post('/', submitApplication);
router.get('/', getApplications);
router.put('/:id', updateApplicationStatus);

module.exports = router;
