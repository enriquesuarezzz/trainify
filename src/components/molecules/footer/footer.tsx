import { Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-10 text-gray-700">
      <div className="container mx-auto grid grid-cols-1 items-center justify-center gap-8 text-center md:grid-cols-3">
        <div>
          <h3 className="text-center text-xl font-bold text-orange-500">
            Trainify
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Elevate your fitness journey with expert-led classes and premium
            facilities.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center">
          <h4 className="mb-3 text-center text-lg font-semibold">
            Quick Links
          </h4>
          <ul className="flex flex-wrap justify-center gap-6 text-sm">
            <li className="list-none">
              <a href="/" className="hover:text-orange-500">
                Home
              </a>
            </li>
            <li className="list-none">
              <a href="/classes" className="transition hover:text-orange-500">
                Classes
              </a>
            </li>
            <li className="list-none">
              <a href="/pricing" className="transition hover:text-orange-500">
                Pricing
              </a>
            </li>
            <li className="list-none">
              <a href="/contact" className="transition hover:text-orange-500">
                Contact
              </a>
            </li>
            <li className="list-none">
              <a href="/profile" className="transition hover:text-orange-500">
                Profile
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="mb-3 text-center text-lg font-semibold">Follow Us</h4>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.facebook.com/"
              className="transition-all hover:scale-110 hover:text-orange-500"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/"
              className="transition-all hover:scale-110 hover:text-orange-500"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/?lang=es"
              className="transition-all hover:scale-110 hover:text-orange-500"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-10 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Trainify. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
