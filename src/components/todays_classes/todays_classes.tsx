'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Clock, Users, Star } from 'lucide-react'

interface GymClass {
  id: string
  name: string
  description: string
  startTime: string
  endTime: string
  capacity: number
  reservations: { id: string }[]
  imageUrl?: string
}

const TodaysClasses = () => {
  const [classes, setClasses] = useState<GymClass[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClasses = async () => {
      const res = await fetch('/api/classes')
      const data = await res.json()
      setClasses(data)
      setLoading(false)
    }

    fetchClasses()
  }, [])

  if (loading)
    return <p className="text-muted text-center">Loading classes...</p>

  const handleBooking = async (classId: string) => {
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gymClassId: classId }),
      })

      if (!res.ok) throw new Error('Failed to book')

      alert('Successfully booked!')
      // Update local state to reflect new reservation
      setClasses((prev) =>
        prev.map((c) =>
          c.id === classId
            ? {
                ...c,
                reservations: [...c.reservations, { id: 'new' }],
              }
            : c,
        ),
      )
    } catch (err) {
      alert('You must be logged in to book a class.')
    }
  }

  return (
    <section className="container py-12">
      <div className="mb-10 text-center">
        <h1 className="text-xl font-extrabold text-orange-500 md:text-2xl">
          Today's Classes
        </h1>
        <h2 className="text-muted-foreground mt-4 text-2xl md:text-xl">
          Choose from our wide variety of fitness classes led by expert
          instructors
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((c) => (
          <div
            key={c.id}
            className="bg-card shadow-card flex flex-col items-center justify-between overflow-hidden rounded-xl border border-gray-200 transition hover:shadow-lg"
          >
            {c.imageUrl ? (
              <img
                src={c.imageUrl}
                alt={c.name}
                className="h-48 w-full object-cover"
              />
            ) : (
              <div className="from-primary to-secondary h-48 w-full bg-gradient-to-tr" />
            )}

            <div className="flex flex-col items-center justify-center p-5">
              <h3 className="text-primary text-xl font-bold">{c.name}</h3>
              <p className="text-muted-foreground mt-1">{c.description}</p>

              <div className="text-muted-foreground mt-4 flex items-center justify-between gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {new Date(c.startTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  {' - '}
                  {new Date(c.endTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {c.reservations.length}/{c.capacity}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleBooking(c.id)}
              disabled={c.reservations.length >= c.capacity}
              className={`mb-4 max-w-[200px] rounded px-6 py-2 font-semibold text-white shadow-md transition ${
                c.reservations.length >= c.capacity
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {c.reservations.length >= c.capacity ? 'Full' : '➤ Book a Class'}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TodaysClasses
