import { Command } from '@/lib/types'
import { siteConfig } from './site.config'

const buildCommandList = () =>
  commands
    .filter(cmd => !cmd.aliases?.includes(cmd.name))
    .map(cmd => `  ${cmd.name.padEnd(12)} - ${cmd.description}`)
    .join('\n')

export const commands: Command[] = [
  {
    name: 'help',
    description: 'Show available commands',
    handler: () => ({
      type: 'help',
      content: buildCommandList()
    })
  },
  {
    name: 'banner',
    description: 'Display welcome banner',
    handler: () => ({
      type: 'banner',
      content: buildCommandList()
    })
  },
  {
    name: 'about',
    description: 'Learn about me',
    handler: () => ({
      type: 'text',
      content: `${siteConfig.bio}

Education: ${siteConfig.education.university}
Location: ${siteConfig.location}

Type 'contact' to get in touch!`
    })
  },
  {
    name: 'edu',
    description: 'View education background',
    handler: () => ({
      type: 'text',
      content: `Education Background
========================================
🎓 Carnegie Mellon University (2025.8 - 2026.12)
   Master of Science in Mobile and IoT Engineering (Information Networking Institute)
   Focus: Computer Systems, Software Engineering, LLM Applications
   GPA: 4.0/4.0

🎓 Hong Kong Baptist University (2021.9 - 2025.6)
   Bachelor of Science in Computer Science
   Focus: Software Engineering, AI/ML
   cGPA: 3.8/4.0; mGPA: 3.9/4.0
   Awards: Scholastic Award; Dean's Award; First Class Award*2
========================================`
    })
  },
  {
    name: 'contact',
    description: 'Get in touch',
    handler: () => ({
      type: 'text',
      content: `Contact Information
========================================

📧 Email (University): ruoxianx@andrew.cmu.edu
📧 Email (Personal):   ruoxiangxu2002@gmail.com

Feel free to reach out for collaborations or opportunities!

Type 'github' or 'linkedin' to visit my profiles.`
    })
  },
  {
    name: 'resume',
    description: 'View my resume (-en or -cn)',
    usage: 'resume [-en|-cn]',
    handler: (args) => {
      const lang = args[0]
      if (lang === '-cn') {
        return {
          type: 'action',
          content: 'Opening Chinese resume...',
          action: 'open',
          url: '/resume_cn.pdf'
        }
      } else if (lang === '-en') {
        return {
          type: 'action',
          content: 'Opening English resume...',
          action: 'open',
          url: '/resume_en.pdf'
        }
      } else {
        return {
          type: 'text',
          content: `Usage: resume [-en|-cn]

  -en    Open English resume
  -cn    Open Chinese resume (中文简历)`
        }
      }
    }
  },
  {
    name: 'github',
    description: 'Visit my GitHub profile',
    handler: () => ({
      type: 'countdown-redirect',
      content: 'https://github.com/RuoxiangXu'
    })
  },
  {
    name: 'linkedin',
    description: 'Visit my LinkedIn profile',
    handler: () => ({
      type: 'countdown-redirect',
      content: 'https://linkedin.com/in/ruoxiangxu'
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
    name: 'coffee',
    description: 'Brew some fresh coffee',
    handler: () => ({ type: 'coffee', content: '' })
  },
  {
    name: 'matrix',
    description: 'Enter the matrix',
    handler: () => ({ type: 'matrix', content: '' })
  }
]
