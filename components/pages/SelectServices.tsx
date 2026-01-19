"use client"

import { useState } from "react"
import { Clock, Droplet, Check, ChevronRight } from "lucide-react"
import Navbar from "../ui/navbar"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import StepProgress from "../ui/step-progress"
import { useBooking, Service as ServiceType } from "../context/BookingContext"

interface Service {
  id: string
  title: string
  description: string
  duration: string
  durationMinutes: number
  price: number
  category: "wash" | "detailing"
}

const services: Service[] = [
  {
    id: "effortless-wash",
    title: "Effortless Wash",
    description: "Exterior foam pre-soak, high-pressure rinse, and hand dry. Perfect for regular maintenance.",
    duration: "30 min",
    durationMinutes: 30,
    price: 500,
    category: "wash",
  },
  {
    id: "quick-wash",
    title: "Quick Wash",
    description: "Includes Effortless Wash plus interior vacuuming, dash wipe-down, and glass cleaning.",
    duration: "30 min",
    durationMinutes: 30,
    price: 800,
    category: "wash",
  },
  {
    id: "detailed-wash",
    title: "Detailed Wash",
    description: "Full deep clean including steam cleaning, leather conditioning, wax application, and tire dressing.",
    duration: "30 min",
    durationMinutes: 30,
    price: 1500,
    category: "wash",
  },
  {
    id: "under-chassis",
    title: "Under-chassis Wash",
    description: "High pressure removal of road salt, mud, and grime from undercarriage.",
    duration: "30 min",
    durationMinutes: 30,
    price: 600,
    category: "detailing",
  },
  {
    id: "trim-restoration",
    title: "Trim Restoration",
    description: "Bring faded black plastic trim back to its original deep color.",
    duration: "1 hour",
    durationMinutes: 60,
    price: 1200,
    category: "detailing",
  },
  {
    id: "paint-correction",
    title: "Paint Correction",
    description: "Remove swirls, scratches, and oxidation to restore showroom shine.",
    duration: "6 hours",
    durationMinutes: 360,
    price: 5000,
    category: "detailing",
  },
  {
    id: "ceramic-coating",
    title: "Ceramic Coating",
    description: "5-year protection against UV rays, water spots, and contaminants.",
    duration: "5 hours",
    durationMinutes: 300,
    price: 8000,
    category: "detailing",
  },
  {
    id: "ppf",
    title: "PPF (Paint Protection)",
    description: "Invisible film layer protecting high-impact areas from rock chips.",
    duration: "1 day",
    durationMinutes: 480,
    price: 15000,
    category: "detailing",
  },
  {
    id: "headlight-restoration",
    title: "Headlight Restoration",
    description: "Restore cloudy, yellowed headlights to like-new clarity.",
    duration: "1 hour",
    durationMinutes: 60,
    price: 1000,
    category: "detailing",
  },
]

