/**
 * 网站配置文件 - 在这里集中管理所有个人信息
 * 修改这个文件即可更新整个网站的内容
 */

export const siteConfig = {
  // ===== 基本信息 =====
  name: 'Your Name',
  title: 'Software Engineer',
  email: 'your.email@example.com',
  location: 'San Francisco, CA',

  // ===== 教育背景 =====
  education: {
    university: 'Carnegie Mellon University',
    degree: 'B.S. Computer Science',
  },

  // ===== 个人简介 =====
  bio: `Hi! I'm a passionate software engineer with expertise in full-stack development.

I love building interactive experiences and solving complex problems.
Currently focused on web technologies and cloud architecture.`,

  // ===== 社交媒体链接 =====
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    website: 'https://yourwebsite.com',
  },

  // ===== 技术技能 =====
  skills: {
    languages: ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust'],
    frontend: ['React', 'Next.js', 'Vue', 'Tailwind CSS', 'Framer Motion'],
    backend: ['Node.js', 'Express', 'FastAPI', 'GraphQL', 'PostgreSQL'],
    tools: ['Docker', 'Kubernetes', 'AWS', 'Git', 'CI/CD'],
  },

  // ===== 项目展示 =====
  projects: [
    {
      name: 'Project Alpha',
      description: 'A full-stack web application built with React and Node.js',
      url: 'https://github.com/yourusername/project-alpha',
      demo: 'https://project-alpha.com',
      tech: ['React', 'Node.js', 'PostgreSQL'],
    },
    {
      name: 'Creative Tools',
      description: 'An interactive design toolkit for developers',
      url: 'https://github.com/yourusername/creative-tools',
      demo: 'https://creative-tools.app',
      tech: ['Vue', 'TypeScript', 'Canvas API'],
    },
    {
      name: 'Data Visualizer',
      description: 'Real-time data visualization platform',
      url: 'https://github.com/yourusername/data-viz',
      tech: ['D3.js', 'WebSocket', 'Python'],
    },
  ],

  // ===== 简历配置 =====
  resume: {
    // 你的简历 PDF 链接（可以放在 public/ 目录或外部链接）
    url: '/resume.pdf',
  },

  // ===== 终端启动配置 =====
  boot: {
    // ASCII Art - 启动时显示的艺术字
    asciiArt: `
   _____ __  __ _    _
  / ____|  \\/  | |  | |
 | |    | \\  / | |  | |
 | |    | |\\/| | |  | |
 | |____| |  | | |__| |
  \\_____|_|  |_|\\____/

 Carnegie Mellon University
`,
    // 启动消息
    messages: [
      '[SYSTEM] Initializing terminal interface...',
      '[SYSTEM] Loading personal portfolio v1.0.0',
      '[SYSTEM] Establishing secure connection...',
      '[SYSTEM] Mounting filesystem...',
      '[SYSTEM] Loading user profile...',
      '[SYSTEM] Starting command interpreter...',
      '',
      '========================================',
      '',
      'Welcome to my interactive portfolio!',
      '',
      'Type "help" to see available commands.',
      'Type "about" to learn more about me.',
      '',
      '========================================',
    ],
  },

  // ===== 终端主题配置 =====
  theme: {
    // 默认主题（可以是 'light' 或 'dark'）
    default: 'dark',
    // 终端提示符
    prompt: 'visitor@portfolio',
  },
}

// 导出类型定义
export type SiteConfig = typeof siteConfig
