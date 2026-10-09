import { useEffect, useState } from 'react';
import { useApp } from '../AppContext.jsx';
import { PLACES } from '../data.js';

function useEscape(active, onClose) {
  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, onClose]);
}

export function PlaceModal({ id, onClose }) {
  const { setPage, setFocusPlaceId } = useApp();
  useEscape(!!id, onClose);
  if (!id) return null;
  const place = PLACES.find((p) => p.id === id);
  if (!place) return null;

  const viewOnMap = () => {
    setFocusPlaceId(place.id);
    setPage('map');
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="place-detail-emoji">{place.emoji}</div>
        <div className="place-detail-name">{place.name}</div>
        <div className="place-detail-desc">{place.desc}</div>

        <div className="place-detail-scores">
          <div className="score-box">
            <div className="score-val" style={{ color: 'var(--primary)' }}>{place.scores.rating}</div>
            <div className="score-lbl">Rating</div>
          </div>
          <div className="score-box">
            <div className="score-val" style={{ color: 'var(--success)' }}>{place.scores.safety}</div>
            <div className="score-lbl">Safety</div>
          </div>
          <div className="score-box">
            <div className="score-val" style={{ color: 'var(--warning)' }}>{place.scores.value}</div>
            <div className="score-lbl">Value</div>
          </div>
        </div>

        <div className="place-tags">
          {place.tags.map((t, i) => (
            <span key={i} className="tag">{t}</span>
          ))}
        </div>

        <div className="reviews-section">
          <h4>💬 Reviews</h4>
          {place.reviews.map((r, i) => (
            <div key={i} className="review-item">
              <div className="review-user">{r.user}</div>
              <div className="review-text">{r.text}</div>
            </div>
          ))}
        </div>

        <div className="divider" />
        <button className="btn-primary" onClick={viewOnMap}>🗺️ View on Map</button>
      </div>
    </div>
  );
}

const REPORT_TYPES = [
  { type: 'accident', icon: '🚗', label: 'Accident' },
  { type: 'unsafe', icon: '⚠️', label: 'Unsafe area' },
  { type: 'pothole', icon: '🕳️', label: 'Pothole' },
  { type: 'flooding', icon: '🌊', label: 'Flooding' },
  { type: 'event', icon: '🎪', label: 'Event / Closure' },
  { type: 'cleanliness', icon: '🧹', label: 'Cleanliness' },
];

export function ReportModal({ open, onClose, onSubmitted }) {
  const { setCommunityReports } = useApp();
  const [type, setType] = useState('accident');
  const [location, setLocation] = useState('');
  const [desc, setDesc] = useState('');

  useEscape(open, onClose);
  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    const meta = REPORT_TYPES.find((t) => t.type === type);
    setCommunityReports((reports) => [
      {
        id: Date.now(),
        type,
        icon: meta.icon,
        title: `${meta.label} reported${location ? ` at ${location}` : ''}`,
        desc: desc || 'Reported by a community member. Awaiting verification.',
        location: location || 'Location shared',
        time: 'Just now',
        status: 'Under Review',
        votes: 1,
        category: type,
      },
      ...reports,
    ]);
    setLocation('');
    setDesc('');
    onClose();
    if (onSubmitted) onSubmitted('✅ Report submitted — thanks for keeping the city safe!');
  };

  return (
    <div className="modal">
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-title">📢 Report an Incident</div>
        <form onSubmit={submit}>
          <label className="form-label">Type</label>
          <select className="form-input" value={type} onChange={(e) => setType(e.target.value)}>
            {REPORT_TYPES.map((t) => (
              <option key={t.type} value={t.type}>{t.icon} {t.label}</option>
            ))}
          </select>

          <label className="form-label">Location</label>
          <input
            className="form-input"
            placeholder="e.g. Silk Board Flyover"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <label className="form-label">Description</label>
          <textarea
            className="form-input"
            rows={3}
            placeholder="Describe what you saw…"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <div className="report-media-btns" style={{ marginBottom: 16 }}>
            <button type="button" className="btn-secondary">📷 Add Photo</button>
            <button type="button" className="btn-secondary">📍 Use My Location</button>
          </div>

          <button type="submit" className="btn-primary">Submit Report</button>
        </form>
      </div>
    </div>
  );
}

export function SosModal({ open, onClose }) {
  const { showToast } = useApp();
  useEscape(open, onClose);
  if (!open) return null;

  const contacts = [
    { icon: '🚓', label: 'Police', number: '100' },
    { icon: '🚑', label: 'Ambulance', number: '108' },
    { icon: '🔥', label: 'Fire & Rescue', number: '101' },
    { icon: '👩', label: 'Women Helpline', number: '1091' },
    { icon: '🧒', label: 'Child Helpline', number: '1098' },
  ];

  return (
    <div className="modal">
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-box sos-modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="sos-icon-big">🆘</div>
        <h3>Emergency SOS</h3>
        <p>Your live location is being shared with emergency contacts and the nearest response unit.</p>
        <div className="sos-emergency-list">
          {contacts.map((c, i) => (
            <div key={i} className="emergency-row">
              {c.icon} {c.label} — <strong>{c.number}</strong>
            </div>
          ))}
        </div>
        <button
          className="sos-big-btn"
          onClick={() => {
            showToast('🚨 SOS alert sent. Help is on the way.');
            onClose();
          }}
        >
          Send SOS Alert
        </button>
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
