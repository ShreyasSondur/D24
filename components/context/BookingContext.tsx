"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface Service {
    id: string
    title: string
    price: number
    durationMinutes: number
}

interface CustomerDetails {
    fullName: string
    mobile: string
    email: string
    notes: string
}

interface BookingContextType {
    vehicleId: string
    setVehicleId: (id: string) => void

    services: Service[]
    setServices: (services: Service[]) => void
    toggleService: (service: Service) => void

    date: Date | null
    setDate: (date: Date | null) => void

    time: string
    setTime: (time: string) => void

    customer: CustomerDetails
    setCustomer: (details: CustomerDetails) => void

    resetBooking: () => void
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
    const [vehicleId, setVehicleId] = useState("")
    const [services, setServices] = useState<Service[]>([])
    const [date, setDate] = useState<Date | null>(null)
    const [time, setTime] = useState("")
    const [customer, setCustomer] = useState<CustomerDetails>({
        fullName: "",
        mobile: "",
        email: "",
        notes: ""
    })

    // Helper to toggle a service (add/remove)
    const toggleService = (service: Service) => {
        setServices((prev) => {
            const exists = prev.find((s) => s.id === service.id)
            if (exists) {
                return prev.filter((s) => s.id !== service.id)
            }
            return [...prev, service]
        })
    }

    const resetBooking = () => {
        setVehicleId("")
        setServices([])
        setDate(null)
        setTime("")
        setCustomer({ fullName: "", mobile: "", email: "", notes: "" })
    }

    return (
        <BookingContext.Provider
            value={{
                vehicleId,
                setVehicleId,
                services,
                setServices,
                toggleService,
                date,
                setDate,
                time,
                setTime,
                customer,
                setCustomer,
                resetBooking
            }}
        >
            {children}
        </BookingContext.Provider>
    )
}

export function useBooking() {
    const context = useContext(BookingContext)
    if (context === undefined) {
        throw new Error("useBooking must be used within a BookingProvider")
    }
    return context
}
