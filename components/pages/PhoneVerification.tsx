"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowRight, Lock, Phone } from "lucide-react"
import { useRouter } from "next/navigation"
import Navbar from "../ui/navbar"
import { useBooking } from "../context/BookingContext"

export default function PhoneVerification() {
    const router = useRouter()
    const { customer, vehicleId, services, date, time } = useBooking()
    // OTP STATE
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    // If no customer data (e.g. refresh), redirect back
    useEffect(() => {
        if (!customer.mobile) {
            // For dev convenience we might not redirect, but in prod we should.
            // router.push("/CustomerDetails")
        }
    }, [customer.mobile, router])

    const handleOtpChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleVerify = async () => {
        const enteredOtp = otp.join("")

        // TEST MODE: Only accept 123456
        if (enteredOtp !== "123456") {
            alert("Invalid OTP. For testing, please use: 123456")
            return
        }

        setIsSubmitting(true)

        // 1. Prepare Data
        const bookingData = {
            vehicleId,
            services,
            date,
            time,
            customer
        }

        try {
            // 2. Submit to API
            const response = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData)
            })

            const data = await response.json()

            if (response.ok) {
                // 3. Redirect to Confirmation
                router.push("/Confirmation")
            } else {
                alert(`Verification failed: ${data.message || "Unknown error"}`)
            }
        } catch (error) {
            console.error("Booking error:", error)
            alert("Network error. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#faf8f5]">
            <Navbar />

            <main className="flex flex-1 flex-col items-center px-4 pt-10 pb-20 justify-center">
                <div className="w-full max-w-md animate-fade-in-up">
                    <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-black/5 text-center">

                        {/* Icon */}
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-[#c44522]">
                            <Lock className="h-7 w-7" strokeWidth={2.5} />
                        </div>

                        <h1 className="mb-2 text-2xl font-bold text-gray-900">
                            Verify your Number
                        </h1>
                        <p className="mb-8 text-sm text-gray-500">
                            We've sent a 6-digit code to <br />
                            <span className="font-bold text-gray-900">+91 {customer.mobile || "9876543210"}</span>
                        </p>

                        {/* OTP Inputs */}
                        <div className="mb-8 flex justify-center gap-2 sm:gap-3">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputRefs.current[index] = el }}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="h-12 w-10 text-center text-xl font-bold bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-[#c44522] focus:ring-0 outline-none transition-all sm:h-14 sm:w-12 caret-[#c44522] text-gray-900"
                                />
                            ))}
                        </div>

                        {/* Verify Button */}
                        <button
                            onClick={handleVerify}
                            disabled={isSubmitting || otp.some(d => !d)}
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#c44522] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#a33a1c] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isSubmitting ? "Verifying..." : "Verify & Book"}
                            {!isSubmitting && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                        </button>

                        {/* Resend Link */}
                        <div className="mt-6 text-xs text-gray-500">
                            Didn't receive code?{" "}
                            <button className="font-bold text-[#c44522] hover:underline">
                                Resend SMS
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}