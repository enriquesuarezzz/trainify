// src/app/users/page.tsx
'use client'

import { useEffect, useState } from 'react'

interface User {
  id: number
  name: string
  email: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(data)
    }

    fetchUsers()
  }, [])

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Users</h1>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="rounded border p-2">
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
