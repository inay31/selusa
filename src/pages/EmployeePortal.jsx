import { useState } from 'react';
import { payrollData, computeNetSalary, attendanceLogs, initialLeaveRequests, engagementSurveyData } from '../data/dummyData';

const fmtRp = (n) => 'Rp ' + new Intl.NumberFormat('id-ID').format(n);

const statusBadge = (s) => {
  const map = { hadir: 'badge-green', alpha: 'badge-red', terlambat: 'badge-yellow', izin: 'badge-blue', sakit: 'badge-purple' };
  return map[s] || 'badge-gray';
};

const bulanLabel = (b) => {
  if (!b) return '—';
  const [y, m] = b.split('-');
  const names = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  return `${names[parseInt(m)]} ${y}`;
};

// ── Beranda Tab ──────────────────────────────────────────────
function Beranda({ user, payroll, attendance, leave }) {
  const latestPayroll = payroll[0];
  const latestNet = latestPayroll ? computeNetSalary(latestPayroll).net : 0;
  const hadirCount = attendance.filter(a => a.status === 'hadir').length;

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Take Home Pay', value: fmtRp(latestNet), sub: bulanLabel(latestPayroll?.bulan), accent: 'pink' },
          { label: 'Kehadiran Bulan Ini', value: `${hadirCount}/${attendance.length}`, sub: 'hari hadir', accent: 'teal' },
          { label: 'Sisa Cuti Tahunan', value: '9', sub: 'dari 12 hari/tahun', accent: 'teal' },
          { label: 'Status Kontrak', value: 'Aktif', sub: 'PKWT berlaku', accent: 'pink' },
        ].map(s => (
          <div key={s.label} className={`stat-card stat-accent-${s.accent}`}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ fontSize: s.label === 'Take Home Pay' ? 17 : 26 }}>{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Payslip */}
        <div className="card">
          <div className="card-header"><span className="card-title">Slip Gaji Terakhir</span></div>
          {latestPayroll ? (() => {
            const { pendapatan, potongan, net } = computeNetSalary(latestPayroll);
            return (
              <div className="card-body">
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>
                  {bulanLabel(latestPayroll.bulan)}
                </div>
                {[
                  ['Gaji Pokok', latestPayroll.gaji_pokok],
                  ['Tunjangan Jabatan', latestPayroll.tunjangan_jabatan],
                  ['Tunjangan Transport', latestPayroll.tunjangan_transport],
                  ['Tunjangan Makan', latestPayroll.tunjangan_makan],
                  ['Bonus Kinerja', latestPayroll.bonus_kinerja],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--gray-100)', fontSize: 13 }}>
                    <span style={{ color: 'var(--gray-500)' }}>{k}</span>
                    <span>{fmtRp(v)}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--gray-100)', fontSize: 13, color: '#dc2626' }}>
                  <span>Total Potongan</span>
                  <span>- {fmtRp(potongan)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--teal-light)', borderRadius: 6, marginTop: 10 }}>
                  <span style={{ fontWeight: 700, color: 'var(--teal-dark)' }}>Take Home Pay</span>
                  <span style={{ fontWeight: 800, fontSize: 15, color: 'var(--teal-dark)' }}>{fmtRp(net)}</span>
                </div>
              </div>
            );
          })() : <div style={{ padding: 24, textAlign: 'center', color: 'var(--gray-400)' }}>Belum ada data payroll</div>}
        </div>

        {/* Kehadiran recent */}
        <div className="card">
          <div className="card-header"><span className="card-title">Kehadiran Terakhir</span></div>
          {attendance.length === 0
            ? <div style={{ padding: 24, textAlign: 'center', color: 'var(--gray-400)', fontSize: 13 }}>Belum ada data kehadiran</div>
            : attendance.map(a => (
              <div key={a.id} style={{ padding: '10px 16px', borderBottom: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{a.tanggal}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>
                    {a.jam_masuk ? `${a.jam_masuk} – ${a.jam_keluar}` : '—'}
                  </div>
                </div>
                <span className={`badge ${statusBadge(a.status)}`}>{a.status}</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

// ── Cuti Tab ─────────────────────────────────────────────────
function CutiTab({ leave, empId }) {
  const [myLeave, setMyLeave] = useState(leave);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ jenis: 'Cuti Tahunan', tanggal_mulai: '', tanggal_selesai: '', alasan: '' });
  const [submitted, setSubmitted] = useState(false);

  const jenisCuti = ['Cuti Tahunan', 'Cuti Sakit', 'Cuti Melahirkan', 'Cuti Penting', 'Cuti Lainnya'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReq = {
      id: `LVR${String(Date.now()).slice(-4)}`,
      employee_id: empId,
      nama: '',
      ...form,
      status: 'pending',
      tanggal_pengajuan: new Date().toISOString().split('T')[0],
    };
    setMyLeave(prev => [newReq, ...prev]);
    setForm({ jenis: 'Cuti Tahunan', tanggal_mulai: '', tanggal_selesai: '', alasan: '' });
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-800)' }}>Pengajuan Cuti</div>
          <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>Ajukan dan pantau status cuti kamu</div>
        </div>
        <button className="btn btn-pink btn-sm" onClick={() => setShowForm(s => !s)}>
          {showForm ? '✕ Tutup Form' : '+ Ajukan Cuti'}
        </button>
      </div>

      {submitted && (
        <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#15803d', fontWeight: 500 }}>
          ✓ Pengajuan cuti berhasil dikirim. Menunggu persetujuan HR.
        </div>
      )}

      {showForm && (
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header" style={{ background: 'var(--pink-light)' }}>
            <span className="card-title" style={{ color: 'var(--pink-dark)' }}>Form Pengajuan Cuti Baru</span>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Jenis Cuti</label>
                <select className="form-select" value={form.jenis} onChange={e => setForm(p => ({ ...p, jenis: e.target.value }))}>
                  {jenisCuti.map(j => <option key={j}>{j}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tanggal Mulai</label>
                <input className="form-input" type="date" value={form.tanggal_mulai} onChange={e => setForm(p => ({ ...p, tanggal_mulai: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label className="form-label">Tanggal Selesai</label>
                <input className="form-input" type="date" value={form.tanggal_selesai} onChange={e => setForm(p => ({ ...p, tanggal_selesai: e.target.value }))} required />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Alasan Cuti</label>
                <textarea className="form-textarea" value={form.alasan} onChange={e => setForm(p => ({ ...p, alasan: e.target.value }))} placeholder="Jelaskan alasan pengajuan cuti..." required />
              </div>
              <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowForm(false)}>Batal</button>
                <button type="submit" className="btn btn-pink btn-sm">Kirim Pengajuan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <span className="card-title">Riwayat Pengajuan</span>
          <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{myLeave.length} pengajuan</span>
        </div>
        {myLeave.length === 0
          ? <div style={{ padding: 40, textAlign: 'center', color: 'var(--gray-400)', fontSize: 13 }}>Belum ada pengajuan cuti</div>
          : <div className="table-wrapper">
            <table>
              <thead><tr><th>Jenis</th><th>Tanggal Mulai</th><th>Tanggal Selesai</th><th>Alasan</th><th>Diajukan</th><th>Status</th></tr></thead>
              <tbody>
                {myLeave.map(l => (
                  <tr key={l.id}>
                    <td><span className="badge badge-teal">{l.jenis}</span></td>
                    <td>{l.tanggal_mulai}</td>
                    <td>{l.tanggal_selesai}</td>
                    <td style={{ fontSize: 12, color: 'var(--gray-600)', maxWidth: 200 }}>{l.alasan}</td>
                    <td style={{ fontSize: 12, color: 'var(--gray-500)' }}>{l.tanggal_pengajuan}</td>
                    <td>
                      <span className={`badge ${l.status === 'approved' ? 'badge-green' : l.status === 'rejected' ? 'badge-red' : 'badge-yellow'}`}>
                        {l.status === 'approved' ? '✓ Disetujui' : l.status === 'rejected' ? '✗ Ditolak' : '⏳ Menunggu'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
}

// ── Timesheet Tab ────────────────────────────────────────────
const WEEKDAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
const DATES = ['27 Mei', '28 Mei', '29 Mei', '30 Mei', '31 Mei'];

function TimesheetTab() {
  const [entries, setEntries] = useState({
    'Senin': { jam_masuk: '08:00', jam_keluar: '17:00', keterangan: 'Pengembangan fitur payroll', status: 'hadir' },
    'Selasa': { jam_masuk: '08:10', jam_keluar: '17:30', keterangan: 'Review code & sprint planning', status: 'hadir' },
    'Rabu': { jam_masuk: '08:00', jam_keluar: '19:00', keterangan: 'Lembur deployment', status: 'hadir' },
    'Kamis': { jam_masuk: '', jam_keluar: '', keterangan: '', status: 'izin' },
    'Jumat': { jam_masuk: '08:00', jam_keluar: '17:00', keterangan: 'Retrospective & demo', status: 'hadir' },
  });
  const [saved, setSaved] = useState(false);

  const update = (day, field, val) => setEntries(p => ({ ...p, [day]: { ...p[day], [field]: val } }));

  const totalJam = Object.values(entries).reduce((sum, e) => {
    if (!e.jam_masuk || !e.jam_keluar) return sum;
    const [ih, im] = e.jam_masuk.split(':').map(Number);
    const [oh, om] = e.jam_keluar.split(':').map(Number);
    return sum + ((oh * 60 + om) - (ih * 60 + im)) / 60;
  }, 0);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Timesheet — Minggu 21 Mei 2024</div>
          <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>Total jam minggu ini: <strong>{totalJam.toFixed(1)} jam</strong>{totalJam > 40 && <span style={{ color: '#dc2626', marginLeft: 6 }}>⚠ Melebihi batas normal</span>}</div>
        </div>
        <button className="btn btn-primary btn-sm" onClick={handleSave}>Simpan Timesheet</button>
      </div>

      {saved && (
        <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: 8, padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#15803d', fontWeight: 500 }}>
          ✓ Timesheet berhasil disimpan.
        </div>
      )}

      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Hari</th>
                <th>Tanggal</th>
                <th>Jam Masuk</th>
                <th>Jam Keluar</th>
                <th>Durasi</th>
                <th>Status</th>
                <th>Keterangan Pekerjaan</th>
              </tr>
            </thead>
            <tbody>
              {WEEKDAYS.map((day, i) => {
                const e = entries[day] || {};
                let durasi = '—';
                if (e.jam_masuk && e.jam_keluar) {
                  const [ih, im] = e.jam_masuk.split(':').map(Number);
                  const [oh, om] = e.jam_keluar.split(':').map(Number);
                  const mins = (oh * 60 + om) - (ih * 60 + im);
                  durasi = `${Math.floor(mins / 60)}j ${mins % 60}m`;
                }
                return (
                  <tr key={day}>
                    <td style={{ fontWeight: 600 }}>{day}</td>
                    <td style={{ color: 'var(--gray-500)', fontSize: 12 }}>{DATES[i]}</td>
                    <td>
                      <input type="time" className="form-input" style={{ width: 110, padding: '5px 8px', fontSize: 12 }}
                        value={e.jam_masuk || ''} onChange={ev => update(day, 'jam_masuk', ev.target.value)} />
                    </td>
                    <td>
                      <input type="time" className="form-input" style={{ width: 110, padding: '5px 8px', fontSize: 12 }}
                        value={e.jam_keluar || ''} onChange={ev => update(day, 'jam_keluar', ev.target.value)} />
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--teal-dark)' }}>{durasi}</td>
                    <td>
                      <select className="form-select" style={{ width: 110, padding: '5px 8px', fontSize: 12 }}
                        value={e.status || 'hadir'} onChange={ev => update(day, 'status', ev.target.value)}>
                        {['hadir', 'izin', 'sakit', 'wfh', 'dinas luar'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>
                      <input className="form-input" style={{ fontSize: 12, padding: '5px 10px' }}
                        placeholder="Deskripsi pekerjaan hari ini..."
                        value={e.keterangan || ''} onChange={ev => update(day, 'keterangan', ev.target.value)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Survey Tab ───────────────────────────────────────────────
const SURVEY_QUESTIONS = [
  'Saya merasa dihargai di tempat kerja',
  'Saya memiliki keseimbangan kerja-kehidupan yang baik',
  'Manajemen berkomunikasi dengan jelas',
  'Saya memiliki peluang berkembang di perusahaan ini',
  'Saya merasa terhubung dengan tujuan perusahaan',
  'Lingkungan kerja mendukung produktivitas saya',
  'Saya puas dengan kompensasi dan benefit yang diterima',
  'Tim saya bekerja sama dengan efektif',
];

function SurveyTab({ setTab }) {
  const [answers, setAnswers] = useState({});
  const [nps, setNps] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState('');

  const allAnswered = SURVEY_QUESTIONS.every((_, i) => answers[i]) && nps !== null;

  const handleSubmit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '60px 40px' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 8 }}>Terima Kasih!</div>
        <div style={{ fontSize: 13, color: 'var(--gray-500)', maxWidth: 360, margin: '0 auto' }}>
          Respon survey Q2 2024 kamu telah berhasil dikirim. Hasil akan dikompilasi oleh HR.
        </div>
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            {Object.entries(answers).map(([i, v]) => (
              <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: v >= 8 ? 'var(--teal)' : v >= 6 ? '#f59e0b' : '#ef4444' }}>{v}</div>
                <div style={{ fontSize: 9, color: 'var(--gray-400)', textTransform: 'uppercase' }}>P{parseInt(i) + 1}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => setTab('beranda')}>
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>Engagement Survey — Q2 2024</div>
        <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>
          Berikan penilaian jujur. Respon bersifat anonim dan digunakan untuk meningkatkan lingkungan kerja.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {SURVEY_QUESTIONS.map((q, i) => (
          <div key={i} className="card">
            <div style={{ padding: '16px 20px' }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--gray-800)', marginBottom: 12 }}>
                <span style={{ color: 'var(--teal)', fontWeight: 700, marginRight: 8 }}>P{i + 1}.</span>{q}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => (
                  <button key={v} onClick={() => setAnswers(p => ({ ...p, [i]: v }))}
                    style={{
                      width: 32, height: 32, borderRadius: 8, border: `2px solid ${answers[i] === v ? (v >= 8 ? 'var(--teal)' : v >= 6 ? '#f59e0b' : '#ef4444') : 'var(--gray-200)'}`,
                      background: answers[i] === v ? (v >= 8 ? 'var(--teal-light)' : v >= 6 ? '#fef9c3' : '#fee2e2') : 'var(--white)',
                      fontWeight: 700, fontSize: 13, cursor: 'pointer',
                      color: answers[i] === v ? (v >= 8 ? 'var(--teal-dark)' : v >= 6 ? '#854d0e' : '#b91c1c') : 'var(--gray-400)',
                      transition: 'all 0.15s',
                    }}>
                    {v}
                  </button>
                ))}
                <div style={{ marginLeft: 12, display: 'flex', alignItems: 'center', gap: 24, fontSize: 11, color: 'var(--gray-400)' }}>
                  <span>0 = Sangat Tidak Setuju</span>
                  <span>10 = Sangat Setuju</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* eNPS */}
        <div className="card">
          <div style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--gray-800)', marginBottom: 4 }}>
              <span style={{ color: 'var(--pink)', fontWeight: 700, marginRight: 8 }}>NPS.</span>
              Seberapa besar kemungkinan kamu merekomendasikan perusahaan ini kepada orang terdekatmu?
            </div>
            <div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 12 }}>Skala 0–10</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[0,1,2,3,4,5,6,7,8,9,10].map(v => (
                <button key={v} onClick={() => setNps(v)}
                  style={{
                    width: 40, height: 40, borderRadius: 7, border: `2px solid ${nps === v ? 'var(--pink)' : 'var(--gray-200)'}`,
                    background: nps === v ? 'var(--pink-light)' : 'var(--white)',
                    fontWeight: 700, fontSize: 13, cursor: 'pointer',
                    color: nps === v ? 'var(--pink-dark)' : 'var(--gray-400)',
                    transition: 'all 0.15s',
                  }}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comment */}
        <div className="card">
          <div style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--gray-800)', marginBottom: 10 }}>
              Ada hal lain yang ingin kamu sampaikan kepada manajemen? <span style={{ color: 'var(--gray-400)', fontWeight: 400 }}>(opsional)</span>
            </div>
            <textarea className="form-textarea" style={{ width: '100%', minHeight: 90 }}
              placeholder="Tuliskan masukan, saran, atau apresiasi kamu..."
              value={comment} onChange={e => setComment(e.target.value)} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>
            {Object.keys(answers).length}/{SURVEY_QUESTIONS.length} pertanyaan dijawab {nps !== null ? '+ NPS ✓' : ''}
          </div>
          <button className="btn btn-pink" disabled={!allAnswered} onClick={handleSubmit}
            style={{ opacity: allAnswered ? 1 : 0.5, cursor: allAnswered ? 'pointer' : 'not-allowed' }}>
            Kirim Survey
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Dokumen Tab ──────────────────────────────────────────────
function DokumenTab({ empId }) {
  const docs = [
    { id: 1, nama: 'Slip Gaji Mei 2024', kategori: 'Payroll', tanggal: '2024-06-01', size: '84 KB', icon: '📄' },
    { id: 2, nama: 'Slip Gaji April 2024', kategori: 'Payroll', tanggal: '2024-05-01', size: '81 KB', icon: '📄' },
    { id: 3, nama: 'Kontrak Kerja (PKWT)', kategori: 'Kontrak', tanggal: '2023-02-01', size: '210 KB', icon: '📑' },
    { id: 4, nama: 'Surat Keterangan Kerja', kategori: 'Surat', tanggal: '2024-05-15', size: '56 KB', icon: '📋' },
    { id: 5, nama: 'Kartu BPJS Ketenagakerjaan', kategori: 'Benefit', tanggal: '2023-03-01', size: '120 KB', icon: '🪪' },
    { id: 6, nama: 'Kartu BPJS Kesehatan', kategori: 'Benefit', tanggal: '2023-03-01', size: '118 KB', icon: '🪪' },
    { id: 7, nama: 'Sertifikat Pelatihan Internal Q1', kategori: 'Sertifikat', tanggal: '2024-03-28', size: '340 KB', icon: '🏅' },
    { id: 8, nama: 'Penilaian Kinerja 2023', kategori: 'KPI', tanggal: '2024-01-15', size: '95 KB', icon: '📊' },
  ];

  const categories = [...new Set(docs.map(d => d.kategori))];
  const [filter, setFilter] = useState('');

  const filtered = filter ? docs.filter(d => d.kategori === filter) : docs;

  const catColor = (c) => ({ Payroll: 'badge-teal', Kontrak: 'badge-blue', Surat: 'badge-gray', Benefit: 'badge-green', Sertifikat: 'badge-yellow', KPI: 'badge-purple' }[c] || 'badge-gray');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Dokumen Saya</div>
          <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>Semua dokumen terkait kepegawaian kamu</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className={`btn btn-sm ${!filter ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('')}>Semua</button>
          {categories.map(c => (
            <button key={c} className={`btn btn-sm ${filter === c ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
        {filtered.map(d => (
          <div key={d.id} className="card" style={{ cursor: 'pointer', transition: 'box-shadow 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.07)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>{d.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--gray-800)', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {d.nama}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                  <span className={`badge ${catColor(d.kategori)}`}>{d.kategori}</span>
                  <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{d.size}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{d.tanggal}</div>
              </div>
            </div>
            <div style={{ padding: '10px 18px', borderTop: '1px solid var(--gray-100)', display: 'flex', gap: 8 }}>
              <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center', fontSize: 12 }}
                onClick={() => alert(`Mengunduh: ${d.nama}`)}>
                Unduh
              </button>
              <button className="btn btn-secondary btn-sm" style={{ fontSize: 12 }}
                onClick={() => alert(`Membuka preview: ${d.nama}`)}>
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Employee Portal ─────────────────────────────────────
export default function EmployeePortal({ user, onLogout }) {
  const [tab, setTab] = useState('beranda');

  const myPayroll = payrollData
    .filter(p => p.employee_id === user.employeeId)
    .sort((a, b) => b.bulan.localeCompare(a.bulan));

  const myAttendance = attendanceLogs
    .filter(a => a.employee_id === user.employeeId)
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal))
    .slice(0, 8);

  const myLeave = initialLeaveRequests.filter(l => l.employee_id === user.employeeId);

  const initials = user.nama.split(' ').map(n => n[0]).slice(0, 2).join('');

  const tabs = [
    { key: 'beranda', label: 'Beranda' },
    { key: 'cuti', label: 'Cuti' },
    { key: 'timesheet', label: 'Timesheet' },
    { key: 'survey', label: 'Survey' },
    { key: 'dokumen', label: 'Dokumen' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f4', display: 'flex', flexDirection: 'column' }}>
      {/* Topbar */}
      <div style={{
        background: '#1e2d2c',
        padding: '0 32px', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 10, flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 13 }}>S</div>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '-0.2px' }}>Selusa Hub</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginLeft: 2 }}>Portal Karyawan</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{user.nama}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{user.jabatan} · {user.employeeId}</div>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 12 }}>
            {initials}
          </div>
          <button className="btn btn-sm" onClick={onLogout}
            style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.15)', fontSize: 12 }}>
            Keluar
          </button>
        </div>
      </div>

      {/* Sub-nav tabs */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid #d4ebe9', borderLeft: '3px solid var(--pink)', padding: '0 32px', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 0 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{
                padding: '14px 18px', fontSize: 13.5, fontWeight: tab === t.key ? 600 : 500,
                color: tab === t.key ? 'var(--pink)' : 'var(--gray-500)',
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: `2px solid ${tab === t.key ? 'var(--pink)' : 'transparent'}`,
                marginBottom: -1, transition: 'all 0.15s', fontFamily: 'inherit',
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '28px 32px', maxWidth: 1200 }}>
        {/* Page heading */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--gray-900)', letterSpacing: '-0.3px' }}>
            {tab === 'beranda' && `Selamat datang, ${user.nama.split(' ')[0]} 👋`}
            {tab === 'cuti' && 'Pengajuan Cuti'}
            {tab === 'timesheet' && 'Timesheet Mingguan'}
            {tab === 'survey' && 'Engagement Survey Q2 2024'}
            {tab === 'dokumen' && 'Dokumen Saya'}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 4 }}>
            {tab === 'beranda' && `${user.jabatan} · ${user.divisi} · ${user.employeeId}`}
            {tab === 'cuti' && 'Ajukan dan pantau status cuti kamu secara online'}
            {tab === 'timesheet' && 'Isi log kerja harian untuk minggu ini'}
            {tab === 'survey' && 'Berikan feedback jujur untuk meningkatkan lingkungan kerja'}
            {tab === 'dokumen' && 'Unduh slip gaji, kontrak, dan dokumen lainnya'}
          </p>
        </div>

        {tab === 'beranda' && <Beranda user={user} payroll={myPayroll} attendance={myAttendance} leave={myLeave} />}
        {tab === 'cuti' && <CutiTab leave={myLeave} empId={user.employeeId} />}
        {tab === 'timesheet' && <TimesheetTab />}
        {tab === 'survey' && <SurveyTab setTab={setTab} />}
        {tab === 'dokumen' && <DokumenTab empId={user.employeeId} />}
      </div>
    </div>
  );
}
