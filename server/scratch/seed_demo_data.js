const mongoose = require('mongoose');
const User = require('../models/User');
const Batch = require('../models/Batch');
const Log = require('../models/Log');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

const seedDemoData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find our users
    const farmer = await User.findOne({ email: 'frank_farmer@gmail.com' });
    const transporter = await User.findOne({ email: 'tracey_transporter@gmail.com' });
    const warehouse = await User.findOne({ email: 'walter_warehouse@gmail.com' });
    const distributor = await User.findOne({ email: 'diana_distributor@gmail.com' });
    const retailer = await User.findOne({ email: 'rebecca_retailer@gmail.com' });

    if (!farmer) {
      console.error('Users not found. Run create_users.js first.');
      process.exit(1);
    }

    // Clear existing demo data (Optional: only if you want a fresh start)
    // await Batch.deleteMany({});
    // await Log.deleteMany({});

    const demoBatches = [
      {
        cropName: 'Organic Tomatoes',
        origin: 'Sunny Valley Farm, CA',
        quantity: '500 kg',
        harvestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        farmerId: farmer._id,
        status: 'Harvested',
        logs: [
          { stage: 'Harvested', location: 'Sunny Valley Farm', notes: 'Perfectly ripe organic tomatoes harvested at dawn.', updatedBy: farmer._id }
        ]
      },
      {
        cropName: 'Premium Arabica Coffee',
        origin: 'Highlands Estate, Ethiopia',
        quantity: '200 kg',
        harvestDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        farmerId: farmer._id,
        status: 'Sold',
        logs: [
          { stage: 'Harvested', location: 'Highlands Estate', notes: 'Specialty grade beans harvested.', updatedBy: farmer._id },
          { stage: 'In Transit', location: 'En route to Port', notes: 'Loaded into temperature-controlled truck.', updatedBy: transporter._id },
          { stage: 'In Warehouse', location: 'Addis Ababa Cold Storage', notes: 'Stored at 18°C. Quality verified.', updatedBy: warehouse._id },
          { stage: 'At Retailer', location: 'Global Logistics Hub', notes: 'Cleared for international shipping.', updatedBy: distributor._id },
          { stage: 'Sold', location: 'Elite Coffee Roasters, NYC', notes: 'Delivered to retailer. Beans in perfect condition.', updatedBy: retailer._id }
        ]
      },
      {
        cropName: 'Golden Durum Wheat',
        origin: 'Central Plains, Kansas',
        quantity: '2000 kg',
        harvestDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        farmerId: farmer._id,
        status: 'In Transit',
        logs: [
          { stage: 'Harvested', location: 'Plot A12, Kansas', notes: 'Batch 402 harvesting completed.', updatedBy: farmer._id },
          { stage: 'In Transit', location: 'I-70 Highway', notes: 'Heading to state warehouse.', updatedBy: transporter._id }
        ]
      },
      {
        cropName: 'Fuji Apples',
        origin: 'Orchard Hill, WA',
        quantity: '1200 kg',
        harvestDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        farmerId: farmer._id,
        status: 'In Warehouse',
        logs: [
          { stage: 'Harvested', location: 'Orchard Hill', notes: 'Freshly picked Fuji apples.', updatedBy: farmer._id },
          { stage: 'In Transit', location: 'WA State Route 2', notes: 'Transporting to regional hub.', updatedBy: transporter._id },
          { stage: 'In Warehouse', location: 'Seattle Cold Chain Facility', notes: 'Quality check passed. Humidity at 90%.', updatedBy: warehouse._id }
        ]
      }
    ];

    for (const data of demoBatches) {
      const randomBytes = crypto.randomBytes(3).toString('hex').toUpperCase();
      const batchId = `AGRI-${Math.floor(Math.random() * 9000 + 1000)}${randomBytes}`;

      const batch = new Batch({
        batchId,
        cropName: data.cropName,
        origin: data.origin,
        quantity: data.quantity,
        harvestDate: data.harvestDate,
        farmerId: data.farmerId,
        status: data.status
      });
      await batch.save();

      for (const logData of data.logs) {
        const log = new Log({
          batch: batch._id,
          ...logData,
          timestamp: new Date(Date.now() - (data.logs.length - data.logs.indexOf(logData)) * 12 * 60 * 60 * 1000) // Spread logs over time
        });
        await log.save();
      }
      console.log(`Created demo batch: ${batch.batchId} (${batch.cropName})`);
    }

    console.log('Demo data seeding completed!');
    process.exit();
  } catch (error) {
    console.error('Error seeding demo data:', error);
    process.exit(1);
  }
};

seedDemoData();
