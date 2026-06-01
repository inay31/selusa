import { useState } from 'react';
import { payrollData, computeNetSalary } from '../data/dummyData';

const fmt = (n) => new Intl.NumberFormat('id-ID').format(n);
const fmtRp = (n) => 'Rp ' + fmt(n);

const bulanList = [...new Set(payrollData.map(p => p.bulan))].sort().reverse();

export default function Payroll() {
  const [bulan, setBulan] = useState('2026-05');
  const [selected, setSelected] = useState(null);

  const filtered = payrollData.filter(p => p.bulan === bulan);
  const totals = filtered.reduce((acc, p) => {
    const { pendapatan, potongan, net } = computeNetSalary(p);
    return { pendapatan: acc.pendapatan + pendapatan, potongan: acc.potongan + potongan, net: acc.net + net };
  }, { pendapatan: 0, potongan: 0, net: 0 });

  const bulanLabel = (b) => {
    const [y, m] = b.split('-');
    const names = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${names[parseInt(m)]} ${y}`;
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="page-title">Payroll</h1>
          <p className="page-subtitle">Kelola penggajian karyawan dengan 24 komponen pendapatan & potongan</p>
        </div>
        <button className="btn btn-primary">+ Proses Payroll Baru</button>
      </div>

      {/* Summary Cards */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card stat-accent-teal">
          <div className="stat-label">Total Pendapatan Bruto</div>
          <div className="stat-value" style={{ fontSize: 20 }}>{fmtRp(totals.pendapatan)}</div>
          <div className="stat-sub">{filtered.length} karyawan · {bulanLabel(bulan)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Potongan</div>
          <div className="stat-value" style={{ fontSize: 20, color: 'var(--pink)' }}>{fmtRp(totals.potongan)}</div>
          <div className="stat-sub">PPh21, BPJS, & potongan lain</div>
        </div>
        <div className="stat-card stat-accent-pink">
          <div className="stat-label">Total Take Home Pay</div>
          <div className="stat-value" style={{ fontSize: 20 }}>{fmtRp(totals.net)}</div>
          <div className="stat-sub">Gaji bersih karyawan</div>
        </div>
      </div>

      {/* Filter */}
      <div className="filters-bar">
        <label className="form-label" style={{ marginBottom: 0 }}>Periode:</label>
        <select className="form-select" value={bulan} onChange={e => setBulan(e.target.value)} style={{ width: 180 }}>
          {bulanList.map(b => <option key={b} value={b}>{bulanLabel(b)}</option>)}
        </select>
        <span style={{ fontSize: 12, color: 'var(--gray-400)', marginLeft: 4 }}>
          {filtered.length} data ditemukan
        </span>
      </div>

      {/* Table */}
      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Karyawan</th>
                <th>Divisi</th>
                <th>Gaji Pokok</th>
                <th>Tj. Jabatan</th>
                <th>Tj. Transport</th>
                <th>Tj. Makan</th>
                <th>Tj. Kesehatan</th>
                <th>Tj. Komunikasi</th>
                <th>Tj. Lainnya</th>
                <th>Lembur</th>
                <th>Bonus</th>
                <th>THR</th>
                <th>Tj. Keluarga</th>
                <th style={{ background: '#f0f9f8', color: 'var(--teal-dark)' }}>Bruto</th>
                <th>PPh21</th>
                <th>BPJS TK</th>
                <th>BPJS Kes</th>
                <th>Alpha</th>
                <th>Kasbon</th>
                <th>Koperasi</th>
                <th style={{ background: '#fce8f0', color: 'var(--pink-dark)' }}>Potongan</th>
                <th style={{ background: '#f0f9f8', color: 'var(--teal-dark)', fontWeight: 700 }}>NET</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={23} style={{ textAlign: 'center', padding: 32, color: 'var(--gray-400)' }}>Tidak ada data payroll untuk periode ini</td></tr>
              ) : filtered.map(p => {
                const { pendapatan, potongan, net } = computeNetSalary(p);
                return (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--gray-800)' }}>{p.nama}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{p.employee_id}</div>
                    </td>
                    <td><span className="badge badge-gray">{p.divisi}</span></td>
                    <td>{fmtRp(p.gaji_pokok)}</td>
                    <td>{fmtRp(p.tunjangan_jabatan)}</td>
                    <td>{fmtRp(p.tunjangan_transport)}</td>
                    <td>{fmtRp(p.tunjangan_makan)}</td>
                    <td>{fmtRp(p.tunjangan_kesehatan)}</td>
                    <td>{fmtRp(p.tunjangan_komunikasi)}</td>
                    <td>{fmtRp(p.tunjangan_lainnya)}</td>
                    <td>{fmtRp(p.uang_lembur)}</td>
                    <td>{fmtRp(p.bonus_kinerja)}</td>
                    <td>{fmtRp(p.thr)}</td>
                    <td>{fmtRp(p.tunjangan_keluarga)}</td>
                    <td style={{ background: '#f8fffe', fontWeight: 600, color: 'var(--teal-dark)' }}>{fmtRp(pendapatan)}</td>
                    <td style={{ color: '#dc2626' }}>{fmtRp(p.pph21)}</td>
                    <td style={{ color: '#dc2626' }}>{fmtRp(p.bpjs_tk)}</td>
                    <td style={{ color: '#dc2626' }}>{fmtRp(p.bpjs_kes)}</td>
                    <td style={{ color: p.alpha_potongan > 0 ? '#dc2626' : 'var(--gray-400)' }}>{fmtRp(p.alpha_potongan)}</td>
                    <td style={{ color: p.kasbon > 0 ? '#dc2626' : 'var(--gray-400)' }}>{fmtRp(p.kasbon)}</td>
                    <td style={{ color: p.cicilan_koperasi > 0 ? '#dc2626' : 'var(--gray-400)' }}>{fmtRp(p.cicilan_koperasi)}</td>
                    <td style={{ background: '#fff8fb', fontWeight: 600, color: 'var(--pink-dark)' }}>{fmtRp(potongan)}</td>
                    <td style={{ background: '#f8fffe', fontWeight: 700, color: 'var(--teal-dark)', fontSize: 13.5 }}>{fmtRp(net)}</td>
                    <td>
                      <button className="btn btn-ghost btn-sm" onClick={() => setSelected(p)}>Detail</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (() => {
        const { pendapatan, potongan, net } = computeNetSalary(selected);
        return (
          <div className="modal-overlay" onClick={() => setSelected(null)}>
            <div className="modal" style={{ maxWidth: 500 }} onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <div className="modal-title">{selected.nama}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>{selected.divisi} · {bulanLabel(selected.bulan)}</div>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>✕</button>
              </div>
              <div className="modal-body">
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Pendapatan</div>
                  {[
                    ['Gaji Pokok', selected.gaji_pokok], ['Tunjangan Jabatan', selected.tunjangan_jabatan],
                    ['Tunjangan Transport', selected.tunjangan_transport], ['Tunjangan Makan', selected.tunjangan_makan],
                    ['Tunjangan Kesehatan', selected.tunjangan_kesehatan], ['Tunjangan Komunikasi', selected.tunjangan_komunikasi],
                    ['Tunjangan Lainnya', selected.tunjangan_lainnya], ['Uang Lembur', selected.uang_lembur],
                    ['Bonus Kinerja', selected.bonus_kinerja], ['THR', selected.thr], ['Tunjangan Keluarga', selected.tunjangan_keluarga],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--gray-100)', fontSize: 13 }}>
                      <span style={{ color: 'var(--gray-600)' }}>{k}</span>
                      <span style={{ fontWeight: 500 }}>{fmtRp(v)}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontWeight: 700, color: 'var(--teal-dark)', fontSize: 13.5 }}>
                    <span>Total Bruto</span><span>{fmtRp(pendapatan)}</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--pink)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Potongan</div>
                  {[
                    ['PPh 21', selected.pph21], ['BPJS Ketenagakerjaan', selected.bpjs_tk],
                    ['BPJS Kesehatan', selected.bpjs_kes], ['Potongan Alpha', selected.alpha_potongan],
                    ['Kasbon', selected.kasbon], ['Cicilan Koperasi', selected.cicilan_koperasi],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--gray-100)', fontSize: 13 }}>
                      <span style={{ color: 'var(--gray-600)' }}>{k}</span>
                      <span style={{ fontWeight: 500, color: v > 0 ? '#dc2626' : 'var(--gray-400)' }}>{v > 0 ? `- ${fmtRp(v)}` : fmtRp(0)}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontWeight: 700, color: 'var(--pink-dark)', fontSize: 13.5 }}>
                    <span>Total Potongan</span><span>- {fmtRp(potongan)}</span>
                  </div>
                </div>
                <div style={{ background: 'var(--teal-light)', borderRadius: 8, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--teal-dark)' }}>Take Home Pay</span>
                  <span style={{ fontWeight: 800, fontSize: 18, color: 'var(--teal-dark)' }}>{fmtRp(net)}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
