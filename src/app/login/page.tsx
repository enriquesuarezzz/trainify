'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.ok) {
      router.push('/gym-classes')
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <form onSubmit={handleLogin} className="mx-auto max-w-sm space-y-4 p-6">
      <h1 className="text-2xl font-bold">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        Log In
      </button>
    </form>
  )
}
