"use client"

import Link from "next/link"
import Image from "next/image"

interface NavbarProps {
  variant?: "default" | "landing"
}

export default function Navbar({ variant = "default" }: NavbarProps) {
  const isLanding = variant === "landing"

  return (
    <header
      className={`
        z-50 w-full transition-all duration-300
        ${isLanding
          ? "absolute top-0 bg-transparent py-6 border-b border-white/10"
          : "sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm py-4"
        }
      `}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8`}>
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-12 w-auto">
            <img
              src="/images/logo.png"
              alt="D24 Logo"
              className={`h-full w-auto object-contain transition-opacity ${isLanding ? 'opacity-90 group-hover:opacity-100' : ''}`}
            />
          </div>
          <span
            className={`text-xl font-bold tracking-tight transition-colors
              ${isLanding
                ? "text-white group-hover:text-[#d35400] font-serif tracking-widest"
                : "text-gray-900 group-hover:text-[#c44522]"
              }
            `}
          >
            D24 Studio
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className={`text-sm font-medium transition-colors ${isLanding ? "text-white/90 hover:text-[#d35400] uppercase tracking-widest font-serif" : "text-gray-600 hover:text-[#c44522]"}`}>
            Home
          </Link>
          <Link href="/services" className={`text-sm font-medium transition-colors ${isLanding ? "text-white/90 hover:text-[#d35400] uppercase tracking-widest font-serif" : "text-gray-600 hover:text-[#c44522]"}`}>
            Services
          </Link>
          <Link href="/about" className={`text-sm font-medium transition-colors ${isLanding ? "text-white/90 hover:text-[#d35400] uppercase tracking-widest font-serif" : "text-gray-600 hover:text-[#c44522]"}`}>
            About Us
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/SelectVehicle">
            <button className={`cursor-pointer rounded-sm px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#a33a1c] hover:scale-[1.02] active:scale-[0.98]
              ${isLanding ? "bg-[#d35400] uppercase tracking-widest font-serif rounded-sm py-2 text-xs" : "bg-[#c44522] rounded-xl"}
            `}>
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}
