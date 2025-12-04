export type StockItem = {
  id: string;
  name: string;
  category: 'ingredient' | 'equipement' | 'ustensile';
  quantity: number;
  unit: string;
  minThreshold: number;
  supplier: string;
  lastRestockDate: string;
  createdAt: string;
};

const LS_KEY = 'rs_stock_v1';

export function loadStock(): StockItem[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StockItem[];
  } catch {
    return [];
  }
}

export function saveStock(stock: StockItem[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(stock));
  } catch {}
}

export function createMockStock(): StockItem[] {
  return [
    {
      id: 'st1',
      name: 'Farine tout usage',
      category: 'ingredient',
      quantity: 50,
      unit: 'kg',
      minThreshold: 20,
      supplier: 'Fournisseur ABC',
      lastRestockDate: '2025-11-28',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'st2',
      name: 'Huile d\'olive',
      category: 'ingredient',
      quantity: 15,
      unit: 'L',
      minThreshold: 10,
      supplier: 'Fournisseur XYZ',
      lastRestockDate: '2025-11-25',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'st3',
      name: 'Couteau de chef',
      category: 'equipement',
      quantity: 8,
      unit: 'pièce',
      minThreshold: 5,
      supplier: 'Équipement Pro',
      lastRestockDate: '2025-10-15',
      createdAt: new Date().toISOString(),
    },
  ];
}