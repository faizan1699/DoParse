'use client'

import { useState, useEffect } from 'react'
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
  theme = 'snow'
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Import CSS only on client side
    import('react-quill/dist/quill.snow.css')
  }, [])

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
    <div className={`text-editor-container ${className}`}>
      <ReactQuill
        theme={theme}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        className="bg-white rounded-lg shadow-lg"
      />
    </div>
  )
}
