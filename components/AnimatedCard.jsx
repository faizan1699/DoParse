'use client'

import { useState } from 'react'

export default function AnimatedCard({ children, className = '', hover = true, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false)

  const cardClasses = `
    transform transition-all duration-300 ease-out
    ${hover ? 'hover:scale-105 hover:shadow-2xl' : ''}
    ${isHovered ? 'shadow-2xl' : 'shadow-lg'}
    bg-white dark:bg-gray-800 navy:bg-navy-900
    ${className}
  `

  return (
    <div
      className={cardClasses}
      style={{ 
        transitionDelay: `${delay}ms`,
        animation: `fadeInUp 0.6s ease-out ${delay}ms both`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  )
}

// Add custom animation styles
if (typeof window !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0,0,0);
      }
      40%, 43% {
        transform: translate3d(0,-30px,0);
      }
      70% {
        transform: translate3d(0,-15px,0);
      }
      90% {
        transform: translate3d(0,-4px,0);
      }
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
    
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    
    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out both;
    }
    
    .animate-slide-in-left {
      animation: slideInLeft 0.6s ease-out both;
    }
    
    .animate-slide-in-right {
      animation: slideInRight 0.6s ease-out both;
    }
    
    .animate-bounce {
      animation: bounce 1s infinite;
    }
    
    .animate-pulse {
      animation: pulse 2s infinite;
    }
    
    .animate-rotate {
      animation: rotate 2s linear infinite;
    }
  `
  document.head.appendChild(style)
}
