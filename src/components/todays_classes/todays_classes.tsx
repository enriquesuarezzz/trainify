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
  imageUrl?: string // Optional: if you add images later
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
            className="bg-card shadow-card overflow-hidden rounded-xl transition hover:shadow-lg"
          >
            {/* Replace this with real imageUrl if you add it to DB */}
            <div className="from-primary to-secondary h-48 bg-gradient-to-tr" />

            <div className="p-5">
              <h3 className="text-primary text-xl font-bold">{c.name}</h3>
              <p className="text-muted-foreground mt-1">{c.description}</p>

              <div className="text-muted-foreground mt-4 flex items-center justify-between text-sm">
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
          </div>
        ))}
      </div>
    </section>
  )
}

export default TodaysClasses
