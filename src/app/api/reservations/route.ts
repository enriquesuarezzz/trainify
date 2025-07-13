import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId, gymClassId } = body

    if (!userId || !gymClassId) {
      return NextResponse.json(
        { error: 'Missing userId or gymClassId' },
        { status: 400 },
      )
    }

    // Check if class exists and get current reservations
    const gymClass = await prisma.gymClass.findUnique({
      where: { id: gymClassId },
      include: { reservations: true },
    })

    if (!gymClass) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 })
    }

    // Check if full
    if (gymClass.reservations.length >= gymClass.capacity) {
      return NextResponse.json({ error: 'Class is full' }, { status: 403 })
    }

    // Check if user already booked it
    const existing = await prisma.reservation.findFirst({
      where: { userId, gymClassId },
    })

    if (existing) {
      return NextResponse.json({ error: 'Already booked' }, { status: 409 })
    }

    // Create reservation
    const reservation = await prisma.reservation.create({
      data: {
        userId,
        gymClassId,
      },
    })

    return NextResponse.json(reservation, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
