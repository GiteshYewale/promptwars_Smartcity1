import { useApp } from '../AppContext.jsx';

export default function Community() {
  const { communityReports, setCommunityReports, openReportModal, showToast } = useApp();

  const vote = (id) => {
    setCommunityReports((reports) =>
      reports.map((r) => (r.id === id ? { ...r, votes: r.votes + 1 } : r))
    );
    showToast('Thanks for your feedback! 👍');
  };

  return (
    <div className="page active">
      <div className="page-header-row">
        <div>
          <h1 className="page-title">👥 Community</h1>
          <p className="page-sub">Crowdsourced reports keeping Bengaluru informed</p>
        </div>
        <button className="btn-primary" onClick={openReportModal}>📢 New Report</button>
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
                <span className="badge info">{r.status}</span>
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
