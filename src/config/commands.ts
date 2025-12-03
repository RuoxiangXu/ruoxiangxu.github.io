import { Command } from '@/lib/types'

const aboutMessage = `Hi there! I'm Ruoxiang XU (James, 徐若翔), currently pursuing my M.S. in Mobile & IoT Engineering at Carnegie Mellon University's Information Networking Institude.

My craft centers on software engineering, computer systems, and AI/LLM application development. And I get a genuine kick out of shaping software that's elegant, scalable, and fast.

Off the terminal, you'll usually find me on a basketball court, experimenting in the kitchen, planning my next trip, chasing light with a camera, or looking at an endless queue of cat videos—basically anything on four wheels or four paws.`

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
      content: `${aboutMessage}

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
   GPA: 4.0/4.0
   Focus: Computer Systems, Software Engineering, LLM Applications

🎓 Hong Kong Baptist University (2021.9 - 2025.6)
   Bachelor of Science in Computer Science
   cGPA: 3.8/4.0; mGPA: 3.9/4.0
   Focus: Software Engineering, AI/ML
   Awards: Scholastic Award; Dean's Award; First Class Award*2

🎓 University of Oxford (2023.7 - 2023.8)
   Summer Program: Artificial Intelligence and Machine Learning
   GPA: 4.0/4.0
   Award: Outstanding Performance Team Award

🎓 Shenzhen Experimental High School (2018.9 - 2021.6)
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

📱 Mobile (US): +1 (412)-965-5934
📱 Mobile (CN): +86 136-9188-8248

📧 Email (University): ruoxianx@andrew.cmu.edu
📧 Email (Personal):   ruoxiangxu2002@gmail.com
📧 Email (Backup):     ruoxiangxu@outlook.com

Feel free to reach out for collaborations or opportunities!

Type 'github' or 'linkedin' to visit my profiles.`
    })
  },
  {
    name: 'resume',
    description: 'Display my resume',
    handler: () => ({
      type: 'text',
      content: `The resume section is private currently, type "linkedin" to learn more about my experiences.`
    })
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
    description: 'What will this command do?',
    handler: () => ({ type: 'matrix', content: '' })
  }
]
