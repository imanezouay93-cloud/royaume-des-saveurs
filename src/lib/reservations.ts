export type Reservation = {
  id: string;
  studentId: string;
  studentName: string;
  sessionId: string;
  sessionTitle: string;
  reservationDate: string;
  status: 'confirmee' | 'en_attente' | 'annulee';
  createdAt: string;
};

const LS_KEY = 'rs_reservations_v1';

export function loadReservations(): Reservation[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Reservation[];
  } catch {
    return [];
  }
}

export function saveReservations(reservations: Reservation[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(reservations));
  } catch {}
}

export function createMockReservations(): Reservation[] {
  return [
    {
      id: 'r1',
      studentId: 's1',
      studentName: 'Ahmed Bennani',
      sessionId: 'ses1',
      sessionTitle: 'Pâtisserie marocaine - Niveau débutant',
      reservationDate: '2025-12-10',
      status: 'confirmee',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'r2',
      studentId: 's2',
      studentName: 'Sara ElAmrani',
      sessionId: 'ses2',
      sessionTitle: 'Tajine et couscous',
      reservationDate: '2025-12-12',
      status: 'confirmee',
      createdAt: new Date().toISOString(),
    },
  ];
}