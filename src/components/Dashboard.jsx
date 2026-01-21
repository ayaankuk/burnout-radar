import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import RiskGauge from './RiskGauge';
import DataInput from './DataInput';
import InsightsPanel from './InsightsPanel';
import TrendChart from './TrendChart';
import { calculateBurnoutScore } from '../utils/burnoutCalculator';
import { loadEntries, saveEntries } from '../utils/storage';

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = loadEntries();
    setEntries(data);
    setLoading(false);
  }, []);

  const addEntry = (formData) => {
    const newEntry = {
      ...formData,
      date: new Date().toISOString(),
      score: calculateBurnoutScore(formData)
    };
    const updated = [...entries, newEntry];
    setEntries(updated);
    saveEntries(updated);
  };

  const currentScore = entries.length > 0 ? entries[entries.length - 1].score : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Activity className="text-orange-500" size={40} />
            Burnout Radar
          </h1>
          <p className="text-slate-400">Predictive Performance Infrastructure</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <RiskGauge score={currentScore} />
          <DataInput onSubmit={addEntry} />
        </div>
        {entries.length > 0 && <InsightsPanel entries={entries} />}
        {entries.length > 1 && <TrendChart entries={entries} />}
      </div>
    </div>
  );
};

export default Dashboard;
