# ImmerseForge Website

A premium experiential design agency website showcasing immersive web experiences, 3D interactives, and digital branding services.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Wouter** - Lightweight routing
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Design System

- **Colors**: Black backgrounds with copper/amber accents
- **Fonts**:
  - Bebas Neue (display)
  - Space Mono (monospace)
  - Cormorant Garamond (serif)
- **Theme**: Dark, cinematic aesthetic

## Project Structure

```
immerseforge-website/
├── public/
│   └── website-content.json    # All website content
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Site footer
│   │   └── Layout.tsx          # Page wrapper
│   ├── pages/
│   │   ├── Home.tsx            # Home page
│   │   ├── Work.tsx            # Portfolio page
│   │   └── About.tsx           # About page
│   ├── hooks/
│   │   └── useWebsiteContent.ts # Content loader
│   ├── App.tsx                 # Main app with routing
│   └── index.css               # Global styles
└── package.json
```

## Getting Started

1. **Navigate to the project folder:**
   ```bash
   cd immerseforge-website
   ```

2. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check with TypeScript

## Features

### Home Page
- Hero section with animated title
- Philosophy section
- Services grid with icons
- Statistics showcase
- Client quote
- Process steps (4-stage)
- Contact CTA

### Work Page
- Portfolio grid
- Project showcase with alternating layout
- Category tags
- Client information
- Case study links

### About Page
- Company story
- Forge Method explanation
- Capabilities grid
- Leadership team profiles

## Customization

All content is loaded from `/public/website-content.json`. To modify the website content:

1. Edit the JSON file in the `public` folder
2. The changes will be reflected automatically

## Animation Features

- Scroll-triggered animations using Framer Motion
- Fade-in and slide-up effects
- Hover states on interactive elements
- Mobile menu transitions

## Responsive Design

The website is fully responsive and works on:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1280px+)

## Browser Support

Modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

---

Built with React + Vite + Tailwind CSS
