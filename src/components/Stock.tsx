'use client';

import { useEffect, useState } from 'react';
import { StockItem, loadStock, saveStock, createMockStock } from '../lib/stock';

function uid() { return Date.now().toString(36); }

export default function Stock() {
  const [stock, setStock] = useState<StockItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    category: 'ingredient' as StockItem['category'],
    quantity: '',
    unit: '',
    minThreshold: '',
    supplier: '',
    lastRestockDate: '',
  });

  useEffect(() => {
    const ls = loadStock();
    if (ls.length === 0) {
      const mock = createMockStock();
      saveStock(mock);
      setStock(mock);
    } else {
      setStock(ls);
    }
  }, []);

  function openModal() {
    setForm({ name: '', category: 'ingredient', quantity: '', unit: '', minThreshold: '', supplier: '', lastRestockDate: '' });
    setShowModal(true);
  }

  function addStockItem(e: React.FormEvent) {
    e.preventDefault();
    const item: StockItem = {
      id: uid(),
      name: form.name.trim(),
      category: form.category,
      quantity: parseFloat(form.quantity) || 0,
      unit: form.unit.trim(),
      minThreshold: parseFloat(form.minThreshold) || 0,
      supplier: form.supplier.trim(),
      lastRestockDate: form.lastRestockDate,
      createdAt: new Date().toISOString(),
    };
    const next = [item, ...stock];
    setStock(next);
    saveStock(next);
    setShowModal(false);
  }

  function removeStockItem(id: string) {
    if (!confirm('Supprimer cet article ?')) return;
    const next = stock.filter(s => s.id !== id);
    setStock(next);
    saveStock(next);
  }

  function getStockStatus(item: StockItem) {
    if (item.quantity === 0) return { badge: 'badge-danger', text: 'Rupture' };
    if (item.quantity <= item.minThreshold) return { badge: 'badge-warning', text: 'Bas' };
    return { badge: 'badge-success', text: 'OK' };
  }

  const lowStockCount = stock.filter(s => s.quantity <= s.minThreshold).length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h2>Gestion du Stock</h2>
          <p style={{ color: '#666', marginTop: 4 }}>
            {lowStockCount > 0 && <span style={{ color: '#ff8c00', fontWeight: 600 }}>⚠️ {lowStockCount} article(s) en stock faible</span>}
            {lowStockCount === 0 && <span style={{ color: '#2e8b57' }}>✓ Tous les articles sont en stock suffisant</span>}
          </p>
        </div>
        <button className="btn" onClick={openModal}>+ Ajouter un article</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th><th>Nom</th><th>Catégorie</th><th>Quantité</th><th>Seuil min</th><th>Statut</th><th>Fournisseur</th><th>Dernier réappro</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stock.map(s => {
            const status = getStockStatus(s);
            return (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.category}</td>
                <td style={{ fontWeight: 600 }}>{s.quantity} {s.unit}</td>
                <td>{s.minThreshold} {s.unit}</td>
                <td>
                  <span className={`badge ${status.badge}`}>{status.text}</span>
                </td>
                <td>{s.supplier}</td>
                <td>{new Date(s.lastRestockDate).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-small" onClick={() => removeStockItem(s.id)}>Supprimer</button>
                </td>
              </tr>
            );
          })}
          {stock.length === 0 && <tr><td colSpan={9}>Aucun article en stock</td></tr>}
        </tbody>
      </table>

      {showModal && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Ajouter un article</h3>
              <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={addStockItem}>
              <div className="form-group">
                <label>Nom de l'article *</label>
                <input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Catégorie *</label>
                  <select className="form-control" value={form.category} onChange={e => setForm({ ...form, category: e.target.value as StockItem['category'] })} required>
                    <option value="ingredient">Ingrédient</option>
                    <option value="equipement">Équipement</option>
                    <option value="ustensile">Ustensile</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Unité *</label>
                  <input className="form-control" placeholder="kg, L, pièce..." value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Quantité *</label>
                  <input type="number" step="0.01" className="form-control" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Seuil minimum *</label>
                  <input type="number" step="0.01" className="form-control" value={form.minThreshold} onChange={e => setForm({ ...form, minThreshold: e.target.value })} required />
                </div>
              </div>
              <div className="form-group">
                <label>Fournisseur *</label>
                <input className="form-control" value={form.supplier} onChange={e => setForm({ ...form, supplier: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Date dernier réappro *</label>
                <input type="date" className="form-control" value={form.lastRestockDate} onChange={e => setForm({ ...form, lastRestockDate: e.target.value })} required />
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