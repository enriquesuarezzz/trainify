'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { LogOut } from 'lucide-react'

interface Reservation {
  id: string
  gymClass: {
    id: string
    name: string
    image: string
    startTime: string
    endTime: string
  }
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReservations = async () => {
      if (!session?.user?.id) return
      const res = await fetch(`/api/reservations/user/${session.user.id}`)
      const data = await res.json()
      setReservations(data)
      setLoading(false)
    }

    fetchReservations()
  }, [session])

  if (status === 'loading') return <p className="text-center">Loading...</p>
  if (!session?.user)
    return <p className="text-center">You must be logged in.</p>

  const handleCancel = async (reservationId: string) => {
    const confirmCancel = confirm(
      'Are you sure you want to cancel this reservation?',
    )
    if (!confirmCancel) return

    const res = await fetch(`/api/reservations/${reservationId}`, {
      method: 'DELETE',
    })

    const data = await res.json()

    if (res.ok) {
      setReservations((prev) => prev.filter((r) => r.id !== reservationId))
    } else {
      alert(data.error || 'Failed to cancel reservation.')
    }
  }

  return (
    <section className="container py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-orange-500 md:text-4xl">
          Profile
        </h1>
        <p className="mt-2 text-gray-600">
          Welcome, {session.user.name || 'User'}!
        </p>
      </div>

      <div className="mx-auto max-w-xl rounded-xl border p-6 shadow-sm">
        <div className="mb-6 space-y-1 text-center">
          <p className="text-lg font-semibold">{session.user.name}</p>
          <p className="text-gray-500">{session.user.email}</p>
        </div>

        <button
          onClick={() => signOut()}
          className="mx-auto flex items-center justify-center gap-2 rounded bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 text-xl font-bold text-orange-500">
          Your Reservations
        </h2>
        {loading ? (
          <p>Loading your reservations...</p>
        ) : reservations.length === 0 ? (
          <p>You haven’t booked any classes yet.</p>
        ) : (
          <ul className="space-y-4">
            {reservations.map((r) => (
              <li
                key={r.id}
                className="rounded border p-4 shadow-sm transition hover:shadow"
              >
                {r.gymClass.image && (
                  <img
                    src={r.gymClass.image}
                    alt={r.gymClass.name}
                    className="h-20 w-20 rounded object-cover"
                  />
                )}
                <p className="font-semibold">{r.gymClass.name}</p>
                <p className="text-sm text-gray-600">
                  {new Date(r.gymClass.startTime).toLocaleString()} -{' '}
                  {new Date(r.gymClass.endTime).toLocaleString()}
                </p>
                <button
                  onClick={() => handleCancel(r.id)}
                  className="mt-2 rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