export default function SelectServices({ onBack, onContinue }: { onBack?: () => void; onContinue?: () => void }) {
  const router = useRouter()
  const { services: selectedServices, toggleService: contextToggleService } = useBooking()

  const toggleService = (service: Service) => {
    contextToggleService({
      id: service.id,
      title: service.title,
      price: service.price,
      durationMinutes: service.durationMinutes
    })
  }

  const selectedServiceDetails = selectedServices
  const totalPrice = selectedServiceDetails.reduce((sum, s) => sum + s.price, 0)
  const totalDuration = selectedServiceDetails.reduce((sum, s) => sum + s.durationMinutes, 0)

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = (minutes / 60).toFixed(1)
      return `${hours} Hours`
    }
    return `${minutes} min`
  }

  const washPackages = services.filter((s) => s.category === "wash")
  const detailingServices = services.filter((s) => s.category === "detailing")

  return (
    <div className="h-screen flex flex-col bg-[#f8f9fa] overflow-hidden">
      <Navbar />
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Custom Scrollbar for Left Panel */
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #f1d4cc;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #c44522;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #f1d4cc transparent;
        }
      `}</style>

      {/* Shared Progress Bar */}
      <StepProgress currentStep={2} title="Select Services" />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex gap-8 px-6 lg:px-8 pb-4 max-w-7xl mx-auto w-full">
        {/* Left Sidebar - Fixed (Hidden on Mobile) */}
        <div className="w-80 flex-shrink-0 hidden lg:flex flex-col h-full pb-4">
          <div className="bg-white rounded-2xl shadow-xl shadow-black/5 overflow-hidden flex flex-col border border-gray-100 h-full">
            <div className="relative w-full h-32 flex-shrink-0 bg-gray-100 overflow-hidden group">
              <Image
                src="/silver-sedan.png"
                alt="Selected Vehicle"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <p className="text-white text-xs font-bold bg-white/20 backdrop-blur-md px-2 py-1 rounded-md border border-white/30">Your Vehicle</p>
              </div>
            </div>

            <div className="p-5 flex flex-col flex-1 overflow-hidden">
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h3 className="text-gray-900 text-lg font-bold">Summary</h3>
                <span className="bg-orange-50 text-[#c44522] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {selectedServices.length} Selected
                </span>
              </div>

              {/* Scrollable Service List */}
              <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar min-h-0 mb-2">
                {selectedServiceDetails.length > 0 ? (
                  <div className="space-y-3 pb-2">
                    {selectedServiceDetails.map((service) => (
                      <div key={service.id} className="flex justify-between items-start text-sm group border-b border-dashed border-gray-100 last:border-0 pb-2 last:pb-0">
                        <span className="text-gray-700 font-medium group-hover:text-[#c44522] transition-colors leading-tight">{service.title}</span>
                        <span className="text-gray-900 font-bold whitespace-nowrap ml-2">₹{service.price}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3 text-gray-300">
                      <Droplet className="w-6 h-6" />
                    </div>
                    <p className="text-sm text-gray-400 font-medium">No services added</p>
                    <p className="text-xs text-gray-300 mt-1">Select from the right</p>
                  </div>
                )}
              </div>

              {/* Fixed Footer Section */}
              <div className="flex-shrink-0 pt-3 border-t border-gray-100 mt-auto bg-white z-10">
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-orange-50/50 p-2.5 rounded-lg border border-orange-100/50">
                    <span className="text-gray-600 text-xs font-medium flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#c44522]" /> Est. Time
                    </span>
                    <span className="text-gray-900 text-sm font-bold">
                      {totalDuration > 0 ? formatDuration(totalDuration) : "0 min"}
                    </span>
                  </div>

                  <div className="flex justify-between items-end">
                    <span className="text-sm font-semibold text-gray-500 mb-1">Total Pay</span>
                    <span className="text-3xl font-extrabold text-[#c44522] tracking-tight">₹{totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Scrollable */}
        <div className="flex-1 overflow-y-auto pb-8 pr-2 hide-scrollbar scroll-smooth">
          <div className="mb-8 pt-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">Select Services</h1>
            <p className="text-gray-500 text-lg">
              Customize your care package. Select services to add them to your booking.
            </p>
          </div>

          {[
            { title: "Wash Packages", icon: Droplet, items: washPackages },
            { title: "Detailing Services", icon: Droplet, items: detailingServices }
          ].map((category) => (
            <div key={category.title} className="mb-10 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-orange-100 rounded-lg text-[#c44522]">
                  <category.icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
                {category.items.map((service) => {
                  const isSelected = selectedServices.some(s => s.id === service.id)
                  return (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service)}
                      className={`group relative text-left p-6 rounded-2xl border-2 transition-all duration-300 ease-in-out hover:shadow-xl ${isSelected
                        ? "bg-white border-[#c44522] shadow-lg scale-[1.01]"
                        : "bg-white border-transparent hover:border-orange-200 shadow-sm hover:scale-[1.01]"
                        }`}
                    >
                      {/* Selection Indicator */}
                      <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isSelected ? "bg-[#c44522] border-[#c44522]" : "border-gray-200 group-hover:border-[#c44522]"
                        }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />}
                      </div>

                      <div className="pr-8">
                        <h3 className={`text-lg font-bold mb-2 transition-colors ${isSelected ? "text-[#c44522]" : "text-gray-900 group-hover:text-[#c44522]"
                          }`}>
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-3">
                          {service.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-2">
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold bg-gray-50 px-2.5 py-1 rounded-md group-hover:bg-orange-50 group-hover:text-orange-700 transition-colors">
                          <Clock className="w-3.5 h-3.5" />
                          {service.duration}
                        </div>
                        <span className="text-lg font-bold text-gray-900">₹{service.price}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation - Fixed */}
      <div className="flex-shrink-0 w-full bg-white/80 backdrop-blur-lg border-t border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-50">
        <div className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
          <Link
            href={"/SelectVehicle"}
            className="text-gray-500 hover:text-gray-900 font-semibold text-sm transition-colors flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
          </Link>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500 font-medium">Total Estimate</span>
              <span className="text-lg font-bold text-[#c44522]">₹{totalPrice}</span>
            </div>
            <button
              onClick={() => router.push("/SelectDate")}
              disabled={selectedServices.length === 0}
              className="bg-[#c44522] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#a33a1c] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
