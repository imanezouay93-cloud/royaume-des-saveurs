// ...existing code...
export type Student = {
  id: string;
  lastname: string;
  firstname: string;
  email: string;
  phone?: string;
  createdAt: string;
};

const LS_KEY = 'rs_students_v1';

export function loadStudents(): Student[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Student[];
  } catch {
    return [];
  }
}

export function saveStudents(students: Student[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(students));
  } catch {}
}

export function createMockStudents(): Student[] {
  return [
    {
      id: 's1',
      lastname: 'Bennani',
      firstname: 'Ahmed',
      email: 'ahmed@example.com',
      phone: '5140000000',
      createdAt: new Date().toISOString(),
    },
    {
      id: 's2',
      lastname: 'ElAmrani',
      firstname: 'Sara',
      email: 'sara@example.com',
      phone: '5141111111',
      createdAt: new Date().toISOString(),
    },
  ];
}
// ...existing code...