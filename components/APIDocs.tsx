
import React from 'react';
import { Code, Terminal, Key, ShieldCheck, ChevronRight } from 'lucide-react';

const APIDocs: React.FC = () => {
  const endpoints = [
    {
      method: 'POST',
      path: '/predict',
      desc: 'Predict handwriting from base64 image',
      req: { image: 'data:image/png;base64,...' },
      res: { text: 'Hello', confidence: 0.98, language: 'en' }
    },
    {
      method: 'POST',
      path: '/train',
      desc: 'Submit custom dataset for retraining',
      req: { dataset_id: 'ds_992', epochs: 25 },
      res: { status: 'queued', job_id: 'job_441' }
    }
  ];

  return (
    <div className="max-w-4xl space-y-8 pb-10">
      <div className="glass p-8 rounded-3xl">
        <h2 className="text-3xl font-black mb-4">REST API Documentation</h2>
        <p className="text-slate-400">Integrate SAS ai into your own infrastructure using our high-performance REST endpoints.</p>
        
        <div className="mt-8 flex items-center gap-4 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
          <Key className="text-indigo-400" />
          <div>
            <p className="text-sm font-bold">Authentication</p>
            <p className="text-xs text-slate-500">Bearer Token (JWT) required in Authorization header.</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {endpoints.map((ep, i) => (
          <div key={i} className="glass rounded-3xl overflow-hidden">
            <div className="flex items-center gap-4 px-6 py-4 bg-white/5 border-b border-white/5">
              <span className={`px-3 py-1 rounded-lg font-black text-xs ${ep.method === 'POST' ? 'bg-blue-600' : 'bg-green-600'}`}>
                {ep.method}
              </span>
              <code className="text-indigo-400 font-mono font-bold">{ep.path}</code>
              <span className="text-sm text-slate-500 ml-auto">{ep.desc}</span>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Request Body</p>
                <pre className="p-4 bg-slate-950 rounded-2xl text-[10px] font-mono border border-white/5 overflow-x-auto">
                  {JSON.stringify(ep.req, null, 2)}
                </pre>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Response Example</p>
                <pre className="p-4 bg-slate-950 rounded-2xl text-[10px] font-mono border border-white/5 overflow-x-auto text-green-400">
                  {JSON.stringify(ep.res, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default APIDocs;