# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm run dev` - Start development server with Vite
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint for code quality

### Package Management
- Uses `pnpm` as the package manager (required - see packageManager field in package.json)
- Run `pnpm install` to install dependencies

## Architecture

### Technology Stack
- **React 19** with TypeScript
- **Vite** as build tool and dev server
- **Tailwind CSS v4** with Vite plugin for styling
- **Radix UI** components for accessible UI primitives
- **Framer Motion** for animations
- **React Hook Form + Zod** for form handling and validation
- **React Router DOM** for routing
- **Lenis** for smooth scrolling

### Project Structure
```
src/
├── components/
│   ├── layout/          # Header, Footer
│   ├── sections/        # Page sections (Hero, Features, etc.)
│   └── ui/             # Reusable UI components (Radix + custom)
├── data/
│   └── content.json    # All website content and copy
├── hooks/              # Custom React hooks
├── lib/                # Utilities (mainly utils.ts for cn helper)
├── types/              # TypeScript type definitions
└── assets/             # Images and static assets
```

### Key Architectural Patterns
- **Content-driven**: All website copy and data stored in `src/data/content.json`
- **Component composition**: Uses Radix UI primitives with custom styling
- **Path aliases**: `@/` maps to `src/` directory (configured in vite.config.ts and tsconfig.json)
- **Utility-first CSS**: Tailwind classes with `cn()` utility for conditional styling
- **Single-page application**: Uses React Router for client-side routing

### Currency Exchange Integration
- Real-time exchange rate fetching via `useCurrencyAPI.ts` hook
- Calculator widget in hero section with live rates
- Mobile-responsive design with `use-mobile.ts` hook

### Styling System
- **Tailwind CSS v4** with Vite plugin (not PostCSS)
- Brand colors: Primary purple (#5e29a3), Accent orange (#f05a2b)
- Component variants using `class-variance-authority`
- Responsive design with mobile-first approach

### Content Management
- All text content centralized in `src/data/content.json`
- Structured sections: navigation, hero, calculator, comparison, features, testimonials, FAQ, blog, footer
- Easy to update without touching component code

### Build Configuration
- Vite with React and Tailwind plugins
- TypeScript with strict mode enabled
- ESLint for code quality
- Production builds to `dist/` directory

### Security Measures
- Content Security Policy (CSP) headers configured in `index.html`
- Security headers: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
- API rate limiting and resilience in `useCurrencyAPI.ts`
- CSS injection prevention in chart components
- Dependency security: `.nvmrc`, `.npmrc`, and audit scripts in `package.json`
- See `SECURITY.md` for comprehensive security documentation