const express = require('express');
const router = express.Router();
const { analyzeBatch } = require('../controllers/aiController');

router.get('/analyze/:batchId', analyzeBatch);

module.exports = router;
