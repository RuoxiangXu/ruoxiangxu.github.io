'use client'

import ReactMarkdown from 'react-markdown'

interface MarkdownBlockProps {
  content: string
}

export default function MarkdownBlock({ content }: MarkdownBlockProps) {
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="bg-gray-800 px-1 py-0.5 rounded text-green-400">
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}