import { useApp } from '../AppContext.jsx';

const ITEMS = [
  { id: 'home', icon: '🏠', label: 'Home' },
  { id: 'map', icon: '🗺️', label: 'Explore Map' },
  { id: 'discover', icon: '🧭', label: 'Discover' },
  { id: 'safety', icon: '🛡️', label: 'Safety' },
  { id: 'compare', icon: '📊', label: 'Compare' },
  { id: 'insights', icon: '📡', label: 'City Insights' },
  { id: 'community', icon: '👥', label: 'Community' },
  { id: 'culture', icon: '🏛️', label: 'Culture' },
];

export default function Sidebar() {
  const { page, setPage, sidebarCollapsed, toggleSidebar } = useApp();

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`} id="sidebar">
      <nav className="sidebar-nav">
        {ITEMS.map((item) => (
          <a
            key={item.id}
            href="#"
            className={`nav-item ${page === item.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setPage(item.id);
            }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </a>
        ))}
      </nav>
      <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
    </aside>
  );
}
