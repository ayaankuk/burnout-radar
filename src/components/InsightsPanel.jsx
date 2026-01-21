import React from 'react';
import { Brain } from 'lucide-react';
import { generateInsights } from '../utils/insightsEngine';

const InsightsPanel = ({ entries }) => {
  const insights = generateInsights(entries);

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4 text-slate-300 flex items-center gap-2">
        <Brain size={20} />
        Insights
      </h2>
      <div className="space-y-3">
        {insights.length > 0 ? insights.map((insight, i) => (
          <div key={i} className="flex items-start gap-3 bg-slate-700/50 p-3 rounded-lg">
            <insight.icon size={20} className={insight.type === 'warning' ? 'text-orange-400' : insight.type === 'positive' ? 'text-green-400' : insight.type === 'action' ? 'text-blue-400' : 'text-slate-400'} />
            <p className="text-slate-200 text-sm">{insight.text}</p>
          </div>
        )) : (
          <p className="text-slate-400 text-sm">Log more entries to see personalized insights</p>
        )}
      </div>
    </div>
  );
};

export default InsightsPanel;
