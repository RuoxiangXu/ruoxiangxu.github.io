# CLI Personal Website

[![CI](https://github.com/ruoxiangxu/CLI-personal-website/actions/workflows/ci.yml/badge.svg)](https://github.com/ruoxiangxu/CLI-personal-website/actions/workflows/ci.yml)
[![Deploy](https://github.com/ruoxiangxu/CLI-personal-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/ruoxiangxu/CLI-personal-website/actions/workflows/deploy.yml)

An interactive terminal-style personal portfolio website with glassmorphism design and Linux-style commands.

## ✨ Features

- 🖥️ **Terminal Interface**: Floating glassmorphism terminal with command-line interaction
- ⌨️ **Linux-style Commands**: Familiar commands like `help`, `about`, `resume`, `projects`, etc.
- 🎨 **Beautiful Design**: Apple-inspired aesthetics with smooth animations
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- 🚀 **Fast & Static**: Built with Next.js and deployed as static site
- 🛠️ **Customizable**: Template-based design for easy personalization

## 🚀 Quick Start

### Fork and Clone

1. Fork this repository
2. Clone your forked repository:
```bash
git clone https://github.com/YOUR_USERNAME/CLI-personal-website.git
cd CLI-personal-website
```

### Setup

1. Install dependencies:
```bash
pnpm install
```

2. Copy configuration files:
```bash
cp site/.env.example site/.env.local
cp site/src/config/profile.example.ts site/src/config/profile.ts
```

3. Customize your profile in `site/src/config/profile.ts`

4. Run development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📝 Customization

### Personal Information

Edit `site/src/config/profile.ts` to update:
- Personal details (name, title, email, location)
- Social links
- Projects
- Skills
- Bio

### Commands

Modify `site/src/config/commands.ts` to:
- Add new commands
- Customize command outputs
- Add easter eggs

### Styling

Update `site/tailwind.config.ts` and `site/src/styles/globals.css` for:
- Color schemes
- Fonts
- Animations
- Terminal appearance

### Resume

Place your `resume.pdf` in the GitHub Pages repository and update the URL in `.env.local`:
```env
NEXT_PUBLIC_RESUME_URL=https://yourdomain.com/resume.pdf
```

## 🚢 Deployment

### GitHub Pages

1. Enable GitHub Pages in your repository settings
2. The workflow will automatically deploy to GitHub Pages on push to `main`

### Custom Domain

1. Add your custom domain in GitHub Pages settings
2. Update DNS records:
   - CNAME: `www` → `username.github.io`
   - A records for apex domain (optional)

3. Update environment variables:
```env
NEXT_PUBLIC_PRIMARY_DOMAIN=yourdomain.com
NEXT_PUBLIC_FALLBACK_DOMAIN=username.github.io
```

## 📦 Project Structure

```
CLI-personal-website/
├── site/                    # Next.js application
│   ├── src/
│   │   ├── app/            # App router pages
│   │   ├── components/     # React components
│   │   │   ├── Terminal/   # Terminal UI components
│   │   │   └── OutputBlocks/ # Command output renderers
│   │   ├── config/         # Configuration files
│   │   ├── lib/           # Utilities and logic
│   │   └── styles/        # Global styles
│   └── public/            # Static assets
├── infra/workflows/       # GitHub Actions
└── DESIGN.md             # Architecture documentation
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Package Manager**: pnpm
- **Deployment**: GitHub Pages

## 📜 Available Commands

| Command | Description |
|---------|------------|
| `help` | Show all available commands |
| `about` | Display personal information |
| `resume` | Open resume PDF |
| `projects` | List portfolio projects |
| `contact` | Show contact information |
| `skills` | Display technical skills |
| `clear` | Clear the terminal |
| `theme` | Change terminal theme |
| `coffee` | Brew some virtual coffee ☕ |
| `matrix` | Enter the matrix |

## 🔧 Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Export static files
pnpm export

# Run type checking
pnpm --filter site exec tsc --noEmit
```

## 📄 License

MIT License - Feel free to use this template for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Inspired by terminal interfaces and command-line aesthetics
- Built with modern web technologies
- Designed for developers who love the terminal

---

Made with ❤️ by the open source community