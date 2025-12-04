export type Session = {
  id: string;
  title: string;
  teacherId: string;
  teacherName: string;
  date: string;
  startTime: string;
  endTime: string;
  maxStudents: number;
  enrolledStudents: number;
  status: 'planifiee' | 'en_cours' | 'terminee' | 'annulee';
  createdAt: string;
};

const LS_KEY = 'rs_sessions_v1';

export function loadSessions(): Session[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Session[];
  } catch {
    return [];
  }
}

export function saveSessions(sessions: Session[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(sessions));
  } catch {}
}

export function createMockSessions(): Session[] {
  return [
    {
      id: 'ses1',
      title: 'Pâtisserie marocaine - Niveau débutant',
      teacherId: 't1',
      teacherName: 'Fatima Alami',
      date: '2025-12-10',
      startTime: '10:00',
      endTime: '13:00',
      maxStudents: 12,
      enrolledStudents: 8,
      status: 'planifiee',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'ses2',
      title: 'Tajine et couscous',
      teacherId: 't2',
      teacherName: 'Karim Bourhim',
      date: '2025-12-12',
      startTime: '14:00',
      endTime: '17:00',
      maxStudents: 10,
      enrolledStudents: 10,
      status: 'planifiee',
      createdAt: new Date().toISOString(),
    },
  ];
}