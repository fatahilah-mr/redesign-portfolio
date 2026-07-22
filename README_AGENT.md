# 📘 Repository Overview for AI Agents

## 1. What is this repository?

This repository hosts **Fatahilah M.R Portfolio**, a high‑performance, minimalist personal portfolio built with **Astro** and powered by a **Google Sheets‑based CMS**. It showcases a modern, premium UI with dark/light modes, glass‑morphism cards, micro‑animations, and full bilingual support (Indonesian / English). The project is deliberately engineered for:

- **Speed** – Zero JS shipped by default, passive listeners, pre‑connected fonts.
- **Accessibility** – Skip‑to‑content link, ARIA live region, focus‑managed mobile menu.
- **Extensibility** – All UI components are reusable Astro components; data can be updated on‑the‑fly via a Google Sheet.
- **Developer‑friendliness** – Clear file structure, SEO‑optimised meta tags, and a single source of truth for styling.

> **NOTE for AI agents**: The repository is a static‑site code‑base; there is **no backend server** other than the Google Sheets API used for content.

---

## 2. Architecture Overview

### Textual description

- **Entry point** – `src/layouts/Layout.astro` wraps every page, injects SEO tags, theme & language init scripts, and provides slots for page content.
- **Navigation** – `src/components/Navbar.astro` renders a sticky header with a scroll‑progress bar, theme toggle, and a mobile drawer. It is imported by `Layout`.
- **Pages** – Each page under `src/pages/*.astro` imports `Layout` and composes the UI with reusable components (e.g., `FeaturedProjects`, `HomeTeasers`).
- **Styling** – `src/styles/global.css` defines design tokens (`--color-primary`, `--bg-glass`, …) and utility classes for glass‑cards, animations, and responsive grids.
- **Internationalisation** – `src/i18n/ui.js` stores text strings for both languages; the language switcher (`FloatingLang.astro`) toggles `localStorage.lang` and updates the DOM.
- **Data layer** – A tiny client‑side fetch (see `src/lib/googleSheets.js` – not shown here) pulls project and lab data from a public Google Sheet via the `gviz/tq` endpoint.
- **Build** – Astro builds the site to static HTML/CSS under `dist/`; Vercel (via `vercel.json`) handles deployment.

### Mermaid diagram

```mermaid
flowchart LR
    subgraph Layout
        L[Layout.astro]
    end
    subgraph Navbar
        N[Navbar.astro]
    end
    subgraph Pages
        P1[pages/index.astro]
        P2[pages/about.astro]
        P3[pages/projects.astro]
    end
    subgraph Components
        C1[components/FloatingLang.astro]
        C2[components/AchievementHighlight.astro]
        C3[components/FeaturedProjects.astro]
    end
    subgraph Styles
        S[styles/global.css]
    end
    subgraph i18n
        I[i18n/ui.js]
    end
    subgraph Data
        D[Google Sheets (public CSV via gviz/tq)]
    end

    L --> N
    L --> P1 & P2 & P3
    P1 --> C1 & C2 & C3
    P2 --> C1
    P3 --> C1 & C3
    L --> S
    L --> I
    C1 --> I
    C2 --> D
    C3 --> D
``` 

---

## 3. Key Components & File Locations

