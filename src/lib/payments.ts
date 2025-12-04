export type Payment = {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'especes' | 'carte' | 'virement' | 'cheque';
  status: 'paye' | 'en_attente' | 'rembourse';
  description: string;
  createdAt: string;
};

const LS_KEY = 'rs_payments_v1';

export function loadPayments(): Payment[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Payment[];
  } catch {
    return [];
  }
}

export function savePayments(payments: Payment[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(payments));
  } catch {}
}

export function createMockPayments(): Payment[] {
  return [
    {
      id: 'p1',
      studentId: 's1',
      studentName: 'Ahmed Bennani',
      amount: 150,
      paymentDate: '2025-12-01',
      paymentMethod: 'carte',
      status: 'paye',
      description: 'Paiement séance Pâtisserie',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'p2',
      studentId: 's2',
      studentName: 'Sara ElAmrani',
      amount: 200,
      paymentDate: '2025-12-02',
      paymentMethod: 'virement',
      status: 'paye',
      description: 'Paiement séance Tajine',
      createdAt: new Date().toISOString(),
    },
  ];
}