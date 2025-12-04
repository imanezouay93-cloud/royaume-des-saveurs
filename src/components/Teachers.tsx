'use client';

import { useEffect, useState } from 'react';
import { Teacher, loadTeachers, saveTeachers, createMockTeachers } from '../lib/teachers';

function uid() { return Date.now().toString(36); }

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ lastname: '', firstname: '', email: '', phone: '', specialty: '' });

  useEffect(() => {
    const ls = loadTeachers();
    if (ls.length === 0) {
      const mock = createMockTeachers();
      saveTeachers(mock);
      setTeachers(mock);
    } else {
      setTeachers(ls);
    }
  }, []);

  function openModal() {
    setForm({ lastname: '', firstname: '', email: '', phone: '', specialty: '' });
    setShowModal(true);
  }

  function addTeacher(e: React.FormEvent) {
    e.preventDefault();
    const t: Teacher = {
      id: uid(),
      lastname: form.lastname.trim(),
      firstname: form.firstname.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      specialty: form.specialty.trim(),
      createdAt: new Date().toISOString(),
    };
    const next = [t, ...teachers];
    setTeachers(next);
    saveTeachers(next);
    setShowModal(false);
  }

  function removeTeacher(id: string) {
    if (!confirm('Supprimer ce professeur ?')) return;
    const next = teachers.filter(t => t.id !== id);
    setTeachers(next);
    saveTeachers(next);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>Gestion des Professeurs</h2>
        <button className="btn" onClick={openModal}>+ Ajouter un professeur</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th><th>Nom</th><th>Prénom</th><th>Courriel</th><th>Téléphone</th><th>Spécialité</th><th>Inscrit depuis</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.lastname}</td>
              <td>{t.firstname}</td>
              <td>{t.email}</td>
              <td>{t.phone}</td>
              <td>{t.specialty}</td>
              <td>{new Date(t.createdAt).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-small" onClick={() => removeTeacher(t.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
          {teachers.length === 0 && <tr><td colSpan={8}>Aucun professeur</td></tr>}
        </tbody>
      </table>

      {showModal && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Ajouter un professeur</h3>
              <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={addTeacher}>
              <div className="form-row">
                <div className="form-group">
                  <label>Nom *</label>
                  <input className="form-control" value={form.lastname} onChange={e => setForm({ ...form, lastname: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Prénom *</label>
                  <input className="form-control" value={form.firstname} onChange={e => setForm({ ...form, firstname: e.target.value })} required />
                </div>
              </div>
              <div className="form-group">
                <label>Courriel *</label>
                <input type="email" className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Téléphone</label>
                <input className="form-control" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Spécialité *</label>
                <input className="form-control" value={form.specialty} onChange={e => setForm({ ...form, specialty: e.target.value })} required />
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