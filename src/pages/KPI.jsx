import { useState } from 'react';
import { kpiDivisi, initialKpiIndividu } from '../data/dummyData';

const fmt = (n, satuan) => {
  if (satuan === 'Rp') return 'Rp ' + new Intl.NumberFormat('id-ID').format(n);
  return `${new Intl.NumberFormat('id-ID').format(n)} ${satuan}`;
};

const pct = (k) => {
  if (k.lowerIsBetter) {
    if (k.realisasi === 0) return 150; // if real is 0 and target is non-zero, it's perfect
    return Math.min(Math.round((k.target / k.realisasi) * 100), 150);
  }
  return Math.min(Math.round((k.realisasi / k.target) * 100), 150);
};

const pctColor = (p) => {
  if (p >= 100) return 'var(--teal)';
  if (p >= 75) return '#f59e0b';
  return '#ef4444';
};

export default function KPI() {
  const [tab, setTab] = useState('divisi');
  const [kpiIndividu, setKpiIndividu] = useState(initialKpiIndividu);
  const [editing, setEditing] = useState(null);
  const [editVal, setEditVal] = useState('');

  const divisiList = [...new Set(kpiDivisi.map(k => k.divisi))];

  const saveEdit = () => {
    setKpiIndividu(prev => prev.map(k => k.id === editing ? { ...k, realisasi: Number(editVal) } : k));
    setEditing(null);
    setEditVal('');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">KPI</h1>
        <p className="page-subtitle">Pantau target dan realisasi KPI per divisi dan per individu</p>
      </div>

      <div className="tabs">
        {[{ key: 'divisi', label: 'KPI Divisi' }, { key: 'individu', label: 'KPI Individu' }].map(t => (
          <div key={t.key} className={`tab${tab === t.key ? ' active' : ''}`} onClick={() => setTab(t.key)}>{t.label}</div>
        ))}
      </div>

      {tab === 'divisi' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {divisiList.map(divisi => {
            const items = kpiDivisi.filter(k => k.divisi === divisi);
            const achieved = items.filter(k => k.realisasi >= k.target).length;
            return (
              <div key={divisi} className="card">
                <div className="card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className="card-title">{divisi}</span>
                    <span className="badge badge-gray">{items[0]?.periode}</span>
                  </div>
                  <span style={{ fontSize: 12, color: achieved === items.length ? 'var(--teal-dark)' : 'var(--gray-500)', fontWeight: 600 }}>
                    {achieved}/{items.length} tercapai
                  </span>
                </div>
                <div className="card-body">
                  {items.map(k => {
                    const p = pct(k);
                    return (
                      <div key={k.id} style={{ marginBottom: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 13, fontWeight: 500 }}>{k.kpi}</span>
                          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>
                              Target: <strong>{fmt(k.target, k.satuan)}</strong>
                            </span>
                            <span style={{ fontSize: 12, color: pctColor(p), fontWeight: 700 }}>
                              {fmt(k.realisasi, k.satuan)} ({p}%)
                            </span>
                            {p >= 100
                              ? <span className="badge badge-green">✓ Tercapai</span>
                              : <span className="badge badge-red">✗ Belum</span>
                            }
                          </div>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${Math.min(p, 100)}%`, background: pctColor(p) }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'individu' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">KPI Individu — Mei 2024</span>
            <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>Klik "Edit" untuk update progress</span>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Karyawan</th>
                  <th>KPI</th>
                  <th>Target</th>
                  <th>Realisasi</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {kpiIndividu.map(k => {
                  const p = pct(k);
                  return (
                    <tr key={k.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{k.nama}</div>
                        <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{k.employee_id}</div>
                      </td>
                      <td style={{ fontSize: 13 }}>{k.kpi}</td>
                      <td style={{ fontWeight: 500 }}>{fmt(k.target, k.satuan)}</td>
                      <td>
                        {editing === k.id ? (
                          <div style={{ display: 'flex', gap: 6 }}>
                            <input className="form-input" style={{ width: 90 }} type="number" value={editVal} onChange={e => setEditVal(e.target.value)} />
                            <button className="btn btn-primary btn-sm" onClick={saveEdit}>✓</button>
                            <button className="btn btn-ghost btn-sm" onClick={() => setEditing(null)}>✕</button>
                          </div>
                        ) : (
                          <span style={{ fontWeight: 600, color: pctColor(p) }}>{fmt(k.realisasi, k.satuan)}</span>
                        )}
                      </td>
                      <td style={{ minWidth: 120 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div className="progress-bar" style={{ flex: 1 }}>
                            <div className="progress-fill" style={{ width: `${Math.min(p, 100)}%`, background: pctColor(p) }} />
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: pctColor(p), width: 36 }}>{p}%</span>
                        </div>
                      </td>
                      <td>
                        {p >= 100 ? <span className="badge badge-green">✓ Tercapai</span> : <span className="badge badge-red">✗ Belum</span>}
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-sm" onClick={() => { setEditing(k.id); setEditVal(k.realisasi); }}>
                          Edit
                        </button>
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
