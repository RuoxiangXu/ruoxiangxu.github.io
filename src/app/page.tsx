'use client'

import Terminal from '@/components/Terminal/Terminal'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="noise" />
      <Terminal />
    </main>
  )
}