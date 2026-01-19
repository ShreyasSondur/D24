"use client"

import { useMemo } from "react"
import { ChevronRight } from "lucide-react"
import Navbar from "../ui/navbar"
import { useRouter } from "next/navigation"
import Link from "next/link"
import StepProgress from "../ui/step-progress"
import { useBooking } from "../context/BookingContext"

export default function CustomerDetails() {
  const router = useRouter()
  const { customer, setCustomer } = useBooking()

  const { fullName, mobile, email, notes } = customer

  const handleChange = (field: keyof typeof customer, value: string) => {
    setCustomer({ ...customer, [field]: value })
  }

  const isValid = useMemo(() => {
    const phoneRegex = /^\d{10}$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    return (
      fullName.trim().length >= 3 &&
      phoneRegex.test(mobile) &&
      emailRegex.test(email)
    )
  }, [fullName, mobile, email])

  return (
    <div className="flex h-screen flex-col bg-[#faf8f5] overflow-hidden">
      <Navbar />

      {/* Progress Bar */}
      <StepProgress currentStep={4} title="Customer Details" />

      {/* CONTENT: Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-8">
        <div className="w-full max-w-4xl mx-auto relative z-10 animate-fade-in-up">

          {/* Card */}
          <div className="rounded-2xl border border-gray-100 bg-white px-8 py-10 shadow-lg shadow-black/5">
            <h1 className="mb-2 text-3xl font-bold text-gray-900 tracking-tight">
              Enter your Details
            </h1>
            <p className="mb-8 text-base text-gray-500">
              We need a few details to confirm your booking and send updates.
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field
                label="Full Name"
                value={fullName}
                onChange={(v) => handleChange("fullName", v)}
                placeholder="John Doe"
              />

              <Field
                label="Mobile Number"
                value={mobile}
                onChange={(v) => {
                  if (/^\d*$/.test(v)) handleChange("mobile", v)
                }}
                placeholder="9876543210"
                type="tel"
                maxLength={10}
              />

              <div className="md:col-span-2">
                <Field
                  label="Email Address"
                  value={email}
                  onChange={(v) => handleChange("email", v)}
                  placeholder="name@example.com"
                  type="email"
                />
              </div>

              <div className="md:col-span-2">
                <Textarea
                  label="Vehicle or Access Notes [Optional]"
                  value={notes}
                  onChange={(v) => handleChange("notes", v)}
                  placeholder="Any special instructions for finding your location or vehicle..."
                />
              </div>
            </div>

            {/* Terms */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <p className="text-xs text-center text-gray-500 leading-relaxed">
                By clicking "Continue", you agree to our
                <Link href="#" className="font-bold text-gray-900 hover:text-[#c44522] transition-colors mx-1">Terms of Service</Link>
                and
                <Link href="#" className="font-bold text-gray-900 hover:text-[#c44522] transition-colors mx-1">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FIXED BOTTOM BAR */}
      <div className="flex-shrink-0 w-full bg-white/80 backdrop-blur-lg border-t border-gray-200 px-6 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/SelectDate"
            className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
          </Link>

          <button
            onClick={() => isValid && router.push("/PhoneVerification")}
            disabled={!isValid}
            className="group flex items-center gap-2 rounded-xl bg-[#c44522] px-8 py-3 text-sm font-bold text-white transition-all hover:bg-[#a33a1c] hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none cursor-pointer"
          >
            Continue
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------- Inputs ---------- */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  maxLength?: number
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-gray-700 ml-1">
        {label}
      </label>
      <input
        type={type}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-[#c44522] focus:bg-white focus:ring-4 focus:ring-[#c44522]/10 hover:border-gray-200"
      />
    </div>
  )
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-gray-700 ml-1">
        {label}
      </label>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-[#c44522] focus:bg-white focus:ring-4 focus:ring-[#c44522]/10 hover:border-gray-200"
      />
    </div>
  )
}
