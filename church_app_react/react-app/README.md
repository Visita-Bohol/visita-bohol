# Visita Bohol

**Catholic Church Finder & Visita Iglesia App**

A comprehensive web application for discovering and visiting Catholic churches across Bohol, Philippines. Features include interactive maps, detailed church information, mass schedules, and a guided Visita Iglesia (church pilgrimage) experience.

## Features

- 🗺️ **Interactive Map** - View all churches in Bohol with filtering by diocese
- ⛪ **Church Directory** - Browse detailed information about each church including:
  - Mass schedules
  - Patronal feast days
  - Church history
  - Contact information
- 🙏 **Visita Iglesia** - Guided pilgrimage experience with:
  - Route planning for 7 churches
  - Station prayers
  - Progress tracking
- 📍 **Location Services** - Find nearest church based on your GPS location
- 🔍 **Search & Filter** - Quickly find churches by name, location, or diocese

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Leaflet** - Interactive mapping library
- **React Leaflet** - React components for Leaflet
- **SortableJS** - Drag-and-drop church route planning

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd visita-bohol
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
visita-bohol/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── data/           # Church and prayer data
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Helper functions
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies
└── vite.config.js      # Vite configuration
```

## Deployment

This app can be deployed to:
- **Netlify** - Drag and drop the `dist` folder
- **Vercel** - Connect your GitHub repo
- **GitHub Pages** - Use GitHub Actions
- **Any static hosting** - Upload the `dist` folder

## Data Sources

Church information includes data from:
- Diocese of Tagbilaran
- Diocese of Talibon
- Official church Facebook pages
- Community contributions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Reporting Issues

If you notice incorrect mass schedules, feast dates, or other church details, please:
- Open an issue on GitHub
- Email: feedback.visitabohol@gmail.com

## License

This project is created for the Diocese of Tagbilaran & Talibon.

## Version

**v1.0.0** - Initial Release

---

Made with ❤️ for the Catholic community in Bohol
