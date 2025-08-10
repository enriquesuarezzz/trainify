import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth/next' // <- important
import { authOptions } from '@/lib/auth'

export async function GET(request: Request) {
  const req = {
    headers: request.headers,
  }
  const res = {} // dummy object, not used internally

  const session = await getServerSession(req as any, res as any, authOptions)

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const classes = await prisma.gymClass.findMany({
      orderBy: { startTime: 'asc' },
    })

    return NextResponse.json(classes)
  } catch (error) {
    console.error('[ADMIN_GET_CLASSES]', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
