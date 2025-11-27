# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a CLI personal website project that creates a terminal-style personal portfolio with a glassmorphism design. The project is currently in its initial design phase with implementation pending.

## Architecture

The project follows a simple structure:
- `site/` - Next.js 14 application with App Router, TypeScript, Tailwind CSS, Framer Motion
- `infra/workflows/` - GitHub Actions for CI/CD
- Static deployment to GitHub Pages with custom domain support

## Technology Stack

- **Runtime**: Node.js ≥ 20
- **Package Manager**: pnpm ≥ 9
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Deployment**: GitHub Pages (static export)
- **Analytics**: Third-party services (Cloudflare Web Analytics, Umami Cloud)

## Development Commands

When the project is implemented, these will be the standard commands:

```bash
# Development
pnpm install                    # Install dependencies
pnpm dev                       # Start development server
pnpm build                     # Build for production
pnpm next export              # Export static files
pnpm lint                      # Run ESLint
pnpm test                      # Run tests

# For workspace setup (if using pnpm workspace)
pnpm --filter site dev         # Development in site package
pnpm --filter site build       # Build site package
```

## Core Application Structure

Based on the design specification, the main application will be organized as:

```
site/
  app/
    layout.tsx                 # Root layout with analytics
    page.tsx                   # Main terminal page
    resume/page.tsx           # Resume redirect route
  components/
    Terminal/                  # Terminal UI components
    OutputBlocks/             # Command output renderers
  config/
    profile.ts                # Personal information (templated)
    commands.ts               # Command definitions
    theme.ts                  # Theme configuration
    analytics.ts              # Analytics configuration
  lib/
    commandRegistry.ts        # Command registration system
    parser.ts                 # Input parsing logic
    telemetry.ts              # Analytics integration
    resumeRedirect.ts         # Document routing logic
```

## Key Features to Implement

1. **Terminal Interface**: Floating glassmorphism terminal with command-line interaction
2. **Command System**: Linux-style commands (`help`, `about`, `resume`, `projects`, `contact`, `clear`, etc.)
3. **Boot Sequence**: ASCII art welcome screen with typing animation
4. **Output Types**: Text, Markdown, links, and actions (external redirects)
5. **Theme System**: Apple-inspired design with light/dark mode support
6. **Configuration-Driven**: All personal content in config files for easy customization

## Configuration Files

The project uses configuration-driven architecture:
- `config/profile.ts` - Personal information and content
- `config/commands.ts` - Command definitions and behaviors
- `config/theme.ts` - Visual styling preferences
- `config/analytics.ts` - Third-party analytics settings
- `config/docs.ts` - Document routing (resume, portfolio links)

## Environment Variables

Key environment variables for deployment:
- `NEXT_PUBLIC_PRIMARY_DOMAIN` - Custom domain (e.g., ruoxiangxu.com)
- `NEXT_PUBLIC_FALLBACK_DOMAIN` - GitHub Pages domain
- `NEXT_PUBLIC_RESUME_HOST` - Resume PDF hosting location
- `NEXT_PUBLIC_UMAMI_WS_ID` - Analytics service ID (optional)

## Deployment Strategy

1. Static export via `pnpm build && pnpm next export`
2. Deploy `out/` directory to GitHub Pages
3. Custom domain setup with DNS CNAME/ALIAS
4. Automated deployment via GitHub Actions

## Current Status

**Note**: This project is currently in the design phase. Only `DESIGN.md` exists with comprehensive specifications. Implementation has not yet begun.

## Template Usage

This is designed as a template repository:
1. Fork the repository
2. Customize `src/config/` files with personal information
3. Run build and export commands
4. Deploy static files to GitHub Pages
5. Configure custom domain if desired

The design emphasizes configuration over code modification, making it easy to personalize without touching component code.