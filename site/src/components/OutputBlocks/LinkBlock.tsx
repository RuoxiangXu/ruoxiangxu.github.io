interface LinkBlockProps {
  content: string
  url: string
  icon?: string
}

export default function LinkBlock({ content, url, icon }: LinkBlockProps) {
  return (
    <div className="flex items-center gap-2 group">
      {icon && <span className="text-lg">{icon}</span>}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
      >
        {content}
      </a>
      <span className="text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
        ↗
      </span>
    </div>
  )
}