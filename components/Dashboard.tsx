
import React, { useState, useEffect, useRef } from 'react';
import { Upload, Image as ImageIcon, Sparkles, Target, AlertCircle, Clock, Loader2, RotateCcw, PenTool, FileImage, X } from 'lucide-react';
import HandwritingCanvas from './HandwritingCanvas';
import { recognizeHandwriting, QuotaError } from '../services/geminiService';
import { RecognitionResult, PredictionRecord } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  onAddRecord: (record: PredictionRecord) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onAddRecord }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [queuedImage, setQueuedImage] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<'canvas' | 'upload'>('canvas');
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let timer: any;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1 && queuedImage) {
            setTimeout(() => processHandwriting(queuedImage), 100);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown, queuedImage]);

  const processHandwriting = async (imageUrl: string) => {
    if (isProcessing) return;

    setIsProcessing(true);
    setError(null);
    setQueuedImage(null);

    try {
      const recognition = await recognizeHandwriting(imageUrl);
      setResult(recognition);
      onAddRecord({
        id: Math.random().toString(36).substr(2, 9),
        userId: 'demo-user',
        timestamp: Date.now(),
        imageUrl: imageUrl,
        predictedText: recognition.text,
        confidence: recognition.confidence,
        language: recognition.language,
        probabilities: recognition.probabilities,
      });
    } catch (err: any) {
      console.error("[Dashboard] Error:", err);
      if (err instanceof QuotaError || String(err).includes('429')) {
        setError("Free tier limit reached. Your request is now queued.");
        setCooldown(45);
        setQueuedImage(imageUrl);
      } else {
        setError("AI Service is temporarily unavailable. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCapture = (imageUrl: string) => {
    if (cooldown > 0) {
      setQueuedImage(imageUrl);
      setError("Request queued. Will auto-retry when limit resets.");
      return;
    }
    processHandwriting(imageUrl);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setUploadPreview(base64);
      handleCapture(base64);
    };
    reader.readAsDataURL(file);
  };

  const clearUpload = () => {
    setUploadPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setResult(null);
    setError(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-8">
        <section className="glass p-6 rounded-3xl relative overflow-hidden transition-all duration-500">
          {/* Enhanced Cooldown Overlay */}
          {cooldown > 0 && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl z-20 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
              <div className="p-8 bg-slate-900/50 border border-amber-500/20 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-6 max-w-sm">
                <div className="relative">
                  <Clock className="text-amber-500 animate-pulse" size={48} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-black text-2xl text-amber-200 tracking-tight text-center">System Cooling</h4>
                  <p className="text-sm text-slate-400 leading-relaxed text-center">
                    Limits are active. Request queued.
                  </p>
                </div>
                <div className="px-6 py-2 bg-amber-500 text-slate-950 rounded-2xl font-black text-2xl">
                  {cooldown}s
                </div>
                <button 
                  onClick={() => { setCooldown(0); setQueuedImage(null); setError(null); }}
                  className="text-xs text-slate-500 hover:text-white transition-colors underline"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="text-indigo-500" /> 
              Handwriting Input
            </h3>
            
            <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/5">
              <button 
                onClick={() => setInputMode('canvas')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${inputMode === 'canvas' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <PenTool size={14} /> Draw
              </button>
              <button 
                onClick={() => setInputMode('upload')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${inputMode === 'upload' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <FileImage size={14} /> Upload
              </button>
            </div>
          </div>
          
          <div className="relative">
            {inputMode === 'canvas' ? (
              <HandwritingCanvas onCapture={handleCapture} isProcessing={isProcessing || cooldown > 0} />
            ) : (
              <div className="space-y-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative h-[300px] w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${uploadPreview ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-slate-700 bg-slate-900/50 hover:border-indigo-500 hover:bg-indigo-500/5'}`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileUpload}
                  />
                  
                  {uploadPreview ? (
                    <>
                      <img src={uploadPreview} alt="Preview" className="w-full h-full object-contain" />
                      <button 
                        onClick={(e) => { e.stopPropagation(); clearUpload(); }}
                        className="absolute top-4 right-4 p-2 bg-slate-950/80 rounded-xl text-slate-400 hover:text-white border border-white/10"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 text-slate-500 group-hover:text-indigo-400 transition-colors">
                        <Upload size={32} />
                      </div>
                      <p className="font-bold text-slate-300">Drop image here</p>
                      <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-black">or click to browse</p>
                    </>
                  )}
                </div>
                
                {uploadPreview && !isProcessing && (
                  <button 
                    onClick={() => handleCapture(uploadPreview)}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Target size={20} /> Re-Analyze Image
                  </button>
                )}
              </div>
            )}

            {isProcessing && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] rounded-2xl flex items-center justify-center z-10 animate-in fade-in">
                <div className="glass px-8 py-4 rounded-3xl flex items-center gap-4 border-indigo-500/30 shadow-2xl scale-110">
                  <Loader2 className="text-indigo-500 animate-spin" size={28} />
                  <span className="text-lg font-black text-indigo-100 uppercase tracking-widest">Processing...</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {error && (
          <div className={`p-5 border rounded-3xl flex items-start gap-4 animate-in slide-in-from-top-4 transition-colors ${cooldown > 0 ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${cooldown > 0 ? 'bg-amber-500/20' : 'bg-red-500/20'}`}>
              {cooldown > 0 ? <Clock size={20} /> : <AlertCircle size={20} />}
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg">{cooldown > 0 ? 'Queue Active' : 'Analysis Paused'}</p>
              <p className="text-sm opacity-80 leading-relaxed">{error}</p>
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-5 space-y-8">
        <section className="glass p-6 rounded-3xl min-h-[400px] flex flex-col">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Target className="text-indigo-500" /> AI Analysis</h3>
          {result ? (
            <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center p-8 bg-indigo-600/10 rounded-[2.5rem] border border-indigo-500/20 shadow-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-400 font-black mb-4">Detected Text</p>
                <h4 className="text-5xl font-black mb-6 tracking-tight bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
                  {result.text}
                </h4>
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="px-4 py-1.5 glass rounded-full flex items-center gap-2 text-sm font-bold">
                    <span className={`w-2.5 h-2.5 rounded-full ${result.confidence > 0.85 ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-yellow-500'}`}></span>
                    {(result.confidence * 100).toFixed(1)}% Confidence
                  </span>
                  <span className="px-4 py-1.5 glass rounded-full flex items-center gap-2 text-sm font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
                    {result.language}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-h-[180px]">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Probability Breakdown</p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={result.probabilities} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.3} />
                    <XAxis dataKey="label" stroke="#64748b" fontSize={12} fontWeight="bold" axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={36}>
                      {result.probabilities.map((_, i) => <Cell key={i} fill={i === 0 ? '#6366f1' : '#1e293b'} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30 mt-10">
              <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center mb-6 shadow-xl border border-white/5">
                <ImageIcon size={40} className="text-slate-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-300 tracking-tight">Awaiting Input</h4>
              <p className="text-xs max-w-[200px] mt-2 leading-relaxed text-center">Analysis results and probability distribution will be visualized here.</p>
            </div>
          )}
        </section>

        <section className="glass p-6 rounded-3xl border-l-4 border-l-indigo-500 overflow-hidden relative">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl" />
          <h3 className="font-bold tracking-tight mb-5 flex items-center justify-between text-sm">
            System Infrastructure
            <span className="flex items-center gap-1.5 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
              <span className="w-1 h-1 bg-green-500 rounded-full animate-ping"></span>
              <span className="text-[8px] text-green-400 font-black uppercase">Active</span>
            </span>
          </h3>
          <div className="space-y-4">
            {[
              { label: 'CNN Backbone', val: 'ViT-Hybrid' },
              { label: 'API Layer', val: 'Gemini 3 Flash' },
              { label: 'Latency', val: '0.8s' },
              { label: 'Tier', val: 'Free Tier (15 RPM)' }
            ].map((stat, i) => (
              <div key={i} className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-bold uppercase tracking-wider">{stat.label}</span>
                <span className="font-mono text-indigo-300 bg-indigo-500/5 px-2 py-0.5 rounded-lg border border-indigo-500/10">{stat.val}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
