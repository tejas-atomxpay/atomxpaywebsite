# GEMINI.md

## Project Overview

This project is a modern, responsive website for AtomX Pay, a blockchain-powered global remittance platform specializing in US-India money transfers. It is built with React, Vite, and Tailwind CSS, and features a clean, professional design. The website is a single-page application with smooth scrolling navigation and several interactive components.

**Key Technologies:**

*   **Framework:** React 18.3
*   **Build Tool:** Vite 5.x
*   **Styling:** Tailwind CSS 3.4
*   **Language:** TypeScript
*   **Package Manager:** pnpm

**Architecture:**

The application is structured with a main `App.tsx` component that assembles various sections, each in its own component file. The layout is defined by `Header.tsx` and `Footer.tsx` components. Content is loaded from a central `content.json` file, and the application uses a custom hook `useCurrencyAPI` to fetch exchange rates.

## Building and Running

**Prerequisites:**

*   Node.js (v18 or higher)
*   pnpm

**Installation:**

1.  Install dependencies:
    ```bash
    pnpm install
    ```

**Development:**

1.  Start the development server:
    ```bash
    pnpm run dev
    ```
    The application will be available at `http://localhost:5173`.

**Production:**

1.  Build for production:
    ```bash
    pnpm run build
    ```
    The production files will be generated in the `dist/` directory.

2.  Preview the production build:
    ```bash
    pnpm run preview
    ```

**Linting:**

*   Run the linter:
    ```bash
    pnpm run lint
    ```

## Development Conventions

*   **Styling:** Use Tailwind CSS classes for styling. Custom CSS is located in `src/App.css`.
*   **Components:** Create new components in the `src/components` directory, following the existing structure.
*   **Content:** Most text content is managed in `src/data/content.json`.
*   **State Management:** Use React Hooks for state management.
*   **Responsive Design:** Follow a mobile-first approach.
*   **Code Quality:** Run the linter before committing changes.
