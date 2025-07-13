'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

interface GymClass {
  id: string
  name: string
  description?: string
  startTime: string
  endTime: string
  capacity: number
  reservations: { id: string }[]
}

export default function GymClassesPage() {
  const { data: session, status } = useSession()
  const [gymClasses, setGymClasses] = useState<GymClass[]>([])

  useEffect(() => {
    const fetchClasses = async () => {
      const res = await fetch('/api/gym_classes')
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
    } else {
      alert(data.error || 'Failed to reserve')
    }
  }

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Upcoming Gym Classes</h1>
      <div className="grid gap-4">
        {gymClasses.length === 0 ? (
          <p>No classes found.</p>
        ) : (
          gymClasses.map((cls) => {
            const spotsLeft = cls.capacity - cls.reservations.length
            return (
              <div
                key={cls.id}
                className="rounded-xl border p-4 shadow transition hover:shadow-md"
              >
                <h2 className="text-xl font-semibold">{cls.name}</h2>
                <p className="text-sm text-gray-600">{cls.description}</p>
                <p className="mt-2">
                  <strong>Start:</strong>{' '}
                  {new Date(cls.startTime).toLocaleString()}
                </p>
                <p>
                  <strong>End:</strong> {new Date(cls.endTime).toLocaleString()}
                </p>
                <p className="mt-1 font-medium">
                  Spots left: {spotsLeft}/{cls.capacity}
                </p>
                <button
                  onClick={() => handleReserve(cls.id)}
                  className="mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Reserve
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
