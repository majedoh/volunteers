// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { isAdmin } from '@/types/auth';

// Configuration options for NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.role = isAdmin(user.email) ? 'admin' : 'user';
      }
      return token;
    },
    async session({ session, token }) {
      // Add role to the session
      if (session.user) {
        session.user.role = token.role as 'admin' | 'user';
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    signOut: '/',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };