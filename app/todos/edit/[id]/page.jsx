'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../../../../components/Navbar'
import AuthGuard from '../../../../components/AuthGuard'
import TextEditor from '../../../../components/TextEditor'
import { todoStorage } from '../../../../utils/todoStorage'

export default function EditTodoPage({ params }) {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function fetchTodo() {
      setLoading(true)
      const todo = await todoStorage.getTodo(parseInt(params.id))
      if (todo) {
        setFormData({
          title: todo.title,
          description: todo.description || ''
        })
      } else {
        setNotFound(true)
      }
      setLoading(false)
    }
    fetchTodo()
  }, [params.id])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters'
    }
    if (formData.description && formData.description.trim().length < 5) {
      newErrors.description = 'Description must be at least 5 characters if provided'
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSaving(true)
    try {
      await todoStorage.updateTodo(parseInt(params.id), {
        title: formData.title.trim(),
        description: formData.description.trim()
      })
      router.push('/todos')
    } catch (error) {
      console.error('Failed to update todo:', error)
      alert('Failed to update todo. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  if (loading) {
    return (
      <AuthGuard>
        <Navbar />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </main>
      </AuthGuard>
    )
  }

  if (notFound) {
    return (
      <AuthGuard>
        <Navbar />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Todo Not Found</h2>
            <p className="text-gray-600 mb-6">The todo you're trying to edit doesn't exist.</p>
            <button
              onClick={() => router.push('/todos')}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Back to Todos
            </button>
          </div>
        </main>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Todo</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  disabled={isSaving}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter todo title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <TextEditor
                  value={formData.description}
                  onChange={(content) => handleChange({ target: { name: 'description', value: content } })}
                  placeholder="Add a detailed description..."
                  className="min-h-[120px]"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isSaving ? 'Updating...' : 'Update Todo'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/todos')}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </AuthGuard>
  )
}
