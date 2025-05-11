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
      email: string;
      createdAt?: string;
    };
  }

  interface User {
    role?: string;
    createdAt?: string;
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXT_PUBLIC_APP_NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }: {user:any, account:any}) {
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
    async session({ session, user }: {session:any, user:any}) {
      session.user = { 
        id: user.id, 
        role: user.role || 'GENERAL',
        createdAt: user.createdAt,
        email: session.user.email,
        name: session.user.name,
        image: session.user.image
      };
      return session;
    },
  },
  
  pages: {
    signIn: '/auth/signIn',
    signOut: '/login',
  },
};

export default NextAuth(authOptions);