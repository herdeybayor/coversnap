# CoverSnap ✦

> Generate beautiful project cover images for portfolios, READMEs, social media, and case studies — right in your browser.

[![MIT License](https://img.shields.io/badge/License-MIT-6366f1?style=flat-square)](LICENSE)
[![Made with React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

---

## ✨ Features

- 🎨 **5 Template Variants** — Full Phone, Cropped Phone, Flat Browser, 3D Perspective, Cropped Browser
- ⚡ **Live Preview** — Every change renders in real-time on a high-fidelity canvas
- 🎯 **10 Accent Colors** — Indigo, Purple, Green, Teal, Blue, Rose, Amber, Red, Pink, Emerald
- 🖼 **8 Background Palettes** — Deep, rich gradient backgrounds with dot-grid textures
- 📷 **Screenshot Upload** — Drag & drop your own app screenshot into the device frame
- 📥 **Retina Export** — Download as 2160×2160px PNG at 2x resolution
- 🔒 **No Backend** — 100% client-side, your data never leaves your browser
- 🌙 **Dark UI** — Sleek dark theme designed for creative workflows

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/herdeybayor/coversnap.git

# Navigate to the project
cd coversnap

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser and start creating!

## 📖 Usage

### 1. Choose a Template

Select from 5 carefully crafted templates — 2 for mobile apps, 3 for websites. Each template has its own default color palette.

### 2. Customize Content

- **Title** — Your app name or project name
- **Subtitle** — A tagline or welcome message
- **URL** — Displayed in the browser chrome (website templates only)

### 3. Pick Your Colors

Choose from 10 accent colors and 8 background palettes. The accent color affects buttons, charts, gradients, and highlights within the preview.

### 4. Upload a Screenshot (Optional)

Drag & drop or click to upload your own app screenshot. It will be rendered inside the device frame, replacing the placeholder UI.

### 5. Export

Click **Export PNG (2x)** to download a 2160×2160px retina-ready image. Perfect for:

- GitHub README headers
- Portfolio project cards
- Social media (Twitter/X, LinkedIn, Dribbble)
- Case study hero images
- Behance project covers

## 📦 Build for Production

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

The output will be in the `dist/` directory, ready to deploy to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## 🎨 Templates

| Template | Type | Best For |
|----------|------|----------|
| **Full Phone** | 📱 Mobile | Showcasing full device design |
| **Cropped Phone** ★ | 📱 Mobile | Making screen content large & readable |
| **Flat Browser** | 🌐 Website | Clean, minimal presentation |
| **3D Perspective** ★ | 🌐 Website | Eye-catching, modern portfolio pieces |
| **Cropped Browser** | 🌐 Website | Emphasizing page content |

> ★ = Recommended templates for maximum visual impact

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Vite](https://vite.dev) | Lightning-fast build tool & dev server |
| [React 19](https://react.dev) | UI component library |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first CSS framework |
| [shadcn/ui](https://ui.shadcn.com) | Beautiful, accessible UI components |
| [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) | High-performance rendering engine |

## 📁 Project Structure

```
coversnap/
├── index.html                   # App shell
├── package.json                 # Dependencies & scripts
├── vite.config.js               # Vite configuration
├── src/
│   ├── main.jsx                 # React entry point
│   ├── App.jsx                  # Root component
│   ├── index.css                # Tailwind + shadcn theme
│   ├── components/
│   │   ├── Editor.jsx           # Main editor UI
│   │   └── ui/                  # shadcn/ui components
│   └── lib/
│       ├── renderer.js          # Canvas rendering engine
│       └── utils.js             # Utility functions
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── LICENSE
```

## 🤝 Contributing

We love contributions! Whether it's fixing a bug, adding a feature, or improving documentation — every contribution matters.

Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

### Quick Start for Contributors

```bash
# Fork & clone
git clone https://github.com/YOUR_USERNAME/coversnap.git
cd coversnap
npm install
npm run dev
```

### Ideas for Contribution

| Category | Ideas |
|----------|-------|
| 🎨 Templates | Tablet, desktop, terminal, smartwatch |
| 🎯 Features | SVG export, clipboard copy, share links |
| 🔧 Developer | CLI tool, npm package, API endpoints |
| 🌍 i18n | Multi-language support |
| 📚 Docs | Tutorials, video walkthroughs, examples |

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free for personal and commercial use.

---

<p align="center">
  Built with ❤️ by <a href="https://dub.sh/herdeybayor">herdeybayor</a>
</p>
