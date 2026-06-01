import { useState } from 'react';
import { initialTalentPool } from '../data/dummyData';

export default function TalentPool() {
  const [pool, setPool] = useState(initialTalentPool);
  const [search, setSearch] = useState('');
  const [filterSumber, setFilterSumber] = useState('');
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ nama: '', keahlian: '', sumber: 'LinkedIn', catatan: '', kontak: '' });

  const sumberList = [...new Set(pool.map(p => p.sumber))];

  const filtered = pool.filter(p => {
    const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.keahlian.some(k => k.toLowerCase().includes(search.toLowerCase()));
    const matchSumber = !filterSumber || p.sumber === filterSumber;
    return matchSearch && matchSumber;
  });

  const handleAdd = () => {
    if (!form.nama.trim()) return;
    const newEntry = {
      id: `TLP${String(pool.length + 1).padStart(3, '0')}`,
      nama: form.nama,
      keahlian: form.keahlian.split(',').map(k => k.trim()).filter(Boolean),
      sumber: form.sumber,
      tanggal_masuk: new Date().toISOString().split('T')[0],
      catatan: form.catatan,
      kontak: form.kontak,
    };
    setPool(prev => [...prev, newEntry]);
    setForm({ nama: '', keahlian: '', sumber: 'LinkedIn', catatan: '', kontak: '' });
    setShowAdd(false);
  };

  const sumberColor = (s) => {
    const map = { LinkedIn: 'badge-blue', Referral: 'badge-teal', 'Event/Webinar': 'badge-purple', Portofolio: 'badge-pink', GitHub: 'badge-gray', Jobfair: 'badge-yellow' };
    return map[s] || 'badge-gray';
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Talent Pool</h1>
          <p className="page-subtitle">Database calon potensial yang belum melamar secara resmi</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ Tambah ke Pool</button>
      </div>

      {/* Stats */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        <div className="stat-card stat-accent-teal">
          <div className="stat-label">Total Talent</div>
          <div className="stat-value">{pool.length}</div>
        </div>
        {['LinkedIn', 'Referral'].map(s => (
          <div key={s} className="stat-card">
            <div className="stat-label">Via {s}</div>
            <div className="stat-value">{pool.filter(p => p.sumber === s).length}</div>
          </div>
        ))}
        <div className="stat-card stat-accent-pink">
          <div className="stat-label">Bulan Ini</div>
          <div className="stat-value">{pool.filter(p => p.tanggal_masuk >= '2026-04-01').length}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <input
          className="form-input"
          placeholder="Cari nama atau keahlian..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 240 }}
        />
        <select className="form-select" value={filterSumber} onChange={e => setFilterSumber(e.target.value)} style={{ width: 160 }}>
          <option value="">Semua Sumber</option>
          {sumberList.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{filtered.length} talent ditemukan</span>
      </div>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {filtered.map(t => (
          <div key={t.id} className="card" style={{ cursor: 'pointer', transition: 'box-shadow 0.15s' }}
            onClick={() => setSelected(t)}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.07)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <div style={{ padding: '16px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="avatar avatar-teal" style={{ width: 36, height: 36, fontSize: 13 }}>
                    {t.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{t.nama}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 1 }}>{t.tanggal_masuk}</div>
                  </div>
                </div>
                <span className={`badge ${sumberColor(t.sumber)}`}>{t.sumber}</span>
              </div>
              <div className="tags-wrap" style={{ marginBottom: 10 }}>
                {t.keahlian.map(k => <span key={k} className="tag">{k}</span>)}
              </div>
              {t.catatan && (
                <div style={{ fontSize: 12, color: 'var(--gray-500)', lineHeight: 1.4, borderTop: '1px solid var(--gray-100)', paddingTop: 10 }}>
                  {t.catatan}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-text">Tidak ada talent ditemukan</div>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{selected.nama}</div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                {[
                  ['Sumber', <span className={`badge ${sumberColor(selected.sumber)}`}>{selected.sumber}</span>],
                  ['Tanggal Masuk Pool', selected.tanggal_masuk],
                  ['Kontak', selected.kontak],
                  ['ID', selected.id],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 13 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Keahlian</div>
                <div className="tags-wrap">
                  {selected.keahlian.map(k => <span key={k} className="tag">{k}</span>)}
                </div>
              </div>
              {selected.catatan && (
                <div style={{ background: 'var(--gray-50)', borderRadius: 6, padding: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Catatan HR</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.5 }}>{selected.catatan}</div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary btn-sm">Ajukan ke Pipeline ATS</button>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Tambah Talent ke Pool</div>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowAdd(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Nama Lengkap</label>
                  <input className="form-input" value={form.nama} onChange={e => setForm(p => ({ ...p, nama: e.target.value }))} placeholder="Nama kandidat" />
                </div>
                <div className="form-group">
                  <label className="form-label">Keahlian (pisahkan dengan koma)</label>
                  <input className="form-input" value={form.keahlian} onChange={e => setForm(p => ({ ...p, keahlian: e.target.value }))} placeholder="React, Node.js, Python" />
                </div>
                <div className="form-group">
                  <label className="form-label">Sumber</label>
                  <select className="form-select" value={form.sumber} onChange={e => setForm(p => ({ ...p, sumber: e.target.value }))}>
                    {['LinkedIn', 'Referral', 'Event/Webinar', 'Portofolio', 'GitHub', 'Jobfair', 'Lainnya'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Kontak</label>
                  <input className="form-input" value={form.kontak} onChange={e => setForm(p => ({ ...p, kontak: e.target.value }))} placeholder="Email atau nomor HP" />
                </div>
                <div className="form-group">
                  <label className="form-label">Catatan HR</label>
                  <textarea className="form-textarea" value={form.catatan} onChange={e => setForm(p => ({ ...p, catatan: e.target.value }))} placeholder="Catatan tentang kandidat ini..." />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowAdd(false)}>Batal</button>
              <button className="btn btn-primary btn-sm" onClick={handleAdd}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
