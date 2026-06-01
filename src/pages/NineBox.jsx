import { useState } from 'react';
import { employees } from '../data/dummyData';

// 9-box grid: X = Performance (0-10), Y = Potential (0-10)
// Grid cells from top-left: [High Pot/Low Perf] ... [High Pot/High Perf]
// Row 0 = High Potential (>7.6), Row 1 = Medium (5.6-7.6), Row 2 = Low (<5.6)
// Col 0 = Low Performance (<6.4), Col 1 = Medium (6.4-8.0), Col 2 = High (>8.0)

const CELLS = [
  // row 0 (high potential)
  { row: 0, col: 0, label: 'Enigma',         desc: 'Potensi tinggi, performa rendah',       color: '#fef9c3',  border: '#fde047' },
  { row: 0, col: 1, label: 'High Potential',  desc: 'Potensi & performa berkembang',         color: '#dcfce7',  border: '#86efac' },
  { row: 0, col: 2, label: 'Star',            desc: 'Performa & potensi sangat tinggi',      color: '#d1fae5',  border: '#34d399' },
  // row 1 (medium potential)
  { row: 1, col: 0, label: 'Under Performer', desc: 'Perlu pembinaan intensif',              color: '#fee2e2',  border: '#fca5a5' },
  { row: 1, col: 1, label: 'Core Player',     desc: 'Andalan divisi',                        color: '#e0f2fe',  border: '#7dd3fc' },
  { row: 1, col: 2, label: 'High Performer',  desc: 'Performa di atas rata-rata',            color: '#ede9fe',  border: '#c4b5fd' },
  // row 2 (low potential)
  { row: 2, col: 0, label: 'Mismatch',        desc: 'Review posisi atau exit',               color: '#fee2e2',  border: '#fca5a5' },
  { row: 2, col: 1, label: 'Solid Performer', desc: 'Stabil, perlu motivasi',                color: '#f3f4f6',  border: '#d1d5db' },
  { row: 2, col: 2, label: 'Consistent Star', desc: 'Performa tinggi, potensi cukup',        color: '#fef3c7',  border: '#fcd34d' },
];


function getCell(performance, potential) {
  const col = performance > 8.0 ? 2 : performance >= 6.4 ? 1 : 0;
  const row = potential > 7.6 ? 0 : potential >= 5.6 ? 1 : 2;
  return { row, col };
}

export default function NineBox() {
  const [selected, setSelected] = useState(null);
  const activeEmployees = employees.filter(e => e.status === 'aktif');

  const getEmployeesInCell = (row, col) =>
    activeEmployees.filter(e => {
      const c = getCell(e.performance, e.potential);
      return c.row === row && c.col === col;
    });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">9 Box Talent Mapping</h1>
        <p className="page-subtitle">Pemetaan karyawan berdasarkan Performance (sumbu X) dan Potential (sumbu Y)</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
        {/* Grid */}
        <div>
          {/* Axis labels */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8 }}>
            <div style={{ width: 80, fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center' }}>
              ↑ Potensi
            </div>
            <div style={{ flex: 1 }} />
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
            {/* Y-axis labels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 80, flexShrink: 0 }}>
              {['Tinggi', 'Sedang', 'Rendah'].map(l => (
                <div key={l} style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', textTransform: 'uppercase',
                  letterSpacing: '0.5px', minHeight: 140
                }}>{l}</div>
              ))}
            </div>

            {/* 3x3 grid */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, minmax(140px, 1fr))', gap: 8 }}>
              {CELLS.map(cell => {
                const emps = getEmployeesInCell(cell.row, cell.col);
                return (
                  <div key={`${cell.row}-${cell.col}`} style={{
                    background: cell.color,
                    border: `1.5px solid ${cell.border}`,
                    borderRadius: 8,
                    padding: 12,
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-600)', marginBottom: 2 }}>{cell.label}</div>
                    <div style={{ fontSize: 10, color: 'var(--gray-400)', marginBottom: 8 }}>{cell.desc}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {emps.map(e => (
                        <div key={e.id}
                          className="employee-chip"
                          onClick={() => setSelected(e)}
                          title={`${e.nama} — Perf: ${e.performance} | Pot: ${e.potential}`}
                        >
                          {e.name || e.nama.split(' ')[0]}
                        </div>
                      ))}
                      {emps.length === 0 && (
                        <span style={{ fontSize: 11, color: 'var(--gray-300)' }}>Kosong</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* X-axis labels */}
          <div style={{ display: 'flex', gap: 8, marginTop: 8, paddingLeft: 88 }}>
            {['Rendah', 'Sedang', 'Tinggi'].map(l => (
              <div key={l} style={{ flex: 1, textAlign: 'center', fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {l}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', paddingLeft: 88, fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 4 }}>
            Performance →
          </div>
        </div>

        {/* Side panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Selected Employee */}
          {selected ? (
            <div className="card">
              <div className="card-header">
                <span className="card-title">Detail Karyawan</span>
                <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>✕</button>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div className="avatar avatar-teal" style={{ width: 44, height: 44, fontSize: 15 }}>
                    {selected.nama.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{selected.nama}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{selected.jabatan}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{selected.divisi}</div>
                  </div>
                </div>
                {[
                  ['Performance Score', `${selected.performance} / 10.0`],
                  ['Potential Score', `${selected.potential} / 10.0`],
                  ['Posisi Grid', (() => { const c = getCell(selected.performance, selected.potential); return CELLS.find(x => x.row === c.row && x.col === c.col)?.label || '—'; })()],
                  ['Status', selected.status],
                  ['Bergabung', selected.join_date],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--gray-100)', fontSize: 13 }}>
                    <span style={{ color: 'var(--gray-500)' }}>{k}</span>
                    <span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body" style={{ textAlign: 'center', padding: '32px 20px' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>⊞</div>
                <div style={{ fontSize: 13, color: 'var(--gray-400)' }}>Klik nama karyawan di grid untuk melihat detail</div>
              </div>
            </div>
          )}

          {/* All employees list */}
          <div className="card">
            <div className="card-header"><span className="card-title">Semua Karyawan</span></div>
            <div style={{ maxHeight: 360, overflowY: 'auto' }}>
              {activeEmployees.map(e => {
                const c = getCell(e.performance, e.potential);
                const cell = CELLS.find(x => x.row === c.row && x.col === c.col);
                return (
                  <div key={e.id} style={{
                    padding: '10px 16px', borderBottom: '1px solid var(--gray-100)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    cursor: 'pointer', transition: 'background 0.1s'
                  }}
                    onClick={() => setSelected(e)}
                    onMouseEnter={e2 => e2.currentTarget.style.background = 'var(--gray-50)'}
                    onMouseLeave={e2 => e2.currentTarget.style.background = 'transparent'}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{e.nama}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{e.divisi}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--gray-500)', padding: '2px 6px', background: cell?.color, borderRadius: 3 }}>
                        {cell?.label}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 2 }}>P:{e.performance} / Pot:{e.potential}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
