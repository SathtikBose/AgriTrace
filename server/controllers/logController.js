const Log = require('../models/Log');
const Batch = require('../models/Batch');

// @desc    Add new tracking log
// @route   POST /api/logs
// @access  Private
const addLog = async (req, res) => {
  const { batchId, stage, location, notes } = req.body;

  try {
    const batch = await Batch.findById(batchId);

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Check if the stage is actually a progression (optional but good)
    // For now, allow any stage update as long as it's within the enum

    const log = await Log.create({
      batch: batchId,
      stage,
      location,
      notes,
      updatedBy: req.user._id,
    });

    // Update batch status
    batch.status = stage;
    await batch.save();

    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get logs for a specific batch
// @route   GET /api/logs/:batchId
// @access  Public
const getLogsByBatch = async (req, res) => {
  try {
    const logs = await Log.find({ batch: req.params.batchId })
      .populate('updatedBy', 'name role')
      .sort({ timestamp: 1 }); // Chronological order

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addLog,
  getLogsByBatch,
};
