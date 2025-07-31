import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  _: Request,
  { params }: { params: { userId: string } },
) {
  const { userId } = params

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: { userId },
      include: {
        gymClass: true,
      },
      orderBy: {
        reservedAt: 'desc',
      },
    })

    return NextResponse.json(reservations)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
