import { CommandOutput } from '@/lib/types'
import TextBlock from '../OutputBlocks/TextBlock'
import LinkBlock from '../OutputBlocks/LinkBlock'
import ActionBlock from '../OutputBlocks/ActionBlock'
import MarkdownBlock from '../OutputBlocks/MarkdownBlock'
import BannerBlock from '../OutputBlocks/BannerBlock'

interface CommandHistoryProps {
  history: CommandOutput[]
}

export default function CommandHistory({ history }: CommandHistoryProps) {
  const renderOutput = (output: CommandOutput, index: number) => {
    switch (output.type) {
      case 'command':
        return (
          <div key={index} className="flex items-center">
            <span className="text-green-400 mr-2">visitor@portfolio</span>
            <span className="text-blue-400 mr-2">~</span>
            <span className="text-yellow-400 mr-2">$</span>
            <span>{output.content}</span>
          </div>
        )
      case 'text':
        return <TextBlock key={index} content={output.content} />
      case 'error':
        return <TextBlock key={index} content={output.content} isError />
      case 'link':
        return output.url ? (
          <LinkBlock key={index} content={output.content} url={output.url} icon={output.icon} />
        ) : (
          <TextBlock key={index} content={output.content} />
        )
      case 'action':
        return output.action ? (
          <ActionBlock key={index} content={output.content} action={output.action} url={output.url} />
        ) : (
          <TextBlock key={index} content={output.content} />
        )
      case 'markdown':
        return <MarkdownBlock key={index} content={output.content} />
      case 'banner':
        return <BannerBlock key={index} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-2">
      {history.map((output, index) => renderOutput(output, index))}
    </div>
  )
}