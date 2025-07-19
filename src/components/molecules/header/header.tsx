import React from 'react'

const Header = () => {
  return (
    <div
      className="relative flex h-[100vh] w-full items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/images/header.jpg')" }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-orange-500/70 to-blue-600/70"></div>

      <div className="relative z-10 max-w-3xl px-4 text-center">
        <h1 className="text-4xl font-extrabold md:text-6xl">
          Transform Your{' '}
          <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Fitness Journey
          </span>
        </h1>
        <p className="mt-4 text-lg text-white md:text-xl">
          Book classes, track progress, and achieve your fitness goals with our
          comprehensive gym management system.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button className="rounded bg-orange-500 px-6 py-2 font-semibold text-white shadow-md transition hover:bg-orange-600">
            ➤ Book a Class
          </button>
          <button className="rounded bg-white px-6 py-2 font-semibold text-orange-500 shadow-md hover:bg-white/80">
            🗓️ View Schedule
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-white/30 bg-white/20 p-6 backdrop-blur-sm">
            <p className="text-2xl font-bold">50+</p>
            <p className="text-sm">Weekly Classes</p>
          </div>
          <div className="rounded-lg border border-white/30 bg-white/20 p-6 backdrop-blur-sm">
            <p className="text-2xl font-bold">1000+</p>
            <p className="text-sm">Active Members</p>
          </div>
          <div className="rounded-lg border border-white/30 bg-white/20 p-6 backdrop-blur-sm">
            <p className="text-2xl font-bold">15+</p>
            <p className="text-sm">Expert Trainers</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
