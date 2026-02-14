
import React, { useState } from 'react';
import { User as UserType } from '../types';
import { Lock, Mail, Github, Chrome, ArrowLeft, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface AuthProps {
  onLogin: (user: UserType) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      id: Math.random().toString(36).substr(2, 9),
      username: username || 'Guest User',
      email: email || 'guest@example.com',
      role: username.toLowerCase().includes('admin') ? 'ADMIN' : 'USER',
      plan: 'FREE'
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/30 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/30 blur-[150px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-lg relative">
        <div className="text-center mb-10">
          <Link to="/welcome" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Back to Site</span>
          </Link>
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-indigo-600/40 mb-6">
            <span className="text-white text-4xl font-black">S</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter">
            {isLogin ? 'Sign in to SAS' : 'Create your Account'}
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Empowering the next generation of handwriting AI.</p>
        </div>

        <div className="glass p-12 rounded-[3.5rem] shadow-2xl border-white/5 space-y-8 backdrop-blur-3xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  {/* Fixed Error: Using User icon instead of UserType (interface) */}
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-14 py-5 outline-none transition-all placeholder:text-slate-600 font-bold"
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-14 py-5 outline-none transition-all placeholder:text-slate-600 font-bold"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full bg-slate-900/50 border border-white/5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-14 py-5 outline-none transition-all placeholder:text-slate-600 font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg shadow-2xl shadow-indigo-600/30 transition-all active:scale-[0.98]"
            >
              {isLogin ? 'Continue to Platform' : 'Generate Account'}
            </button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em]"><span className="bg-slate-950/20 px-4 text-slate-600">Enterprise Auth</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 glass rounded-2xl hover:bg-white/5 transition-all font-bold">
              <Chrome size={20} className="text-red-400" /> Google
            </button>
            <button className="flex items-center justify-center gap-3 py-4 glass rounded-2xl hover:bg-white/5 transition-all font-bold">
              <Github size={20} /> GitHub
            </button>
          </div>

          <p className="text-center text-sm font-bold text-slate-500">
            {isLogin ? "New to SAS?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {isLogin ? 'Join the waitlist' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
