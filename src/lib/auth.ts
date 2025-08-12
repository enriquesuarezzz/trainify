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
    strategy: 'jwt', // Using JWT strategy is simpler for custom claims like role
  },

  callbacks: {
    async jwt({ token, user }) {
      // On first sign in, user object is present
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
          select: { id: true, role: true },
        })

        if (dbUser) {
          token.id = dbUser.id
          token.role = dbUser.role
        }
      }

      console.log('JWT callback token:', token) // Debug log

      return token
    },

    async session({ session, token }) {
      console.log('Session callback - before:', session)
      console.log('Session callback - token:', token)

      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as 'user' | 'admin'
      }

      console.log('Session callback - after:', session)

      return session
    },
  },

  pages: {
    signIn: '/auth/signin',
  },
}
