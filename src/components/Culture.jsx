import { useApp } from '../AppContext.jsx';
import { HERITAGE_TRAILS, LANDMARKS, TRADITIONS } from '../data.js';

export default function Culture() {
  const { showToast } = useApp();

  return (
    <div className="page active">
      <div className="culture-hero">
        <h1 className="page-title">🏛️ Culture &amp; Heritage</h1>
        <p className="page-sub" style={{ maxWidth: 640, margin: '10px auto 0' }}>
          Walk through 500 years of Bengaluru — heritage trails, landmarks and living traditions.
        </p>
      </div>

      <div className="section-header">
        <h2>🥾 Heritage Trails</h2>
        <span className="section-sub">Self-guided walks</span>
      </div>
      <div className="trails-grid">
        {HERITAGE_TRAILS.map((t, i) => (
          <div key={i} className="trail-card">
            <div className="trail-header">
              <span className="trail-name">{t.name}</span>
              <span className={`trail-diff ${t.difficulty}`}>{t.difficulty}</span>
            </div>
            <div className="trail-stats">
              <span>📏 {t.distance}</span>
              <span>⏱️ {t.duration}</span>
              <span>📍 {t.stops.length} stops</span>
            </div>
            <div className="trail-stops">
              {t.stops.map((s, j) => (
                <div key={j} className="trail-stop">
                  <span className="stop-dot" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="section-header">
        <h2>🏰 Historical Landmarks</h2>
        <span className="section-sub">Centuries of stories</span>
      </div>
      <div className="landmarks-grid">
        {LANDMARKS.map((l, i) => (
          <div key={i} className="landmark-card" onClick={() => showToast(`${l.emoji} ${l.name} — ${l.era}`)}>
            <div className="landmark-emoji">{l.emoji}</div>
            <div className="landmark-name">{l.name}</div>
            <div className="landmark-era">{l.era}</div>
            <div className="landmark-desc">{l.desc}</div>
          </div>
        ))}
      </div>

      <div className="section-header">
        <h2>🎊 Living Traditions</h2>
        <span className="section-sub">Festivals through the year</span>
      </div>
      <div className="traditions-scroll">
        {TRADITIONS.map((t, i) => (
          <div key={i} className="tradition-card">
            <div className="tradition-emoji">{t.emoji}</div>
            <div className="tradition-name">{t.name}</div>
            <div className="tradition-when">{t.when}</div>
            <div className="tradition-desc">{t.desc}</div>
          </div>
        ))}
      </div>

      <div className="card ar-card">
        <span className="ar-icon">🥽</span>
        <div>
          <h3>AR Heritage Experience</h3>
          <p>
            Point your camera at a landmark to overlay its history, architecture notes and audio
            guides in augmented reality.
          </p>
          <button className="btn-primary" onClick={() => showToast('🧭 AR mode launching…')}>
            Launch AR Guide
          </button>
        </div>
      </div>
    </div>
  );
}
