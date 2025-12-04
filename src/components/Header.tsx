'use client';

// ...existing code...
export default function Header() {
  return (
    <header style={{ background: 'linear-gradient(to right,#8b4513,#d2691e)', color: '#fff', padding: 20, position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <i className="fas fa-utensils" style={{ fontSize: 28 }}></i>
          <div>
            <h1 style={{ margin: 0, fontSize: 20 }}>Royaume des Saveurs</h1>
            <small style={{ opacity: 0.9 }}>Système de gestion d'école de cuisine</small>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div>Bienvenue, <strong>Administrateur</strong></div>
            <small>Dernière connexion: Aujourd'hui</small>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#f4a460', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AZ</div>
        </div>
      </div>
    </header>
  );
}
// ...existing code...