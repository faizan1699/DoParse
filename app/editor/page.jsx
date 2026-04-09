'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import TextEditor from '../../components/TextEditor'

export default function EditorPage() {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('Untitled Document')
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const handleSave = () => {
    setIsSaving(true)
    
    // Simulate saving to localStorage
    setTimeout(() => {
      const documents = JSON.parse(localStorage.getItem('textEditorDocuments') || '[]')
      const newDoc = {
        id: Date.now(),
        title: title,
        content: content,
        createdAt: new Date().toISOString()
      }
      documents.push(newDoc)
      localStorage.setItem('textEditorDocuments', JSON.stringify(documents))
      setIsSaving(false)
      alert('Document saved successfully!')
    }, 1000)
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (newContent) => {
    setContent(newContent)
  }

  const handleNewDocument = () => {
    setContent('')
    setTitle('Untitled Document')
  }

  const handleExport = () => {
    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  className="text-2xl font-bold text-gray-900 bg-transparent border-none outline-none focus:outline-none flex-1"
                  placeholder="Enter document title..."
                />
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleNewDocument}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    New
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4h4l2 2h6l2-2H6a2 2 0 00-2-2V6a2 2 0 002-2h4l2 2h6a2 2 0 002-2z" />
                        </svg>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-4l2 2h6a2 2 0 002-2z" />
                        </svg>
                        <span>Save</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleExport}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Editor */}
            <div className="p-6">
              <TextEditor
                value={content}
                onChange={handleContentChange}
                placeholder="Start writing your document here..."
                className="min-h-[500px]"
              />
            </div>

            {/* Status Bar */}
            <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{content.length} characters</span>
                <span>{new Date().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
