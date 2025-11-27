import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Terminal Portfolio',
  description: 'Interactive CLI-style personal portfolio',
  keywords: 'portfolio, developer, terminal, CLI, interactive',
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Terminal Portfolio',
    description: 'Interactive CLI-style personal portfolio',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sf-mono antialiased">
        {children}
      </body>
    </html>
  )
}