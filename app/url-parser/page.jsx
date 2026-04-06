'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'

export default function UrlParserPage() {
  const [urlInput, setUrlInput] = useState('')
  const [parsedUrl, setParsedUrl] = useState(null)
  const [error, setError] = useState('')

  const handleParse = (e) => {
    e.preventDefault()
    setError('')
    setParsedUrl(null)

    try {
      const url = new URL(urlInput)
      
      const queryParams = {}
      url.searchParams.forEach((value, key) => {
        queryParams[key] = value
      })

      setParsedUrl({
        full: url.href,
        protocol: url.protocol,
        origin: url.origin,
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? '443' : url.protocol === 'http:' ? '80' : ''),
        pathname: url.pathname,
        queryParams: queryParams,
        hash: url.hash || '-'
      })
    } catch (err) {
      setError('Invalid URL. Please enter a valid URL including protocol (http:// or https://)')
    }
  }

  const handleClear = () => {
    setUrlInput('')
    setParsedUrl(null)
    setError('')
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">URL Parser</h1>
            <p className="text-gray-600">Parse and analyze URLs with detailed component breakdown</p>
          </div>

          <div className="bg-white shadow rounded-lg p-6 mb-8 overflow-x-auto">
            <form onSubmit={handleParse} className="space-y-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter URL
                </label>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <input
                    type="text"
                    id="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/path?query=value&param2=value2#section"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                  />
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Parse
                    </button>
                    <button
                      type="button"
                      onClick={handleClear}
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}
          </div>

          {parsedUrl && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Parsed URL Components</h2>
              
              <div className="space-y-6 overflow-x-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-max">
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Protocol</h3>
                    <p className="text-sm text-gray-900">{parsedUrl.protocol}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Origin</h3>
                    <p className="text-sm text-gray-900">{parsedUrl.origin}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Hostname</h3>
                    <p className="text-sm text-gray-900">{parsedUrl.hostname}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Port</h3>
                    <p className="text-sm text-gray-900">{parsedUrl.port}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Pathname</h3>
                    <p className="text-sm text-gray-900">{parsedUrl.pathname || '/'}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Hash</h3>
                    <p className="text-sm text-gray-900">{parsedUrl.hash}</p>
                  </div>
                </div>

                {Object.keys(parsedUrl.queryParams).length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Query Parameters</h3>
                    <div className="bg-gray-50 rounded-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Parameter
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Value
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {Object.entries(parsedUrl.queryParams).map(([key, value]) => (
                              <tr key={key} className="hover:bg-gray-100">
                                <td className="px-3 py-2 text-sm font-medium text-gray-900">
                                  {key}
                                </td>
                                <td className="px-3 py-2 text-sm text-gray-600 break-all">
                                  {value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {Object.keys(parsedUrl.queryParams).length === 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Query Parameters</h3>
                    <p className="text-sm text-gray-900">No query parameters found</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
