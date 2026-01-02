# Visita Bohol - React App Setup & Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm installed on your machine
- If you don't have Node.js, download it from: https://nodejs.org/

### Setup Instructions

#### Option 1: Automated Setup (Windows)
1. Double-click `setup.bat`
2. Wait for installation to complete
3. Run `npm run dev` to start the development server
4. Open http://localhost:5173 in your browser

#### Option 2: Manual Setup (All Platforms)
```bash
# 1. Copy data files to public folder
# Windows:
copy ..\churches.json public\churches.json
copy ..\prayers.json public\prayers.json

# Mac/Linux:
cp ../churches.json public/churches.json
cp ../prayers.json public/prayers.json

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

## 📦 Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)
1. Create account at https://netlify.com
2. Drag and drop the `dist` folder
3. Done! Your app is live

### Option 2: Vercel
1. Create account at https://vercel.com
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in the project folder
4. Follow the prompts

### Option 3: GitHub Pages
```bash
# 1. Initialize git repo
git init
git add .
git commit -m "Initial commit"

# 2. Create repo on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

# 3. Build and deploy
npm run build
# Then upload dist folder contents to gh-pages branch
```

## 🗂️ Project Structure

```
react-app/
├── public/
│   ├── churches.json        # Church data (copy from parent folder)
│   └── prayers.json          # Prayer data (copy from parent folder)
├── src/
│   ├── components/           # React components
│   │   ├── AboutTab.jsx
│   │   ├── BottomNavigation.jsx
│   │   ├── BottomSheet.jsx
│   │   ├── ChurchCard.jsx
│   │   ├── DirectoryTab.jsx
│   │   ├── MapTab.jsx
│   │   ├── SplashScreen.jsx
│   │   ├── ToastContainer.jsx
│   │   └── VisitaTab.jsx
│   ├── hooks/                # Custom React hooks
│   │   ├── useGeolocation.js
│   │   ├── useLocalStorage.js
│   │   └── useToast.js
│   ├── utils/                # Utility functions
│   │   └── helpers.js
│   ├── App.jsx               # Main app component
│   ├── index.css             # Global styles
│   └── main.jsx              # Entry point
├── index.html                # HTML template
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
└── tailwind.config.js        # Tailwind CSS configuration
```

## ✨ Features

- ✅ Interactive map with Leaflet
- ✅ Church directory with search and filtering
- ✅ Diocese filtering (Tagbilaran / Talibon)
- ✅ GPS location services
- ✅ Find nearest church
- ✅ Visita Iglesia pilgrimage planner
- ✅ Station prayers
- ✅ Offline-capable with local storage
- ✅ Responsive design
- ✅ Fast and modern (React + Vite)

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📝 Important Notes

1. **Data Files**: Make sure to copy `churches.json` and `prayers.json` from the parent folder to the `public` folder before running
2. **Node.js**: This app requires Node.js 18+ to run
3. **Modern Browsers**: For best experience, use Chrome, Firefox, Safari, or Edge
4. **GPS Permissions**: The "Find Nearest Church" feature requires browser location permissions

## 🐛 Troubleshooting

### "npm is not recognized"
- Install Node.js from https://nodejs.org/

### Churches not loading
- Make sure `churches.json` and `prayers.json` are in the `public` folder
- Check browser console for errors (F12)

### Map not displaying
- Check internet connection (map tiles require internet)
- Disable browser extensions that might block content

## 📧 Support

For issues or questions:
- Email: feedback.visitabohol@gmail.com
- Check the main README.md for more information

## 📄 License

Created for the Diocese of Tagbilaran & Talibon

---

**Version 1.0.0** - Built with ❤️ for the Catholic community in Bohol
