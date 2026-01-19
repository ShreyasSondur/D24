"use client"

import { useState } from "react"
import { ChevronRight, Check } from "lucide-react"
import Navbar from "../ui/navbar"
import Link from "next/link"
import StepProgress from "../ui/step-progress"
import { motion } from "framer-motion"
import { useBooking } from "../context/BookingContext"
import { useRouter } from "next/navigation"

interface VehicleOption {
  id: string
  name: string
  description: string
  image: string
}

const vehicleOptions: VehicleOption[] = [
  {
    id: "sedan",
    name: "Sedan",
    description: "Standard 4-door vehicle",
    image: "/silver-sedan.png",
  },
  {
    id: "hatchback",
    name: "Hatchback",
    description: "Compact 2 or 4 door",
    image: "/silver-hatchback-city.png",
  },
  {
    id: "suv",
    name: "SUV / Truck",
    description: "Large size vehicle",
    image: "/suv-truck.jpg",
  },
  {
    id: "luxury",
    name: "Luxury / Exotic",
    description: "Special handling required",
    image: "/luxury-exotic-car.jpg",
  },
  {
    id: "motorcycle",
    name: "Motorcycle",
    description: "Any 2-wheel vehicle",
    image: "/classic-motorcycle.png",
  },
]

export default function SelectVehicle() {
  const { vehicleId, setVehicleId } = useBooking()
  const router = useRouter()

  return (
    <div className="flex h-screen flex-col bg-[#f8f9fa] overflow-hidden">
      <Navbar />

      {/* Shared Progress Bar */}
      <StepProgress currentStep={1} title="Vehicle Selection" />

      {/* Main Content - Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-8 pt-2">
        <div className="mx-auto w-full max-w-7xl animate-fade-in-up">

          <div className="mb-10 text-center mt-22">
            <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl tracking-tight">
              Select Your Vehicle Type
            </h1>
            <p className="mx-auto max-w-2xl text-base text-gray-500">
              Pricing varies based on vehicle size and condition. Choose the one
              that best matches yours.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 pb-10">
            {vehicleOptions.map((vehicle, index) => {
              const isSelected = vehicleId === vehicle.id

              return (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={vehicle.id}
                  onClick={() => setVehicleId(vehicle.id)}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 text-left transition-all duration-300 focus:outline-none bg-white
                    ${isSelected
                      ? "border-[#c44522] shadow-[0_8px_30px_rgba(196,69,34,0.15)] scale-[1.02]"
                      : "border-transparent hover:border-gray-200 hover:shadow-xl hover:-translate-y-1"
                    }
                  `}
                >
                  {/* Selection Checkmark */}
                  <div className={`absolute right-3 top-3 z-20 transition-all duration-300 ${isSelected ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c44522] shadow-md ring-2 ring-white">
                      <Check className="h-5 w-5 text-white" strokeWidth={3} />
                    </div>
                  </div>

                  {/* Image Container */}
                  <div className="relative z-0 aspect-[4/3] w-full overflow-hidden bg-gray-50">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3
                      className={`mb-1 text-lg font-bold transition-colors ${isSelected ? "text-[#c44522]" : "text-gray-900"
                        }`}
                    >
                      {vehicle.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-500 leading-relaxed">
                      {vehicle.description}
                    </p>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer - Fixed at Bottom of Flex Container */}
      <div className="flex-shrink-0 w-full bg-white/80 backdrop-blur-lg border-t border-gray-200 px-6 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href={"/"} className="flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-gray-900 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
          </Link>

          <button
            onClick={() => router.push("/SelectServices")}
            disabled={!vehicleId}
            className="group flex items-center gap-2 rounded-xl bg-[#c44522] px-8 py-3 text-sm font-bold text-white transition-all hover:bg-[#a33a1c] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:transform-none cursor-pointer"
          >
            Continue <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

          </button>
        </div>
      </div>
    </div>
  )
}
