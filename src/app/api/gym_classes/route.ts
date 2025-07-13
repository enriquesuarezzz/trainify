import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const classes = await prisma.gymClass.findMany({
    include: { reservations: true },
    orderBy: { startTime: 'asc' },
  })
  return NextResponse.json(classes)
}

export async function POST(req: Request) {
  const data = await req.json()

  const gymClass = await prisma.gymClass.create({
    data: {
      name: data.name,
      description: data.description,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      capacity: data.capacity,
    },
  })

  return NextResponse.json(gymClass)
}
