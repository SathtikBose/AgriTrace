const Batch = require('../models/Batch');
const crypto = require('crypto');

// @desc    Create new crop batch
// @route   POST /api/batches
// @access  Private/Farmer
const createBatch = async (req, res) => {
  const { cropName, origin, quantity, harvestDate } = req.body;

  try {
    // Generate unique Batch ID (AGRI-XXXXX)
    const randomBytes = crypto.randomBytes(3).toString('hex').toUpperCase();
    const batchId = `AGRI-${Date.now().toString().slice(-4)}${randomBytes}`;

    const batch = await Batch.create({
      batchId,
      cropName,
      origin,
      quantity,
      harvestDate,
      farmerId: req.user._id,
      status: 'Harvested',
    });

    res.status(201).json(batch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all batches
// @route   GET /api/batches
// @access  Private
const getBatches = async (req, res) => {
  try {
    let query = {};
    
    // If user is Farmer, only show their batches
    if (req.user.role === 'Farmer') {
      query = { farmerId: req.user._id };
    }

    const batches = await Batch.find(query).populate('farmerId', 'name email');
    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single batch by ID
// @route   GET /api/batches/:id
// @access  Public
const getBatchById = async (req, res) => {
  try {
    const batch = await Batch.findOne({ batchId: req.params.id })
      .populate('farmerId', 'name email');

    if (batch) {
      res.json(batch);
    } else {
      res.status(404).json({ message: 'Batch not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBatch,
  getBatches,
  getBatchById,
};