| Component | Location | Description |
|---|---|---|
| **Layout** | [Layout.astro](file:///data/data/com.termux/files/home/projects/new-portfolio/src/layouts/Layout.astro) | Global HTML shell, SEO tags, theme & language init, slots for page content. |
| **Navbar** | [Navbar.astro](file:///data/data/com.termux/files/home/projects/new-portfolio/src/components/Navbar.astro) | Sticky header, scroll‑progress bar, theme toggle, mobile drawer with ARIA compliance. |
| **FloatingLang** | [FloatingLang.astro](file:///data/data/com.termux/files/home/projects/new-portfolio/src/components/FloatingLang.astro) | Language switcher (ID ↔ EN) that updates `localStorage.lang`. |
| **Global Styles** | [global.css](file:///data/data/com.termux/files/home/projects/new-portfolio/src/styles/global.css) | Design tokens, glass‑morphism utilities, animation keyframes, responsive grid helpers. |
| **Home page** | [index.astro](file:///data/data/com.termux/files/home/projects/new-portfolio/src/pages/index.astro) | Hero section, stats, philosophy highlights, featured components. |
| **i18n strings** | [ui.js](file:///data/data/com.termux/files/home/projects/new-portfolio/src/i18n/ui.js) | Object map of all UI strings for both languages. |
| **Package definition** | [package.json](file:///data/data/com.termux/files/home/projects/new-portfolio/package.json) | Scripts, dependencies, project metadata. |

---

## 4. How to Run / Development Workflow

```bash
# 1️⃣ Clone the repo (already done in the workspace)
# 2️⃣ Install dependencies
npm install

# 🚀 Start the development server (hot‑reloading)
npm run dev
# Open http://localhost:4321 in your browser.

# 📦 Build for production (static files go to /dist)
npm run build
```

- The dev server automatically watches for changes in `.astro`, `.css`, and `.js` files.
- After a build, you can preview the production bundle locally with `npm run preview`.

---

## 5. Dependencies & Scripts (excerpt from `package.json`)

```json
{
  "name": "portfolio",
  "type": "module",
  "version": "2.0.0",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/sitemap": "^3.7.3",
    "astro": "^5.0.0"
  }
}
```

- **Astro 5** – the core static‑site generator.
- **@astrojs/sitemap** – automatically creates an XML sitemap for SEO.
- No additional runtime bundles are shipped to the client.

---

## 6. Design & Aesthetic Guidelines (the “wow” factor)

- **Color palette** – defined in `global.css` using HSL variables (e.g., `--color-primary`, `--color-cyan`).
- **Glass‑morphism** – cards (`.glass-card`) have a translucent background (`var(--bg-glass)`), backdrop‑filter blur, and subtle box‑shadows.
- **Micro‑animations** – the `fadeSlideUp` keyframe drives entry animations for headings, stats, and highlights. Respect for `prefers-reduced-motion` is built‑in.
- **Typography** – Google Fonts (`DM Sans`, `DM Serif Display`, `JetBrains Mono`) are pre‑connected and pre‑loaded for fast FOIT‑free rendering.
- **Responsive layout** – Flexbox and CSS grid utilities adapt gracefully from mobile (≤ 900 px) to desktop.
- **Accessibility** – Skip link, ARIA live region, focus‑managed mobile menu, and meaningful `aria‑current` attributes.

---

## 7. Internationalisation (i18n) Details

- All UI strings live in `src/i18n/ui.js` as a plain object:
  ```js
  export const ui = {
    en: { "nav.home": "Home", … },
    id: { "nav.home": "Beranda", … }
  };
  ```
- The `FloatingLang` component toggles the language and stores the choice in `localStorage.lang`.
- Components read strings via `data-i18n` attributes, e.g., `<a class="nav-link" data-i18n="nav.home"></a>`.
- No server‑side rendering is required; the client swaps text instantly.

---

## 8. Google Sheets CMS Integration

- A **public Google Sheet** (configured as CSV via the `gviz/tq` endpoint) contains rows for projects, labs, certificates, etc.
- A tiny fetch utility (`src/lib/googleSheets.js`) runs at page load, parses the CSV, and feeds the data to components like `FeaturedProjects` and `AchievementHighlight`.
- Because the sheet is public, updates are reflected on the next client visit **without redeploying**.

---

## 9. Testing & Linting Procedures

- **Linting** – The project uses `eslint` (configuration located in the root `.eslintrc.cjs`). Run `npm run lint` (script may be added by the maintainer).
- **Formatting** – `prettier` is configured for consistent Astro/JS/HTML formatting.
- **Type‑checking** – Astro’s TypeScript support validates component props (`export interface Props` in Layout, etc.).
- No automated test suite is included by default, but the clear component boundaries make unit testing straightforward.

---

## 10. Contribution Guidelines

1. **Fork** the repository.
2. **Create a feature branch** (`git checkout -b feat/your‑feature`).
3. **Run the dev server** and make your changes.
4. **Run lint/format** before committing (`npm run lint && npx prettier --write .`).
5. **Open a pull request** with a clear description; reference any relevant issue.

---

## 11. License & Legal Notes

- **Source code** – MIT License (see `LICENSE`).
- **Personal assets** (photos, certificates, branding) – *All Rights Reserved*. Re‑use of personal identifiers is prohibited.

---

## 12. Quick Reference – File Snippet

Below is a representative excerpt from the core layout file that an AI agent can use to understand the page‑shell structure.

```astro
---
import '../styles/global.css';
import Navbar from '../components/Navbar.astro';
import Footer from '../components/Footer.astro';
import FloatingLang from '../components/FloatingLang.astro';
export interface Props { title: string; description?: string; }
---
<!DOCTYPE html>
<html lang="id" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <title>{title} | Fatahilah Miftahul Rahman</title>
  <!-- Preconnect fonts, SEO meta tags, schema.org JSON‑LD … -->
  <script is:inline>{
    (function(){
      const theme = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      const lang = localStorage.getItem('lang') || 'id';
      document.documentElement.setAttribute('lang', lang);
    })();
  }</script>
</head>
<body>
  <a href="#main-content" class="skip-to-content sr-only focus:not-sr-only">Skip to main content</a>
  <Navbar />
  <main id="main-content" tabindex="-1"><slot /></main>
  <FloatingLang />
  <Footer />
</body>
</html>
```

---

*Generated for a **general‑purpose AI agent** to give a complete, non‑hallucinogenic context about the repository.*
