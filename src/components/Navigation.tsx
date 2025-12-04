'use client';

import React from 'react';

export default function Navigation({ activeTab, onTabChange }: { activeTab: string; onTabChange: (t: string) => void; }) {
  const items = [
    { id: 'dashboard', label: 'Tableau de bord', icon: 'fa-tachometer-alt' },
    { id: 'etudiants', label: 'Étudiants', icon: 'fa-users' },
    { id: 'professeurs', label: 'Professeurs', icon: 'fa-chalkboard-teacher' },
    { id: 'seances', label: 'Séances', icon: 'fa-calendar-alt' },
    { id: 'reservations', label: 'Réservations', icon: 'fa-bookmark' },
    { id: 'paiements', label: 'Paiements', icon: 'fa-money-check-alt' },
    { id: 'stock', label: 'Stock', icon: 'fa-boxes' },
  ];

  return (
    <nav style={{ backgroundColor: '#3c2f2f', marginTop: 10, borderRadius: 8 }}>
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0, overflowX: 'auto' }}>
        {items.map(i => (
          <li key={i.id} style={{ minWidth: 120, flex: 1 }}>
            <button
              onClick={() => onTabChange(i.id)}
              style={{
                width: '100%', padding: '12px 16px', color: '#fff',
                background: activeTab === i.id ? 'rgba(255,255,255,0.06)' : 'transparent',
                border: 'none', textAlign: 'center', cursor: 'pointer'
              }}
            >
              <i className={`fas ${i.icon}`} style={{ marginRight: 8 }}></i>
              {i.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}