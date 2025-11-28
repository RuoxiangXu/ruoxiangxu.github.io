import { ReactNode } from 'react'

interface TerminalFrameProps {
  children: ReactNode
}

export default function TerminalFrame({ children }: TerminalFrameProps) {
  return (
    <div className="w-full max-w-4xl mx-auto h-[600px] terminal-glass relative">
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl flex items-center px-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
        </div>
        <div className="flex-1 text-center text-xs text-gray-400">
          terminal@portfolio ~ %
        </div>
      </div>
      <div className="h-full pt-10 terminal-text">
        {children}
      </div>
    </div>
  )
}