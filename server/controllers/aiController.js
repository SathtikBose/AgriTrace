const axios = require('axios');
const Batch = require('../models/Batch');
const Log = require('../models/Log');

// @desc    Analyze batch tracking logs using OpenRouter (Gemini Flash)
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

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'google/gemini-flash-1.5',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'http://localhost:5000', // Optional
          'X-Title': 'AgriTrace', // Optional
          'Content-Type': 'application/json',
        },
      }
    );

    const text = response.data.choices[0].message.content;
    
    // Clean up potential markdown formatting in response
    const jsonString = text.replace(/```json|```/g, '').trim();
    const insights = JSON.parse(jsonString);

    res.json(insights);
  } catch (error) {
    console.error('OpenRouter AI Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to generate AI insights via OpenRouter' });
  }
};

module.exports = {
  analyzeBatch,
};
