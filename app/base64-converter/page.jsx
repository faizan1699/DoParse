'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'

export default function Base64ConverterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode') // 'encode' or 'decode'
  const [isValid, setIsValid] = useState(true)
  const [error, setError] = useState('')
  const [fileContent, setFileContent] = useState('')
  const [fileName, setFileName] = useState('')

  const convertBase64 = () => {
    try {
      if (!input.trim()) {
        setError('Please enter text to convert')
        setIsValid(false)
        return
      }

      let result
      if (mode === 'encode') {
        result = btoa(unescape(encodeURIComponent(input)))
      } else {
        try {
          result = decodeURIComponent(escape(atob(input)))
        } catch (decodeError) {
          // Try direct decode without encoding/decoding
          result = atob(input)
        }
      }

      setOutput(result)
      setIsValid(true)
      setError('')
    } catch (err) {
      setIsValid(false)
      setError(mode === 'decode' ? 'Invalid Base64 string' : 'Encoding failed')
      setOutput('')
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target.result
        setFileContent(content)
        setInput(content)
        setMode('encode')
      }
      reader.readAsText(file)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setFileContent('')
    setFileName('')
    setIsValid(true)
    setError('')
  }

  const downloadResult = () => {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `base64_${mode === 'encode' ? 'encoded' : 'decoded'}_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const loadSample = () => {
    if (mode === 'encode') {
      setInput('Hello, World! This is a sample text for Base64 encoding.')
    } else {
      setInput('SGVsbG8sIFdvcmxkISBUaGlzIGlzIGEgc2FtcGxlIHRleHQgZm9yIEJhc2U2NCBlbmNvZGluZy4=')
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Base64 Encoder/Decoder</h1>
              <button
                onClick={loadSample}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Load Sample
              </button>
            </div>

            {/* Mode Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setMode('encode')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    mode === 'encode'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Encode
                </button>
                <button
                  onClick={() => setMode('decode')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    mode === 'decode'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  Decode
                </button>
              </div>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or upload a text file:
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".txt,.json,.xml,.csv"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {fileName && (
                  <span className="text-sm text-gray-600">
                    Loaded: {fileName}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {mode === 'encode' ? 'Input Text' : 'Base64 Input'}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={convertBase64}
                      className={`px-3 py-1 text-white text-sm rounded-md transition-colors ${
                        mode === 'encode' 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {mode === 'encode' ? 'Encode' : 'Decode'}
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
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={mode === 'encode' 
                    ? "Enter text to encode to Base64..." 
                    : "Enter Base64 string to decode..."
                  }
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                {!isValid && error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-red-800 font-medium">Error:</span>
                    </div>
                    <p className="text-red-700 mt-1">{error}</p>
                  </div>
                )}

                {/* Input Statistics */}
                {input && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Characters</div>
                        <div className="text-lg font-semibold text-gray-900">{input.length}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Bytes</div>
                        <div className="text-lg font-semibold text-gray-900">{new Blob([input]).size}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Output Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
                  </h2>
                  {output && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(output)}
                        className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                      >
                        Copy
                      </button>
                      <button
                        onClick={downloadResult}
                        className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors"
                      >
                        Download
                      </button>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <textarea
                    value={output}
                    readOnly
                    placeholder={`${mode === 'encode' ? 'Base64' : 'Decoded'} result will appear here...`}
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
                  />
                  {output && (
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        mode === 'encode' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {mode === 'encode' ? 'Encoded' : 'Decoded'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Output Statistics */}
                {output && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Characters</div>
                        <div className="text-lg font-semibold text-gray-900">{output.length}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Bytes</div>
                        <div className="text-lg font-semibold text-gray-900">{new Blob([output]).size}</div>
                      </div>
                    </div>
                    {mode === 'encode' && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <div className="text-sm text-gray-600">Size Increase</div>
                        <div className="text-lg font-semibold text-orange-600">
                          +{Math.round(((output.length - input.length) / input.length) * 100)}%
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Usage Tips */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Usage Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                <div>
                  <strong>Encoding:</strong> Convert plain text to Base64 for safe transmission
                </div>
                <div>
                  <strong>Decoding:</strong> Convert Base64 back to original text
                </div>
                <div>
                  <strong>File Support:</strong> Upload text files for batch processing
                </div>
                <div>
                  <strong>Download:</strong> Save results as text files
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
