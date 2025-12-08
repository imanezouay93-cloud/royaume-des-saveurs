'use client'; // Fix Header prop

import { useState, useEffect } from 'react';
import { isAuthenticated } from '../lib/auth';
import Login from '../components/Login';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Dashboard from '../components/Dashboard';
import Students from '../components/Students';
import Teachers from '../components/Teachers';
import Sessions from '../components/Sessions';
import Reservations from '../components/Reservations';
import Payments from '../components/Payments';
import Stock from '../components/Stock';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
    setLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setActiveTab('dashboard');
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: 48, color: '#8b4513' }}></i>
          <p style={{ marginTop: 16, color: '#666' }}>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <>
      <Header onLogout={handleLogout} />
      <div className="container">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div className="container" style={{ marginTop: 20 }}>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'etudiants' && <Students />}
        {activeTab === 'professeurs' && <Teachers />}
        {activeTab === 'seances' && <Sessions />}
        {activeTab === 'reservations' && <Reservations />}
        {activeTab === 'paiements' && <Payments />}
        {activeTab === 'stock' && <Stock />}
      </div>
    </>
  );
}