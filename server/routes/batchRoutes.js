const express = require('express');
const router = express.Router();
const {
  createBatch,
  getBatches,
  getBatchById,
} = require('../controllers/batchController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, authorize('Farmer'), createBatch)
  .get(protect, getBatches);

router.get('/:id', getBatchById);

module.exports = router;
