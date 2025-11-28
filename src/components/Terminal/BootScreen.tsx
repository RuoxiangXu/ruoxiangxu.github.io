'use client'

import { useEffect, useState } from 'react'
import { asciiArt, bootMessages } from '@/config/bootConfig'

interface BootScreenProps {
  onComplete: () => void
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState<string[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentLine < bootMessages.length) {
        setDisplayedText(prev => [...prev, bootMessages[currentLine]])
        setCurrentLine(prev => prev + 1)
      } else {
        setTimeout(onComplete, 500)
      }
    }, currentLine === 0 ? 100 : 80)

    return () => clearTimeout(timer)
  }, [currentLine, onComplete])

  return (
    <div className="space-y-1">
      <pre className="text-green-400 text-xs leading-tight">{asciiArt}</pre>
      <div className="mt-4 space-y-1">
        {displayedText.map((line, index) => (
          <div key={index} className="text-xs opacity-80">
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}