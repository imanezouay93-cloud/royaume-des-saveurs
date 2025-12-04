'use client';

import { useEffect, useState } from 'react';
import { Reservation, loadReservations, saveReservations, createMockReservations } from '../lib/reservations';

function uid() { return Date.now().toString(36); }

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    studentName: '',
    sessionTitle: '',
    reservationDate: '',
  });

  useEffect(() => {
    const ls = loadReservations();
    if (ls.length === 0) {
      const mock = createMockReservations();
      saveReservations(mock);
      setReservations(mock);
    } else {
      setReservations(ls);
    }
  }, []);

  function openModal() {
    setForm({ studentName: '', sessionTitle: '', reservationDate: '' });
    setShowModal(true);
  }

  function addReservation(e: React.FormEvent) {
    e.preventDefault();
    const r: Reservation = {
      id: uid(),
      studentId: 'auto',
      studentName: form.studentName.trim(),
      sessionId: 'auto',
      sessionTitle: form.sessionTitle.trim(),
      reservationDate: form.reservationDate,
      status: 'confirmee',
      createdAt: new Date().toISOString(),
    };
    const next = [r, ...reservations];
    setReservations(next);
    saveReservations(next);
    setShowModal(false);
  }

  function removeReservation(id: string) {
    if (!confirm('Supprimer cette réservation ?')) return;
    const next = reservations.filter(r => r.id !== id);
    setReservations(next);
    saveReservations(next);
  }

  function getStatusBadge(status: string) {
    const badges: Record<string, string> = {
      confirmee: 'badge-success',
      en_attente: 'badge-warning',
      annulee: 'badge-danger',
    };
    return badges[status] || 'badge-secondary';
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>Gestion des Réservations</h2>
        <button className="btn" onClick={openModal}>+ Ajouter une réservation</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th><th>Étudiant</th><th>Séance</th><th>Date</th><th>Statut</th><th>Créée le</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.studentName}</td>
              <td>{r.sessionTitle}</td>
              <td>{new Date(r.reservationDate).toLocaleDateString()}</td>
              <td>
                <span className={`badge ${getStatusBadge(r.status)}`}>{r.status}</span>
              </td>
              <td>{new Date(r.createdAt).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-small" onClick={() => removeReservation(r.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
          {reservations.length === 0 && <tr><td colSpan={7}>Aucune réservation</td></tr>}
        </tbody>
      </table>

      {showModal && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Ajouter une réservation</h3>
              <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={addReservation}>
              <div className="form-group">
                <label>Nom de l'étudiant *</label>
                <input className="form-control" value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Titre de la séance *</label>
                <input className="form-control" value={form.sessionTitle} onChange={e => setForm({ ...form, sessionTitle: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Date de la réservation *</label>
                <input type="date" className="form-control" value={form.reservationDate} onChange={e => setForm({ ...form, reservationDate: e.target.value })} required />
              </div>
              <div className="form-group">
                <button className="btn" type="submit" style={{ width: '100%' }}>Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}