
import React from 'react';
import { Users, Database, ShieldAlert, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_TRAFFIC = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  requests: Math.floor(Math.random() * 100) + 20
}));

const AdminPanel: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: '1,284', icon: <Users className="text-blue-500" /> },
          { label: 'DB Storage', value: '45.2 GB', icon: <Database className="text-purple-500" /> },
          { label: 'Avg Latency', value: '112ms', icon: <Activity className="text-green-500" /> },
          { label: 'Failed Req.', value: '0.04%', icon: <ShieldAlert className="text-red-500" /> },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">{stat.label}</span>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-6 rounded-3xl">
          <h3 className="text-xl font-bold mb-6">Inference Traffic (24h)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_TRAFFIC}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} interval={3} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                />
                <Line type="monotone" dataKey="requests" stroke="#6366f1" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-6 rounded-3xl">
          <h3 className="text-xl font-bold mb-6">User Management</h3>
          <div className="space-y-4">
            {[
              { name: 'Alice Chen', role: 'Admin', status: 'Active' },
              { name: 'Bob Smith', role: 'User', status: 'Inactive' },
              { name: 'Charlie Day', role: 'User', status: 'Active' },
              { name: 'Diana Ross', role: 'Admin', status: 'Active' }
            ].map((user, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                    {user.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-[10px] text-slate-500">{user.role}</p>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${user.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-slate-500/10 text-slate-400'}`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 glass rounded-xl text-sm font-semibold hover:bg-white/10 transition-all">
            View All Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
