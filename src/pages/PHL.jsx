import { useState } from 'react';
import { phlPool, phlCampaigns, phlDeployments } from '../data/dummyData';

const fmtRp = (n) => n ? 'Rp ' + new Intl.NumberFormat('id-ID').format(n) : '—';

const campaignStatusBadge = (s) => {
  const map = { selesai: 'badge-green', 'akan datang': 'badge-blue', berlangsung: 'badge-teal' };
  return map[s] || 'badge-gray';
};

export default function PHL() {
  const [tab, setTab] = useState('pool');
  const [filterCampaign, setFilterCampaign] = useState('');
  const [selectedPHL, setSelectedPHL] = useState(null);

  const filteredDeployments = filterCampaign
    ? phlDeployments.filter(d => d.campaign_id === filterCampaign)
    : phlDeployments;

  const totalPayment = filteredDeployments
    .filter(d => d.hadir)
    .reduce((s, d) => s + d.payment_harian, 0);

  const reliabilityColor = (r) => {
    if (r >= 93) return 'badge-green';
    if (r >= 85) return 'badge-teal';
    if (r >= 75) return 'badge-yellow';
    return 'badge-red';
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">PHL — Pekerja Harian Lepas</h1>
          <p className="page-subtitle">Kelola database PHL, campaign, dan penugasan harian</p>
        </div>
        <button className="btn btn-primary">+ Tambah PHL</button>
      </div>

      {/* Stats */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        <div className="stat-card stat-accent-teal">
          <div className="stat-label">Total PHL</div>
          <div className="stat-value">{phlPool.length}</div>
          <div className="stat-sub">{phlPool.filter(p => p.status === 'aktif').length} aktif</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Campaign Aktif</div>
          <div className="stat-value">{phlCampaigns.filter(c => c.status === 'akan datang').length}</div>
          <div className="stat-sub">akan datang</div>
        </div>
        <div className="stat-card stat-accent-pink">
          <div className="stat-label">Total Penugasan</div>
          <div className="stat-value">{phlDeployments.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Reliability</div>
          <div className="stat-value" style={{ fontSize: 20 }}>
            {(phlPool.reduce((s, p) => s + p.reliability_rate, 0) / phlPool.length).toFixed(0)}%
          </div>
        </div>
      </div>

      <div className="tabs">
        {[
          { key: 'pool', label: 'PHL Pool' },
          { key: 'campaigns', label: 'Campaign' },
          { key: 'deployments', label: 'Penugasan' },
        ].map(t => (
          <div key={t.key} className={`tab${tab === t.key ? ' active' : ''}`} onClick={() => setTab(t.key)}>{t.label}</div>
        ))}
      </div>

      {/* PHL Pool */}
      {tab === 'pool' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">Master Database PHL</span>
            <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{phlPool.length} pekerja</span>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Nama PHL</th>
                  <th>Keahlian</th>
                  <th>Kota</th>
                  <th>Reliability Rate</th>
                  <th>Avg Performance</th>
                  <th>Status</th>
                  <th>Kontak</th>
                </tr>
              </thead>
              <tbody>
                {phlPool.map(p => (
                  <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedPHL(p)}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{p.nama}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{p.id}</div>
                    </td>
                    <td><span className="badge badge-gray">{p.keahlian}</span></td>
                    <td style={{ fontSize: 13 }}>{p.kota}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className={`badge ${reliabilityColor(p.reliability_rate)}`}>{p.reliability_rate}%</span>
                        <div className="progress-bar" style={{ width: 60 }}>
                          <div className="progress-fill" style={{ width: `${p.reliability_rate}%`, background: p.reliability_rate >= 93 ? 'var(--teal)' : p.reliability_rate >= 85 ? '#f59e0b' : '#ef4444' }} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600 }}>{p.avg_performance}</span>
                      <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>/10.0</span>
                    </td>
                    <td>
                      <span className={`badge ${p.status === 'aktif' ? 'badge-green' : 'badge-gray'}`}>{p.status}</span>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--gray-500)' }}>{p.kontak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Campaigns */}
      {tab === 'campaigns' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {phlCampaigns.map(c => {
            const gmvPct = c.realisasi_gmv ? Math.round((c.realisasi_gmv / c.target_gmv) * 100) : null;
            return (
              <div key={c.id} className="card">
                <div style={{ padding: '18px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--gray-900)' }}>{c.nama}</div>
                      <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2 }}>
                        {c.tanggal_mulai} — {c.tanggal_selesai} · {c.kebutuhan_phl} PHL dibutuhkan
                      </div>
                    </div>
                    <span className={`badge ${campaignStatusBadge(c.status)}`}>{c.status}</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>Target GMV</div>
                      <div style={{ fontSize: 15, fontWeight: 700 }}>{fmtRp(c.target_gmv)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>Realisasi GMV</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: c.realisasi_gmv ? (c.realisasi_gmv >= c.target_gmv ? 'var(--teal-dark)' : '#f59e0b') : 'var(--gray-300)' }}>
                        {c.realisasi_gmv ? fmtRp(c.realisasi_gmv) : '—'}
                      </div>
                    </div>
                    {gmvPct !== null && (
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>Pencapaian</div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: gmvPct >= 100 ? 'var(--teal-dark)' : '#f59e0b' }}>{gmvPct}%</div>
                      </div>
                    )}
                  </div>

                  {c.realisasi_gmv && (
                    <div className="progress-bar" style={{ marginTop: 12 }}>
                      <div className="progress-fill" style={{
                        width: `${Math.min(gmvPct, 100)}%`,
                        background: gmvPct >= 100 ? 'var(--teal)' : '#f59e0b'
                      }} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Deployments */}
      {tab === 'deployments' && (
        <>
          <div className="filters-bar">
            <label className="form-label" style={{ marginBottom: 0 }}>Campaign:</label>
            <select className="form-select" value={filterCampaign} onChange={e => setFilterCampaign(e.target.value)} style={{ width: 220 }}>
              <option value="">Semua Campaign</option>
              {phlCampaigns.map(c => <option key={c.id} value={c.id}>{c.nama}</option>)}
            </select>
            {filterCampaign && (
              <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>
                Total dibayar: <strong style={{ color: 'var(--teal-dark)' }}>{fmtRp(totalPayment)}</strong>
              </span>
            )}
          </div>
          <div className="card">
            <div className="card-header">
              <span className="card-title">Penugasan PHL</span>
              <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{filteredDeployments.length} penugasan</span>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Nama PHL</th>
                    <th>Campaign</th>
                    <th>Tanggal</th>
                    <th>Shift</th>
                    <th>Jam</th>
                    <th>Peran</th>
                    <th>Payment</th>
                    <th>Kehadiran</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeployments.map(d => {
                    const camp = phlCampaigns.find(c => c.id === d.campaign_id);
                    return (
                      <tr key={d.id}>
                        <td>
                          <div style={{ fontWeight: 600 }}>{d.nama}</div>
                          <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{d.phl_id}</div>
                        </td>
                        <td style={{ fontSize: 12 }}>{camp?.nama || d.campaign_id}</td>
                        <td>{d.tanggal}</td>
                        <td><span className={`badge ${d.shift === 'Pagi' ? 'badge-teal' : d.shift === 'Siang' ? 'badge-yellow' : 'badge-purple'}`}>{d.shift}</span></td>
                        <td style={{ fontSize: 12, color: 'var(--gray-500)' }}>{d.jam}</td>
                        <td><span className="badge badge-gray">{d.peran}</span></td>
                        <td style={{ fontWeight: 600 }}>{fmtRp(d.payment_harian)}</td>
                        <td>
                          {d.hadir
                            ? <span className="badge badge-green">✓ Hadir</span>
                            : <span className="badge badge-red">✗ Absen</span>
                          }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* PHL Detail Modal */}
      {selectedPHL && (
        <div className="modal-overlay" onClick={() => setSelectedPHL(null)}>
          <div className="modal" style={{ maxWidth: 440 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{selectedPHL.nama}</div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelectedPHL(null)}>✕</button>
            </div>
            <div className="modal-body">
              {[
                ['ID', selectedPHL.id],
                ['Keahlian', selectedPHL.keahlian],
                ['Kota', selectedPHL.kota],
                ['Kontak', selectedPHL.kontak],
                ['Reliability Rate', `${selectedPHL.reliability_rate}%`],
                ['Avg Performance', `${selectedPHL.avg_performance} / 10.0`],
                ['Status', selectedPHL.status],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--gray-100)', fontSize: 13 }}>
                  <span style={{ color: 'var(--gray-500)' }}>{k}</span>
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Riwayat Penugasan</div>
                {phlDeployments.filter(d => d.phl_id === selectedPHL.id).length === 0 ? (
                  <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>Belum ada penugasan</div>
                ) : phlDeployments.filter(d => d.phl_id === selectedPHL.id).map(d => {
                  const camp = phlCampaigns.find(c => c.id === d.campaign_id);
                  return (
                    <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--gray-100)', fontSize: 12 }}>
                      <span>{camp?.nama} · {d.tanggal}</span>
                      <span className={`badge ${d.hadir ? 'badge-green' : 'badge-red'}`} style={{ fontSize: 10 }}>{d.hadir ? 'Hadir' : 'Absen'}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
