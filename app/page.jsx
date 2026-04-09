import Navbar from '../components/Navbar'
import Link from 'next/link'
import AnimatedCard from '../components/AnimatedCard'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen dark:bg-gray-900">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 overflow-x-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              <Link href="/" className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Todo & URL Tools
              </Link>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 animate-slide-in-left" style={{ animationDelay: '200ms' }}>
              Powerful productivity tools to manage your tasks and analyze URLs with ease
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400" style={{ animationDelay: '400ms' }}>
              <span className="flex items-center gap-2 animate-slide-in-right">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No Registration Required
              </span>
              <span className="flex items-center gap-2 animate-slide-in-right" style={{ animationDelay: '600ms' }}>
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                100% Free
              </span>
              <span className="flex items-center gap-2 animate-slide-in-right" style={{ animationDelay: '800ms' }}>
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Privacy First
              </span>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Link href="/todos">
              <AnimatedCard  delay="0" className="group overflow-hidden border border-gray-100">
                <div className="p-8">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                    Todo Manager
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Organize your life with our intuitive todo manager. Create, edit, and track tasks with ease. 
                    Your data stays private with secure localStorage storage.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full animate-pulse">
                      CRUD Operations
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full animate-pulse" style={{ animationDelay: '200ms' }}>
                      Local Storage
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full animate-pulse" style={{ animationDelay: '400ms' }}>
                      Status Tracking
                    </span>
                  </div>
                  <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                    Get Started
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-2"></div>
              </AnimatedCard>
            </Link>

            {/* URL Parser Card */}
            <Link href="/url-parser">
              <AnimatedCard delay="200" className="group overflow-hidden border border-gray-100">
                <div className="p-8">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    URL Parser
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Analyze and break down URLs into their components. Extract protocol, domain, 
                    parameters, and more with our powerful parsing tool.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full animate-pulse">
                      Protocol Analysis
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full animate-pulse" style={{ animationDelay: '200ms' }}>
                      Query Params
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full animate-pulse" style={{ animationDelay: '400ms' }}>
                      Component Breakdown
                    </span>
                  </div>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                    Try It Now
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2"></div>
              </AnimatedCard>
            </Link>

            {/* JSON Formatter Card */}
            <Link href="/json-formatter">
              <AnimatedCard delay="0.2" className="group overflow-hidden border border-gray-100">
                <div className="p-8">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                    JSON Formatter
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Format, validate, and analyze JSON data with advanced developer tools. 
                    Get statistics, minify output, and ensure clean JSON structure.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full animate-pulse">
                      Format & Validate
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full animate-pulse" style={{ animationDelay: '200ms' }}>
                      Statistics
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full animate-pulse" style={{ animationDelay: '400ms' }}>
                      Minify
                    </span>
                  </div>
                  <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors">
                    <span>Format JSON Now</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </AnimatedCard>
            </Link>
            
            {/* Base64 Converter Card */}
            <Link href="/base64-converter">
              <AnimatedCard delay="0.4" className="group overflow-hidden border border-gray-100">
                <div className="p-8">
                  <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                    Base64 Converter
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Encode and decode Base64 strings with advanced developer tools. 
                    Upload files, batch process, and download results instantly.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full animate-pulse">
                      Encode & Decode
                    </span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full animate-pulse" style={{ animationDelay: '200ms' }}>
                      File Upload
                    </span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full animate-pulse" style={{ animationDelay: '400ms' }}>
                      Download
                    </span>
                  </div>
                  <div className="flex items-center text-orange-600 font-semibold group-hover:text-orange-700 transition-colors">
                    <span>Convert Now</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </AnimatedCard>
            </Link>
          </div>

          {/* Features Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              Why Choose Our Tools?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <AnimatedCard delay="800" className="text-center">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy First</h3>
                <p className="text-gray-600">All data stays on your device. No server storage required.</p>
              </AnimatedCard>
              
              <AnimatedCard delay="1000" className="text-center">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 animate-bounce" style={{ animationDelay: '200ms' }}>
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                <p className="text-gray-600">Instant response with no network latency.</p>
              </AnimatedCard>
              
              <AnimatedCard delay="1200" className="text-center">
                <div className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 animate-bounce" style={{ animationDelay: '400ms' }}>
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Always Available</h3>
                <p className="text-gray-600">Works offline and syncs automatically when online.</p>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
