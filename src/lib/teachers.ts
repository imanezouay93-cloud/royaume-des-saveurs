export type Teacher = {
  id: string;
  lastname: string;
  firstname: string;
  email: string;
  phone?: string;
  specialty: string;
  createdAt: string;
};

const LS_KEY = 'rs_teachers_v1';

export function loadTeachers(): Teacher[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Teacher[];
  } catch {
    return [];
  }
}

export function saveTeachers(teachers: Teacher[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(teachers));
  } catch {}
}

export function createMockTeachers(): Teacher[] {
  return [
    {
      id: 't1',
      lastname: 'Alami',
      firstname: 'Fatima',
      email: 'fatima@example.com',
      phone: '5142222222',
      specialty: 'Pâtisserie marocaine',
      createdAt: new Date().toISOString(),
    },
    {
      id: 't2',
      lastname: 'Bourhim',
      firstname: 'Karim',
      email: 'karim@example.com',
      phone: '5143333333',
      specialty: 'Cuisine traditionnelle',
      createdAt: new Date().toISOString(),
    },
  ];
}