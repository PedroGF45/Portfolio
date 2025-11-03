# Pedro Brito — Portfolio

A modern, responsive portfolio showcasing AI engineering and data science projects. Built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- 🎨 **Space-themed Design** — Beautiful animated backgrounds with cosmic aesthetics
- 📱 **Fully Responsive** — Optimized layouts for mobile, tablet, and desktop
- ⚡ **Fast Performance** — Powered by Vite for lightning-fast development and builds
- 🖼️ **Image Gallery** — Interactive project showcases with keyboard navigation
- � **Smooth Animations** — Framer Motion for fluid transitions and micro-interactions
- � **Timeline Visualization** — Interactive journey through career milestones
- 💼 **Smart CTA** — Floating hire button that intelligently transitions to inline
- 🎯 **Flexbox Layouts** — Precise alignment and responsive behavior
- ♿ **Accessible** — Semantic HTML, ARIA labels, and keyboard support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/PedroGF45/Portfolio.git
cd Portfolio
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📂 Project Structure

```
Portfolio/
├── src/
│   ├── components/          # React components
│   │   ├── Hero.tsx         # Landing hero section
│   │   ├── AboutMe.tsx      # About + timeline
│   │   ├── SpaceGallery.tsx # Project showcase
│   │   ├── ImageGallery.tsx # Image lightbox
│   │   ├── ContactForm.tsx  # Contact form
│   │   └── CTA.tsx          # Floating hire button
│   ├── data/                # Static data
│   │   ├── projects.ts      # Project information
│   │   └── journeyTimeline.ts # Career timeline
│   ├── styles/              # Global styles
│   │   └── index.css        # Tailwind + custom CSS
│   └── App.tsx              # Main app component
├── public/                  # Static assets
│   ├── images/              # Project screenshots
│   └── logos/               # Technology logos
└── README.md                # This file
```

## 🎨 Customization

### Update Projects
Edit `src/data/projects.ts`:
```typescript
{
  id: 'my-project',
  title: 'My Project',
  description: 'Brief description',
  repoUrl: 'https://github.com/...',
  date: '2025',
  tech: ['React', 'TypeScript'],
  images: ['/images/my-project/screenshot.png']
}
```

### Modify Timeline
Edit `src/data/journeyTimeline.ts` to update career milestones.

### Change Theme Colors
Edit `src/styles/index.css`:
```css
.bg-space-900 { background-color: #181c2e; }
.text-accent-400 { color: #98a8ee; }
```

## �️ Technologies

- **React 18** — Modern UI framework
- **Vite 5** — Fast build tooling
- **TypeScript** — Type safety
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Smooth animations
- **React Icons** — Icon library

## 📱 Responsive Design

- **Mobile**: < 640px — Optimized touch interactions, simplified layouts
- **Tablet**: 640px - 1024px — Balanced content density
- **Desktop**: 1024px+ — Full feature set with spacious layouts

## 🧪 Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint
- `npm run typecheck` — Type check with TypeScript

## � Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Quick Deploy:**
```bash
# Vercel
vercel

# Netlify
netlify deploy --prod

# GitHub Pages
npm run deploy
```

## 📄 License

MIT License — feel free to use as inspiration for your own portfolio!

## 📧 Contact

- **Email**: pedrobfh@gmail.com
- **GitHub**: [@PedroGF45](https://github.com/PedroGF45)
- **LinkedIn**: [Pedro Brito](https://www.linkedin.com/in/pedro-brito-272b2a192)

---

**Built with ❤️ by Pedro Brito**
