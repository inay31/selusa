import { employees, payrollData, computeNetSalary, kpiDivisi, attendanceLogs } from '../data/dummyData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';

const fmt = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

export default function Dashboard({ onNav }) {
  const totalKaryawan = employees.filter(e => e.status === 'aktif').length;
  const totalPayroll = payrollData
    .filter(p => p.bulan === '2026-05')
    .reduce((sum, p) => sum + computeNetSalary(p).net, 0);

  // 1. Data Karyawan per Divisi (Horizontal Bar Chart)
  const divisiList = ['Teknologi', 'Marketing', 'Keuangan', 'Penjualan', 'HR', 'Operasional', 'Produk'];
  const employeeData = divisiList.map(d => ({
    name: d,
    jumlah: employees.filter(e => e.divisi === d && e.status === 'aktif').length
  })).filter(d => d.jumlah > 0);

  // 2. KPI Achievement per Divisi (Vertical Bar Chart)
  const kpiData = divisiList.map(d => {
    const items = kpiDivisi.filter(k => k.divisi === d);
    const achieved = items.filter(k => k.realisasi >= k.target).length;
    const notAchieved = items.length - achieved;
    return { name: d, Tercapai: achieved, 'Belum Tercapai': notAchieved, total: items.length };
  }).filter(d => d.total > 0);

  const kpiAchieved = kpiDivisi.filter(k => k.realisasi >= k.target).length;

  // 3. Attendance Area Chart
  const attendanceData = [
    { name: '24 Mei', Hadir: attendanceLogs.filter(a => a.tanggal === '2026-05-24' && a.status === 'hadir').length },
    { name: '25 Mei', Hadir: 9 }, // Dummy padding
    { name: '26 Mei', Hadir: 10 }, // Dummy padding
    { name: '27 Mei', Hadir: attendanceLogs.filter(a => a.tanggal === '2026-05-27' && a.status === 'hadir').length },
  ];

  // 4. Payroll Trend Line Chart
  const uniqueMonths = [...new Set(payrollData.map(p => p.bulan))].sort();
  const payrollTrendData = uniqueMonths.map(bulan => {
    const total = payrollData.filter(p => p.bulan === bulan).reduce((sum, p) => sum + computeNetSalary(p).net, 0);
    const date = new Date(bulan + '-01');
    const name = date.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });
    return { name, NetPayroll: total };
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard Analitik HR</h1>
        <p className="page-subtitle">Ringkasan performa tim, KPI, dan rekap finansial perusahaan</p>
      </div>

      {/* Stats row */}
      <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
        <div className="stat-card stat-accent-teal">
          <div className="stat-label">Karyawan Aktif</div>
          <div className="stat-value">{totalKaryawan}</div>
          <div className="stat-sub">dari {employees.length} total karyawan</div>
        </div>
        <div className="stat-card stat-accent-pink">
          <div className="stat-label">Total Payroll (Mei)</div>
          <div className="stat-value" style={{ fontSize: 20 }}>{fmt(totalPayroll)}</div>
          <div className="stat-sub">10 karyawan diproses</div>
        </div>
        <div className="stat-card stat-accent-teal">
          <div className="stat-label">Kehadiran (27 Mei)</div>
          <div className="stat-value">{attendanceData[3].Hadir}</div>
          <div className="stat-sub">karyawan hadir hari ini</div>
        </div>
        <div className="stat-card stat-accent-pink">
          <div className="stat-label">KPI Keseluruhan</div>
          <div className="stat-value">{kpiAchieved}/{kpiDivisi.length}</div>
          <div className="stat-sub">target bulan ini tercapai</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        
        {/* KPI Chart */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Pencapaian KPI per Divisi</span>
            <button className="btn btn-ghost btn-sm" onClick={() => onNav('kpi')}>Lihat Detail →</button>
          </div>
          <div className="card-body" style={{ height: 320, padding: '24px 20px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={kpiData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} dy={10} interval={0} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} allowDecimals={false} />
                <RechartsTooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                <Bar dataKey="Tercapai" stackId="a" fill="var(--teal)" radius={[0,0,4,4]} barSize={28} />
                <Bar dataKey="Belum Tercapai" stackId="a" fill="#e5e7eb" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Employee Comp Chart (Horizontal Bar) */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Sebaran Karyawan per Divisi</span>
            <button className="btn btn-ghost btn-sm" onClick={() => onNav('talentpool')}>Lihat Database →</button>
          </div>
          <div className="card-body" style={{ height: 320, padding: '24px 20px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={employeeData} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} allowDecimals={false} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} width={85} />
                <RechartsTooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="jumlah" name="Karyawan Aktif" fill="var(--pink)" radius={[0,4,4,0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        
        {/* Attendance Area Chart */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Tren Kehadiran Harian</span>
            <button className="btn btn-ghost btn-sm" onClick={() => onNav('absensi')}>Lihat Absensi →</button>
          </div>
          <div className="card-body" style={{ height: 260, padding: '24px 20px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHadir" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--teal)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--teal)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} allowDecimals={false} />
                <RechartsTooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="Hadir" stroke="var(--teal)" strokeWidth={3} fillOpacity={1} fill="url(#colorHadir)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payroll Trend Line Chart */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Tren Pengeluaran Payroll Bersih</span>
            <button className="btn btn-ghost btn-sm" onClick={() => onNav('payroll')}>Proses Payroll →</button>
          </div>
          <div className="card-body" style={{ height: 260, padding: '24px 20px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={payrollTrendData} margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#6b7280' }} 
                  tickFormatter={(val) => `Rp${(val/1000000).toFixed(0)}Jt`}
                />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                  formatter={(value) => [fmt(value), 'Net Payroll']}
                />
                <Line type="monotone" dataKey="NetPayroll" stroke="var(--pink)" strokeWidth={3} dot={{ r: 5, fill: 'var(--pink)', strokeWidth: 0 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
