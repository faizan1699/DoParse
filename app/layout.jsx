'use client'

import './globals.css'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { useState, useEffect } from 'react'

export const metadata = {
  title: 'Todo & URL Tools - Developer Tools Suite',
  description: 'Comprehensive suite of developer tools including Todo Manager, JSON Formatter, Base64 Converter, Color Palette Generator, URL Parser, Text Editor and more. Boost your productivity with our powerful web tools.',
  keywords: [
    'todo manager',
    'json formatter',
    'base64 converter',
    'color palette generator',
    'url parser',
    'text editor',
    'developer tools',
    'web tools',
    'productivity tools',
    'next.js',
    'react',
    'task management',
    'json validation',
    'encoding decoding',
    'color schemes',
    'url analysis'
  ],
  authors: [{ name: 'Developer Tools Team' }],
  creator: 'Developer Tools Team',
  publisher: 'Todo & URL Tools',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://todo-url-tools.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'en': '/en',
    },
  },
  openGraph: {
    title: 'Todo & URL Tools - Developer Tools Suite',
    description: 'Comprehensive suite of developer tools including Todo Manager, JSON Formatter, Base64 Converter, Color Palette Generator, URL Parser, Text Editor and more.',
    url: 'https://todo-url-tools.vercel.app',
    siteName: 'Todo & URL Tools',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Todo & URL Tools - Developer Tools Suite',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Todo & URL Tools - Developer Tools Suite',
    description: 'Comprehensive suite of developer tools including Todo Manager, JSON Formatter, Base64 Converter, Color Palette Generator, URL Parser, Text Editor and more.',
    images: ['/og-image.jpg'],
    creator: '@devtools',
    site: '@todo_url_tools',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-site-verification-code',
  },
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
