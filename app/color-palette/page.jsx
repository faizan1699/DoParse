'use client'

import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function ColorPalettePage() {
  const [baseColor, setBaseColor] = useState('#3B82F6')
  const [paletteType, setPaletteType] = useState('complementary')
  const [palette, setPalette] = useState([])
  const [copiedColor, setCopiedColor] = useState('')

  const generatePalette = () => {
    const colors = []
    const hex = baseColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)

    switch (paletteType) {
      case 'complementary':
        colors.push(baseColor)
        colors.push(rgbToHex(255 - r, 255 - g, 255 - b))
        colors.push(rgbToHex(r, g, b))
        colors.push(adjustBrightness(baseColor, 20))
        colors.push(adjustBrightness(baseColor, -20))
        break

      case 'analogous':
        colors.push(baseColor)
        colors.push(hslToHex((rgbToHsl(r, g, b).h + 30) % 360, 70, 50))
        colors.push(hslToHex((rgbToHsl(r, g, b).h + 60) % 360, 70, 50))
        colors.push(hslToHex((rgbToHsl(r, g, b).h - 30 + 360) % 360, 70, 50))
        colors.push(hslToHex((rgbToHsl(r, g, b).h - 60 + 360) % 360, 70, 50))
        break

      case 'triadic':
        colors.push(baseColor)
        colors.push(hslToHex((rgbToHsl(r, g, b).h + 120) % 360, 70, 50))
        colors.push(hslToHex((rgbToHsl(r, g, b).h + 240) % 360, 70, 50))
        colors.push(adjustBrightness(baseColor, 15))
        colors.push(adjustBrightness(baseColor, -15))
        break

      case 'monochromatic':
        colors.push(adjustBrightness(baseColor, 40))
        colors.push(adjustBrightness(baseColor, 20))
        colors.push(baseColor)
        colors.push(adjustBrightness(baseColor, -20))
        colors.push(adjustBrightness(baseColor, -40))
        break

      case 'tetradic':
        colors.push(baseColor)
        colors.push(hslToHex((rgbToHsl(r, g, b).h + 90) % 360, 70, 50))
        colors.push(hslToHex((rgbToHsl(r, g, b).h + 180) % 360, 70, 50))
        colors.push(hslToHex((rgbToHsl(r, g, b).h + 270) % 360, 70, 50))
        colors.push(adjustBrightness(baseColor, 10))
        break

      default:
        colors.push(baseColor)
    }

    setPalette(colors)
  }

  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
  }

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const rgbToHsl = (r, g, b) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  const hslToHex = (h, s, l) => {
    s /= 100
    l /= 100
    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs((h / 60) % 2 - 1))
    const m = l - c / 2
    let r = 0, g = 0, b = 0

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x
    }

    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return rgbToHex(r, g, b)
  }

  const adjustBrightness = (hex, percent) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return hex

    const factor = 1 + percent / 100
    const r = Math.min(255, Math.max(0, Math.round(rgb.r * factor)))
    const g = Math.min(255, Math.max(0, Math.round(rgb.g * factor)))
    const b = Math.min(255, Math.max(0, Math.round(rgb.b * factor)))

    return rgbToHex(r, g, b)
  }

  const copyToClipboard = (color, format = 'hex') => {
    let textToCopy = color
    
    if (format === 'rgb') {
      const rgb = hexToRgb(color)
      textToCopy = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    } else if (format === 'hsl') {
      const rgb = hexToRgb(color)
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
      textToCopy = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
    }

    navigator.clipboard.writeText(textToCopy)
    setCopiedColor(textToCopy)
    setTimeout(() => setCopiedColor(''), 2000)
  }

  const exportPalette = () => {
    const paletteData = {
      baseColor,
      paletteType,
      colors: palette.map(color => {
        const rgb = hexToRgb(color)
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
        return {
          hex: color,
          rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
          hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
        }
      })
    }

    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `color-palette-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const randomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    setBaseColor(color)
  }

  const loadSampleColors = () => {
    const samples = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
    const randomSample = samples[Math.floor(Math.random() * samples.length)]
    setBaseColor(randomSample)
  }

  useEffect(() => {
    generatePalette()
  }, [baseColor, paletteType])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Color Palette Generator</h1>
              <div className="flex gap-2">
                <button
                  onClick={loadSampleColors}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Sample Color
                </button>
                <button
                  onClick={randomColor}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Random Color
                </button>
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="h-12 w-20 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Palette Type
                </label>
                <select
                  value={paletteType}
                  onChange={(e) => setPaletteType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="complementary">Complementary</option>
                  <option value="analogous">Analogous</option>
                  <option value="triadic">Triadic</option>
                  <option value="monochromatic">Monochromatic</option>
                  <option value="tetradic">Tetradic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Actions
                </label>
                <button
                  onClick={exportPalette}
                  disabled={palette.length === 0}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Export Palette
                </button>
              </div>
            </div>

            {/* Color Palette Display */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Generated Palette</h2>
              
              {palette.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {palette.map((color, index) => {
                    const rgb = hexToRgb(color)
                    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
                    
                    return (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div
                          className="h-32 w-full"
                          style={{ backgroundColor: color }}
                        />
                        <div className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-sm font-semibold">{color}</span>
                              <button
                                onClick={() => copyToClipboard(color)}
                                className="text-blue-600 hover:text-blue-800 transition-colors"
                                title="Copy HEX"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </button>
                            </div>
                            
                            <div className="text-xs text-gray-600 space-y-1">
                              <div className="flex items-center justify-between">
                                <span>RGB:</span>
                                <button
                                  onClick={() => copyToClipboard(color, 'rgb')}
                                  className="text-blue-600 hover:text-blue-800 transition-colors"
                                  title="Copy RGB"
                                >
                                  {`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
                                </button>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>HSL:</span>
                                <button
                                  onClick={() => copyToClipboard(color, 'hsl')}
                                  className="text-blue-600 hover:text-blue-800 transition-colors"
                                  title="Copy HSL"
                                >
                                  {`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  <p>Generate a color palette to see results</p>
                </div>
              )}
            </div>

            {/* Copied Notification */}
            {copiedColor && (
              <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
                Copied: {copiedColor}
              </div>
            )}

            {/* Usage Tips */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Palette Types</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                <div>
                  <strong>Complementary:</strong> Colors opposite on the color wheel
                </div>
                <div>
                  <strong>Analogous:</strong> Colors adjacent on the color wheel
                </div>
                <div>
                  <strong>Triadic:</strong> Three evenly spaced colors
                </div>
                <div>
                  <strong>Monochromatic:</strong> Variations of the same color
                </div>
                <div>
                  <strong>Tetradic:</strong> Four evenly spaced colors
                </div>
                <div>
                  <strong>Export:</strong> Save palette as JSON file
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
