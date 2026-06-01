import { useState } from 'react';
import Login from './pages/Login';
import EmployeePortal from './pages/EmployeePortal';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Payroll from './pages/Payroll';
import Absensi from './pages/Absensi';
import ATS from './pages/ATS';
import TalentPool from './pages/TalentPool';
import NineBox from './pages/NineBox';
import KPI from './pages/KPI';
import EngagementSurvey from './pages/EngagementSurvey';
import Contracts from './pages/Contracts';
import PHL from './pages/PHL';

const pageTitles = {
  dashboard: 'Dashboard',
  payroll: 'Payroll',
  absensi: 'Absensi',
  ats: 'ATS Pipeline',
  talentpool: 'Talent Pool',
  ninebox: '9 Box Talent Mapping',
  kpi: 'KPI',
  survey: 'Engagement Survey',
  contracts: 'Kontrak & Riwayat Gaji',
  phl: 'Pekerja Harian Lepas',
};

export default function App() {
  const [user, setUser] = useState(null); // null = belum login
  const [activePage, setActivePage] = useState('dashboard');

  const handleLogin = (userData) => {
    setUser(userData);
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setActivePage('dashboard');
  };

  // ── Belum login → tampilkan Login page ──
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // ── Role: Employee → tampilkan Employee Portal ──
  if (user.role === 'employee') {
    return <EmployeePortal user={user} onLogout={handleLogout} />;
  }

  // ── Role: HR → tampilkan full HR system ──
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard onNav={setActivePage} />;
      case 'payroll':   return <Payroll />;
      case 'absensi':   return <Absensi />;
      case 'ats':       return <ATS />;
      case 'talentpool':return <TalentPool />;
      case 'ninebox':   return <NineBox />;
      case 'kpi':       return <KPI />;
      case 'survey':    return <EngagementSurvey />;
      case 'contracts': return <Contracts />;
      case 'phl':       return <PHL />;
      default:          return <Dashboard onNav={setActivePage} />;
    }
  };

  const initials = user.nama.split(' ').map(n => n[0]).slice(0, 2).join('');

  return (
    <div className="app-layout">
      <Sidebar active={activePage} onNav={setActivePage} user={user} />
      <div className="main-content">
        {/* Topbar */}
        <div className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {activePage !== 'dashboard' && (
              <button 
                onClick={() => setActivePage('dashboard')}
                style={{ 
                  background: 'none', border: 'none', cursor: 'pointer', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 32, height: 32, borderRadius: '50%', color: 'var(--gray-500)',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-100)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
                title="Kembali ke Dashboard"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
              </button>
            )}
            <span className="topbar-title">{pageTitles[activePage]}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            {/* User badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 10px 5px 6px', background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 20 }}>
              <div className="avatar avatar-teal" style={{ width: 24, height: 24, fontSize: 10 }}>{initials}</div>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--gray-700)' }}>{user.nama}</span>
              <span className="badge badge-teal" style={{ fontSize: 10, padding: '1px 6px' }}>HR</span>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleLogout}
              style={{ fontSize: 12 }}
            >
              Keluar
            </button>
          </div>
        </div>

        {renderPage()}
      </div>
    </div>
  );
}
