
import React from 'react';
import { PredictionRecord } from '../types';
import { Download, Search, Filter } from 'lucide-react';

interface HistoryProps {
  history: PredictionRecord[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-2xl font-bold">Prediction History</h3>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search text..." 
              className="pl-10 pr-4 py-2 glass rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64"
            />
          </div>
          <button className="p-2 glass rounded-xl hover:bg-white/10 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="glass rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Image</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Prediction</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Language</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Confidence</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.length > 0 ? history.map((record) => (
                <tr key={record.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="w-16 h-10 rounded-lg overflow-hidden border border-slate-700">
                      <img src={record.imageUrl} alt="handwriting" className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold">{record.predictedText}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-lg">{record.language}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${record.confidence > 0.8 ? 'bg-green-500' : 'bg-yellow-500'}`} 
                          style={{ width: `${record.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono">{(record.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {new Date(record.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-indigo-600 rounded-lg transition-all text-white">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-slate-500">
                    No history found. Start recognizing handwriting to see results here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
