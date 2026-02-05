# KTLYST Labs - Landing Page

MVP landing page for KTLYST Labs built with Vite + React + Tailwind CSS.

## 🚀 Local Development

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn

### Setup & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 📦 Project Structure

```
website/
├── public/
│   └── logo.jpeg              # KTLYST Labs logo
├── src/
│   ├── components/
│   │   ├── Hero.jsx           # Hero section with logo & CTA
│   │   ├── Problem.jsx        # Problem statement
│   │   ├── Solution.jsx       # Solution overview
│   │   ├── HowItWorks.jsx     # 3-step process
│   │   ├── Differentiators.jsx # Key differentiators
│   │   ├── Team.jsx           # Team members
│   │   └── Footer.jsx         # Contact & footer
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Tailwind + custom styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Design System

### Colors
- **Background**: `#0a1628` (dark navy)
- **Secondary Background**: `#111827` (navy-dark)
- **Headers**: `#9ca3af` (silver)
- **Accent/CTA**: `#7dd3fc` (light blue)
- **Hover**: `#38bdf8` (accent-hover)
- **Body Text**: `#ffffff` (white)

### Typography
- Headings: Bold, large sizes with responsive scaling
- Body: Silver/white on dark navy background
- High contrast for readability

## 🚀 Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to website directory
cd /Users/assafkip/Desktop/Safety_Sigma_Main_repo/website

# Login to Vercel (first time only)
vercel login

# Deploy to production
vercel --prod
```

### Method 2: Vercel Dashboard

1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite configuration
6. Click "Deploy"

### Vercel Configuration

No additional configuration needed! Vercel auto-detects Vite projects.

If you need custom settings, create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Environment Variables (if needed)

Add environment variables in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add any required keys

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `ktlystlabs.com`)
3. Update DNS records as instructed by Vercel

## 📝 Content

All content sourced from `/Users/assafkip/Desktop/Safety_Sigma_Main_repo/docs/website-content.md`

### Team Info
- **Assaf Kipnis** - Founder & CEO
- **Stephan Kaufmann** - Co-Founder & COO

### Contact
- **Email**: crew@ktlystlabs.com
- **Calendly**: https://calendly.com/assafkip

## 🔧 Tech Stack

- **Framework**: Vite 5
- **Library**: React 18
- **Styling**: Tailwind CSS 3
- **Build Tool**: Vite
- **Deployment**: Vercel (recommended)

## 📱 Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth scroll navigation
- ✅ Optimized for performance
- ✅ SEO-friendly meta tags
- ✅ Accessible design
- ✅ Fast load times

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

© 2024 KTLYST Labs. All rights reserved.

---

**Built with ❤️ by KTLYST Labs**
