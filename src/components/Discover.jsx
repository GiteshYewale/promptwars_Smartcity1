import { useState } from 'react';
import { useApp } from '../AppContext.jsx';
import { PLACES } from '../data.js';
import PlaceCard from './PlaceCard.jsx';

const CATEGORIES = ['All', 'Food', 'Hotel', 'Landmark', 'Culture'];

export default function Discover() {
  const { discoverQuery, setDiscoverQuery } = useApp();
  const [category, setCategory] = useState('All');

  const results = PLACES.filter((p) => {
    const matchCat = category === 'All' || p.category === category;
    const q = discoverQuery.trim().toLowerCase();
    const matchQuery =
      !q ||
      `${p.name} ${p.category} ${p.desc} ${(p.tags || []).join(' ')}`.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">🧭 Discover Bengaluru</h1>
        <p className="page-sub">
          {discoverQuery.trim()
            ? `Results for “${discoverQuery}” · ${results.length} place${results.length === 1 ? '' : 's'}`
            : 'Curated food, stays and landmarks across the city'}
        </p>
      </div>

      <div className="filter-bar">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`filter-chip ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
        {discoverQuery.trim() && (
          <button className="filter-chip" onClick={() => setDiscoverQuery('')}>✕ Clear search</button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          No places match your search. Try another term.
        </div>
      ) : (
        <div className="places-grid">
          {results.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      )}
    </div>
  );
}
