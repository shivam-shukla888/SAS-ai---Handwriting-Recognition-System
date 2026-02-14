
import React, { useState } from 'react';
import { Play, RotateCcw, Save, AlertCircle, Info } from 'lucide-react';

const ModelTraining: React.FC = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);

  const startTraining = () => {
    setIsTraining(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          return 100;
        }
        return p + 2;
      });
    }, 100);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold">Model Training</h3>
          <p className="text-slate-400">Manage CNN training sessions and evaluate metrics.</p>
        </div>
        <button 
          onClick={startTraining} 
          disabled={isTraining}
          className="px-6 py-2 bg-indigo-600 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          <Play size={18} fill="currentColor" /> {isTraining ? 'Training...' : 'Start Training'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="glass p-6 rounded-3xl space-y-6">
          <h4 className="font-bold">Training Configuration</h4>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-500 uppercase font-bold">Batch Size</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 mt-1">
                <option>32</option>
                <option>64</option>
                <option>128</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 uppercase font-bold">Learning Rate</label>
              <input type="text" defaultValue="0.001" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 mt-1" />
            </div>
            <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex gap-3">
              <Info size={20} className="text-indigo-400 shrink-0" />
              <p className="text-xs text-indigo-200">The model uses an optimized CNN architecture with Batch Normalization for stability.</p>
            </div>
          </div>
        </section>

        <section className="glass p-6 rounded-3xl space-y-6">
          <h4 className="font-bold">Progress & Metrics</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl text-center">
                <p className="text-xs text-slate-500 font-bold uppercase">Accuracy</p>
                <p className="text-xl font-black text-green-400">98.2%</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl text-center">
                <p className="text-xs text-slate-500 font-bold uppercase">Loss</p>
                <p className="text-xl font-black text-slate-100">0.045</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="glass p-6 rounded-3xl">
        <h4 className="font-bold mb-4">Training History</h4>
        <div className="space-y-3">
          {[1, 2, 3].map((v) => (
            <div key={v} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                  #{v}
                </div>
                <div>
                  <p className="font-bold">Session 2024-0{v}-12</p>
                  <p className="text-xs text-slate-500">MNIST Extended Dataset • 50 Epochs</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-400">97.8% Acc</p>
                <p className="text-xs text-slate-500">Completed</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ModelTraining;