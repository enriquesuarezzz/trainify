import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(
  _: Request,
  { params }: { params: { reservationId: string } },
) {
  try {
    await prisma.reservation.delete({
      where: { id: params.reservationId },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
