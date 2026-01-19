"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react"
import Navbar from "../ui/navbar"
import Link from "next/link"
import { useRouter } from "next/navigation"
import StepProgress from "../ui/step-progress"
import { useBooking } from "../context/BookingContext"

interface SelectDateProps {
  onBack: () => void
  onContinue: () => void
}

export default function SelectDate({ onBack, onContinue }: SelectDateProps) {
  const router = useRouter()
  const { date: selectedDate, setDate: setSelectedDate, time: selectedTime, setTime: setSelectedTime } = useBooking()

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const today = new Date()

  const getAvailableTimeSlots = (date: Date) => {
    const slots: string[] = []
    const isToday = date.toDateString() === today.toDateString()

    for (let hour = 0; hour < 24; hour++) {
      for (const minute of [0, 30]) {
        if (isToday) {
          const slotTime = new Date(date)
          slotTime.setHours(hour, minute, 0, 0)

          const now = new Date()
          const nextAvailableMinute = now.getMinutes() <= 30 ? 30 : 60
          const minBookingTime = new Date(now)

          if (nextAvailableMinute === 60) {
            minBookingTime.setHours(now.getHours() + 1, 0, 0, 0)
          } else {
            minBookingTime.setHours(now.getHours(), 30, 0, 0)
          }

          if (slotTime >= minBookingTime) {
            slots.push(
              `${hour.toString().padStart(2, "0")}:${minute
                .toString()
                .padStart(2, "0")}`,
            )
          }
        } else {
          slots.push(
            `${hour.toString().padStart(2, "0")}:${minute
              .toString()
              .padStart(2, "0")}`,
          )
        }
      }
    }

    return slots
  }

  const [availableSlots, setAvailableSlots] = useState<string[]>([])

  useEffect(() => {
    if (!selectedDate) return

    const slots = getAvailableTimeSlots(selectedDate)
    setAvailableSlots(slots)

    if (selectedTime && !slots.includes(selectedTime)) {
      setSelectedTime("")
    }
  }, [selectedDate, selectedTime])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (Date | null)[] = []

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true
    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    )
    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    )
    return dateOnly < todayOnly
  }

  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false
    return date1.toDateString() === date2.toDateString()
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    )
  }

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    )
  }

  const monthYear = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })
  const days = getDaysInMonth(currentMonth)
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const canContinue = Boolean(selectedDate && selectedTime)

  return (
    <div className="flex h-screen flex-col bg-[#f8f9fa] overflow-hidden">
      <Navbar />

      {/* Progress Bar */}
      <StepProgress currentStep={3} title="Select Date & Time" />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-8 pt-2">
        <div className="max-w-6xl mx-auto animate-fade-in-up">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Select Date & Time
            </h1>
            <p className="text-gray-500">
              Choose your preferred date and time for the service.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Calendar */}
            <div className="bg-white rounded-2xl shadow-lg shadow-black/5 p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                <div className="p-2 bg-orange-50 rounded-lg text-[#c44522]">
                  <Calendar className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">
                  Select Date
                </h2>
              </div>

              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  {monthYear}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={goToPreviousMonth}
                    className="p-2 hover:bg-gray-50 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={goToNextMonth}
                    className="p-2 hover:bg-gray-50 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-bold text-gray-400 py-2 uppercase tracking-wide"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {days.map((date, index) => {
                  const disabled = isDateDisabled(date)
                  const selected = isSameDay(date, selectedDate)
                  const isToday = date && isSameDay(date, today)

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (!disabled && date) {
                          setSelectedDate(date)
                        }
                      }}
                      disabled={disabled}
                      className={`
                        aspect-square rounded-xl text-sm font-semibold transition-all duration-200
                        ${!date ? "invisible" : ""}
                        ${disabled
                          ? "text-gray-300 cursor-not-allowed bg-gray-50/50"
                          : "hover:bg-orange-50 hover:text-[#c44522]"
                        }
                        ${selected
                          ? "bg-[#c44522] text-white scale-105 !hover:bg-[#c44522] !hover:text-white"
                          : "text-gray-700 bg-white"
                        }
                        ${isToday && !selected
                          ? "border-2 border-[#c44522] text-[#c44522]"
                          : ""
                        }
                      `}
                    >
                      {date?.getDate()}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Time Selection */}
            <div className="bg-white rounded-2xl shadow-lg shadow-black/5 p-6 border border-gray-100 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50 flex-shrink-0">
                <div className="p-2 bg-orange-50 rounded-lg text-[#c44522]">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">
                  Select Time
                </h2>
              </div>

              {!selectedDate ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
                  <Calendar className="w-10 h-10 text-gray-300 mb-3" />
                  <p className="text-gray-500 font-medium">Please select a date first</p>
                  <p className="text-sm text-gray-400">Time slots will appear here</p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {availableSlots.map((time) => {
                      const selected = time === selectedTime

                      return (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`
                            py-3 rounded-xl text-sm font-bold transition-all duration-200 border-2
                            ${selected
                              ? "bg-[#c44522] border-[#c44522] text-white scale-[1.02]"
                              : "bg-white border-transparent hover:border-orange-200 hover:bg-orange-50 text-gray-700"
                            }
                          `}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex-shrink-0 w-full bg-white/80 backdrop-blur-lg border-t border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-50 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link
            href={"/SelectServices"}
            className="text-gray-500 hover:text-gray-900 font-semibold text-sm transition-colors flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
          </Link>

          <button
            onClick={() => router.push("/CustomerDetails")}
            disabled={!canContinue}
            className="group flex items-center gap-2 rounded-xl bg-[#c44522] px-8 py-3 text-sm font-bold text-white transition-all hover:bg-[#a33a1c] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
          >
            Continue <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
