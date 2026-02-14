
import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LogOut, Sun, Moon, Menu, X, User, LayoutDashboard, 
  History, Settings, ShieldCheck, Cpu, Info
} from 'lucide-react';
import { User as UserType } from '../types';

interface LayoutProps {
  user: UserType | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
  
  const navItems = [
    { label: 'Workspace', path: '/', icon: <LayoutDashboard size={18} /> },
    { label: 'History', path: '/history', icon: <History size={18} /> },
    { label: 'Model Metrics', path: '/training', icon: <Cpu size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100 overflow-hidden font-inter">
      <button 
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2.5 bg-slate-900 border border-slate-800 rounded-xl lg:hidden text-indigo-400"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0a0f1d] border-r border-slate-800/50 transition-all duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <span className="font-bold text-lg">S</span>
            </div>
            <h1 className="text-lg font-bold">SAS<span className="text-indigo-500"> ai</span></h1>
          </div>

          <div className="flex-1 space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">System Navigation</p>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-sm font-medium
                  ${location.pathname === item.path 
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}
                `}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            
            {user?.role === 'ADMIN' && (
              <Link
                to="/admin"
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/5 text-sm font-medium"
              >
                <ShieldCheck size={18} /> Admin Access
              </Link>
            )}
          </div>

          <div className="pt-6 border-t border-slate-800/50 space-y-4">
            <Link 
              to="/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 text-sm font-medium"
            >
              <Settings size={18} /> Settings
            </Link>
            
            <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                  <User size={14} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold truncate">{user?.username}</p>
                  <p className="text-[10px] text-indigo-500 uppercase font-bold tracking-tight">Active User</p>
                </div>
              </div>
              <button 
                onClick={onLogout}
                className="w-full py-2 bg-slate-800 hover:bg-red-500/10 text-red-400 rounded-lg text-[10px] font-bold transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={12} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 border-b border-slate-800/50 bg-[#020617]/50 backdrop-blur-md">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
            {location.pathname === '/' ? 'Operational Workspace' : location.pathname.slice(1).replace('-', ' ')}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/5 border border-green-500/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-[10px] font-bold text-green-400 uppercase">System Ready</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
