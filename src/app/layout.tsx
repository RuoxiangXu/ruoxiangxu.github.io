import type { Metadata } from 'next'
import '../styles/globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'
import GithubButton from '@/components/GithubButton/GithubButton'
import TemplateRepoButton from '@/components/TemplateRepoButton/TemplateRepoButton'

export const metadata: Metadata = {
  title: 'terminal@ruoxiangxu.com',
  description: 'Interactive CLI-style personal portfolio',
  keywords: 'portfolio, developer, terminal, CLI, interactive',
  authors: [{ name: 'Ruoxiang Xu' }],
  openGraph: {
    title: 'terminal@ruoxiangxu.com',
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
    <html lang="en" className="h-full">
      <body className="font-mono antialiased min-h-[100dvh] h-full">
        <ThemeProvider>
          <div className="pointer-events-none fixed inset-0 z-50">
            <div className="pointer-events-auto absolute top-4 left-4">
              <ThemeToggle />
            </div>
            <div className="pointer-events-auto absolute top-4 right-4 flex items-center gap-3">
              <TemplateRepoButton />
              <GithubButton />
            </div>
          </div>
          <div className="relative flex items-center justify-center min-h-[100dvh] w-full px-4">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}