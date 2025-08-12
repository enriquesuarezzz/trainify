// src/app/api/admin/classes/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    // Get the session directly (App Router style)
    const session = await getServerSession(authOptions)
    console.log('[ADMIN_GET_CLASSES] Session:', session)

    // Check if user is logged in and is admin
    if (!session || session.user?.role !== 'admin') {
      console.warn('[ADMIN_GET_CLASSES] Unauthorized access attempt')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('[ADMIN_GET_CLASSES] Fetching classes...')
    const classes = await prisma.gymClass.findMany({
      orderBy: { startTime: 'asc' },
    })
    console.log('[ADMIN_GET_CLASSES] Classes found:', classes.length)

    return NextResponse.json(classes)
  } catch (error) {
    console.error('[ADMIN_GET_CLASSES] Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', details: String(error) },
      { status: 500 },
    )
  }
}
