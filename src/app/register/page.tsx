'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const [name, setName] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok) {
      router.push('/login')
    } else {
      const data = await res.json()
      alert(data.error || 'Failed to register')
    }
  }

  return (
    <form onSubmit={handleRegister} className="mx-auto max-w-sm space-y-4 p-6">
      <h1 className="text-2xl font-bold">Register</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded border px-3 py-2"
        required
      />

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded border px-3 py-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded border px-3 py-2"
        required
      />
      <button
        type="submit"
        className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
      >
        Sign Up
      </button>
    </form>
  )
}
