import { useCallback, useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useApp } from '../AppContext.jsx';
import { MAP_POINTS, PLACES } from '../data.js';

const CENTER = [12.9716, 77.5946];

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'Food', label: '🍛 Food' },
  { id: 'Hotel', label: '🏨 Hotels' },
  { id: 'Landmark', label: '🏛️ Landmarks' },
  { id: 'Culture', label: '🛕 Culture' },
  { id: 'safety', label: '🟢 Safety Zones' },
];

function categoryColor(cat) {
  switch (cat) {
    case 'Food': return '#f97316';
    case 'Hotel': return '#8b5cf6';
    case 'Landmark': return '#3b82f6';
    case 'Culture': return '#06b6d4';
    default: return '#10b981';
  }
}

function safetyColor(level) {
  if (level === 'caution') return '#f59e0b';
  if (level === 'danger') return '#ef4444';
  return '#10b981';
}

function pointColor(p) {
  return p.category === 'safety' ? safetyColor(p.safetyLevel) : categoryColor(p.category);
}

function makeIcon(p) {
  const color = pointColor(p);
  return L.divIcon({
    className: 'cp-marker',
    html: `<div style="width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;background:${color};box-shadow:0 2px 10px rgba(0,0,0,.45);border:2px solid #fff">${p.emoji || '📍'}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -14],
  });
}

function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function decollidePoints(points) {
  const seen = {};
  return points.map((p) => {
    const key = `${p.lat.toFixed(3)},${p.lng.toFixed(3)}`;
    if (seen[key] === undefined) {
      seen[key] = 0;
      return p;
    }
    seen[key] += 1;
    const angle = seen[key] * 0.95;
    const r = 0.0016 * Math.ceil(seen[key] / 2);
    return { ...p, lat: p.lat + Math.sin(angle) * r, lng: p.lng + Math.cos(angle) * r };
  });
}

function addCityTileLayer(map) {
  let swapped = false;
  const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  });
  osm.on('tileerror', () => {
    if (swapped) return;
    swapped = true;
    map.removeLayer(osm);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: '&copy; CARTO',
    }).addTo(map);
  });
  osm.addTo(map);
}

function popupHtml(p) {
  const color = pointColor(p);
  const tag =
    p.category === 'safety'
      ? `Safety Zone · ${p.safetyLevel}`
      : escapeHtml(p.category);
  return `<div style="min-width:180px">
    <div style="font-weight:800;font-size:14px;margin-bottom:4px">${p.emoji || ''} ${escapeHtml(p.name)}</div>
    <div style="font-size:12px;color:#7a8499;margin-bottom:6px">${escapeHtml(p.desc || '')}</div>
    <div style="font-size:11px;color:${color};font-weight:700;margin-bottom:4px">${tag}</div>
    <button class="popup-route-btn" data-id="${p.id}" data-name="${escapeHtml(p.name)}" data-lat="${p.lat}" data-lng="${p.lng}">🧭 Route here</button>
  </div>`;
}

function getCurrentPosition() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve(null);
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        resolve(null);
      }
    }, 4000);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: 'My location' });
      },
      () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(null);
      },
      { timeout: 3500, maximumAge: 60000 }
    );
  });
}

export default function MapPage() {
  const {
    mapSearchQuery,
    setMapSearchQuery,
    focusPlaceId,
    setFocusPlaceId,
    showToast,
    openReportModal,
  } = useApp();

  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerLayerRef = useRef(null);
  const markersByIdRef = useRef({});
  const heatLayerRef = useRef(null);
  const routeLayerRef = useRef(null);
  const suggestionsBoxRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState('all');
  const [heatmap, setHeatmap] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [routeTarget, setRouteTarget] = useState(null);
  const [routeStartId, setRouteStartId] = useState('current');
  const [routeInfo, setRouteInfo] = useState(null);
  const [routing, setRouting] = useState(false);

  const startRoute = useCallback((point) => {
    setRouteTarget(point);
    setRouteInfo(null);
  }, []);
  const startRouteRef = useRef(startRoute);
  useEffect(() => {
    startRouteRef.current = startRoute;
  }, [startRoute]);

  useEffect(() => {
    const map = L.map(containerRef.current, { center: CENTER, zoom: 12, zoomControl: true });
    mapRef.current = map;
    addCityTileLayer(map);
    markerLayerRef.current = L.layerGroup().addTo(map);

    map.on('popupopen', (e) => {
      const el = e.popup.getElement();
      const btn = el && el.querySelector('.popup-route-btn');
      if (!btn) return;
      btn.onclick = () => {
        startRouteRef.current({
          name: btn.dataset.name,
          lat: parseFloat(btn.dataset.lat),
          lng: parseFloat(btn.dataset.lng),
          emoji: '📍',
        });
      };
    });

    const onResize = () => map.invalidateSize();
    window.addEventListener('resize', onResize);
    const t = setTimeout(() => map.invalidateSize(), 60);

    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
      map.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
      markersByIdRef.current = {};
      routeLayerRef.current = null;
      heatLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = markerLayerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();
    markersByIdRef.current = {};
    const points = decollidePoints(MAP_POINTS).filter((p) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'safety') return p.category === 'safety';
      return p.category === activeFilter;
    });
    points.forEach((p) => {
      const marker = L.marker([p.lat, p.lng], { icon: makeIcon(p) });
      marker.bindPopup(popupHtml(p));
      marker.addTo(layer);
      markersByIdRef.current[p.id] = marker;
    });
  }, [activeFilter]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
      heatLayerRef.current = null;
    }
    if (!heatmap) return;
    const cl = L.layerGroup().addTo(map);
    MAP_POINTS.filter((p) => p.category === 'safety').forEach((p) => {
      const color = safetyColor(p.safetyLevel);
      L.circle([p.lat, p.lng], {
        radius: p.safetyLevel === 'safe' ? 750 : 650,
        color,
        fillColor: color,
        fillOpacity: 0.3,
        weight: 1,
      })
        .bindPopup(`<strong>${escapeHtml(p.name)}</strong><br>${escapeHtml(p.desc || '')}`)
        .addTo(cl);
    });
    heatLayerRef.current = cl;
  }, [heatmap]);

  const selectPlace = useCallback(
    (point) => {
      const map = mapRef.current;
      setMapSearchQuery(point.name);
      setSuggestions(null);
      setActiveFilter('all');
      if (map) {
        map.flyTo([point.lat, point.lng], 15);
        setTimeout(() => {
          const m = markersByIdRef.current[point.id];
          if (m) m.openPopup();
        }, 350);
      }
    },
    [setMapSearchQuery]
  );

  const selectLocation = useCallback(
    (loc) => {
      const map = mapRef.current;
      setMapSearchQuery(loc.name);
      setSuggestions(null);
      if (map) map.flyTo([loc.lat, loc.lng], 14);
      startRoute({ name: loc.name, lat: loc.lat, lng: loc.lng, emoji: '📍' });
    },
    [setMapSearchQuery, startRoute]
  );

  useEffect(() => {
    if (!focusPlaceId) return;
    const p = PLACES.find((x) => x.id === focusPlaceId);
    if (p) selectPlace(p);
    setFocusPlaceId(null);
  }, [focusPlaceId, selectPlace, setFocusPlaceId]);

  useEffect(() => {
    const q = mapSearchQuery.trim();
    if (!q) {
      setSuggestions(null);
      return undefined;
    }
    const lower = q.toLowerCase();
    const localMatches = MAP_POINTS.filter((p) => {
      const haystack = `${p.name} ${p.category} ${p.desc || ''} ${(p.tags || []).join(' ')}`.toLowerCase();
      return haystack.includes(lower);
    }).slice(0, 6);
    setSuggestions({ places: localMatches, locations: [], loading: true });

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(q)}`;
        const res = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
        const data = await res.json();
        const locations = (Array.isArray(data) ? data : []).map((d) => ({
          name: d.display_name.split(',')[0],
          display: d.display_name,
          lat: parseFloat(d.lat),
          lng: parseFloat(d.lon),
        }));
        setSuggestions((prev) =>
          prev ? { ...prev, locations, loading: false } : { places: [], locations, loading: false }
        );
      } catch (err) {
        if (err.name !== 'AbortError') {
          setSuggestions((prev) => (prev ? { ...prev, loading: false } : prev));
        }
      }
    }, 480);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [mapSearchQuery]);

  useEffect(() => {
    const map = mapRef.current;
    if (!routeTarget) {
      if (map && routeLayerRef.current) {
        map.removeLayer(routeLayerRef.current);
        routeLayerRef.current = null;
      }
      return undefined;
    }
    let cancelled = false;

    const run = async () => {
      setRouting(true);
      try {
        let start;
        if (routeStartId === 'current') {
          start = (await getCurrentPosition()) || { lat: CENTER[0], lng: CENTER[1], label: 'City Center' };
        } else {
          const p = PLACES.find((x) => String(x.id) === String(routeStartId));
          start = p ? { lat: p.lat, lng: p.lng, label: p.name } : null;
        }
        if (!start) {
          setRouting(false);
          return;
        }
        const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${routeTarget.lng},${routeTarget.lat}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const data = await res.json();
        if (cancelled) return;
        const route = data && data.routes && data.routes[0];
        if (!route) throw new Error('no route');
        const coords = route.geometry.coordinates.map((c) => [c[1], c[0]]);
        if (routeLayerRef.current) map.removeLayer(routeLayerRef.current);
        const rl = L.layerGroup().addTo(map);
        L.polyline(coords, { color: '#3b82f6', weight: 5, opacity: 0.85 }).addTo(rl);
        L.circleMarker([start.lat, start.lng], { radius: 7, color: '#10b981', fillColor: '#10b981', fillOpacity: 1, weight: 3, fill: true }).addTo(rl);
        L.circleMarker([routeTarget.lat, routeTarget.lng], { radius: 7, color: '#ef4444', fillColor: '#ef4444', fillOpacity: 1, weight: 3, fill: true }).addTo(rl);
        routeLayerRef.current = rl;
        map.fitBounds(L.latLngBounds(coords), { padding: [60, 60] });
        setRouteInfo({
          distance: (route.distance / 1000).toFixed(1),
          duration: Math.round(route.duration / 60),
          startLabel: start.label,
        });
      } catch (err) {
        if (!cancelled) showToast('Routing is unavailable right now.');
      } finally {
        if (!cancelled) setRouting(false);
      }
    };
    run();

    return () => {
      cancelled = true;
    };
  }, [routeTarget, routeStartId, showToast]);

  const clearRoute = () => {
    setRouteTarget(null);
    setRouteInfo(null);
  };

  const hasResults =
    suggestions &&
    (suggestions.places.length > 0 || suggestions.locations.length > 0 || suggestions.loading);

  return (
    <div className="page active">
      <div className="map-header">
        <div>
          <h1 className="page-title">🗺️ Explore Bengaluru</h1>
          <p className="page-sub">Live places, safety zones, heatmap and turn-by-turn routing</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`layer-btn ${heatmap ? 'active' : ''}`}
            onClick={() => setHeatmap((h) => !h)}
          >
            🔥 Safety Heatmap
          </button>
          <button className="btn-secondary" onClick={openReportModal}>📢 Report</button>
        </div>
      </div>

      <div className="map-search" ref={suggestionsBoxRef}>
        <span className="search-icon">🔍</span>
        <input
          type="text"
          value={mapSearchQuery}
          placeholder="Search places or locations..."
          onChange={(e) => setMapSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setMapSearchQuery('');
          }}
        />
        {hasResults && (
          <div className="map-search-results">
            {suggestions.places.length > 0 && (
              <>
                <div className="map-search-group">Places</div>
                {suggestions.places.map((p) => (
                  <div key={`p${p.id}`} className="map-search-item" onClick={() => selectPlace(p)}>
                    <span className="ms-emoji" style={{ background: `${pointColor(p)}22` }}>{p.emoji || '📍'}</span>
                    <span className="ms-text">
                      <strong>{p.name}</strong>
                      <small>{p.category} · {p.desc}</small>
                    </span>
                  </div>
                ))}
              </>
            )}
            {suggestions.locations.length > 0 && (
              <>
                <div className="map-search-group">Locations</div>
                {suggestions.locations.map((l, i) => (
                  <div key={`l${i}`} className="map-search-item" onClick={() => selectLocation(l)}>
                    <span className="ms-emoji">📍</span>
                    <span className="ms-text">
                      <strong>{l.name}</strong>
                      <small>{l.display}</small>
                    </span>
                  </div>
                ))}
              </>
            )}
            {suggestions.loading && suggestions.places.length === 0 && suggestions.locations.length === 0 && (
              <div className="map-search-empty">Searching…</div>
            )}
            {!suggestions.loading && suggestions.places.length === 0 && suggestions.locations.length === 0 && (
              <div className="map-search-empty">No matches found</div>
            )}
          </div>
        )}
      </div>

      <div className="filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`filter-chip ${activeFilter === f.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="map-wrap">
        <div className="map-container" ref={containerRef} />
        {routeTarget && (
          <div className="map-route-panel">
            <div className="route-panel-header">
              <span>🚗 Route</span>
              <button className="route-panel-close" onClick={clearRoute}>✕</button>
            </div>
            <label className="route-panel-label">From</label>
            <select
              className="route-select"
              value={routeStartId}
              onChange={(e) => setRouteStartId(e.target.value)}
            >
              <option value="current">📍 My current location</option>
              {PLACES.map((p) => (
                <option key={p.id} value={p.id}>{p.emoji} {p.name}</option>
              ))}
            </select>
            <label className="route-panel-label">To</label>
            <div className="route-dest">{routeTarget.emoji} {routeTarget.name}</div>
            {routing ? (
              <div className="route-info">Calculating route…</div>
            ) : routeInfo ? (
              <div className="route-info">
                <div className="route-info-row">🚗 <strong>{routeInfo.startLabel}</strong> → {routeTarget.name}</div>
                <div className="route-info-stats">
                  <div><strong>{routeInfo.distance}</strong><small>km</small></div>
                  <div><strong>{routeInfo.duration}</strong><small>min</small></div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className="map-legend">
        <span>🔵 Landmark</span>
        <span>🟠 Food</span>
        <span>🟣 Hotel</span>
        <span>🔷 Culture</span>
        <span>🟢 Safe Zone</span>
        <span>🟡 Caution Zone</span>
      </div>
    </div>
  );
}
