import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
      membership: 'BASIC' | 'PREMIUM' | 'ELITE'
    } & DefaultSession['user']
  }

  interface User {
    id: string
    role: string
    membership: 'BASIC' | 'PREMIUM' | 'ELITE'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    role?: string
    membership?: 'BASIC' | 'PREMIUM' | 'ELITE'
  }
}
