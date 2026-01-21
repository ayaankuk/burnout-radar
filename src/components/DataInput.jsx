import React, { useState } from 'react';

const DataInput = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    sleep: 7, workHours: 8, stress: 3, deadlines: 0, exercise: true, mood: 3
  });

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 lg:col-span-2">
      <h2 className="text-lg font-semibold mb-4 text-slate-300">Log Today's Data</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Sleep (hrs)</label>
          <input type="number" step="0.5" value={formData.sleep} onChange={(e) => setFormData({...formData, sleep: parseFloat(e.target.value)})} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Work/Study (hrs)</label>
          <input type="number" step="0.5" value={formData.workHours} onChange={(e) => setFormData({...formData, workHours: parseFloat(e.target.value)})} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Stress (1-5)</label>
          <input type="number" min="1" max="5" value={formData.stress} onChange={(e) => setFormData({...formData, stress: parseInt(e.target.value)})} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Deadlines</label>
          <input type="number" min="0" value={formData.deadlines} onChange={(e) => setFormData({...formData, deadlines: parseInt(e.target.value)})} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Mood (1-5)</label>
          <select value={formData.mood} onChange={(e) => setFormData({...formData, mood: parseInt(e.target.value)})} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white">
            <option value="1">😞 Bad</option>
            <option value="2">😕 Poor</option>
            <option value="3">😐 Okay</option>
            <option value="4">🙂 Good</option>
            <option value="5">😊 Great</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Exercise?</label>
          <select value={formData.exercise ? 'yes' : 'no'} onChange={(e) => setFormData({...formData, exercise: e.target.value === 'yes'})} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
      <button onClick={() => onSubmit(formData)} className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition-colors">
        Log Entry
      </button>
    </div>
  );
};

export default DataInput;
