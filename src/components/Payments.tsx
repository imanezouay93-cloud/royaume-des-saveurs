'use client';

import { useEffect, useState } from 'react';
import { Payment, loadPayments, savePayments, createMockPayments } from '../lib/payments';

function uid() { return Date.now().toString(36); }

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    studentName: '',
    amount: '',
    paymentDate: '',
    paymentMethod: 'carte' as Payment['paymentMethod'],
    description: '',
  });

  useEffect(() => {
    const ls = loadPayments();
    if (ls.length === 0) {
      const mock = createMockPayments();
      savePayments(mock);
      setPayments(mock);
    } else {
      setPayments(ls);
    }
  }, []);

  function openModal() {
    setForm({ studentName: '', amount: '', paymentDate: '', paymentMethod: 'carte', description: '' });
    setShowModal(true);
  }

  function addPayment(e: React.FormEvent) {
    e.preventDefault();
    const p: Payment = {
      id: uid(),
      studentId: 'auto',
      studentName: form.studentName.trim(),
      amount: parseFloat(form.amount) || 0,
      paymentDate: form.paymentDate,
      paymentMethod: form.paymentMethod,
      status: 'paye',
      description: form.description.trim(),
      createdAt: new Date().toISOString(),
    };
    const next = [p, ...payments];
    setPayments(next);
    savePayments(next);
    setShowModal(false);
  }

  function removePayment(id: string) {
    if (!confirm('Supprimer ce paiement ?')) return;
    const next = payments.filter(p => p.id !== id);
    setPayments(next);
    savePayments(next);
  }

  function getStatusBadge(status: string) {
    const badges: Record<string, string> = {
      paye: 'badge-success',
      en_attente: 'badge-warning',
      rembourse: 'badge-danger',
    };
    return badges[status] || 'badge-secondary';
  }

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h2>Gestion des Paiements</h2>
          <p style={{ color: '#666', marginTop: 4 }}>Total encaissé: <strong style={{ color: '#2e8b57' }}>{totalAmount.toFixed(2)} $</strong></p>
        </div>
        <button className="btn" onClick={openModal}>+ Ajouter un paiement</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th><th>Étudiant</th><th>Montant</th><th>Date</th><th>Méthode</th><th>Statut</th><th>Description</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.studentName}</td>
              <td style={{ fontWeight: 600, color: '#2e8b57' }}>{p.amount.toFixed(2)} $</td>
              <td>{new Date(p.paymentDate).toLocaleDateString()}</td>
              <td>{p.paymentMethod}</td>
              <td>
                <span className={`badge ${getStatusBadge(p.status)}`}>{p.status}</span>
              </td>
              <td>{p.description}</td>
              <td>
                <button className="btn btn-small" onClick={() => removePayment(p.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
          {payments.length === 0 && <tr><td colSpan={8}>Aucun paiement</td></tr>}
        </tbody>
      </table>

      {showModal && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Ajouter un paiement</h3>
              <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={addPayment}>
              <div className="form-group">
                <label>Nom de l'étudiant *</label>
                <input className="form-control" value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Montant ($) *</label>
                  <input type="number" step="0.01" className="form-control" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Date *</label>
                  <input type="date" className="form-control" value={form.paymentDate} onChange={e => setForm({ ...form, paymentDate: e.target.value })} required />
                </div>
              </div>
              <div className="form-group">
                <label>Méthode de paiement *</label>
                <select className="form-control" value={form.paymentMethod} onChange={e => setForm({ ...form, paymentMethod: e.target.value as Payment['paymentMethod'] })} required>
                  <option value="carte">Carte bancaire</option>
                  <option value="especes">Espèces</option>
                  <option value="virement">Virement</option>
                  <option value="cheque">Chèque</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
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