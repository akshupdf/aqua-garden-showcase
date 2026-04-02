# A² Hydroponics - Premium Hydroponic Solutions Website

A modern, responsive website for A² Hydroponics - a company specializing in hydroponic NFT systems and comprehensive AMC (Annual Maintenance Contract) services.

## 🌿 Features

- **Modern Design**: Clean, contemporary UI with gradient backgrounds and smooth animations
- **Fully Responsive**: Optimized for all devices - mobile, tablet, and desktop
- **Interactive Components**: 3D product carousel, animated hero section, and smooth transitions
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Fast Performance**: Built with Vite for optimal loading speeds
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🚀 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Routing**: React Router v6
- **Animations**: Custom CSS animations and Tailwind animate
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **State Management**: TanStack Query

## 📦 Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd asquare

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🌐 Deployment to Vercel

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your repository
5. Vercel will automatically detect the Vite configuration
6. Click "Deploy"

### Option 3: Deploy with a Single Click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<YOUR_REPO_URL>)

## 📁 Project Structure

```
asquare/
├── src/
│   ├── assets/          # Images, videos, and static assets
│   ├── components/      # Reusable UI components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── blogs/      # Blog-related components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   └── ...
│   ├── pages/          # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── Products.tsx
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── index.css       # Global styles and design system
│   └── main.tsx        # Application entry point
├── public/             # Static files
├── vercel.json         # Vercel deployment configuration
└── package.json        # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **Primary**: Green gradient (from-green-600 to-emerald-600)
- **Secondary**: Earthy greens and teals
- **Accent**: Fresh lime and mint highlights
- **Background**: Soft cream and white variations

### Typography
- **Headings**: Space Grotesk (modern, geometric)
- **Body**: Plus Jakarta Sans (clean, highly readable)

### Animations
- Fade-in and slide-in effects
- Hover scale transformations
- Smooth color transitions
- Floating elements and pulse effects

## 🔧 Configuration

### Vercel Configuration (vercel.json)
- Rewrites all routes to index.html for SPA
- Sets cache headers for static assets
- Optimized for CDN delivery

### Build Configuration (vite.config.ts)
- Path aliases (@/ for src/)
- React SWC for fast refresh
- Optimized production builds

## 📱 Performance Optimization

- Code splitting and lazy loading
- Image optimization with modern formats
- CSS minification and purging
- Asset compression and caching
- Preloading of critical resources

## 🧪 Testing

Before deploying, ensure:

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔄 CI/CD

The project is configured for automatic deployment on Vercel when:
- Code is pushed to the main branch
- A pull request is created/updated

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
# Add your environment variables here
# VITE_API_URL=your_api_url
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 👥 Contact

- **Company**: A² Hydroponics
- **Email**: info@asquarehydroponics.com
- **Phone**: +91 98765 43210

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Hosting by [Vercel](https://vercel.com/)
