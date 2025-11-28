'use client'

import { useEffect } from 'react'

export default function ResumePage() {
  useEffect(() => {
    // Redirect to resume PDF
    const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL ||
      'https://ruoxiangxu.com/resume.pdf'

    // Redirect to resume
    window.location.href = resumeUrl
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to resume...</h1>
        <p className="text-gray-400">
          If you are not redirected automatically,{' '}
          <a
            href={process.env.NEXT_PUBLIC_RESUME_URL || 'https://ruoxiangxu.com/resume.pdf'}
            className="text-blue-400 underline"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  )
}