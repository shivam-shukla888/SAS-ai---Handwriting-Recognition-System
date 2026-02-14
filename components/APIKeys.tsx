
import React, { useState } from 'react';
import { Key, Copy, Trash2, Plus, Info, ShieldCheck, Check } from 'lucide-react';

const APIKeys: React.FC = () => {
  const [keys, setKeys] = useState([
    { id: '1', name: 'Production App', key: 'sas_pk_live_4492...88x', created: Date.now() - 86400000 * 30, lastUsed: Date.now() - 3600000 },
    { id: '2', name: 'Dev Testing', key: 'sas_pk_test_9921...z02', created: Date.now() - 86400000 * 5, lastUsed: Date.now() - 7200000 },
  ]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight">API Management</h2>
          <p className="text-slate-500 mt-2">Connect your applications to SAS ai via secure REST endpoints.</p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black flex items-center gap-2 shadow-xl shadow-indigo-600/20 transition-all">
          <Plus size={20} /> Create New Key
        </button>
      </div>

      <div className="p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-[2.5rem] flex items-start gap-6">
        <div className="w-14 h-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-400 shrink-0">
          <ShieldCheck size={32} />
        </div>
        <div className="space-y-2">
          <h4 className="font-bold">Developer Security Notice</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            API keys are sensitive credentials. Never commit them to version control. Use environment variables to keep your integration secure.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {keys.map((k) => (
          <div key={k.id} className="glass p-6 rounded-3xl border-white/5 hover:border-white/10 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-slate-500">
                <Key size={20} />
              </div>
              <div>
                <h5 className="font-bold">{k.name}</h5>
                <div className="flex items-center gap-3 mt-1">
                  <code className="text-[11px] font-mono text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10">
                    {k.key}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(k.id, 'sas_full_api_key_hidden')}
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    {copiedId === k.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-12">
              <div className="text-right hidden md:block">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">Last Used</p>
                <p className="text-xs font-bold text-slate-300">{new Date(k.lastUsed!).toLocaleDateString()}</p>
              </div>
              <button className="p-3 bg-red-500/5 hover:bg-red-500/10 text-red-500 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default APIKeys;
