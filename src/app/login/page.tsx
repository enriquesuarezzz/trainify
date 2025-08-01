'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (mode === 'register') {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.error || 'Registration failed')
        setLoading(false)
        return
      }
    }

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.ok) {
      router.push('/profile')
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('images/header.avif')" }}
    >
      <div className="bg-opacity-90 w-full max-w-sm rounded-lg bg-white p-8 shadow-lg backdrop-blur">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-center text-2xl font-bold text-gray-800">
            {mode === 'login' ? 'Login' : 'Create an Account'}
          </h1>

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {mode === 'register' && (
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded border px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full rounded bg-orange-500 py-2 text-white hover:bg-orange-600"
            disabled={loading}
          >
            {loading
              ? mode === 'login'
                ? 'Logging in...'
                : 'Creating account...'
              : mode === 'login'
                ? 'Login'
                : 'Sign Up'}
          </button>

          <p className="text-center text-sm text-gray-600">
            {mode === 'login'
              ? "Don't have an account?"
              : 'Already have an account?'}{' '}
            <button
              type="button"
              className="font-medium text-orange-600 hover:underline"
              onClick={toggleMode}
            >
              {mode === 'login' ? 'Sign up' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
