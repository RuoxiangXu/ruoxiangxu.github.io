import { Command } from '@/lib/types'

export const commands: Command[] = [
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
      content: `Hi! I'm a passionate software engineer with expertise in full-stack development.

I love building interactive experiences and solving complex problems.
Currently focused on web technologies and cloud architecture.

Education: Carnegie Mellon University
Location: San Francisco, CA

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
    handler: () => ({
      type: 'markdown',
      content: `## Featured Projects

### 🚀 Project Alpha
A full-stack web application built with React and Node.js
[View on GitHub](https://github.com)

### 🎨 Creative Tools
An interactive design toolkit for developers
[Live Demo](https://example.com)

### 📊 Data Visualizer
Real-time data visualization platform
[Learn More](https://github.com)

Use "project [name]" for more details about a specific project.`
    })
  },
  {
    name: 'contact',
    description: 'Get in touch',
    handler: () => ({
      type: 'markdown',
      content: `## Contact Information

📧 Email: [your.email@example.com](mailto:your.email@example.com)
💼 LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com)
🐦 Twitter: [@yourhandle](https://twitter.com)
📍 Location: San Francisco, CA

Feel free to reach out for collaborations or opportunities!`
    })
  },
  {
    name: 'skills',
    description: 'View my technical skills',
    handler: () => ({
      type: 'markdown',
      content: `## Technical Skills

### Languages
\`JavaScript\` \`TypeScript\` \`Python\` \`Go\` \`Rust\`

### Frontend
\`React\` \`Next.js\` \`Vue\` \`Tailwind CSS\` \`Framer Motion\`

### Backend
\`Node.js\` \`Express\` \`FastAPI\` \`GraphQL\` \`PostgreSQL\`

### Tools & Platforms
\`Docker\` \`Kubernetes\` \`AWS\` \`Git\` \`CI/CD\``
    })
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
          content: 'Usage: theme [light|dark]\nCurrent theme: dark'
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
      content: 'visitor@portfolio'
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