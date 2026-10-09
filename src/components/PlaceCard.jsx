import { useApp } from '../AppContext.jsx';

export default function PlaceCard({ place }) {
  const { openPlaceModal } = useApp();
  const safetyClass = place.safety === 'high' ? 'high' : place.safety === 'mid' ? 'mid' : 'low';
  const safetyLabel = place.safety === 'high' ? '🟢 Safe' : place.safety === 'mid' ? '🟡 Caution' : '🔴 Unsafe';
  const stars = '⭐'.repeat(Math.round(place.rating));

  return (
    <div className="place-card" onClick={() => openPlaceModal(place.id)}>
      <div className="place-img">
        <span>{place.emoji}</span>
        <span className="place-cat-badge">{place.category}</span>
      </div>
      <div className="place-body">
        <div className="place-name">{place.name}</div>
        <div className="place-desc">{place.desc}</div>
        <div className="place-meta">
          <span className="rating-stars">{stars} {place.rating}</span>
          <span className="price-tag">{place.price}</span>
          <span className={`safety-badge ${safetyClass}`}>{safetyLabel}</span>
        </div>
      </div>
    </div>
  );
}
