
import React from 'react';
import { User, Mail, Shield, Book, Layout } from 'lucide-react';
import { User as UserType } from '../types';

interface SettingsProps {
  user: UserType | null;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h2 className="text-2xl font-bold">Account Settings</h2>
        <p className="text-slate-500 text-sm mt-1">Manage your profile and platform preferences.</p>
      </div>

      <div className="space-y-6">
        <section className="bg-slate-900/30 border border-white/5 p-8 rounded-3xl flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <User size={32} />
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold">{user?.username}</h4>
            <p className="text-sm text-slate-500">Role: {user?.role === 'ADMIN' ? 'System Administrator' : 'Platform User'}</p>
          </div>
          <button className="px-4 py-2 bg-slate-800 rounded-lg text-sm font-bold hover:bg-slate-700 transition-all">
            Update Profile
          </button>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/30 border border-white/5 p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-3 text-indigo-400">
              <Mail size={18} />
              <h5 className="font-bold">Contact Details</h5>
            </div>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Email Address:</p>
            <p className="text-sm font-medium">{user?.email}</p>
          </div>

          <div className="bg-slate-900/30 border border-white/5 p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-3 text-indigo-400">
              <Layout size={18} />
              <h5 className="font-bold">Work Environment</h5>
            </div>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Current Workspace:</p>
            <p className="text-sm font-medium">Standard Instance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
