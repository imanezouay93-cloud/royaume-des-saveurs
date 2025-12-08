'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, logout } from '../lib/auth';

type HeaderProps = {
  onLogout: () => void;
};

export default function Header({ onLogout }: HeaderProps) {
  const [user, setUser] = useState<{ fullName: string; username: string } | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser({ fullName: currentUser.fullName, username: currentUser.username });
    }
  }, []);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const initials = user?.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'AZ';

  return (
    <header style={{ 
      background: 'linear-gradient(to right,#8b4513,#d2691e)', 
      color: '#fff', 
      padding: 20, 
      position: 'sticky', 
      top: 0, 
      zIndex: 100,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <i className="fas fa-utensils" style={{ fontSize: 28 }}></i>
          <div>
            <h1 style={{ margin: 0, fontSize: 20 }}>Royaume des Saveurs</h1>
            <small style={{ opacity: 0.9 }}>Système de gestion d'école de cuisine</small>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div>Bienvenue, <strong>{user?.fullName || 'Utilisateur'}</strong></div>
            <small style={{ opacity: 0.8 }}>@{user?.username || 'user'}</small>
          </div>
          <div style={{ 
            width: 40, 
            height: 40, 
            borderRadius: '50%', 
            background: '#f4a460', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            {initials}
          </div>
          <button
            onClick={handleLogout}
            className="btn-small"
            style={{ 
              background: 'rgba(255,255,255,0.2)', 
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            }}
          >
            <i className="fas fa-sign-out-alt" style={{ marginRight: 6 }}></i>
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
}