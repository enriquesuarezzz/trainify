import { Bell, User } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="text-2xl font-bold text-orange-500">FitFlow</div>

        {/* Center Links */}
        <div className="hidden space-x-6 text-sm font-medium text-gray-800 md:flex">
          <Link href="#">Classes</Link>
          <Link href="#">Schedule</Link>
          <Link href="#">Profile</Link>
        </div>

        {/* Icons */}
        <div className="flex space-x-4">
          <Bell className="h-5 w-5 cursor-pointer text-gray-800" />
          <User className="h-5 w-5 cursor-pointer text-gray-800" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
