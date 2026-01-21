import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrendChart = ({ entries }) => {
  const chartData = entries.slice(-14).map((e, i) => ({
    day: `Day ${i + 1}`, score: e.score, sleep: e.sleep, work: e.workHours, stress: e.stress * 20
  }));

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4 text-slate-300">Risk Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="day" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
          <Line type="monotone" dataKey="score" stroke="#f97316" strokeWidth={3} dot={{ fill: '#f97316' }} />
          <Line type="monotone" dataKey="sleep" stroke="#10b981" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="work" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex gap-6 justify-center mt-4 text-sm">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-full"></div><span className="text-slate-400">Burnout Score</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div><span className="text-slate-400">Sleep</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div><span className="text-slate-400">Work Hours</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div><span className="text-slate-400">Stress (×20)</span></div>
      </div>
    </div>
  );
};

export default TrendChart;
