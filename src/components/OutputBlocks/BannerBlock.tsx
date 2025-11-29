import HelpBlock from './HelpBlock'

interface BannerBlockProps {
  content?: string
}

const ASCII_ART = String.raw`
$$\   $$\ $$\ $$\       $$$$$$\ $$\                    $$$$$$$\                                $$\                                     $$\   $$\           
$$ |  $$ |\__|$$ |      \_$$  _|$  |                   $$  __$$\                               \__|                                    $$ |  $$ |          
$$ |  $$ |$$\ $$ |        $$ |  \_/$$$$$$\$$$$\        $$ |  $$ |$$\   $$\  $$$$$$\  $$\   $$\ $$\  $$$$$$\  $$$$$$$\   $$$$$$\        \$$\ $$  |$$\   $$\ 
$$$$$$$$ |$$ |$$ |        $$ |     $$  _$$  _$$\       $$$$$$$  |$$ |  $$ |$$  __$$\ \$$\ $$  |$$ | \____$$\ $$  __$$\ $$  __$$\        \$$$$  / $$ |  $$ |
$$  __$$ |$$ |\__|        $$ |     $$ / $$ / $$ |      $$  __$$< $$ |  $$ |$$ /  $$ | \$$$$  / $$ | $$$$$$$ |$$ |  $$ |$$ /  $$ |       $$  $$<  $$ |  $$ |
$$ |  $$ |$$ |            $$ |     $$ | $$ | $$ |      $$ |  $$ |$$ |  $$ |$$ |  $$ | $$  $$<  $$ |$$  __$$ |$$ |  $$ |$$ |  $$ |      $$  /\$$\ $$ |  $$ |
$$ |  $$ |$$ |$$\       $$$$$$\    $$ | $$ | $$ |      $$ |  $$ |\$$$$$$  |\$$$$$$  |$$  /\$$\ $$ |\$$$$$$$ |$$ |  $$ |\$$$$$$$ |      $$ /  $$ |\$$$$$$  |
\__|  \__|\__|\__|      \______|   \__| \__| \__|      \__|  \__| \______/  \______/ \__/  \__|\__| \_______|\__|  \__| \____$$ |      \__|  \__| \______/ 
                                                                                                                       $$\   $$ |                          
                                                                                                                       \$$$$$$  |                          
                                                                                                                        \______/                           
`.trim()

export default function BannerBlock({ content }: BannerBlockProps) {
  return (
    <div className="my-4">
      <div className="text-left">
        <pre
          className="
            inline-block
            font-mono font-bold
            text-[5px] leading-[5px]
            whitespace-pre
            bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600
            bg-clip-text text-transparent
          "
        >
          {ASCII_ART}
        </pre>

        <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
          Welcome to my website. Type some commands to explore more.
        </div>
      </div>

      {content && <HelpBlock content={content} />}
    </div>
  )
}