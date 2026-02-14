
import React from 'react';
import { LayoutDashboard, History, Settings, ShieldCheck, Cpu } from 'lucide-react';

export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
  { label: 'History', path: '/history', icon: <History size={20} /> },
  { label: 'Model Training', path: '/training', icon: <Cpu size={20} /> },
];

export const ADMIN_NAV_ITEMS = [
  { label: 'Admin Panel', path: '/admin', icon: <ShieldCheck size={20} /> },
];

export const DEFAULT_CNN_METRICS = {
  accuracy: 0.982,
  val_accuracy: 0.975,
  loss: 0.045,
  val_loss: 0.052,
  epochs_completed: 25,
};
