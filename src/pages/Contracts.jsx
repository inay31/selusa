import { useState } from 'react';
import { contractsData, salaryHistory, employees } from '../data/dummyData';

const fmtRp = (n) => n ? 'Rp ' + new Intl.NumberFormat('id-ID').format(n) : '—';

const contractStatusBadge = (s) => {
  const map = { aktif: 'badge-green', selesai: 'badge-gray', perpanjangan: 'badge-yellow' };
  return map[s] || 'badge-gray';
};

export default function Contracts() {
  const [tab, setTab] = useState('contracts');
  const [filterEmp, setFilterEmp] = useState('');

  const empList = [...new Set([...contractsData.map(c => c.employee_id), ...salaryHistory.map(s => s.employee_id)])];
  const empNames = Object.fromEntries(employees.map(e => [e.id, e.nama]));

  const filteredContracts = filterEmp ? contractsData.filter(c => c.employee_id === filterEmp) : contractsData;
  const filteredSalary = filterEmp ? salaryHistory.filter(s => s.employee_id === filterEmp) : salaryHistory;

  const expiringContracts = contractsData.filter(c => {
    if (!c.tanggal_berakhir || c.status !== 'aktif') return false;
    const end = new Date(c.tanggal_berakhir);
    const now = new Date('2024-06-01');
    const diffDays = (end - now) / (1000 * 60 * 60 * 24);
    return diffDays <= 90 && diffDays >= 0;
  });

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Kontrak & Riwayat Gaji</h1>
          <p className="page-subtitle">Histori kontrak kerja dan rekam jejak kenaikan gaji karyawan</p>
        </div>
        <button className="btn btn-primary">+ Tambah Kontrak</button>
      </div>

      {/* Alert: expiring contracts */}
      {expiringContracts.length > 0 && (
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '12px 16px', marginBottom: 20, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 16 }}>⚠</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#92400e' }}>Kontrak Segera Berakhir</div>
            <div style={{ fontSize: 12, color: '#78350f', marginTop: 2 }}>
              {expiringContracts.map(c => `${c.nama} (${c.tanggal_berakhir})`).join(' · ')} — perlu perhatian dalam 90 hari ke depan.
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        <div className="stat-card stat-accent-teal">
          <div className="stat-label">Total Kontrak</div>
          <div className="stat-value">{contractsData.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Aktif</div>
          <div className="stat-value">{contractsData.filter(c => c.status === 'aktif').length}</div>
        </div>
        <div className="stat-card stat-accent-pink">
          <div className="stat-label">Segera Berakhir</div>
          <div className="stat-value" style={{ color: 'var(--pink)' }}>{expiringContracts.length}</div>
          <div className="stat-sub">dalam 90 hari</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Riwayat Gaji</div>
          <div className="stat-value">{salaryHistory.length}</div>
          <div className="stat-sub">total perubahan</div>
        </div>
      </div>

      {/* Filter */}
      <div className="filters-bar">
        <label className="form-label" style={{ marginBottom: 0 }}>Filter Karyawan:</label>
        <select className="form-select" value={filterEmp} onChange={e => setFilterEmp(e.target.value)} style={{ width: 220 }}>
          <option value="">Semua Karyawan</option>
          {empList.map(id => <option key={id} value={id}>{empNames[id] || id}</option>)}
        </select>
        {filterEmp && <button className="btn btn-ghost btn-sm" onClick={() => setFilterEmp('')}>✕ Reset</button>}
      </div>

      <div className="tabs">
        {[{ key: 'contracts', label: 'Kontrak Kerja' }, { key: 'salary', label: 'Riwayat Gaji & Promosi' }].map(t => (
          <div key={t.key} className={`tab${tab === t.key ? ' active' : ''}`} onClick={() => setTab(t.key)}>{t.label}</div>
        ))}
      </div>

      {tab === 'contracts' && (
        <div className="card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Karyawan</th>
                  <th>Tipe Kontrak</th>
                  <th>Tanggal Mulai</th>
                  <th>Tanggal Berakhir</th>
                  <th>Status</th>
                  <th>Catatan</th>
                </tr>
              </thead>
              <tbody>
                {filteredContracts.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{c.nama}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{c.employee_id}</div>
                    </td>
                    <td>
                      <span className={`badge ${c.tipe === 'PKWTT' ? 'badge-teal' : 'badge-blue'}`}>{c.tipe}</span>
                    </td>
                    <td>{c.tanggal_mulai}</td>
                    <td>{c.tanggal_berakhir || <span style={{ color: 'var(--gray-300)' }}>Tidak terbatas</span>}</td>
                    <td><span className={`badge ${contractStatusBadge(c.status)}`}>{c.status}</span></td>
                    <td style={{ fontSize: 12, color: 'var(--gray-500)', maxWidth: 200 }}>{c.catatan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'salary' && (
        <div className="card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Karyawan</th>
                  <th>Tanggal Efektif</th>
                  <th>Jabatan Baru</th>
                  <th>Gaji Lama</th>
                  <th>Gaji Baru</th>
                  <th>Kenaikan</th>
                  <th>Alasan</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalary.sort((a, b) => b.tanggal_efektif.localeCompare(a.tanggal_efektif)).map(s => {
                  const kenaikan = s.gaji_lama ? s.gaji_baru - s.gaji_lama : null;
                  const kenaikanPct = s.gaji_lama ? Math.round(((s.gaji_baru - s.gaji_lama) / s.gaji_lama) * 100) : null;
                  return (
                    <tr key={s.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{s.nama}</div>
                        <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{s.employee_id}</div>
                      </td>
                      <td>{s.tanggal_efektif}</td>
                      <td style={{ fontSize: 13 }}>{s.jabatan_baru}</td>
                      <td style={{ color: 'var(--gray-500)' }}>{fmtRp(s.gaji_lama)}</td>
                      <td style={{ fontWeight: 600 }}>{fmtRp(s.gaji_baru)}</td>
                      <td>
                        {kenaikan !== null ? (
                          <span style={{ color: 'var(--teal-dark)', fontWeight: 600, fontSize: 13 }}>
                            +{fmtRp(kenaikan)} <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>({kenaikanPct}%)</span>
                          </span>
                        ) : <span style={{ color: 'var(--gray-300)' }}>Awal</span>}
                      </td>
                      <td>
                        <span className="badge badge-gray">{s.alasan}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
