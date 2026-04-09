'use client'

import { useState } from 'react'
import AnimatedCard from '../../components/AnimatedCard'

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is a **markdown** editor.')
  
  const getHtmlPreview = () => {
    return markdown
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\n/gim, '<br />')
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">Markdown Editor</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedCard>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Markdown Input</h2>
                <textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  className="w-full h-96 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-sm"
                  placeholder="Write your markdown here..."
                />
              </div>
            </AnimatedCard>

            <AnimatedCard>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">HTML Preview</h2>
                <div 
                  className="w-full h-96 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 overflow-auto"
                  dangerouslySetInnerHTML={{ __html: getHtmlPreview() }}
                />
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </>
  )
}
