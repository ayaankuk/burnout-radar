import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { getRiskLevel } from '../utils/burnoutCalculator';

const RiskGauge = ({ score }) => {
  const { level, color } = getRiskLevel(score);
  const gaugeData = [{ name: 'Risk', value: score, fill: color }];

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4 text-slate-300">Current Risk Score</h2>
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={200}>
          <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={gaugeData} startAngle={180} endAngle={0}>
            <RadialBar minAngle={15} background clockWise dataKey="value" />
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-4xl font-bold" fill={color}>
              {Math.round(score)}
            </text>
            <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" className="text-sm" fill="#94a3b8">
              {level}
            </text>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RiskGauge;
