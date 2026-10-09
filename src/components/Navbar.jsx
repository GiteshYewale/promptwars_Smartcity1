import { useApp } from '../AppContext.jsx';

export default function Navbar() {
  const { theme, toggleTheme, openSos, page, setPage, discoverQuery, setDiscoverQuery, setMapSearchQuery } = useApp();
  const isLight = theme === 'light';

  const onSearch = (value) => {
    const q = value;
    if (page === 'map') {
      setMapSearchQuery(q);
    } else {
      setDiscoverQuery(q);
      setPage('discover');
    }
  };

  const searchValue = page === 'map' ? '' : discoverQuery;

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
        <span className="logo-icon">🏙️</span>
        <span className="logo-text">CityPulse</span>
      </div>

      <div className="nav-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          id="globalSearch"
          placeholder="Search places, landmarks, areas..."
          defaultValue={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.target.value = '';
              onSearch('');
            }
          }}
        />
      </div>

      <div className="nav-right">
        <div className="weather-chip">⛅ 28°C · Bangalore</div>
        <button className="notif-btn" title="Notifications">
          🔔 <span className="notif-dot" />
        </button>
        <button
          className="theme-toggle-btn"
          id="themeToggleBtn"
          onClick={toggleTheme}
          title="Toggle Light / Dark Mode"
        >
          <span id="themeIcon">{isLight ? '🌙' : '☀️'}</span>
          <span id="themeLabel">{isLight ? 'Dark' : 'Light'}</span>
        </button>
        <button className="sos-btn pulse-btn" onClick={openSos}>🆘 SOS</button>
      </div>
    </nav>
  );
}
