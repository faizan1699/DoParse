'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Todo & URL Tools</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/todos"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/todos' || pathname.startsWith('/todos/')
                  ? 'bg-green-700 text-white'
                  : 'text-green-100 hover:bg-green-500 hover:text-white'
              }`}
            >
              Todos
            </Link>
            <Link
              href="/url-parser"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/url-parser'
                  ? 'bg-green-700 text-white'
                  : 'text-green-100 hover:bg-green-500 hover:text-white'
              }`}
            >
              URL Parser
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
