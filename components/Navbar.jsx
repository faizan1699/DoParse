'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`bg-green-600 text-white shadow-lg transition-all duration-300 ${scrolled ? 'bg-green-700 shadow-2xl' : ''
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold cursor-pointer transition-all duration-300 hover:scale-110 hover:text-green-200 flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Todo & URL Tools</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/todos"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${pathname === '/todos' || pathname.startsWith('/todos/')
                  ? 'bg-green-700 text-white shadow-lg'
                  : 'text-green-100 hover:bg-green-500 hover:text-white hover:shadow-lg'
                }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Todos
              </span>
            </Link>
            <Link
              href="/json-formatter"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${pathname === '/json-formatter'
                  ? 'bg-green-700 text-white shadow-lg'
                  : 'text-green-100 hover:bg-green-500 hover:text-white hover:shadow-lg'
                }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                JSON Formatter
              </span>
            </Link>
            <Link
              href="/base64-converter"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${pathname === '/base64-converter'
                  ? 'bg-green-700 text-white shadow-lg'
                  : 'text-green-100 hover:bg-green-500 hover:text-white hover:shadow-lg'
                }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Base64 Converter
              </span>
            </Link>
            <Link
              href="/url-parser"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${pathname === '/url-parser'
                  ? 'bg-green-700 text-white shadow-lg'
                  : 'text-green-100 hover:bg-green-500 hover:text-white hover:shadow-lg'
                }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                URL Parser
              </span>
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${pathname === '/about'
                  ? 'bg-green-700 text-white shadow-lg'
                  : 'text-green-100 hover:bg-green-500 hover:text-white hover:shadow-lg'
                }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1 0h-8m0 0v8m0 0h8m-4 0v4m0 0h8" />
                </svg>
                About
              </span>
            </Link>
            <Link
              href="/text-editor"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${pathname === '/text-editor'
                  ? 'bg-green-700 text-white shadow-lg'
                  : 'text-green-100 hover:bg-green-500 hover:text-white hover:shadow-lg'
                }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5h-5v5z" />
                </svg>
                Text Editor
              </span>
            </Link>
            <Link
              href="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${pathname === '/contact'
                  ? 'bg-green-700 text-white shadow-lg'
                  : 'text-green-100 hover:bg-green-500 hover:text-white hover:shadow-lg'
                }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 001.79.74 2.48l2.52-2.52a2 2 0 002.83-2.83l-1.42 1.42A2 2 0 005.64 16.36l-3.12 3.12a2 2 0 00-1.41-1.41L12 7.83a2 2 0 00-1.42-1.41l-3.12-3.12a2 2 0 00-1.41-1.41L2.05 16.36a2 2 0 001.79.74 2.48L12 18.59l2.52 2.52a2 2 0 002.83 2.83L12 16.17z" />
                </svg>
                Contact
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
