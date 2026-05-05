import React, { useState, useEffect } from 'react';
import { Sparkles, AlertTriangle, CheckCircle2, Zap, Info } from 'lucide-react';
import api from '../utils/api';

const AIInsights = ({ batchId }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const { data } = await api.get(`/ai/analyze/${batchId}`);
        setInsights(data);
      } catch (err) {
        setError('Could not generate AI insights at this time.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (batchId) fetchInsights();
  }, [batchId]);

  if (loading) return (
    <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-3xl p-8 text-white animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="h-5 w-5 text-primary-300" />
        <div className="h-4 w-32 bg-primary-700 rounded"></div>
      </div>
      <div className="space-y-4">
        <div className="h-20 bg-primary-700/50 rounded-2xl"></div>
        <div className="h-12 bg-primary-700/50 rounded-2xl"></div>
      </div>
    </div>
  );

  if (error || !insights) return null;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-primary-950 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Zap className="h-20 w-20 text-white fill-current" />
      </div>

      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="bg-primary-500/20 p-2 rounded-xl">
          <Sparkles className="h-6 w-6 text-primary-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight">AI Smart Insights</h3>
          <p className="text-xs text-primary-400 font-medium uppercase tracking-wider">Powered by Gemini Flash</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* Freshness Score */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <div className="flex justify-between items-end mb-4">
            <span className="text-gray-400 text-sm font-medium">Freshness Score</span>
            <span className={`text-3xl font-bold ${insights.freshnessScore > 70 ? 'text-green-400' : 'text-yellow-400'}`}>
              {insights.freshnessScore}%
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${insights.freshnessScore > 70 ? 'bg-green-400' : 'bg-yellow-400'}`}
              style={{ width: `${insights.freshnessScore}%` }}
            ></div>
          </div>
        </div>

        {/* Delay Status */}
        <div className={`rounded-2xl p-6 border ${insights.delayDetected ? 'bg-red-500/10 border-red-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
          <div className="flex items-center gap-3">
            {insights.delayDetected ? (
              <AlertTriangle className="h-6 w-6 text-red-400" />
            ) : (
              <CheckCircle2 className="h-6 w-6 text-green-400" />
            )}
            <div>
              <span className="text-gray-400 text-xs block mb-1">Delay Detection</span>
              <span className={`font-bold ${insights.delayDetected ? 'text-red-400' : 'text-green-400'}`}>
                {insights.delayDetected ? 'Delay Detected' : 'On Schedule'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Summary */}
      <div className="mt-6 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 relative z-10">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-primary-400 shrink-0 mt-0.5" />
          <p className="text-gray-300 text-sm leading-relaxed italic">
            "{insights.riskSummary}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
