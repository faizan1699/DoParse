'use client'

import { useState } from 'react'

export default function AnimatedTable({ 
  headers, 
  data, 
  className = '',
  hoverRows = true,
  striped = true,
  animateRows = true 
}) {
  const [hoveredRow, setHoveredRow] = useState(null)

  const tableClasses = `
    min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg shadow
    ${className}
  `

  const headerClasses = `
    bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
    transition-all duration-200 ease-out
  `

  const rowClasses = (index, isHovered) => `
    transition-all duration-200 ease-out cursor-pointer
    ${hoverRows && isHovered ? 'bg-gray-50 transform scale-[1.01]' : ''}
    ${striped && index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
    ${hoverRows ? 'hover:bg-gray-100' : ''}
    ${animateRows ? 'animate-fade-in-up' : ''}
  `

  const cellClasses = `
    px-6 py-4 whitespace-nowrap text-sm text-gray-900
    transition-all duration-200 ease-out
  `

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className={tableClasses}>
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th 
                key={index} 
                className={headerClasses}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className={rowClasses(rowIndex, hoveredRow === rowIndex)}
              onMouseEnter={() => setHoveredRow(rowIndex)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                animationDelay: `${(rowIndex + headers.length) * 50}ms`
              }}
            >
              {row.map((cell, cellIndex) => (
                <td 
                  key={cellIndex} 
                  className={cellClasses}
                  style={{
                    animationDelay: `${(rowIndex + headers.length + cellIndex) * 30}ms`
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {data.length === 0 && (
        <div className="text-center py-12 text-gray-500 animate-fade-in-up">
          <div className="text-4xl mb-4">📋</div>
          <p className="text-lg font-medium">No data available</p>
          <p className="text-sm mt-2">Start by adding some items</p>
        </div>
      )}
    </div>
  )
}
