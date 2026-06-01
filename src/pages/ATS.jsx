import { useState } from 'react';
import { initialCandidates, pipelineStages } from '../data/dummyData';

const stageColors = {
  'Applied': 'badge-gray',
  'Screening': 'badge-blue',
  'Interview 1': 'badge-teal',
  'Interview 2': 'badge-purple',
  'Offer': 'badge-yellow',
  'Hired': 'badge-green',
};

export default function ATS() {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [selected, setSelected] = useState(null);
  const [dragId, setDragId] = useState(null);
  const [dragOverStage, setDragOverStage] = useState(null);

  const byStage = (stage) => candidates.filter(c => c.status === stage);

  const moveCandidate = (id, newStage) => {
    setCandidates(prev => prev.map(c => {
      if (c.id !== id) return c;
      const updated = { ...c, status: newStage };
      if (newStage === 'Hired' && !c.time_to_hire_days) {
        const start = new Date(c.tanggal_apply);
        const end = new Date();
        updated.time_to_hire_days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
        updated.auto_reply_sent = true;
      }
      return updated;
    }));
  };

  const handleDrop = (stage) => {
    if (dragId) moveCandidate(dragId, stage);
    setDragId(null);
    setDragOverStage(null);
  };

  const totalApplied = candidates.length;
  const hired = candidates.filter(c => c.status === 'Hired').length;
  const avgTTH = (() => {
    const withTTH = candidates.filter(c => c.time_to_hire_days);
    if (!withTTH.length) return 0;
    return Math.round(withTTH.reduce((s, c) => s + c.time_to_hire_days, 0) / withTTH.length);
  })();

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">ATS Pipeline</h1>
          <p className="page-subtitle">Kelola pipeline rekrutmen kandidat. Drag kartu untuk pindah tahap.</p>
        </div>
        <button className="btn btn-primary">+ Tambah Kandidat</button>
      </div>

      {/* Stats */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        <div className="stat-card stat-accent-teal">
          <div className="stat-label">Total Kandidat</div>
          <div className="stat-value">{totalApplied}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Aktif di Pipeline</div>
          <div className="stat-value">{totalApplied - hired}</div>
        </div>
        <div className="stat-card stat-accent-pink">
          <div className="stat-label">Hired</div>
          <div className="stat-value">{hired}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg. Time to Hire</div>
          <div className="stat-value">{avgTTH} <span style={{ fontSize: 14, fontWeight: 500 }}>hari</span></div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="pipeline-board">
        {pipelineStages.map(stage => (
          <div
            key={stage}
            className="pipeline-col"
            style={{ borderTop: `3px solid ${stage === 'Hired' ? 'var(--teal)' : stage === 'Offer' ? '#f59e0b' : 'var(--gray-300)'}`,
              background: dragOverStage === stage ? 'var(--teal-light)' : undefined,
              transition: 'background 0.15s'
            }}
            onDragOver={e => { e.preventDefault(); setDragOverStage(stage); }}
            onDragLeave={() => setDragOverStage(null)}
            onDrop={() => handleDrop(stage)}
          >
            <div className="pipeline-col-header">
              <span className="pipeline-col-title">{stage}</span>
              <span className="pipeline-col-count">{byStage(stage).length}</span>
            </div>
            <div className="pipeline-col-body">
              {byStage(stage).map(c => (
                <div
                  key={c.id}
                  className="candidate-card"
                  draggable
                  onDragStart={() => setDragId(c.id)}
                  onDragEnd={() => { setDragId(null); setDragOverStage(null); }}
                  onClick={() => setSelected(c)}
                  style={{ opacity: dragId === c.id ? 0.5 : 1 }}
                >
                  <div className="candidate-name">{c.nama}</div>
                  <div className="candidate-role">{c.posisi}</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    <span className="badge badge-gray" style={{ fontSize: 10 }}>{c.sumber}</span>
                    {c.auto_reply_sent && <span className="badge badge-green" style={{ fontSize: 10 }}>✉ Notif</span>}
                    {c.time_to_hire_days && <span className="badge badge-teal" style={{ fontSize: 10 }}>{c.time_to_hire_days}h</span>}
                  </div>
                </div>
              ))}
              {byStage(stage).length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--gray-300)', fontSize: 12, padding: '16px 0' }}>Kosong</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Candidate Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">{selected.nama}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>{selected.posisi} · {selected.sumber}</div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                {[
                  ['Status', <span className={`badge ${stageColors[selected.status]}`}>{selected.status}</span>],
                  ['Tanggal Apply', selected.tanggal_apply],
                  ['Time to Hire', selected.time_to_hire_days ? `${selected.time_to_hire_days} hari` : 'Belum selesai'],
                  ['Auto Reply', selected.auto_reply_sent ? '✓ Terkirim' : '✗ Belum'],
                  ['Converted ID', selected.converted_to_employee_id || '—'],
                  ['ID Kandidat', selected.id],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 13 }}>{v}</div>
                  </div>
                ))}
              </div>
              {selected.catatan && (
                <div style={{ background: 'var(--gray-50)', borderRadius: 6, padding: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Catatan HR</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-700)', lineHeight: 1.5 }}>{selected.catatan}</div>
                </div>
              )}
            </div>
            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {pipelineStages.filter(s => s !== selected.status).map(s => (
                  <button key={s} className="btn btn-secondary btn-sm"
                    onClick={() => { moveCandidate(selected.id, s); setSelected(c => ({ ...c, status: s })); }}>
                    → {s}
                  </button>
                ))}
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
