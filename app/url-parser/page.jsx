'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'
import ThreeBackground from '../../components/ThreeBackground'

export default function UrlParserPage() {
  const [urlInput, setUrlInput] = useState('')
  const [parsedUrl, setParsedUrl] = useState(null)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('parser')
  const [encodeInput, setEncodeInput] = useState('')
  const [encodedOutput, setEncodedOutput] = useState('')
  const [decodeInput, setDecodeInput] = useState('')
  const [decodedOutput, setDecodedOutput] = useState('')
  const [reconstructUrl, setReconstructUrl] = useState({
    protocol: 'https:',
    hostname: '',
    port: '',
    pathname: '',
    queryParams: '',
    hash: ''
  })

  const validateUrl = (url) => {
    const errors = []
    
    if (!url) {
      errors.push('URL is required')
      return errors
    }

    try {
      const urlObj = new URL(url)
      
      if (!urlObj.protocol) {
        errors.push('Protocol is missing')
      }
      
      if (!urlObj.hostname) {
        errors.push('Hostname is missing')
      }
      
      if (urlObj.port && (isNaN(urlObj.port) || urlObj.port < 1 || urlObj.port > 65535)) {
        errors.push('Port must be between 1 and 65535')
      }
      
      const invalidChars = /[<>{}|\\^`"]/
      if (invalidChars.test(url)) {
        errors.push('URL contains invalid characters')
      }
      
    } catch (err) {
      errors.push(`Invalid URL format: ${err.message}`)
    }
    
    return errors
  }

  const handleParse = (e) => {
    e.preventDefault()
    setError('')
    setParsedUrl(null)

    const validationErrors = validateUrl(urlInput)
    if (validationErrors.length > 0) {
      setError(validationErrors.join('; '))
      return
    }

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
        hash: url.hash || '-',
        search: url.search,
        host: url.host,
        username: url.username || '-',
        password: url.password ? '***' : '-'
      })
    } catch (err) {
      setError(`Invalid URL: ${err.message}`)
    }
  }

  const handleClear = () => {
    setUrlInput('')
    setParsedUrl(null)
    setError('')
  }

  const handleEncode = () => {
    try {
      setEncodedOutput(encodeURIComponent(encodeInput))
    } catch (err) {
      setEncodedOutput(`Encoding error: ${err.message}`)
    }
  }

  const handleDecode = () => {
    try {
      setDecodedOutput(decodeURIComponent(decodeInput))
    } catch (err) {
      setDecodedOutput(`Decoding error: ${err.message}`)
    }
  }

  const handleReconstruct = () => {
    try {
      let url = reconstructUrl.protocol || 'https:'
      url += '//'
      
      if (reconstructUrl.hostname) {
        url += reconstructUrl.hostname
      }
      
      if (reconstructUrl.port) {
        url += ':' + reconstructUrl.port
      }
      
      if (reconstructUrl.pathname) {
        url += reconstructUrl.pathname.startsWith('/') ? reconstructUrl.pathname : '/' + reconstructUrl.pathname
      }
      
      if (reconstructUrl.queryParams) {
        url += reconstructUrl.queryParams.startsWith('?') ? reconstructUrl.queryParams : '?' + reconstructUrl.queryParams
      }
      
      if (reconstructUrl.hash) {
        url += reconstructUrl.hash.startsWith('#') ? reconstructUrl.hash : '#' + reconstructUrl.hash
      }
      
      setUrlInput(url)
      setActiveTab('parser')
      setTimeout(() => handleParse({ preventDefault: () => {} }), 100)
    } catch (err) {
      setError(`Reconstruction error: ${err.message}`)
    }
  }

  const exportData = () => {
    if (!parsedUrl) return
    
    const dataStr = JSON.stringify(parsedUrl, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'parsed-url.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!')
    }).catch(err => {
      console.error('Failed to copy:', err)
    })
  }

  return (
    <>
      <Navbar />
      <ThreeBackground />
      <main className="min-h-screen bg-gray-50 relative z-10">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">URL Parser Pro</h1>
            <p className="text-gray-600">Advanced URL parsing and manipulation tools for developers</p>
          </div>

          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('parser')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'parser'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  URL Parser
                </button>
                <button
                  onClick={() => setActiveTab('encode')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'encode'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Encode/Decode
                </button>
                <button
                  onClick={() => setActiveTab('reconstruct')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'reconstruct'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Reconstruct URL
                </button>
              </nav>
            </div>
          </div>

          {activeTab === 'parser' && (
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
          )}

          {activeTab === 'parser' && parsedUrl && (
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Parsed URL Components</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(parsedUrl.full)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Copy URL
                  </button>
                  <button
                    onClick={exportData}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
                  >
                    Export JSON
                  </button>
                </div>
              </div>
              
              <div className="space-y-6 overflow-x-auto">
                <div className="flex flex-wrap gap-4">
                  {Object.entries({
                    'Full URL': parsedUrl.full,
                    'Protocol': parsedUrl.protocol,
                    'Origin': parsedUrl.origin,
                    'Hostname': parsedUrl.hostname,
                    'Host': parsedUrl.host,
                    'Port': parsedUrl.port,
                    'Pathname': parsedUrl.pathname || '/',
                    'Search': parsedUrl.search || '-',
                    'Hash': parsedUrl.hash,
                    'Username': parsedUrl.username,
                    'Password': parsedUrl.password
                  }).map(([label, value]) => (
                    <div key={label} className="bg-gray-50 p-4 rounded-lg flex-[1_1_280px] min-w-[280px]">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">{label}</h3>
                      <p className="text-sm text-gray-900 break-all">{value}</p>
                    </div>
                  ))}
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
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
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
                                <td className="px-3 py-2 text-sm">
                                  <button
                                    onClick={() => copyToClipboard(value)}
                                    className="text-blue-600 hover:text-blue-800 text-xs"
                                  >
                                    Copy
                                  </button>
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

          {activeTab === 'encode' && (
            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">URL Encode</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="encode-input" className="block text-sm font-medium text-gray-700 mb-2">
                      Enter text to encode
                    </label>
                    <textarea
                      id="encode-input"
                      value={encodeInput}
                      onChange={(e) => setEncodeInput(e.target.value)}
                      placeholder="Enter text to URL encode..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                      rows="4"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleEncode}
                      className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Encode
                    </button>
                    <button
                      onClick={() => {
                        setEncodeInput('')
                        setEncodedOutput('')
                      }}
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  {encodedOutput && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Encoded Output
                      </label>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-900 break-all">{encodedOutput}</p>
                        <button
                          onClick={() => copyToClipboard(encodedOutput)}
                          className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Copy to clipboard
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">URL Decode</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="decode-input" className="block text-sm font-medium text-gray-700 mb-2">
                      Enter text to decode
                    </label>
                    <textarea
                      id="decode-input"
                      value={decodeInput}
                      onChange={(e) => setDecodeInput(e.target.value)}
                      placeholder="Enter URL encoded text to decode..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                      rows="4"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleDecode}
                      className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Decode
                    </button>
                    <button
                      onClick={() => {
                        setDecodeInput('')
                        setDecodedOutput('')
                      }}
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  {decodedOutput && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Decoded Output
                      </label>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-900 break-all">{decodedOutput}</p>
                        <button
                          onClick={() => copyToClipboard(decodedOutput)}
                          className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Copy to clipboard
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reconstruct' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Reconstruct URL</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="protocol" className="block text-sm font-medium text-gray-700 mb-2">
                      Protocol
                    </label>
                    <select
                      id="protocol"
                      value={reconstructUrl.protocol}
                      onChange={(e) => setReconstructUrl({...reconstructUrl, protocol: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                    >
                      <option value="https:">https://</option>
                      <option value="http:">http://</option>
                      <option value="ftp:">ftp://</option>
                      <option value="ws:">ws://</option>
                      <option value="wss:">wss://</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="hostname" className="block text-sm font-medium text-gray-700 mb-2">
                      Hostname
                    </label>
                    <input
                      type="text"
                      id="hostname"
                      value={reconstructUrl.hostname}
                      onChange={(e) => setReconstructUrl({...reconstructUrl, hostname: e.target.value})}
                      placeholder="example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="port" className="block text-sm font-medium text-gray-700 mb-2">
                      Port (optional)
                    </label>
                    <input
                      type="text"
                      id="port"
                      value={reconstructUrl.port}
                      onChange={(e) => setReconstructUrl({...reconstructUrl, port: e.target.value})}
                      placeholder="8080"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="pathname" className="block text-sm font-medium text-gray-700 mb-2">
                      Pathname (optional)
                    </label>
                    <input
                      type="text"
                      id="pathname"
                      value={reconstructUrl.pathname}
                      onChange={(e) => setReconstructUrl({...reconstructUrl, pathname: e.target.value})}
                      placeholder="/path/to/resource"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="queryParams" className="block text-sm font-medium text-gray-700 mb-2">
                      Query Parameters (optional)
                    </label>
                    <input
                      type="text"
                      id="queryParams"
                      value={reconstructUrl.queryParams}
                      onChange={(e) => setReconstructUrl({...reconstructUrl, queryParams: e.target.value})}
                      placeholder="param1=value1&param2=value2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="hash" className="block text-sm font-medium text-gray-700 mb-2">
                      Hash/Fragment (optional)
                    </label>
                    <input
                      type="text"
                      id="hash"
                      value={reconstructUrl.hash}
                      onChange={(e) => setReconstructUrl({...reconstructUrl, hash: e.target.value})}
                      placeholder="section1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={handleReconstruct}
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Build URL & Parse
                  </button>
                  <button
                    onClick={() => setReconstructUrl({
                      protocol: 'https:',
                      hostname: '',
                      port: '',
                      pathname: '',
                      queryParams: '',
                      hash: ''
                    })}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Clear Form
                  </button>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Preview:</h3>
                  <p className="text-sm text-blue-900 break-all font-mono">
                    {reconstructUrl.protocol}//{reconstructUrl.hostname}
                    {reconstructUrl.port && ':' + reconstructUrl.port}
                    {reconstructUrl.pathname || '/'}
                    {reconstructUrl.queryParams && '?' + reconstructUrl.queryParams}
                    {reconstructUrl.hash && '#' + reconstructUrl.hash}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
