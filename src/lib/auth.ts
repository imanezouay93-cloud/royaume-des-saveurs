'use client';

export type User = {
  id: string;
  username: string;
  password: string;
  fullName: string;
  role: 'admin' | 'prof';
};

const LS_KEY = 'rs_auth_session';
const USERS_KEY = 'rs_users_v1';

// Utilisateurs par défaut
const DEFAULT_USERS: User[] = [
  { id: '1', username: 'admin', password: 'admin123', fullName: 'Administrateur', role: 'admin' },
  { id: '2', username: 'prof', password: 'prof123', fullName: 'Professeur', role: 'prof' },
];

export function loadUsers(): User[] {
  if (typeof window === 'undefined') return DEFAULT_USERS;
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USERS;
  }
}

export function login(username: string, password: string): User | null {
  const users = loadUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const session = { id: user.id, username: user.username, fullName: user.fullName, role: user.role };
    localStorage.setItem(LS_KEY, JSON.stringify(session));
    return user;
  }
  return null;
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LS_KEY);
  }
}

export function getCurrentUser(): { id: string; username: string; fullName: string; role: string } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}