const { GoogleGenerativeAI } = require('@google/generative-ai');
const Batch = require('../models/Batch');
const Log = require('../models/Log');

// @desc    Analyze batch tracking logs using Gemini AI
// @route   GET /api/ai/analyze/:batchId
// @access  Public
const analyzeBatch = async (req, res) => {
  try {
    const { batchId } = req.params;

    // Fetch batch and logs
    const batch = await Batch.findById(batchId).populate('farmerId', 'name');
    const logs = await Log.find({ batch: batchId }).sort({ timestamp: 1 });

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an AI supply chain expert for agricultural products. 
      Analyze the following crop batch data and tracking logs to provide insights.
      
      Batch Info:
      - Crop: ${batch.cropName}
      - Origin: ${batch.origin}
      - Harvest Date: ${batch.harvestDate}
      - Current Status: ${batch.status}
      
      Tracking Logs:
      ${logs.map(log => `- [${log.timestamp}] ${log.stage} at ${log.location}: ${log.notes}`).join('\n')}
      
      Current Date: ${new Date().toISOString()}

      Provide a JSON response with exactly these keys:
      1. freshnessScore (number 0-100 based on time since harvest and stages)
      2. delayDetected (boolean, true if there are suspicious gaps between logs)
      3. riskSummary (string, max 2 sentences summarizing potential risks or quality)
      
      Return ONLY the JSON object.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up potential markdown formatting in response
    const jsonString = text.replace(/```json|```/g, '').trim();
    const insights = JSON.parse(jsonString);

    res.json(insights);
  } catch (error) {
    console.error('Gemini AI Error:', error);
    res.status(500).json({ message: 'Failed to generate AI insights' });
  }
};

module.exports = {
  analyzeBatch,
};
