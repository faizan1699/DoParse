'use client'

import { useState } from 'react'

export default function AnimatedButton({ 
  children, 
  className = '', 
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  ...props 
}) {
  const [isClicked, setIsClicked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const baseClasses = 'relative overflow-hidden transition-all duration-300 ease-out font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variantClasses = {
    primary: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    secondary: 'bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white focus:ring-green-500'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${isClicked ? 'scale-95' : 'scale-100'}
    ${isHovered ? 'shadow-lg' : 'shadow'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `

  const handleClick = (e) => {
    if (disabled) return
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 150)
    if (onClick) onClick(e)
  }

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Ripple effect overlay */}
      <span 
        className={`absolute inset-0 bg-white opacity-0 transition-opacity duration-300 ${
          isClicked ? 'opacity-20' : ''
        }`}
      />
      
      {/* Shimmer effect */}
      <span 
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-500 ${
          isHovered ? 'opacity-10' : ''
        }`}
        style={{
          backgroundSize: '200% 100%',
          backgroundPosition: isHovered ? '200% 0' : '0% 0'
        }}
      />
    </button>
  )
}
