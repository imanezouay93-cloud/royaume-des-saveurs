'use client';

import { useEffect, useState } from 'react';
import { Session, loadSessions, saveSessions, createMockSessions } from '../lib/sessions';

function uid() { return Date.now().toString(36); }

export default function Sessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    teacherName: '',
    date: '',
    startTime: '',
    endTime: '',
    maxStudents: '12',
  });

  useEffect(() => {
    const ls = loadSessions();
    if (ls.length === 0) {
      const mock = createMockSessions();
      saveSessions(mock);
      setSessions(mock);
    } else {
      setSessions(ls);
    }
  }, []);

  function openModal() {
    setForm({ title: '', teacherName: '', date: '', startTime: '', endTime: '', maxStudents: '12' });
    setShowModal(true);
  }

  function addSession(e: React.FormEvent) {
    e.preventDefault();
    const s: Session = {
      id: uid(),
      title: form.title.trim(),
      teacherId: 'auto',
      teacherName: form.teacherName.trim(),
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      maxStudents: parseInt(form.maxStudents) || 12,
      enrolledStudents: 0,
      status: 'planifiee',
      createdAt: new Date().toISOString(),
    };
    const next = [s, ...sessions];
    setSessions(next);
    saveSessions(next);
    setShowModal(false);
  }

  function removeSession(id: string) {
    if (!confirm('Supprimer cette séance ?')) return;
    const next = sessions.filter(s => s.id !== id);
    setSessions(next);
    saveSessions(next);
  }

  function getStatusBadge(status: string) {
    const badges: Record<string, string> = {
      planifiee: 'badge-warning',
      en_cours: 'badge-success',
      terminee: 'badge-secondary',
      annulee: 'badge-danger',
    };
    return badges[status] || 'badge-secondary';
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>Gestion des Séances</h2>
        <button className="btn" onClick={openModal}>+ Ajouter une séance</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th><th>Titre</th><th>Professeur</th><th>Date</th><th>Horaire</th><th>Étudiants</th><th>Statut</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.title}</td>
              <td>{s.teacherName}</td>
              <td>{new Date(s.date).toLocaleDateString()}</td>
              <td>{s.startTime} - {s.endTime}</td>
              <td>{s.enrolledStudents}/{s.maxStudents}</td>
              <td>
                <span className={`badge ${getStatusBadge(s.status)}`}>{s.status}</span>
              </td>
              <td>
                <button className="btn btn-small" onClick={() => removeSession(s.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
          {sessions.length === 0 && <tr><td colSpan={8}>Aucune séance</td></tr>}
        </tbody>
      </table>

      {showModal && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Ajouter une séance</h3>
              <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={addSession}>
              <div className="form-group">
                <label>Titre de la séance *</label>
                <input className="form-control" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Professeur *</label>
                <input className="form-control" value={form.teacherName} onChange={e => setForm({ ...form, teacherName: e.target.value })} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date *</label>
                  <input type="date" className="form-control" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Capacité max *</label>
                  <input type="number" className="form-control" value={form.maxStudents} onChange={e => setForm({ ...form, maxStudents: e.target.value })} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Heure début *</label>
                  <input type="time" className="form-control" value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Heure fin *</label>
                  <input type="time" className="form-control" value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })} required />
                </div>
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