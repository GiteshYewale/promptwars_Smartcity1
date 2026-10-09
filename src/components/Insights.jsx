import { TRAFFIC_DATA, SOCIAL_FEED, NEWS_DATA } from '../data.js';

const FORECAST = [
  { day: 'Mon', icon: '⛅', temp: '28°' },
  { day: 'Tue', icon: '🌧️', temp: '26°' },
  { day: 'Wed', icon: '☀️', temp: '30°' },
  { day: 'Thu', icon: '⛈️', temp: '25°' },
  { day: 'Fri', icon: '⛅', temp: '27°' },
];

const HEALTH = [
  { icon: '🌫️', label: 'Air Quality', value: '62 · Moderate' },
  { icon: '🚦', label: 'Traffic Flow', value: '64% · Busy' },
  { icon: '🌳', label: 'Green Cover', value: '38% · Good' },
  { icon: '💧', label: 'Water Supply', value: 'Stable' },
];

const sevLabel = { high: 'HIGH', med: 'MED', low: 'LOW' };

export default function Insights() {
  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">📡 City Insights</h1>
        <p className="page-sub">
          Live weather, traffic, air quality and civic signals <span className="live-dot">● LIVE</span>
        </p>
      </div>

      <div className="insights-grid">
        <div className="card weather-card col-span-2">
          <div className="weather-header">
            <span className="weather-icon-big">⛅</span>
            <div>
              <div className="weather-temp">28°C</div>
              <div className="weather-desc">Partly Cloudy · Bengaluru · Feels like 30°</div>
            </div>
          </div>
          <div className="weather-details">
            <span>💨 Wind 12 km/h</span>
            <span>💧 Humidity 58%</span>
            <span>🌧️ Rain 20%</span>
            <span>🌇 Sunset 6:24 PM</span>
          </div>
          <div className="weather-alert">⚠️ Light showers expected after 6 PM — carry an umbrella.</div>
          <div className="forecast-row">
            {FORECAST.map((f) => (
              <div key={f.day} className="forecast-day">
                <span>{f.day}</span>
                <span style={{ fontSize: '1.3rem' }}>{f.icon}</span>
                <span>{f.temp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>🌫️ Air Quality Index</h3>
          <div className="aqi-card">
            <span className="aqi-number" style={{ color: 'var(--warning)' }}>62</span>
            <span className="aqi-label">Moderate<br /><small style={{ color: 'var(--text-muted)' }}>Acceptable for most</small></span>
          </div>
          <div className="aqi-bar">
            <div className="aqi-fill" style={{ width: '62%', background: 'linear-gradient(90deg,#10b981,#f59e0b)' }} />
          </div>
        </div>

        <div className="card col-span-2">
          <h3>🚦 Live Traffic <span className="live-dot">●</span></h3>
          <div className="traffic-list">
            {TRAFFIC_DATA.map((t, i) => (
              <div key={i} className="traffic-item">
                <span className={`traffic-sev ${t.severity}`}>{sevLabel[t.severity]}</span>
                <div className="traffic-info">
                  <div className="traffic-road">{t.road}</div>
                  <div className="traffic-detail">{t.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>🏙️ City Health</h3>
          <div className="city-health-stats">
            {HEALTH.map((h, i) => (
              <div key={i} className="health-stat">
                <span>{h.icon}</span>
                <span>{h.label}</span>
                <strong>{h.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="card col-span-2">
          <h3>💬 Social Pulse</h3>
          <div className="social-feed">
            {SOCIAL_FEED.map((s, i) => (
              <div key={i} className="social-post">
                <div className="social-user">{s.type} {s.user}</div>
                <div className="social-text">{s.text}</div>
                <div className="social-meta">
                  <span>{s.time}</span>
                  <span>❤️ {s.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>📰 City News</h3>
          <div className="news-list">
            {NEWS_DATA.map((n, i) => (
              <div key={i} className="news-item">
                <div className="news-title">{n.title}</div>
                <div className="news-meta">{n.cat} · {n.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
