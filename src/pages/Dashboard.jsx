import { employees, payrollData, computeNetSalary, initialCandidates, kpiDivisi } from '../data/dummyData';

const fmt = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

export default function Dashboard({ onNav }) {
  const totalKaryawan = employees.filter(e => e.status === 'aktif').length;
  const totalPayroll = payrollData
    .filter(p => p.bulan === '2024-05')
    .reduce((sum, p) => sum + computeNetSalary(p).net, 0);
  const kandidatAktif = initialCandidates.filter(c => c.status !== 'Hired').length;
  const kpiAchieved = kpiDivisi.filter(k => k.realisasi >= k.target).length;

  const recentActivities = [
    { time: '10 menit lalu', text: 'Pengajuan cuti Budi Santoso menunggu persetujuan', type: 'warning' },
    { time: '1 jam lalu', text: 'Kandidat Gunawan Halim maju ke tahap Offer', type: 'success' },
    { time: '2 jam lalu', text: 'Pelanggaran lembur terdeteksi: Andi Pratama (W21)', type: 'danger' },
    { time: '3 jam lalu', text: 'KPI Divisi Penjualan: Revenue melampaui target', type: 'success' },
    { time: 'Kemarin', text: 'Survey Engagement Q2 2024 selesai dikompilasi', type: 'info' },
    { time: 'Kemarin', text: 'Kontrak Rizky Firmansyah akan berakhir dalam 3 bulan', type: 'warning' },
  ];

  const divisiStats = ['Teknologi', 'Marketing', 'Keuangan', 'Penjualan', 'HR', 'Operasional', 'Produk'];
  const kpiByDivisi = divisiStats.map(d => {
    const items = kpiDivisi.filter(k => k.divisi === d);
    const achieved = items.filter(k => k.realisasi >= k.target).length;
    return { divisi: d, total: items.length, achieved };
  }).filter(d => d.total > 0);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Selamat datang kembali, Rina. Berikut ringkasan hari ini.</p>
      </div>

      {/* Stats */}
      <div className="dashboard-grid">
        <div className="stat-card stat-accent-teal">
          <div className="stat-label">Karyawan Aktif</div>
          <div className="stat-value">{totalKaryawan}</div>
          <div className="stat-sub">dari {employees.length} total karyawan</div>
        </div>
        <div className="stat-card stat-accent-pink">
          <div className="stat-label">Total Payroll Mei</div>
          <div className="stat-value" style={{ fontSize: 20 }}>{fmt(totalPayroll)}</div>
          <div className="stat-sub">10 karyawan diproses</div>
        </div>
        <div className="stat-card stat-accent-teal">
          <div className="stat-label">Kandidat Aktif</div>
          <div className="stat-value">{kandidatAktif}</div>
          <div className="stat-sub">di pipeline rekrutmen</div>
        </div>
        <div className="stat-card stat-accent-pink">
          <div className="stat-label">KPI Tercapai</div>
          <div className="stat-value">{kpiAchieved}/{kpiDivisi.length}</div>
          <div className="stat-sub">target bulan ini</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
        {/* KPI Overview */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">KPI per Divisi — Mei 2024</span>
            <button className="btn btn-ghost btn-sm" onClick={() => onNav('kpi')}>Lihat Detail →</button>
          </div>
          <div className="card-body">
            {kpiByDivisi.map(d => {
              const pct = d.total > 0 ? Math.round((d.achieved / d.total) * 100) : 0;
              return (
                <div key={d.divisi} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{d.divisi}</span>
                    <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>{d.achieved}/{d.total} target</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{
                      width: `${pct}%`,
                      background: pct >= 75 ? 'var(--teal)' : pct >= 50 ? '#f59e0b' : '#ef4444'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Aktivitas Terbaru</span>
          </div>
          <div style={{ padding: '4px 0' }}>
            {recentActivities.map((act, i) => (
              <div key={i} style={{
                padding: '12px 20px',
                borderBottom: i < recentActivities.length - 1 ? '1px solid var(--gray-100)' : 'none',
                display: 'flex', gap: 10
              }}>
                <div style={{
                  width: 7, height: 7, borderRadius: '50%', marginTop: 5, flexShrink: 0,
                  background: act.type === 'success' ? '#22c55e' : act.type === 'danger' ? '#ef4444' : act.type === 'warning' ? '#f59e0b' : 'var(--teal)'
                }} />
                <div>
                  <div style={{ fontSize: 12.5, color: 'var(--gray-700)', lineHeight: 1.4 }}>{act.text}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 3 }}>{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 20 }}>
        {[
          { key: 'payroll', label: 'Proses Payroll', desc: 'Kelola penggajian karyawan', color: 'var(--teal)' },
          { key: 'absensi', label: 'Rekap Absensi', desc: 'Cek kehadiran & lembur', color: 'var(--pink)' },
          { key: 'ats', label: 'Pipeline ATS', desc: 'Kelola kandidat masuk', color: 'var(--teal)' },
          { key: 'phl', label: 'Deploy PHL', desc: 'Atur penugasan harian', color: 'var(--pink)' },
        ].map(q => (
          <div key={q.key} className="card" style={{ cursor: 'pointer', transition: 'box-shadow 0.15s' }}
            onClick={() => onNav(q.key)}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <div style={{ padding: '16px 18px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: q.color, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>{q.label}</div>
              <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{q.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
