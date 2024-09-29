import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/server/nextAuthConnect';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
    };
  }

  interface User {
    role?: string;
  }
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! ,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && !user.role) {
        user.role = 'GENERAL';
      }
      return true;
    },
    async session({ session, user }) {
      session.user = { id: user.id, role: user.role || 'GENERAL' };
      return session;
    },
  },
  
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
});
