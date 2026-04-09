'use client'

import { useState } from 'react'
import AnimatedCard from '../../components/AnimatedCard'

export default function QRGenerator() {
  const [text, setText] = useState('')
  const [qrCode, setQrCode] = useState('')

  const generateQR = () => {
    if (!text) return
    
    // Simple QR code placeholder (in real app, you'd use a QR library)
    setQrCode(`QR Code for: ${text}`)
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">QR Code Generator</h1>
          
          <AnimatedCard className="mb-8">
            <div className="p-8">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter Text or URL
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  rows={4}
                  placeholder="Enter text or URL to generate QR code..."
                />
              </div>

              <button
                onClick={generateQR}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mb-6"
              >
                Generate QR Code
              </button>

              {qrCode && (
                <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="w-64 h-64 mx-auto bg-white dark:bg-gray-700 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600">
                    <span className="text-gray-500 dark:text-gray-400">QR Code Placeholder</span>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{qrCode}</p>
                </div>
              )}
            </div>
          </AnimatedCard>
        </div>
      </div>
    </>
  )
}
