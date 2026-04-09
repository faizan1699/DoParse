'use client'

import './globals.css'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { useState, useEffect } from 'react'

export const metadata = {
  title: 'Todo App & URL Parser',
  description: 'A Next.js app with Todo management and URL parsing tools',
}

export default function RootLayout({ children }) {
  const [sidebarWidth, setSidebarWidth] = useState(256) // Default width in pixels (w-64)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Sidebar onWidthChange={setSidebarWidth} />
        <div 
          className={`transition-all duration-300 ${isMobile ? 'ml-0' : ''}`}
          style={{ marginLeft: isMobile ? '0' : `${sidebarWidth}px` }}
        >
          {children}
        </div>
      <Footer />
      </body>
    </html>
  )
}
