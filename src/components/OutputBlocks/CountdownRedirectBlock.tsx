'use client'

import { useEffect, useState } from 'react'

interface CountdownRedirectBlockProps {
  url: string
  title?: string
  icon?: string
}

export default function CountdownRedirectBlock({ url, title }: CountdownRedirectBlockProps) {
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      window.open(url, '_blank')
    }
  }, [countdown, url])

  return (
    <div className="my-2 text-terminal-text">
      {title && (
        <div className="mb-1 font-semibold">
          {title}
        </div>
      )}
      <div className="mb-1">
        <span className="opacity-60">Link: </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-70 transition-opacity"
        >
          {url}
        </a>
      </div>
      {countdown > 0 && (
        <div className="opacity-60">
          Redirecting automatically in {countdown} second{countdown !== 1 ? 's' : ''}...
        </div>
      )}
    </div>
  )
}
