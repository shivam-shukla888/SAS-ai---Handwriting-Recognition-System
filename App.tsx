
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PredictionRecord, User } from './types';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import History from './components/History';
import AdminPanel from './components/AdminPanel';
import ModelTraining from './components/ModelTraining';
import Auth from './components/Auth';
import Settings from './components/Settings';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sas_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [history, setHistory] = useState<PredictionRecord[]>(() => {
    const saved = localStorage.getItem('sas_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('sas_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (user) localStorage.setItem('sas_user', JSON.stringify(user));
    else localStorage.removeItem('sas_user');
  }, [user]);

  const handleLogin = (u: User) => setUser(u);
  const handleLogout = () => setUser(null);
  
  const addRecord = (record: PredictionRecord) => {
    setHistory(prev => [record, ...prev]);
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/welcome" element={<LandingPage user={user} />} />
        <Route path="/auth" element={!user ? <Auth onLogin={handleLogin} /> : <Navigate to="/" />} />

        <Route path="/" element={user ? <Layout user={user} onLogout={handleLogout} /> : <Navigate to="/welcome" />}>
          <Route index element={<Dashboard onAddRecord={addRecord} />} />
          <Route path="history" element={<History history={history} />} />
          <Route path="training" element={<ModelTraining />} />
          <Route path="settings" element={<Settings user={user} />} />
          {user?.role === 'ADMIN' && <Route path="admin" element={<AdminPanel />} />}
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
