import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';

import { readAppState } from '@/features/runtime-store/store';
import type { TravelerRole } from '@/types/domain';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/signin'
  },
  providers: [
    CredentialsProvider({
      name: 'Institutional Access',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password;
        if (!email || !password) {
          return null;
        }

        const state = await readAppState();
        const user = state.users.find((item) => item.email.toLowerCase() === email);
        if (!user || user.password !== password) {
          return null;
        }

        return {
          id: user.email,
          email: user.email,
          name: user.name,
          role: user.role as TravelerRole,
          citySlug: user.citySlug ?? null
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: TravelerRole }).role ?? 'traveler';
        token.citySlug = (user as { citySlug?: string | null }).citySlug ?? undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as TravelerRole) ?? 'traveler';
        session.user.citySlug = typeof token.citySlug === 'string' ? token.citySlug : undefined;
      }
      return session;
    }
  }
};
