'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface GymClass {
  id: string
  name: string
  image: string
  startTime: string
  endTime: string
  capacity: number
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  console.log('Session data:', session)
  const router = useRouter()
  const [gymClasses, setGymClasses] = useState<GymClass[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    console.log('Session data:', session)
    console.log('Status:', status)

    // Redirect if not admin
    if (!session?.user || session.user.role !== 'admin') {
      router.push('/')
      return
    }

    // ✅ Only fetch after confirming admin
    const fetchClasses = async () => {
      try {
        const res = await fetch('/api/admin/classes', {
          method: 'GET',
          credentials: 'include', // send cookies
        })

        if (!res.ok) {
          const errorData = await res.json()
          console.error('Unexpected API response:', errorData)
          setGymClasses([])
          return
        }

        const data = await res.json()
        setGymClasses(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Error fetching classes:', err)
        setGymClasses([])
      } finally {
        setLoading(false)
      }
    }

    fetchClasses()
  }, [session, status, router])

  if (status === 'loading' || loading) {
    return <p className="py-16 text-center">Loading...</p>
  }

  return (
    <section className="container py-16">
      <h1 className="mb-8 text-center text-3xl font-bold text-orange-500">
        Admin Dashboard
      </h1>

      <div className="mb-8 text-right">
        <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          + Add New Class
        </button>
      </div>

      {gymClasses.length === 0 ? (
        <p>No gym classes found.</p>
      ) : (
        <ul className="space-y-4">
          {gymClasses.map((gymClass) => (
            <li
              key={gymClass.id}
              className="flex items-center gap-4 rounded border p-4 shadow-sm"
            >
              <img
                src={gymClass.image}
                alt={gymClass.name}
                className="h-16 w-16 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold">{gymClass.name}</p>
                <p className="text-sm text-gray-600">
                  {new Date(gymClass.startTime).toLocaleString()} –{' '}
                  {new Date(gymClass.endTime).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Capacity: {gymClass.capacity}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600">
                  Edit
                </button>
                <button className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
