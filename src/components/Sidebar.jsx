export default function Sidebar({ active, onNav, user }) {
  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: '▦' },
    { type: 'section', label: 'Karyawan' },
    { key: 'employeedb', label: 'Database Karyawan', icon: '◫' },
    { key: 'payroll', label: 'Payroll', icon: '◈' },
    { key: 'absensi', label: 'Absensi', icon: '◷' },
    { key: 'contracts', label: 'Kontrak & Gaji', icon: '◻' },
    { type: 'section', label: 'Rekrutmen' },
    { key: 'ats', label: 'ATS Pipeline', icon: '◆' },
    { key: 'talentpool', label: 'Talent Pool', icon: '◉' },
    { type: 'section', label: 'Pengembangan' },
    { key: 'ninebox', label: '9 Box Talent', icon: '⊞' },
    { key: 'kpi', label: 'KPI', icon: '◎' },
    { key: 'survey', label: 'Engagement Survey', icon: '◐' },
    { type: 'section', label: 'Operasional' },
    { key: 'phl', label: 'PHL', icon: '◑' },
  ];

  const initials = user?.nama
    ? user.nama.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : 'HR';

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 7,
            background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: 14
          }}>S</div>
          <div>
            <div className="brand-name">Selusa Hub</div>
            <div className="brand-sub">HR System · Mode HR</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item, i) => {
          if (item.type === 'section') {
            return <div key={i} className="nav-section-label">{item.label}</div>;
          }
          return (
            <div
              key={item.key}
              className={`nav-item${active === item.key ? ' active' : ''}`}
              onClick={() => onNav(item.key)}
            >
              <span style={{ fontSize: 13, lineHeight: 1, opacity: 0.8 }}>{item.icon}</span>
              {item.label}
            </div>
          );
        })}
      </nav>

      {/* User footer — dynamic */}
      <div style={{
        padding: '14px 16px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'var(--teal)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 12, flexShrink: 0
        }}>
          {initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
          }}>
            {user?.nama || 'HR'}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
            {user?.jabatan || 'Human Resources'}
          </div>
        </div>
        <div style={{
          width: 7, height: 7, borderRadius: '50%', background: '#4ade80', flexShrink: 0,
          boxShadow: '0 0 0 2px rgba(74,222,128,0.25)'
        }} title="Online" />
      </div>
    </aside>
  );
}
