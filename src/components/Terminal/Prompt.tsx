import { RefObject } from 'react'
import { siteConfig } from '@/config/site.config'

interface PromptProps {
  value: string
  onChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  inputRef: RefObject<HTMLInputElement | null>
}

export default function Prompt({ value, onChange, onKeyDown, inputRef }: PromptProps) {
  return (
    <div className="flex items-center">
      <span className="text-green-400 mr-2">{siteConfig.theme.prompt}</span>
      <span className="text-blue-400 mr-2">~</span>
      <span className="text-yellow-400 mr-2">$</span>
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className="command-input w-full pr-4"
          autoComplete="off"
          spellCheck="false"
        />
        <span
          className="terminal-cursor absolute top-0"
          style={{ left: `${value.length * 0.6}em` }}
        />
      </div>
    </div>
  )
}