
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cpu, Code, Target, BookOpen, ArrowRight, Github, Sparkles } from 'lucide-react';
import { User } from '../types';

interface LandingPageProps {
  user: User | null;
}

const LandingPage: React.FC<LandingPageProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#020617] text-white min-h-screen font-inter">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 px-6 lg:px-20 h-16 flex items-center justify-between bg-[#020617]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="font-bold text-lg">S</span>
          </div>
          <span className="text-lg font-bold">SAS<span className="text-indigo-500"> ai</span></span>
        </div>
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/auth" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Sign In</Link>
              <button onClick={() => navigate('/auth')} className="px-5 py-2 bg-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all">
                Get Started
              </button>
            </>
          ) : (
            <button onClick={() => navigate('/')} className="px-5 py-2 bg-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all">
              Dashboard
            </button>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-6 flex items-center gap-2 mx-auto w-fit">
          <Sparkles size={12} /> Next-Gen OCR Intelligence
        </div>
        <h1 className="text-4xl lg:text-7xl font-extrabold tracking-tighter mb-6 leading-[1.1]">
          Intelligent <br/> <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Handwriting Recognition</span>
        </h1>
        <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
          State-of-the-art vision models designed to bridge the gap between handwritten notes and digital data with industry-leading accuracy.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => navigate('/auth')} className="px-8 py-3.5 bg-indigo-600 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-indigo-600/20">
            Launch Platform <ArrowRight size={18} />
          </button>
          <button className="px-8 py-3.5 bg-slate-800 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-700 transition-all">
            <BookOpen size={18} /> Documentation
          </button>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Cpu />, title: "CNN Architecture", desc: "Proprietary vision-transformer hybrid model for high-precision character segmentation." },
            { icon: <Code />, title: "Full-Stack API", desc: "Low-latency REST API endpoints for seamless integration into any digital workflow." },
            { icon: <Target />, title: "High Fidelity", desc: "98.2% accuracy on cursive and printed scripts across multiple languages." }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-slate-900/50 border border-white/5 rounded-3xl text-center group hover:border-indigo-500/30 transition-all">
              <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center text-indigo-400 mx-auto mb-6 group-hover:scale-110 transition-transform">
                {React.cloneElement(item.icon as any, { size: 24 })}
              </div>
              <h3 className="font-bold text-xl mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-slate-500 text-xs">
        <div className="flex items-center justify-center gap-3 mb-6 opacity-50">
          <div className="w-6 h-6 bg-slate-700 rounded-md flex items-center justify-center">
            <span className="font-bold text-xs">S</span>
          </div>
          <span className="font-bold">SAS ai Systems</span>
        </div>
        <p>© 2024 Intelligent Document Processing Solutions</p>
        <div className="flex justify-center gap-6 mt-4 font-medium">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
