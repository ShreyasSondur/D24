'use client'

import { ThemeProvider } from 'next-themes'
import { BookingProvider } from '../components/context/BookingContext'

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <BookingProvider>
        {children}
      </BookingProvider>
    </ThemeProvider>
  )
}
