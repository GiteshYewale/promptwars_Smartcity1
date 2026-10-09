import { useEffect, useRef, useState } from 'react';
import { useApp } from '../AppContext.jsx';
import { PLACES, SAFETY_REPORTS } from '../data.js';

function generateReply(q) {
  const text = q.toLowerCase();
  if (/food|eat|restaurant|dosa|biryani|burger|coffee/.test(text)) {
    const foods = PLACES.filter((p) => p.category === 'Food')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3)
      .map((p) => `${p.emoji} ${p.name} (${p.rating}★)`)
      .join(', ');
    return `Top food picks: ${foods}. Open the Map to route to any of them.`;
  }
  if (/safe|safety|danger|night/.test(text)) {
    return 'City safety score is 98%. Koramangala and Indiranagar are well-lit with high police presence. Avoid isolated lanes in Shivajinagar after 11 PM.';
  }
  if (/hotel|stay|sleep/.test(text)) {
    const hotels = PLACES.filter((p) => p.category === 'Hotel').map((p) => `${p.emoji} ${p.name}`).join(', ');
    return `Great stays: ${hotels}.`;
  }
  if (/traffic|jam|congestion/.test(text)) {
    return 'Heavy congestion on Outer Ring Road (Marathahalli → KR Puram) and Tumkur Road near Peenya. Old Madras Road is clear.';
  }
  if (/report|incident/.test(text)) {
    const r = SAFETY_REPORTS[0];
    return `Latest report: ${r.title} at ${r.location} (${r.time}). You can add your own via the 📢 Report button.`;
  }
  if (/culture|heritage|temple|history/.test(text)) {
    return 'Try the Old City Heritage Walk (3.2 km) or visit Vidhana Soudha and Tipu Sultan\'s Summer Palace. See the Culture page for trails.';
  }
  if (/hi|hello|hey/.test(text)) {
    return 'Hello! I\'m Pulsy, your CityPulse assistant. Ask me about food, safety, hotels, traffic or heritage.';
  }
  return 'I can help with places, safety, traffic and heritage. Try "best food", "is it safe at night", or "traffic now".';
}

export default function AIChat({ open, onClose }) {
  const { openChat } = useApp();
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I\'m Pulsy 🤖 — ask me anything about Bengaluru.' },
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  const send = (e) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'bot', text: generateReply(q) }]);
    }, 420);
  };

  return (
    <>
      <button
        onClick={() => (open ? onClose() : openChat())}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 900,
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.5rem',
          color: 'white',
          background: 'var(--grad)',
          boxShadow: '0 6px 24px rgba(59,130,246,0.45)',
        }}
        title="AI Assistant"
      >
        {open ? '✕' : '🤖'}
      </button>

      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 92,
            right: 24,
            zIndex: 950,
            width: 340,
            maxWidth: 'calc(100vw - 32px)',
            height: 440,
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-900)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '14px 16px',
              fontWeight: 800,
              borderBottom: '1px solid var(--border)',
              background: 'var(--bg-800)',
            }}
          >
            🤖 Pulsy · CityPulse Assistant
          </div>
          <div ref={listRef} style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '9px 13px',
                  borderRadius: 12,
                  fontSize: '0.82rem',
                  lineHeight: 1.5,
                  background: m.role === 'user' ? 'var(--grad)' : 'var(--bg-800)',
                  color: m.role === 'user' ? 'white' : 'var(--text)',
                  border: m.role === 'user' ? 'none' : '1px solid var(--border)',
                }}
              >
                {m.text}
              </div>
            ))}
          </div>
          <form onSubmit={send} style={{ display: 'flex', gap: 8, padding: 12, borderTop: '1px solid var(--border)' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the city…"
              style={{
                flex: 1,
                background: 'var(--bg-800)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '9px 12px',
                color: 'var(--text)',
                fontFamily: 'inherit',
                fontSize: '0.84rem',
                outline: 'none',
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '9px 16px' }}>Send</button>
          </form>
        </div>
      )}
    </>
  );
}
