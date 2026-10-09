import { useCallback, useEffect, useState } from 'react';
import { AppContext } from './AppContext.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Home from './components/Home.jsx';
import MapPage from './components/MapPage.jsx';
import Discover from './components/Discover.jsx';
import Safety from './components/Safety.jsx';
import Compare from './components/Compare.jsx';
import Insights from './components/Insights.jsx';
import Community from './components/Community.jsx';
import Culture from './components/Culture.jsx';
import Toast from './components/Toast.jsx';
import AIChat from './components/AIChat.jsx';
import { PlaceModal, ReportModal, SosModal } from './components/Modals.jsx';
import { SAFETY_REPORTS } from './data.js';

const PAGES = {
  home: Home,
  map: MapPage,
  discover: Discover,
  safety: Safety,
  compare: Compare,
  insights: Insights,
  community: Community,
  culture: Culture,
};

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('citypulse-theme') || 'dark');
  const [page, setPage] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [communityReports, setCommunityReports] = useState(() => [...SAFETY_REPORTS]);
  const [toast, setToast] = useState(null);
  const [placeModalId, setPlaceModalId] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [discoverQuery, setDiscoverQuery] = useState('');
  const [mapSearchQuery, setMapSearchQuery] = useState('');
  const [focusPlaceId, setFocusPlaceId] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('citypulse-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = useCallback((msg) => setToast(msg), []);
  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  const toggleSidebar = useCallback(() => setSidebarCollapsed((s) => !s), []);

  const PageComponent = PAGES[page] || Home;

  const value = {
    page,
    setPage,
    theme,
    toggleTheme,
    sidebarCollapsed,
    toggleSidebar,
    communityReports,
    setCommunityReports,
    showToast,
    openPlaceModal: setPlaceModalId,
    openReportModal: () => setReportModalOpen(true),
    openSos: () => setSosModalOpen(true),
    discoverQuery,
    setDiscoverQuery,
    mapSearchQuery,
    setMapSearchQuery,
    focusPlaceId,
    setFocusPlaceId,
    chatOpen,
    openChat: () => setChatOpen(true),
    closeChat: () => setChatOpen(false),
  };

  return (
    <AppContext.Provider value={value}>
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <PageComponent />
        </main>
      </div>

      <PlaceModal id={placeModalId} onClose={() => setPlaceModalId(null)} />
      <ReportModal
        open={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onSubmitted={(msg) => showToast(msg)}
      />
      <SosModal open={sosModalOpen} onClose={() => setSosModalOpen(false)} />
      <AIChat open={chatOpen} onClose={() => setChatOpen(false)} />
      <Toast message={toast} />
    </AppContext.Provider>
  );
}
