'use client'

import { useEffect, useState } from 'react'

export default function CoffeeBlock() {
  const [steamLines, setSteamLines] = useState([
    { chars: '∼ ≈ ∼', opacity: 0.3, offset: 0 },
    { chars: '≈ ∼ ≈', opacity: 0.5, offset: 1 },
    { chars: '∼ ≋ ∼', opacity: 0.7, offset: 2 },
    { chars: '≈ ∼ ≈', opacity: 0.5, offset: 1 },
    { chars: '∼ ≈ ∼', opacity: 0.3, offset: 0 },
  ])

  useEffect(() => {
    const steamChars = ['∼', '≈', '≋', '~', '∿']

    const interval = setInterval(() => {
      setSteamLines(prev => prev.map((line) => {
        // Random steam characters
        const chars = Array(3).fill(0).map(() =>
          steamChars[Math.floor(Math.random() * steamChars.length)]
        ).join(' ')

        // Rising animation with random offset
        const offset = (line.offset + 0.3 + Math.random() * 0.2) % 4

        // Fade in/out based on height
        const opacity = offset < 2 ? 0.3 + offset * 0.2 : 0.7 - (offset - 2) * 0.3

        return {
          chars,
          opacity: Math.max(0.2, Math.min(0.8, opacity)),
          offset
        }
      }))
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="my-3 font-mono">
      {/* Enhanced Steam */}
      <div className="text-center mb-1 relative" style={{ height: '80px' }}>
        {steamLines.map((line, i) => (
          <div
            key={i}
            className="absolute w-full transition-all duration-200 ease-out"
            style={{
              opacity: line.opacity,
              transform: `translateY(${60 - line.offset * 15}px) translateX(${Math.sin(line.offset) * 5}px)`,
              color: `hsl(${200 + i * 15}, 60%, ${50 + line.opacity * 30}%)`,
              fontSize: '0.75rem',
              textShadow: `0 0 ${line.opacity * 10}px currentColor`
            }}
          >
            {line.chars}
          </div>
        ))}
      </div>

      {/* Cup */}
      <pre className="text-center leading-tight select-none" style={{ fontSize: '0.8rem' }}>
        <span style={{ color: '#d4a574' }}>     ( (</span>
        {'\n'}
        <span style={{ color: '#d4a574' }}>      ) )</span>
        {'\n'}
        <span style={{ color: '#8b4513' }}>    ........</span>
        {'\n'}
        <span style={{ color: '#8b4513' }}>    |</span>
        <span style={{ color: '#6f4e37' }}>██████</span>
        <span style={{ color: '#8b4513' }}>|]</span>
        {'\n'}
        <span style={{ color: '#8b4513' }}>    \\</span>
        <span style={{ color: '#6f4e37' }}>██████</span>
        <span style={{ color: '#8b4513' }}>/</span>
        {'\n'}
        <span style={{ color: '#8b4513' }}>     `----&apos;</span>
      </pre>

      {/* Message */}
      <div className="text-center mt-3 space-y-1">
        <div className="text-terminal-text animate-pulse">
          Brewing a fresh cup of coffee... ☕
        </div>
        <div className="text-terminal-muted text-xs">
          Perfect fuel for coding!
        </div>
      </div>
    </div>
  )
}
