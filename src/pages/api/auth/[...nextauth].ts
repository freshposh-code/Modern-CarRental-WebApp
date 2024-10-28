import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/server/nextAuthConnect';
import { DateTime } from 'luxon';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      createdAt?: string;
    };
  }

  interface User {
    role?: string;
    createdAt?: string;
  }
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && !user.role) {
        if (!user.createdAt) {
          user.createdAt = DateTime.now().toISO();
        }
        if (!user.role) {
          user.role = 'GENERAL';
        }
      }
      return true;
    },
    async session({ session, user }) {
      session.user = { id: user.id, role: user.role || 'GENERAL',
        createdAt: user.createdAt,
       };
      return session;
    },
  },
  
  pages: {
    signIn: '/auth/signIn',
    signOut: '/login',
  },
});