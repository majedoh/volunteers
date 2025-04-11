// src/types/auth.ts
export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: 'user' | 'admin';
}

export interface Session {
  user: User;
  expires: string;
}

// List of emails that have admin access
export const ADMIN_EMAILS = [
  'admin@haramainvolunteers.org',
  'director@haramainvolunteers.org',
  // Add more admin emails as needed
];

// Check if a user is an admin
export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}