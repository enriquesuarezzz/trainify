'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Clock, Users } from 'lucide-react'

interface GymClass {
  id: string
  name: string
  description?: string
  startTime: string
  endTime: string
  capacity: number
  imageUrl?: string
  reservations: { id: string }[]
}

export default function GymClassesPage() {
  const { data: session, status } = useSession()
  const [gymClasses, setGymClasses] = useState<GymClass[]>([])

  useEffect(() => {
    const fetchClasses = async () => {
      const res = await fetch('/api/classes')
      const data = await res.json()
      setGymClasses(data)
    }

    fetchClasses()
  }, [])

  const handleReserve = async (classId: string) => {
    if (!session?.user?.id) {
      alert('You must be logged in to reserve a class.')
      return
    }

    const res = await fetch('/api/reservations', {
      method: 'POST',
      body: JSON.stringify({ userId: session.user.id, gymClassId: classId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    if (res.ok) {
      alert('Reservation successful!')
      // Update state to reflect reservation
      setGymClasses((prev) =>
        prev.map((cls) =>
          cls.id === classId
            ? { ...cls, reservations: [...cls.reservations, { id: 'new' }] }
            : cls,
        ),
      )
    } else {
      alert(data.error || 'Failed to reserve')
    }
  }

  if (status === 'loading') return <p className="text-center">Loading...</p>

  return (
    <section className="mx-10 items-center justify-center py-12">
      <div className="mb-10 text-center">
        <h1 className="text-xl font-extrabold text-orange-500 md:text-2xl">
          Upcoming Gym Classes
        </h1>
        <h2 className="text-muted-foreground mt-4 text-2xl md:text-xl">
          Reserve your spot in our expert-led fitness sessions
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {gymClasses.length === 0 ? (
          <p>No classes found.</p>
        ) : (
          gymClasses.map((cls) => {
            const spotsLeft = cls.capacity - cls.reservations.length

            return (
              <div
                key={cls.id}
                className="bg-card shadow-card flex flex-col items-center justify-between overflow-hidden rounded-xl border transition hover:shadow-lg"
              >
                {cls.imageUrl ? (
                  <img
                    src={cls.imageUrl}
                    alt={cls.name}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="from-primary to-secondary h-48 w-full bg-gradient-to-tr" />
                )}

                <div className="flex flex-col items-center justify-center p-5">
                  <h3 className="text-primary text-xl font-bold">{cls.name}</h3>
                  <p className="text-muted-foreground mt-1 text-center text-sm">
                    {cls.description}
                  </p>

                  <div className="text-muted-foreground mt-4 flex flex-col gap-2 text-sm">
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {new Date(cls.startTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      {' - '}
                      {new Date(cls.endTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {cls.reservations.length}/{cls.capacity} spots filled
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleReserve(cls.id)}
                  disabled={cls.reservations.length >= cls.capacity}
                  className={`mb-4 max-w-[200px] rounded px-6 py-2 font-semibold text-white shadow-md transition ${
                    cls.reservations.length >= cls.capacity
                      ? 'cursor-not-allowed bg-gray-400'
                      : 'bg-orange-500 hover:bg-orange-600'
                  }`}
                >
                  {cls.reservations.length >= cls.capacity ? 'Full' : 'Reserve'}
                </button>
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}
