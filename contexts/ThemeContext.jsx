'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('navy')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'navy'
    setTheme(savedTheme)
    document.documentElement.classList.remove('light', 'dark', 'navy')
    document.documentElement.classList.add(savedTheme)
  }, [])

  const toggleTheme = () => {
    const themes = ['light', 'dark', 'navy']
    const currentIndex = themes.indexOf(theme)
    const newTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.remove('light', 'dark', 'navy')
    document.documentElement.classList.add(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
