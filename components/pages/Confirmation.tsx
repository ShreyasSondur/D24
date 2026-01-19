"use client"

import { CheckCircle2, Home, Calendar, Clock, Car } from "lucide-react"
import Link from "next/link"
import Navbar from "../ui/navbar"
import { useBooking } from "../context/BookingContext"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Confirmation() {
    const { services, vehicleId, date, time, customer, resetBooking } = useBooking()
    const router = useRouter()
    const [bookingId, setBookingId] = useState("")

    useEffect(() => {
        setBookingId(`#D24-${Math.floor(1000 + Math.random() * 9000)}`)
    }, [])

    // Calculate totals
    const totalPrice = services.reduce((sum, s) => sum + s.price, 0)
    const totalDurationMinutes = services.reduce((sum, s) => sum + s.durationMinutes, 0)

    const formatDuration = (minutes: number) => {
        if (minutes >= 60) {
            const hours = (minutes / 60).toFixed(1)
            return `${hours} Hours`
        }
        return `${minutes} Mins`
    }

    const formattedDate = date?.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    // Optional: Redirect if no data (e.g. refresh)
    // useEffect(() => {
    //   if (!vehicleId) router.push("/")
    // }, [vehicleId, router])

    return (
        <div className="flex min-h-screen flex-col bg-[#faf8f5]">
            <Navbar />

            <main className="flex flex-1 flex-col items-center justify-center px-4 py-10">
                <div className="w-full max-w-lg animate-fade-in-up">
                    <div className="relative rounded-3xl border border-gray-100 bg-white shadow-xl shadow-black/5 overflow-hidden">

                        {/* Header Section */}
                        <div className="bg-green-50/50 p-8 text-center border-b border-green-50">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm ring-4 ring-white">
                                <CheckCircle2 className="h-8 w-8" strokeWidth={3} />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">Booking Confirmed!</h1>
                            <p className="text-sm text-gray-500">
                                We've sent a confirmation to <span className="font-semibold">{customer.mobile}</span>
                            </p>
                        </div>

                        {/* Booking ID */}
                        <div className="px-8 py-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Booking ID</span>
                            <span className="font-mono font-bold text-gray-900 text-lg">{bookingId}</span>
                        </div>

                        {/* Details Section */}
                        <div className="p-8 space-y-6">

                            {/* Date & Vehicle */}
                            <div className="flex gap-4">
                                <div className="flex-1 p-3 rounded-2xl bg-orange-50/50 border border-orange-100/50">
                                    <div className="flex items-center gap-2 mb-1 text-[#c44522]">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase">Date & Time</span>
                                    </div>
                                    <p className="font-bold text-gray-900 text-sm">{formattedDate}</p>
                                    <p className="text-xs text-gray-500 font-medium">{time}</p>
                                </div>
                                <div className="flex-1 p-3 rounded-2xl bg-blue-50/50 border border-blue-100/50">
                                    <div className="flex items-center gap-2 mb-1 text-blue-600">
                                        <Car className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase">Vehicle</span>
                                    </div>
                                    <p className="font-bold text-gray-900 text-sm capitalize">{vehicleId}</p>
                                </div>
                            </div>

                            {/* Services List */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    Selected Services
                                    <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">{services.length}</span>
                                </h3>
                                <div className="space-y-3">
                                    {services.map((service, idx) => (
                                        <div key={idx} className="flex justify-between items-start text-sm border-b border-dashed border-gray-100 last:border-0 pb-2 last:pb-0">
                                            <span className="text-gray-600 font-medium">{service.title}</span>
                                            <span className="text-gray-900 font-semibold">₹{service.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Totals */}
                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                                        <Clock className="w-4 h-4" /> Est. Duration
                                    </span>
                                    <span className="text-sm font-bold text-gray-900">{formatDuration(totalDurationMinutes)}</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-base font-bold text-gray-900">Total Estimate</span>
                                    <span className="text-2xl font-extrabold text-[#c44522]">₹{totalPrice}</span>
                                </div>
                            </div>

                            {/* Home Button */}
                            <Link href="/" onClick={resetBooking} className="block">
                                <button className="group w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-4 text-sm font-bold text-white transition-all hover:bg-black hover:scale-[1.01] active:scale-[0.99] shadow-lg">
                                    <Home className="h-4 w-4" />
                                    Back to Home
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}