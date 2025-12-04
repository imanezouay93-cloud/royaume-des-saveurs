'use client';

import { useEffect, useState } from 'react';
import { loadStudents } from '../lib/students';
import { loadTeachers } from '../lib/teachers';
import { loadSessions } from '../lib/sessions';
import { loadStock } from '../lib/stock';
import { loadPayments } from '../lib/payments';
import { loadReservations } from '../lib/reservations';

export default function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    sessions: 0,
    stock: 0,
    totalRevenue: 0,
    reservations: 0,
    lowStock: 0,
    upcomingSessions: 0,
  });

  useEffect(() => {
    const students = loadStudents();
    const teachers = loadTeachers();
    const sessions = loadSessions();
    const stock = loadStock();
    const payments = loadPayments();
    const reservations = loadReservations();

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    const lowStock = stock.filter(s => s.quantity <= s.minThreshold).length;
    const upcomingSessions = sessions.filter(s => s.status === 'planifiee').length;

    setStats({
      students: students.length,
      teachers: teachers.length,
      sessions: sessions.length,
      stock: stock.length,
      totalRevenue,
      reservations: reservations.length,
      lowStock,
      upcomingSessions,
    });
  }, []);

  return (
    <div>
      <h2>Tableau de bord</h2>
      <p style={{ color: '#666', marginBottom: 20 }}>
        Vue d'ensemble de l'école de cuisine Royaume des Saveurs
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 30 }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 36, fontWeight: 700, color: '#8b4513', marginBottom: 8 }}>
            <i className="fas fa-users" style={{ marginRight: 8 }}></i>
            {stats.students}
          </div>
          <div style={{ color: '#666', fontSize: 14 }}>Étudiants inscrits</div>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 36, fontWeight: 700, color: '#d2691e', marginBottom: 8 }}>
            <i className="fas fa-chalkboard-teacher" style={{ marginRight: 8 }}></i>
            {stats.teachers}
          </div>
          <div style={{ color: '#666', fontSize: 14 }}>Professeurs actifs</div>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 36, fontWeight: 700, color: '#f4a460', marginBottom: 8 }}>
            <i className="fas fa-calendar-alt" style={{ marginRight: 8 }}></i>
            {stats.upcomingSessions}
          </div>
          <div style={{ color: '#666', fontSize: 14 }}>Séances planifiées</div>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 36, fontWeight: 700, color: '#2e8b57', marginBottom: 8 }}>
            <i className="fas fa-money-check-alt" style={{ marginRight: 8 }}></i>
            {stats.totalRevenue.toFixed(2)} $
          </div>
          <div style={{ color: '#666', fontSize: 14 }}>Revenus totaux</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18 }}>Réservations</h3>
            <span className="badge badge-success">{stats.reservations}</span>
          </div>
          <p style={{ color: '#666', fontSize: 14 }}>Total des réservations actives</p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18 }}>Stock</h3>
            <span className={`badge ${stats.lowStock > 0 ? 'badge-warning' : 'badge-success'}`}>
              {stats.stock} articles
            </span>
          </div>
          <p style={{ color: '#666', fontSize: 14 }}>
            {stats.lowStock > 0 ? `⚠️ ${stats.lowStock} article(s) en stock faible` : '✓ Stock en bon état'}
          </p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18 }}>Séances totales</h3>
            <span className="badge badge-success">{stats.sessions}</span>
          </div>
          <p style={{ color: '#666', fontSize: 14 }}>Toutes séances confondues</p>
        </div>
      </div>

      <div style={{ marginTop: 30, padding: 20, background: 'linear-gradient(135deg, #8b4513 0%, #d2691e 100%)', color: 'white', borderRadius: 8 }}>
        <h3 style={{ margin: 0, marginBottom: 8 }}>🎉 Bienvenue sur Royaume des Saveurs</h3>
        <p style={{ margin: 0, opacity: 0.9 }}>
          Gérez facilement vos étudiants, professeurs, séances, paiements et stock d'ingrédients. Toutes les données sont sauvegardées localement dans votre navigateur.
        </p>
      </div>
    </div>
  );
}