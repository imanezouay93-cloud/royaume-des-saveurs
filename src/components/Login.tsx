'use client';

import { useState } from 'react';
import { login } from '../lib/auth';

type LoginProps = {
  onLoginSuccess: () => void;
};

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const user = login(username, password);
    if (user) {
      onLoginSuccess();
    } else {
      setError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #8b4513 0%, #d2691e 100%)' }}>
      <div className="card" style={{ width: '100%', maxWidth: 400, padding: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <i className="fas fa-utensils" style={{ fontSize: 48, color: '#8b4513', marginBottom: 16 }}></i>
          <h1 style={{ margin: 0, fontSize: 28, color: '#8b4513' }}>Royaume des Saveurs</h1>
          <p style={{ margin: '8px 0 0', color: '#666' }}>Connexion au système de gestion</p>
        </div>
        <form onSubmit={handleSubmit}>
          {error && (<div style={{ padding: 12, background: '#f8d7da', color: '#721c24', borderRadius: 6, marginBottom: 20, fontSize: 14 }}>{error}</div>)}
          <div className="form-group"><label htmlFor="username">Nom d'utilisateur</label><input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Entrez votre nom d'utilisateur" autoFocus /></div>
          <div className="form-group"><label htmlFor="password">Mot de passe</label><input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Entrez votre mot de passe" /></div>
          <button type="submit" className="btn" style={{ width: '100%', padding: '12px 20px' }}><i className="fas fa-sign-in-alt" style={{ marginRight: 8 }}></i>Se connecter</button>
        </form>
        <div style={{ marginTop: 30, padding: 20, background: '#f9f5f0', borderRadius: 6, fontSize: 13, color: '#666' }}><strong style={{ display: 'block', marginBottom: 8, color: '#8b4513' }}>Comptes de test:</strong><div>👤 Admin: <code>admin</code> / <code>admin123</code></div><div>👤 Prof: <code>prof</code> / <code>prof123</code></div></div>
      </div>
    </div>
  );
}
