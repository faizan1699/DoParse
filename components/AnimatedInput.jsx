'use client'

import { useState, forwardRef } from 'react'

export default forwardRef(function AnimatedInput(
  { 
    label, 
    error, 
    className = '', 
    containerClassName = '',
    type = 'text',
    placeholder,
    value,
    onChange,
    onFocus,
    onBlur,
    disabled = false,
    ...props 
  }, 
  ref
) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  const handleFocus = (e) => {
    setIsFocused(true)
    if (onFocus) onFocus(e)
  }

  const handleBlur = (e) => {
    setIsFocused(false)
    if (onBlur) onBlur(e)
  }

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0)
    if (onChange) onChange(e)
  }

  const inputClasses = `
    w-full px-3 py-2 border rounded-md shadow-sm transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:border-transparent
    ${isFocused ? 'ring-2 ring-green-500 border-green-500' : ''}
    ${error ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-300'}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
    ${className}
  `

  const labelClasses = `
    block text-sm font-medium mb-2 transition-all duration-200 ease-out
    ${isFocused ? 'text-green-600' : ''}
    ${error ? 'text-red-600' : 'text-gray-700'}
  `

  const containerClasses = `
    relative transition-all duration-200 ease-out
    ${containerClassName}
  `

  return (
    <div className={containerClasses}>
      {label && (
        <label className={labelClasses}>
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />
        
        {/* Focus indicator */}
        <div 
          className={`
            absolute bottom-0 left-0 h-0.5 bg-green-500 transition-all duration-200 ease-out
            ${isFocused ? 'w-full' : 'w-0'}
          `}
        />
        
        {/* Error indicator */}
        {error && (
          <div className="absolute bottom-0 left-0 h-0.5 bg-red-500 w-full animate-pulse" />
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 animate-fade-in-up">
          {error}
        </p>
      )}
    </div>
  )
})
