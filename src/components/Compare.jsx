import { useState } from 'react';
import { PLACES } from '../data.js';

function metricRow(label, a, b, max, color) {
  const pa = Math.min(100, (a / max) * 100);
  const pb = Math.min(100, (b / max) * 100);
  return (
    <div className="metric-row">
      <div className="metric-label">
        <span>{label}</span>
        <span>{a} vs {b}</span>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div className="metric-bar-bg" style={{ flex: 1 }}>
          <div className="metric-bar-fill" style={{ width: `${pa}%`, background: color }} />
        </div>
        <div className="metric-bar-bg" style={{ flex: 1 }}>
          <div className="metric-bar-fill" style={{ width: `${pb}%`, background: color }} />
        </div>
      </div>
    </div>
  );
}

function score(p) {
  return p.rating * 2 + p.scores.safety + p.scores.value;
}

export default function Compare() {
  const [leftId, setLeftId] = useState(1);
  const [rightId, setRightId] = useState(3);
  const left = PLACES.find((p) => p.id === Number(leftId));
  const right = PLACES.find((p) => p.id === Number(rightId));
  const leftWins = score(left) >= score(right);

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">📊 Compare Places</h1>
        <p className="page-sub">Weigh rating, safety and value side by side</p>
      </div>

      <div className="compare-selectors">
        <div className="compare-select-wrap">
          <label>Place A</label>
          <select className="compare-select" value={leftId} onChange={(e) => setLeftId(e.target.value)}>
            {PLACES.map((p) => (
              <option key={p.id} value={p.id}>{p.emoji} {p.name}</option>
            ))}
          </select>
        </div>
        <div className="vs-badge">VS</div>
        <div className="compare-select-wrap">
          <label>Place B</label>
          <select className="compare-select" value={rightId} onChange={(e) => setRightId(e.target.value)}>
            {PLACES.map((p) => (
              <option key={p.id} value={p.id}>{p.emoji} {p.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="compare-result">
        <div className={`compare-col ${leftWins ? 'winner' : ''}`}>
          {leftWins && <div className="winner-badge">🏆 Better Overall</div>}
          <div className="compare-place-name">{left.emoji} {left.name}</div>
          <div className="compare-place-cat">{left.category} · {left.price}</div>
          {metricRow('Rating', left.rating, right.rating, 5, '#3b82f6')}
          {metricRow('Safety', left.scores.safety, right.scores.safety, 10, '#10b981')}
          {metricRow('Value', left.scores.value, right.scores.value, 10, '#f59e0b')}
        </div>
        <div className={`compare-col ${!leftWins ? 'winner' : ''}`}>
          {!leftWins && <div className="winner-badge">🏆 Better Overall</div>}
          <div className="compare-place-name">{right.emoji} {right.name}</div>
          <div className="compare-place-cat">{right.category} · {right.price}</div>
          {metricRow('Rating', right.rating, left.rating, 5, '#3b82f6')}
          {metricRow('Safety', right.scores.safety, left.scores.safety, 10, '#10b981')}
          {metricRow('Value', right.scores.value, left.scores.value, 10, '#f59e0b')}
        </div>
      </div>
    </div>
  );
}
