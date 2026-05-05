const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Batch',
    required: true,
  },
  stage: {
    type: String,
    required: [true, 'Please add a stage'],
    enum: ['Harvested', 'In Transit', 'In Warehouse', 'Processed', 'At Retailer', 'Sold'],
  },
  location: {
    type: String,
    required: [true, 'Please add a location'],
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notes: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Log', logSchema);
