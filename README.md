# CityPulse — Smart City Explorer

An interactive smart-city companion for Bengaluru. Explore places, check live
traffic and safety reports, compare localities, map heritage trails, and get an
AI assistant — all in a single-page React app.

## Features

- **Home dashboard** — city health stats, weather, traffic and news highlights
- **Explore Map** — Leaflet map with category filters, safety zones, place search
  (Nominatim), and turn-by-turn-ish routing via OSRM
- **Discover** — browse and filter places, open detail modals
- **Safety** — live community safety reports, SOS panel, and a safety-zones map
- **Compare** — side-by-side comparison of places (rating, safety, value)
- **Insights** — city analytics (traffic, sentiment, health stats)
- **Community** — social feed and community reporting
- **Culture** — heritage trails, historical landmarks, and local traditions
- **AI Chat** — local rule-based city assistant
- Dark/light theme toggle

## Tech Stack

- **React 18** + JSX, React Context for state
- **Vite 5** (`@vitejs/plugin-react`)
- **Tailwind CSS 3.4** + PostCSS + Autoprefixer
- **Leaflet 1.9** (used directly)
- OpenStreetMap / CARTO tiles, Nominatim geocoding, OSRM routing

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the build
```

## Project structure

```
index.html
package.json
vite.config.js
tailwind.config.js
postcss.config.js
src/
  main.jsx            # entry (imports leaflet.css + index.css)
  App.jsx             # layout, page routing, global state provider
  AppContext.jsx      # React context
  data.js             # static city data (places, safety, traffic, ...)
  index.css           # Tailwind layers + custom CSS (theme variables)
  components/
    Navbar, Sidebar, Home, MapPage, Discover, Safety, Compare,
    Insights, Community, Culture, PlaceCard, Modals, Toast,
    AIChat, WeatherBanner
```

## Notes
- No backend: all data is static in `src/data.js`; weather/AI are local.
- Map tiles and geocoding use public OpenStreetMap/Nominatim/OSRM services.
