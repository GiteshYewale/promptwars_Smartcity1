import { useApp } from '../AppContext.jsx';
import { PLACES } from '../data.js';
import PlaceCard from './PlaceCard.jsx';
import WeatherBanner from './WeatherBanner.jsx';

const ALERTS = [
  { level: 'danger', text: '🚧 Silk Board: Waterlogging reported' },
  { level: 'warning', text: '⚠️ ORR: Heavy congestion Marathahalli → KR Puram' },
  { level: 'info', text: '🚇 Metro Green Line running on time' },
  { level: 'success', text: '✅ Cubbon Park open · Excellent conditions' },
  { level: 'warning', text: '🌧️ Rain expected after 6 PM' },
];

const STATS = [
  { icon: '🏙️', number: '22', label: 'Places Mapped' },
  { icon: '🛡️', number: '98%', label: 'Safety Score' },
  { icon: '📡', number: '24/7', label: 'Live Alerts' },
  { icon: '👥', number: '5.0K', label: 'Explorers' },
];

export default function Home() {
  const { setPage, openChat } = useApp();
  const featured = [...PLACES].sort((a, b) => b.rating - a.rating).slice(0, 6);

  const actions = [
    { icon: '🗺️', label: 'Explore Map', onClick: () => setPage('map') },
    { icon: '🛡️', label: 'Safety Zones', onClick: () => setPage('safety') },
    { icon: '📊', label: 'Compare Places', onClick: () => setPage('compare') },
    { icon: '🤖', label: 'AI Assistant', onClick: openChat },
  ];

  return (
    <div className="page active">
      <WeatherBanner />

      <div className="alerts-strip">
        <span className="live-badge">● LIVE</span>
        <div className="alerts-scroll">
          {ALERTS.map((a, i) => (
            <span key={i} className={`alert-chip ${a.level}`}>{a.text}</span>
          ))}
        </div>
      </div>

      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Feel the <span className="gradient-text">Pulse</span> of Bengaluru
          </h1>
          <p className="hero-subtitle">
            CityPulse brings live safety intelligence, curated places, cultural trails and civic
            insights together — so you can explore the city with confidence.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => setPage('map')}>🧭 Explore the Map</button>
            <button className="btn-secondary" onClick={() => setPage('discover')}>Discover Places</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="city-card-float">
            <span className="city-pulse">🏙️</span>
            <span className="pulse-ring" />
            <span className="pulse-ring ring2" />
          </div>
          <span className="float-stat top-left">🛡️ 98% Safe</span>
          <span className="float-stat top-right">📡 Live</span>
          <span className="float-stat bottom-left">🌳 300 acres</span>
          <span className="float-stat bottom-right">⭐ 4.6 avg</span>
        </div>
      </section>

      <div className="stats-grid">
        {STATS.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-number">{s.number}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="quick-actions">
        {actions.map((a, i) => (
          <button key={i} className="quick-action-btn" onClick={a.onClick}>
            <span className="qa-icon">{a.icon}</span>
            <span className="qa-label">{a.label}</span>
          </button>
        ))}
      </div>

      <div className="section-header">
        <h2>⭐ Top Rated Places</h2>
        <span className="section-sub">Handpicked by the community</span>
      </div>
      <div className="places-grid">
        {featured.map((p) => (
          <PlaceCard key={p.id} place={p} />
        ))}
      </div>
    </div>
  );
}
