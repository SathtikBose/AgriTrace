const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  batchId: {
    type: String,
    required: true,
    unique: true,
  },
  cropName: {
    type: String,
    required: [true, 'Please add a crop name'],
  },
  origin: {
    type: String,
    required: [true, 'Please add the origin location'],
  },
  quantity: {
    type: String,
    required: [true, 'Please add quantity'],
  },
  harvestDate: {
    type: Date,
    required: [true, 'Please add harvest date'],
  },
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['Harvested', 'In Transit', 'In Warehouse', 'Processed', 'At Retailer', 'Sold'],
    default: 'Harvested',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Batch', batchSchema);
