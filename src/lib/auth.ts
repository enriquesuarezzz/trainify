import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Expose user.id and role in session
      if (session?.user) {
        session.user.id = user.id
        // If you have a role field in your User model
        session.user.role = (user as any).role
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}
