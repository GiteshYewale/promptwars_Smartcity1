import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useApp } from '../AppContext.jsx';
import { MAP_POINTS, SAFETY_REPORTS } from '../data.js';

const CENTER = [12.9716, 77.5946];

function safetyColor(level) {
  if (level === 'caution') return '#f59e0b';
  if (level === 'danger') return '#ef4444';
  return '#10b981';
}

function escapeHtml(str) {
  return String(str == null ? '' : str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default function Safety() {
  const { communityReports, setCommunityReports, openSos, openReportModal } = useApp();
  const mapElRef = useRef(null);

  const zones = MAP_POINTS.filter((p) => p.category === 'safety');
  const safe = zones.filter((z) => z.safetyLevel === 'safe').length;
  const caution = zones.filter((z) => z.safetyLevel === 'caution').length;
  const danger = zones.filter((z) => z.safetyLevel === 'danger').length;

  useEffect(() => {
    const map = L.map(mapElRef.current, { center: CENTER, zoom: 12, zoomControl: false });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: '&copy; CARTO',
    }).addTo(map);
    zones.forEach((z) => {
      const color = safetyColor(z.safetyLevel);
      L.circle([z.lat, z.lng], {
        radius: z.safetyLevel === 'safe' ? 750 : 650,
        color,
        fillColor: color,
        fillOpacity: 0.3,
        weight: 1,
      })
        .bindPopup(`<strong>${escapeHtml(z.name)}</strong><br>${escapeHtml(z.desc || '')}`)
        .addTo(map);
    });
    const t = setTimeout(() => map.invalidateSize(), 60);
    const onResize = () => map.invalidateSize();
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
      map.remove();
    };
  }, []);

  const vote = (id) => {
    setCommunityReports((reports) =>
      reports.map((r) => (r.id === id ? { ...r, votes: r.votes + 1 } : r))
    );
  };

  const statusBadge = (status) => {
    if (/verified/i.test(status)) return 'success';
    if (/review|reported/i.test(status)) return 'warning';
    if (/chronic|upcoming/i.test(status)) return 'danger';
    return 'info';
  };

  return (
    <div className="page active">
      <div className="page-header-row">
        <div>
          <h1 className="page-title">🛡️ Safety Center</h1>
          <p className="page-sub">Real-time safety scores, zones and community reports</p>
        </div>
        <button className="btn-primary" onClick={openReportModal}>📢 Report an Incident</button>
      </div>

      <div className="safety-score-section">
        <div className="big-score-circle">
          <div className="score-inner">
            <span className="big-score-num">98</span>
            <span className="big-score-label">Safety Score</span>
          </div>
        </div>
        <div className="safety-zone-stats">
          <div className="zone-stat safe">
            <span className="zone-count">{safe}</span>
            <span className="zone-label">Safe Zones</span>
          </div>
          <div className="zone-stat caution">
            <span className="zone-count">{caution}</span>
            <span className="zone-label">Caution Zones</span>
          </div>
          <div className="zone-stat danger">
            <span className="zone-count">{danger}</span>
            <span className="zone-label">High Risk</span>
          </div>
        </div>
      </div>

      <div className="safety-layout">
        <div className="card safety-map-col">
          <h3>🗺️ Safety Zone Map</h3>
          <div className="map-container" ref={mapElRef} style={{ height: 340 }} />
        </div>

        <div className="card sos-panel">
          <h3>🆘 Emergency SOS</h3>
          <p className="sos-desc">
            Triggering SOS shares your live location with your emergency contacts and connects you to
            the nearest response unit.
          </p>
          <button className="sos-big-btn" onClick={openSos}>Activate SOS</button>
          <div className="emergency-contacts">
            <span className="contact-chip">🚓 Police · 100</span>
            <span className="contact-chip">🚑 Ambulance · 108</span>
            <span className="contact-chip">👩 Women Helpline · 1091</span>
            <span className="contact-chip">🔥 Fire · 101</span>
          </div>
        </div>
      </div>

      <div className="section-header">
        <h2>📋 Recent Community Reports</h2>
        <span className="section-sub">{communityReports.length} active reports</span>
      </div>

      <div className="community-reports-list">
        {communityReports.map((r) => (
          <div key={r.id} className="report-card">
            <span className="report-icon">{r.icon}</span>
            <div className="report-body">
              <div className="report-title">{r.title}</div>
              <div className="report-desc">{r.desc}</div>
              <div className="report-meta">
                <span>📍 {r.location}</span>
                <span>🕒 {r.time}</span>
                <span className={`badge ${statusBadge(r.status)}`}>{r.status}</span>
                <span>👍 {r.votes}</span>
              </div>
            </div>
            <div className="vote-btns">
              <button className="vote-btn" onClick={() => vote(r.id)}>👍 Helpful</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
