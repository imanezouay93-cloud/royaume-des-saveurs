'use client';

import { useEffect, useState } from 'react';
import { Student, loadStudents, saveStudents, createMockStudents } from '../lib/students';

function uid() { return Date.now().toString(36); }

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ lastname: '', firstname: '', email: '', phone: '' });

  useEffect(() => {
    const ls = loadStudents();
    if (ls.length === 0) {
      const mock = createMockStudents();
      saveStudents(mock);
      setStudents(mock);
    } else {
      setStudents(ls);
    }
  }, []);

  function openModal() {
    setForm({ lastname: '', firstname: '', email: '', phone: '' });
    setShowModal(true);
  }

  function addStudent(e: React.FormEvent) {
    e.preventDefault();
    const s: Student = {
      id: uid(),
      lastname: form.lastname.trim(),
      firstname: form.firstname.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      createdAt: new Date().toISOString(),
    };
    const next = [s, ...students];
    setStudents(next);
    saveStudents(next);
    setShowModal(false);
  }

  function removeStudent(id: string) {
    if (!confirm('Supprimer cet étudiant ?')) return;
    const next = students.filter(s => s.id !== id);
    setStudents(next);
    saveStudents(next);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>Gestion des Étudiants</h2>
        <button className="btn" onClick={openModal}>+ Ajouter un étudiant</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th><th>Nom</th><th>Prénom</th><th>Courriel</th><th>Téléphone</th><th>Inscrit depuis</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.lastname}</td>
              <td>{s.firstname}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{new Date(s.createdAt).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-small" onClick={() => removeStudent(s.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
          {students.length === 0 && <tr><td colSpan={7}>Aucun étudiant</td></tr>}
        </tbody>
      </table>

      {showModal && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Ajouter un étudiant</h3>
              <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={addStudent}>
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
                <button className="btn" type="submit" style={{ width: '100%' }}>Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}