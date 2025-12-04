'use client';

import { useState } from 'react';
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

  return (
    <>
      <Header />
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