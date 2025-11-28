import { Command } from '@/lib/types'
import { siteConfig } from './site.config'

export const commands: Command[] = [
  {
    name: 'banner',
    description: 'Display welcome banner',
    handler: () => ({
      type: 'banner',
      content: ''
    })
  },
  {
    name: 'help',
    description: 'Show available commands',
    handler: () => {
      const commandList = commands
        .filter(cmd => !cmd.aliases?.includes(cmd.name))
        .map(cmd => `  ${cmd.name.padEnd(12)} - ${cmd.description}`)
        .join('\n')

      return {
        type: 'markdown',
        content: `## Available Commands\n\n\`\`\`\n${commandList}\n\`\`\`\n\nTip: Use arrow keys to navigate command history`
      }
    }
  },
  {
    name: 'about',
    description: 'Learn about me',
    handler: () => ({
      type: 'text',
      content: `${siteConfig.bio}

Education: ${siteConfig.education.university}
Location: ${siteConfig.location}

Use "projects" to see my work, or "contact" to get in touch!`
    })
  },
  {
    name: 'resume',
    description: 'View my resume',
    handler: () => ({
      type: 'action',
      content: 'Opening resume...',
      action: 'open',
      url: '/resume'
    })
  },
  {
    name: 'projects',
    description: 'View my projects',
    handler: () => {
      const projectList = siteConfig.projects
        .map((project, index) => {
          const links = []
          if (project.url) links.push(`[GitHub](${project.url})`)
          if (project.demo) links.push(`[Live Demo](${project.demo})`)
          const linkText = links.length > 0 ? ` - ${links.join(' | ')}` : ''

          return `### ${index === 0 ? '🚀' : index === 1 ? '🎨' : '📊'} ${project.name}
${project.description}${linkText}
**Tech:** ${project.tech.map(t => `\`${t}\``).join(' ')}`
        })
        .join('\n\n')

      return {
        type: 'markdown',
        content: `## Featured Projects\n\n${projectList}`
      }
    }
  },
  {
    name: 'contact',
    description: 'Get in touch',
    handler: () => ({
      type: 'markdown',
      content: `## Contact Information

📧 Email: [${siteConfig.email}](mailto:${siteConfig.email})
💼 LinkedIn: [LinkedIn Profile](${siteConfig.social.linkedin})
🐙 GitHub: [GitHub Profile](${siteConfig.social.github})
🐦 Twitter: [Twitter](${siteConfig.social.twitter})
📍 Location: ${siteConfig.location}

Feel free to reach out for collaborations or opportunities!`
    })
  },
  {
    name: 'skills',
    description: 'View my technical skills',
    handler: () => {
      const { languages, frontend, backend, tools } = siteConfig.skills
      return {
        type: 'markdown',
        content: `## Technical Skills

### Languages
${languages.map(s => `\`${s}\``).join(' ')}

### Frontend
${frontend.map(s => `\`${s}\``).join(' ')}

### Backend
${backend.map(s => `\`${s}\``).join(' ')}

### Tools & Platforms
${tools.map(s => `\`${s}\``).join(' ')}`
      }
    }
  },
  {
    name: 'history',
    description: 'Show command history',
    handler: () => ({
      type: 'text',
      content: 'Command history is displayed above. Use ↑/↓ arrow keys to navigate.'
    })
  },
  {
    name: 'clear',
    description: 'Clear the terminal',
    handler: () => ({
      type: 'text',
      content: ''
    })
  },
  {
    name: 'theme',
    description: 'Change terminal theme',
    usage: 'theme [light|dark]',
    handler: (args) => {
      const theme = args[0]
      if (!theme) {
        return {
          type: 'text',
          content: `Usage: theme [light|dark]\nCurrent theme: ${siteConfig.theme.default}`
        }
      }
      return {
        type: 'text',
        content: `Theme changed to: ${theme} (This is a placeholder - theme switching not yet implemented)`
      }
    }
  },
  {
    name: 'coffee',
    description: 'Easter egg - brew some coffee',
    handler: () => ({
      type: 'text',
      content: `
     ( (
      ) )
    ........
    |      |]
    \\      /
     \`----'

Brewing a fresh cup of coffee... ☕`
    }),
    aliases: ['brew']
  },
  {
    name: 'matrix',
    description: 'Enter the matrix',
    handler: () => ({
      type: 'text',
      content: `
Wake up, Neo...
The Matrix has you...
Follow the white rabbit.

01001000 01100101 01101100 01101100 01101111
01010111 01101111 01110010 01101100 01100100`
    })
  },
  {
    name: 'whoami',
    description: 'Display current user',
    handler: () => ({
      type: 'text',
      content: siteConfig.theme.prompt
    })
  },
  {
    name: 'date',
    description: 'Display current date and time',
    handler: () => ({
      type: 'text',
      content: new Date().toString()
    })
  }
]