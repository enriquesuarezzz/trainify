'use client'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Send logic goes here (e.g. email service or backend route)
  }

  return (
    <section className="w-full items-center justify-center py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-orange-500 md:text-4xl">
          Contact Us
        </h1>
        <p className="mt-2 text-gray-600">
          We're here to help. Reach out with any questions or feedback!
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-12">
        {/* Contact Form First */}
        <form
          className="mb-10 w-full max-w-3/6 space-y-6 rounded-xl border p-6 shadow-sm"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded border px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded border px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded border px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="rounded bg-orange-500 px-6 py-2 font-semibold text-white shadow transition hover:bg-orange-600"
          >
            Send Message
          </button>

          {submitted && (
            <p className="text-green-600">
              Thanks! We'll get back to you shortly.
            </p>
          )}
        </form>

        {/* Contact Info Second */}
        <div className="flex w-full items-center justify-center gap-12">
          <div className="flex items-start gap-4">
            <Phone className="mt-1 h-5 w-5 text-orange-500" />
            <div>
              <h4 className="font-semibold">Phone</h4>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="mt-1 h-5 w-5 text-orange-500" />
            <div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-gray-600">support@trainify.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="mt-1 h-5 w-5 text-orange-500" />
            <div>
              <h4 className="font-semibold">Address</h4>
              <p className="text-gray-600">123 Fitness Ave, Muscle City, NY</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
