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
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // On first login: fetch from DB
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
          select: { id: true, role: true, membership: true },
        })

        if (dbUser) {
          token.id = dbUser.id
          token.role = dbUser.role
          token.membership = dbUser.membership
        }
      }

      //  make sure role & membership are still set
      if (!token.role || !token.membership) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { role: true, membership: true },
        })

        if (dbUser) {
          token.role = dbUser.role
          token.membership = dbUser.membership
        }
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.membership = token.membership as
          | 'BASIC'
          | 'PREMIUM'
          | 'ELITE'
      }
      return session
    },
  },

  pages: {
    signIn: '/auth/signin',
  },
}
