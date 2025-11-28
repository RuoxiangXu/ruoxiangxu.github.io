# My Personal Website

终端风格的个人作品集网站，带有玻璃态设计和 Linux 风格的命令行交互。

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建和部署

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm start
```

## 配置个人信息

所有个人信息集中在 **`src/config/site.config.ts`** 文件中，修改这个文件即可更新整个网站内容：

```typescript
export const siteConfig = {
  name: 'Your Name',              // 你的名字
  title: 'Software Engineer',      // 职位
  email: 'your.email@example.com', // 邮箱
  location: 'San Francisco, CA',   // 所在地

  education: {
    university: 'Carnegie Mellon University',
    degree: 'B.S. Computer Science',
  },

  bio: `你的个人简介...`,

  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    website: 'https://yourwebsite.com',
  },

  skills: {
    languages: ['JavaScript', 'TypeScript', ...],
    frontend: ['React', 'Next.js', ...],
    backend: ['Node.js', 'Express', ...],
    tools: ['Docker', 'Kubernetes', ...],
  },

  projects: [
    {
      name: 'Project Name',
      description: 'Project description',
      url: 'https://github.com/...',
      demo: 'https://...',
      tech: ['React', 'Node.js'],
    },
    // 添加更多项目...
  ],
}
```

## 部署到 GitHub Pages

这个项目可以直接部署到 GitHub Pages（username.github.io）：

1. 在 GitHub 创建一个名为 `username.github.io` 的仓库
2. 将本项目推送到该仓库
3. 配置 GitHub Actions 自动部署（见下文）

### GitHub Actions 自动部署

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## 项目结构

```
personal-website/
├── src/
│   ├── app/              # Next.js 页面
│   ├── components/       # React 组件
│   │   ├── Terminal/     # 终端 UI 组件
│   │   └── OutputBlocks/ # 命令输出渲染器
│   ├── config/
│   │   └── site.config.ts  # 🔥 所有个人信息都在这里！
│   ├── lib/              # 工具函数和逻辑
│   └── styles/           # 全局样式
├── public/               # 静态资源（简历 PDF 等）
├── next.config.mjs       # Next.js 配置
└── package.json
```

## 技术栈

- **框架**: Next.js 15 with App Router
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **包管理器**: pnpm
- **部署**: GitHub Pages (静态导出)

## 可用命令

在终端中输入以下命令：

| 命令 | 说明 |
|------|------|
| `help` | 显示所有可用命令 |
| `about` | 显示个人简介 |
| `resume` | 打开简历 PDF |
| `projects` | 查看项目列表 |
| `contact` | 显示联系方式 |
| `skills` | 显示技术技能 |
| `clear` | 清空终端 |
| `theme` | 切换主题 |
| `coffee` | 煮杯咖啡 ☕ |
| `matrix` | 进入黑客帝国 |

## 开发命令

```bash
# 安装依赖
pnpm install

# 本地开发
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm start

# 代码检查
pnpm lint
```