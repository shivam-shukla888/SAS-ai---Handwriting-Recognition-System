
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Target, Zap, Clock, TrendingUp } from 'lucide-react';

const MOCK_DATA = [
  { name: 'Mon', requests: 400, accuracy: 98.2 },
  { name: 'Tue', requests: 600, accuracy: 97.5 },
  { name: 'Wed', requests: 550, accuracy: 99.1 },
  { name: 'Thu', requests: 800, accuracy: 98.8 },
  { name: 'Fri', requests: 700, accuracy: 98.4 },
  { name: 'Sat', requests: 300, accuracy: 99.5 },
  { name: 'Sun', requests: 250, accuracy: 99.2 },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Monthly Volume', value: '24.8k', change: '+12%', icon: <Zap className="text-amber-500" /> },
          { label: 'Avg. Accuracy', value: '98.8%', change: '+0.4%', icon: <Target className="text-green-500" /> },
          { label: 'Avg. Latency', value: '342ms', change: '-18ms', icon: <Clock className="text-blue-500" /> },
          { label: 'Growth', value: '210%', change: 'Weekly', icon: <TrendingUp className="text-indigo-500" /> },
        ].map((s, i) => (
          <div key={i} className="glass p-8 rounded-[2.5rem] border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                {s.icon}
              </div>
              <span className="text-[10px] font-black bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-full">{s.change}</span>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">{s.label}</p>
            <h4 className="text-3xl font-black">{s.value}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="glass p-10 rounded-[3rem] border-white/5">
          <h3 className="text-xl font-bold mb-8">Request Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_DATA}>
                <defs>
                  <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
                <Area type="monotone" dataKey="requests" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorReq)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="glass p-10 rounded-[3rem] border-white/5">
          <h3 className="text-xl font-bold mb-8">Accuracy Benchmarks</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis domain={[95, 100]} hide />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px' }} />
                <Bar dataKey="accuracy" fill="#10b981" radius={[10, 10, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Analytics;
