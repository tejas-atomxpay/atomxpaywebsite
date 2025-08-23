# AtomX Pay Website

A modern, responsive website for AtomX Pay - a blockchain-powered global remittance platform specializing in US-India money transfers.

## 🚀 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Calculator**: Real-time exchange rate calculator with live updates
- **Modern UI/UX**: Clean, professional design following AtomX Pay brand guidelines
- **Smooth Navigation**: Sticky navigation with smooth scrolling to sections
- **FAQ System**: Interactive accordion-style FAQ section
- **Performance Optimized**: Fast loading times and optimized assets

## 🎨 Design System

### Brand Colors
- **Primary Purple**: `#5e29a3`
- **Accent Orange**: `#f05a2b`
- **Gradient**: Linear gradient from `#5e29a3` to `#7c3aed`

### Typography
- **Font Family**: Marmelad Regular (Google Fonts)
- **Responsive Text Sizes**: Scales appropriately across devices

### Components
- Hero section with value proposition
- Exchange rate calculator widget
- Feature comparison table
- 3-step process explanation
- Customer testimonials
- Interactive FAQ section
- Comprehensive footer

## 🛠️ Technology Stack

- **Framework**: React 18.3
- **Build Tool**: Vite 5.x
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **State Management**: React Hooks (useState)
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
atomx-pay-website/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── Atomx-01.png
│   │   ├── COMPANYNAME-01-01.png
│   │   ├── INITIAL-01.png
│   │   └── react.svg
│   ├── components/
│   │   └── ui/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── dist/ (production build)
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. **Clone or extract the project**
   ```bash
   cd atomx-pay-website
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm run dev --host
   # or
   npm run dev -- --host
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
pnpm run build
# or
npm run build
```

The production files will be generated in the `dist/` directory.

### Preview Production Build

```bash
pnpm run preview
# or
npm run preview
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Key Features Implementation

### Exchange Rate Calculator
- Real-time calculation based on input amount
- Shows exchange rate, fees, and total cost
- Responsive design with proper validation
- Located in the hero section for maximum visibility

### Navigation System
- Sticky header that remains visible while scrolling
- Smooth scrolling to different sections
- Mobile-responsive hamburger menu
- Active state indicators

### FAQ Section
- Accordion-style expandable questions
- Clean, accessible design
- Covers common customer questions
- Easy to maintain and update

### Performance Optimizations
- Optimized images and assets
- Efficient CSS with Tailwind
- Minimal JavaScript bundle
- Fast loading times

## 🔧 Customization

### Updating Content
- Edit `src/App.jsx` to modify text content
- Update exchange rates in the calculator component
- Modify FAQ questions and answers
- Change testimonials and customer reviews

### Styling Changes
- Brand colors are defined in `src/App.css`
- Tailwind classes can be modified directly in components
- Custom CSS classes available for specific styling needs

### Adding New Sections
- Follow the existing component structure
- Maintain responsive design principles
- Use consistent spacing and typography

## 🌐 Deployment Options

### Static Hosting (Recommended)
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### Traditional Web Hosting
- Upload `dist/` folder contents to web server
- Ensure proper MIME types for assets
- Configure redirects for single-page application

## 📊 Performance Metrics

- **Lighthouse Score**: 90+ (estimated)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔒 Security Considerations

- No sensitive data stored in frontend
- All external links properly configured
- Input validation for calculator
- Secure asset loading

## 📞 Support

For technical support or questions about the website:
- Review this documentation
- Check the browser console for any errors
- Ensure all dependencies are properly installed
- Verify Node.js version compatibility

## 📄 License

This project is proprietary to AtomX Pay. All rights reserved.

---

**Built with ❤️ for AtomX Pay**
*Making global money transfers simple, fast, and affordable.*

