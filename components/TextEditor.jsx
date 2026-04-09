'use client'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function TextEditor({ 
  value, 
  onChange, 
  placeholder = 'Start typing...',
  className = '',
  theme = 'snow'
}) {
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
      
      <style jsx>{`
        .text-editor-container {
          min-height: 200px;
        max-height: 400px;
        border: 2px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .text-editor-container .ql-toolbar {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          padding: 8px;
        }
        
        .text-editor-container .ql-container {
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }
        
        .text-editor-container .ql-editor {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          line-height: 1.5;
        }
        
        .text-editor-container .ql-editor:focus {
          outline: none;
          border-color: #4ade80;
          box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.2);
        }
        
        .text-editor-container .ql-tooltip {
          background: #1f2937;
          color: white;
          border-radius: 6px;
          font-size: 12px;
          padding: 4px 8px;
        }
      `}</style>
    </div>
  )
}
