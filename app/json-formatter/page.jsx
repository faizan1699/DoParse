'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'

export default function JsonFormatterPage() {
  const [jsonInput, setJsonInput] = useState('')
  const [formattedJson, setFormattedJson] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [error, setError] = useState('')
  const [minifiedJson, setMinifiedJson] = useState('')
  const [jsonStats, setJsonStats] = useState(null)

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      const formatted = JSON.stringify(parsed, null, 2)
      const minified = JSON.stringify(parsed)
      
      setFormattedJson(formatted)
      setMinifiedJson(minified)
      setIsValid(true)
      setError('')
      
      // Calculate JSON statistics
      const stats = calculateJsonStats(parsed)
      setJsonStats(stats)
    } catch (err) {
      setIsValid(false)
      setError(err.message)
      setFormattedJson('')
      setMinifiedJson('')
      setJsonStats(null)
    }
  }

  const calculateJsonStats = (obj) => {
    const countKeys = (obj) => {
      let count = 0
      if (Array.isArray(obj)) {
        obj.forEach(item => {
          count += countKeys(item)
        })
      } else if (obj && typeof obj === 'object') {
        Object.keys(obj).forEach(key => {
          count++
          count += countKeys(obj[key])
        })
      }
      return count
    }

    const countArrays = (obj) => {
      let count = 0
      if (Array.isArray(obj)) {
        count++
        obj.forEach(item => {
          count += countArrays(item)
        })
      } else if (obj && typeof obj === 'object') {
        Object.values(obj).forEach(value => {
          count += countArrays(value)
        })
      }
      return count
    }

    const maxDepth = (obj, depth = 0) => {
      if (Array.isArray(obj)) {
        return Math.max(...obj.map(item => maxDepth(item, depth + 1)))
      } else if (obj && typeof obj === 'object') {
        return Math.max(...Object.values(obj).map(value => maxDepth(value, depth + 1)))
      }
      return depth
    }

    return {
      keys: countKeys(obj),
      arrays: countArrays(obj),
      depth: maxDepth(obj),
      size: JSON.stringify(obj).length
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      const minified = JSON.stringify(parsed)
      setMinifiedJson(minified)
      setIsValid(true)
      setError('')
    } catch (err) {
      setIsValid(false)
      setError(err.message)
      setMinifiedJson('')
    }
  }

  const clearAll = () => {
    setJsonInput('')
    setFormattedJson('')
    setMinifiedJson('')
    setIsValid(true)
    setError('')
    setJsonStats(null)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const loadSampleJson = () => {
    const sample = {
      "user": {
        "id": 12345,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "roles": ["developer", "admin"],
        "permissions": {
          "read": true,
          "write": true,
          "delete": false
        },
        "profile": {
          "age": 30,
          "location": {
            "city": "San Francisco",
            "country": "USA"
          },
          "skills": ["JavaScript", "React", "Node.js", "Python"]
        }
      },
      "metadata": {
        "created": "2024-01-15T10:30:00Z",
        "updated": "2024-01-20T14:22:00Z",
        "version": "1.2.0"
      }
    }
    
    setJsonInput(JSON.stringify(sample))
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">JSON Formatter & Validator</h1>
              <button
                onClick={loadSampleJson}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Load Sample JSON
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">Input JSON</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={formatJson}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                    >
                      Format
                    </button>
                    <button
                      onClick={minifyJson}
                      className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Minify
                    </button>
                    <button
                      onClick={clearAll}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                
                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="Paste your JSON here..."
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                {!isValid && error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-red-800 font-medium">JSON Error:</span>
                    </div>
                    <p className="text-red-700 mt-1">{error}</p>
                  </div>
                )}
              </div>

              {/* Output Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">Formatted Output</h2>
                  {formattedJson && (
                    <button
                      onClick={() => copyToClipboard(formattedJson)}
                      className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Copy
                    </button>
                  )}
                </div>

                <div className="relative">
                  <textarea
                    value={formattedJson}
                    readOnly
                    placeholder="Formatted JSON will appear here..."
                    className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
                  />
                  {formattedJson && (
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                        Valid JSON
                      </span>
                    </div>
                  )}
                </div>

                {/* JSON Statistics */}
                {jsonStats && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{jsonStats.keys}</div>
                      <div className="text-sm text-blue-800">Total Keys</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{jsonStats.arrays}</div>
                      <div className="text-sm text-purple-800">Arrays</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{jsonStats.depth}</div>
                      <div className="text-sm text-green-800">Max Depth</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{jsonStats.size}</div>
                      <div className="text-sm text-orange-800">Size (bytes)</div>
                    </div>
                  </div>
                )}

                {/* Minified Output */}
                {minifiedJson && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">Minified Output</h3>
                      <button
                        onClick={() => copyToClipboard(minifiedJson)}
                        className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <textarea
                      value={minifiedJson}
                      readOnly
                      className="w-full h-32 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
