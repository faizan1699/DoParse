'use client'

import { useState, useEffect, Fragment } from 'react'
import dynamic from 'next/dynamic'
import './TextEditor.css'

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-48 rounded-lg"></div>
})

export default function TextEditor({ 
  value, 
  onChange, 
  placeholder = 'Start typing...',
  className = '',
  theme = 'snow',
  showRecords = false
}) {
  const [mounted, setMounted] = useState(false)
  const [savedRecords, setSavedRecords] = useState([])
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    setMounted(true)
    // Import CSS only on client side
    import('react-quill/dist/quill.snow.css')
    
    if (showRecords) {
      const records = JSON.parse(localStorage.getItem('textEditorDocuments') || '[]')
      setSavedRecords(records) 
    }
  }, [showRecords])

  const handleDeleteRecord = (id) => {
    if (confirm('Are you sure you want to delete this document?')) {
      const updatedRecords = savedRecords.filter(record => record.id !== id)
      setSavedRecords(updatedRecords)
      localStorage.setItem('textEditorDocuments', JSON.stringify(updatedRecords))
    }
  }

  const handleUpdateRecord = (id) => {
    const record = savedRecords.find(r => r.id === id)
    if (record) {
      const updatedRecords = savedRecords.map(r => 
        r.id === id ? { ...r, content: value, updatedAt: new Date().toISOString() } : r
      )
      setSavedRecords(updatedRecords)
      localStorage.setItem('textEditorDocuments', JSON.stringify(updatedRecords))
      setEditingId(null)
    }
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
    clipboard: true
  }

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'script', 'indent',
    'list', 'bullet', 'ordered',
    'link', 'image', 'video'
  ]

  if (!mounted) {
    return (
      <div className={`text-editor-container ${className}`}>
        <div className="animate-pulse bg-gray-200 h-48 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Loading editor...</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`text-editor-wrapper ${className}`}>
      <div className="text-editor-container">
        <ReactQuill
          theme={theme}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          modules={modules}
          formats={formats}
          className="react-quill bg-white rounded-lg shadow-lg text-black flex-1"
        />
      </div>
      
      {showRecords && savedRecords.length > 0 && (
        <div className="saved-records mt-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Recent Documents</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {savedRecords.map((record) => (
              <div 
                key={record.id} 
                className={`p-3 rounded-lg border transition-colors ${
                  editingId === record.id 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => {
                      if (editingId !== record.id) {
                        const textContent = record.content.replace(/<[^>]*>/g, '')
                        onChange(textContent)
                      }
                    }}
                  >
                    <div className="font-medium text-gray-900">{record.title}</div>
                    <div 
                      className="text-sm text-gray-600 truncate line-clamp-2"
                      dangerouslySetInnerHTML={{ 
                        __html: record.content.length > 100 
                          ? record.content.substring(0, 100) + '...' 
                          : record.content 
                      }}
                    />
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(record.createdAt).toLocaleDateString()}
                      {record.updatedAt && ` (Updated: ${new Date(record.updatedAt).toLocaleDateString()})`}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 ml-2">
                    {editingId === record.id ? (
                      <Fragment>
                        <button
                          onClick={() => handleUpdateRecord(record.id)}
                          className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </Fragment>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditingId(record.id)}
                          className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteRecord(record.id)}
                          className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
