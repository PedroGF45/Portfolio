# Pedro Brito — Portfolio

A modern, responsive portfolio showcasing AI engineering and data science projects. Built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- 🎨 Beautiful space-themed design with animated backgrounds
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast performance with Vite
- 🎯 Interactive project cards with image galleries
- 🌟 Smooth animations with Framer Motion
- 🔍 SEO-friendly structure
- ♿ Accessible components

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/PedroGF45/Portfolio.git
cd Portfolio
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

Visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📂 Project Structure

```
Portfolio/
├── src/
│   ├── components/       # React components
│   │   ├── Hero.tsx
│   │   ├── AboutMe.tsx
│   │   ├── SpaceGallery.tsx
│   │   ├── ContactForm.tsx
│   │   └── ...
│   ├── data/            # Project data
│   │   ├── projects.ts
│   │   └── journeyTimeline.ts
│   ├── styles/          # Global styles
│   │   └── index.css
│   ├── lib/             # Utilities
│   └── App.tsx          # Main app component
├── public/              # Static assets
│   ├── images/          # Project screenshots
│   └── logos/           # Technology logos
├── DEPLOYMENT.md        # Deployment guide
├── CHANGELOG.md         # Change history
└── README.md           # This file
```

## 🎨 Customization

### Update Projects
Edit `src/data/projects.ts` to add/modify projects:
```typescript
{
  id: 'my-project',
  title: 'My Project',
  description: 'Description here',
  repoUrl: 'https://github.com/...',
  date: '2025',
  tech: ['React', 'TypeScript'],
  images: ['/images/my-project/screenshot.png']
}
```

### Change Colors
Edit `src/styles/index.css`:
```css
.bg-space-900 { background-color: #181c2e; }
.text-accent-400 { color: #98a8ee; }
```

### Update Personal Info
- Hero: `src/components/Hero.tsx`
- About: `src/components/AboutMe.tsx`
- Contact: `src/App.tsx` (contact section)

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Options

**Vercel (Recommended)**
```bash
npm i -g vercel
vercel
```

**Netlify**
```bash
npm i -g netlify-cli
netlify deploy --prod
```

**GitHub Pages**
```bash
npm install --save-dev gh-pages
npm run deploy
```

## 🛠️ Technologies Used

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **3D Graphics**: Three.js, React Three Fiber

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 768px
- Desktop: 768px+
- Large Desktop: 1024px+

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript compiler check
- `npm run images:optimize` - Optimize images
- `npm run logos:normalize` - Normalize logo files

## 📝 Recent Updates

See [CHANGELOG.md](./CHANGELOG.md) for detailed changes.

### Latest (November 2025)
- ✅ Made fully responsive for all devices
- ✅ Fixed date alignment on project cards
- ✅ Updated project titles and descriptions
- ✅ Improved contact section layout
- ✅ Added flexbox layouts throughout
- ✅ Created deployment documentation

## 🤝 Contributing

This is a personal portfolio, but feel free to:
- Report bugs
- Suggest improvements
- Fork for your own portfolio

## 📄 License

MIT License - feel free to use this as inspiration for your own portfolio!

## 📧 Contact

- **Email**: pedrobfh@gmail.com
- **GitHub**: [@PedroGF45](https://github.com/PedroGF45)
- **LinkedIn**: [Pedro Brito](https://www.linkedin.com/in/pedro-brito-272b2a192)

---

**Built with ❤️ by Pedro Brito** | Last Updated: November 2025
