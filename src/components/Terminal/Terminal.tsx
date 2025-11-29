'use client'

import { useState, useEffect, useRef } from 'react'
import TerminalFrame from './TerminalFrame'
import Prompt from './Prompt'
import CommandHistory from './CommandHistory'
import BootScreen from './BootScreen'
import { executeCommand, getCommandRegistry } from '@/lib/commandRegistry'
import { CommandOutput } from '@/lib/types'

export default function Terminal() {
  const [history, setHistory] = useState<CommandOutput[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isBooting, setIsBooting] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isBooting && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isBooting, history])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = async (command: string) => {
    const trimmedCommand = command.trim()
    if (!trimmedCommand) return

    const userOutput: CommandOutput = {
      type: 'command',
      content: trimmedCommand,
    }

    if (trimmedCommand.toLowerCase() === 'clear') {
      setHistory([])
      setCurrentInput('')
      return
    }

    const result = await executeCommand(trimmedCommand)
    setHistory(prev => [...prev, userOutput, result])
    setCommandHistory(prev => [...prev, trimmedCommand])
    setHistoryIndex(-1)
    setCurrentInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Tab completion
      const input = currentInput.trim()
      if (!input) return

      // Get all available commands from the registry
      const registry = getCommandRegistry()
      const availableCommands = Array.from(registry.keys())

      // Find matching commands
      const matches = availableCommands.filter(cmd => cmd.startsWith(input))

      if (matches.length === 1) {
        // Single match - autocomplete
        setCurrentInput(matches[0])
      } else if (matches.length > 1) {
        // Multiple matches - show them
        const matchList = matches.join('  ')
        const output: CommandOutput = {
          type: 'text',
          content: matchList
        }
        setHistory(prev => [...prev, output])
      }
    }
  }

  const handleBootComplete = async () => {
    setIsBooting(false)

    // Automatically show banner command after boot
    const userCommand: CommandOutput = {
      type: 'command',
      content: 'banner',
    }
    const bannerResult = await executeCommand('banner')

    setHistory([userCommand, bannerResult])
  }

  const handleTerminalClick = () => {
    const container = terminalRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight)

    if (distanceFromBottom <= 20) {
      inputRef.current?.focus()
    }
  }

  return (
    <TerminalFrame>
      <div
        ref={terminalRef}
        className="h-full overflow-y-auto scrollbar-thin px-4 py-3"
        onClick={handleTerminalClick}
      >
        {isBooting ? (
          <BootScreen onComplete={handleBootComplete} />
        ) : (
          <>
            <CommandHistory history={history} />
            <Prompt
              value={currentInput}
              onChange={setCurrentInput}
              onKeyDown={handleKeyDown}
              inputRef={inputRef}
            />
          </>
        )}
      </div>
    </TerminalFrame>
  )
}