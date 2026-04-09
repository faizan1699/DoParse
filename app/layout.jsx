'use client'

import './globals.css'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { ThemeProvider } from '../contexts/ThemeContext'

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
    <>
      <Head>
        <title>Todo & URL Tools - Developer Tools Suite</title>
        <meta name="description" content="Comprehensive suite of developer tools including Todo Manager, JSON Formatter, Base64 Converter, Color Palette Generator, URL Parser, Text Editor and more." />
        <meta name="keywords" content="todo manager, json formatter, base64 converter, color palette generator, url parser, text editor, developer tools, web tools, productivity tools" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <html lang="en">
        <body className="bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <ThemeProvider>
            <Sidebar onWidthChange={setSidebarWidth} />
            <div 
              className={`transition-all duration-300 ${isMobile ? 'ml-0' : ''}`}
              style={{ marginLeft: isMobile ? '0' : `${sidebarWidth}px` }}
            >
              {children}
            </div>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
