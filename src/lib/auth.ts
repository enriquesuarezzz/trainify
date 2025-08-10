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
      if (session?.user) {
        // Ensure role is coming from DB
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { id: true, role: true },
        })

        if (dbUser) {
          session.user.id = dbUser.id
          session.user.role = dbUser.role as 'user' | 'admin'
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}
