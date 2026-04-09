'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'
import TextEditor from '../../components/TextEditor'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showEditor, setShowEditor] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      setIsSubmitting(false)
    }, 2000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const toggleEditor = () => {
    setShowEditor(!showEditor)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message *
                  </label>
                  <button
                    type="button"
                    onClick={toggleEditor}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5h-5v5z" />
                    </svg>
                    {showEditor ? 'Simple Text' : 'Rich Text'}
                  </button>
                </div>
                
                {showEditor ? (
                  <TextEditor
                    value={formData.message}
                    onChange={(content) => handleChange({ target: { name: 'message', value: content } })}
                    placeholder="Tell us more about your project or inquiry..."
                    className="min-h-[150px]"
                  />
                ) : (
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Tell us more about your project or inquiry..."
                    required
                  />
                )}
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4h4l2 2h6l2-2H6a2 2 0 00-2-2V6a2 2 0 002-2h4l2 2h6a2 2 0 002-2z" />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 001.79.74 2.48l2.52-2.52a2 2 0 002.83-2.83l-1.42 1.42A2 2 0 005.64 16.36l-3.12 3.12a2 2 0 00-1.41-1.41L12 7.83a2 2 0 00-1.42-1.41l-3.12-3.12a2 2 0 00-1.41-1.41L2.05 16.36a2 2 0 001.79.74 2.48L12 18.59l2.52 2.52a2 2 0 002.83 2.83L12 16.17z" />
                      </svg>
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
