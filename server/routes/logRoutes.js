const express = require('express');
const router = express.Router();
const {
  addLog,
  getLogsByBatch,
} = require('../controllers/logController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addLog);
router.get('/:batchId', getLogsByBatch);

module.exports = router;
