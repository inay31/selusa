import { useState } from 'react';
import { attendanceLogs, overtimeWeeklySummary, initialLeaveRequests } from '../data/dummyData';

const statusBadge = (s) => {
  const map = {
    hadir: 'badge-green', alpha: 'badge-red', terlambat: 'badge-yellow',
    izin: 'badge-blue', sakit: 'badge-purple',
  };
  return map[s] || 'badge-gray';
};

const leaveStatusBadge = (s) => {
  const map = { pending: 'badge-yellow', approved: 'badge-green', rejected: 'badge-red' };
  return map[s] || 'badge-gray';
};

export default function Absensi() {
  const [tab, setTab] = useState('log');
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);

  const updateLeave = (id, status) => {
    setLeaveRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const pendingCount = leaveRequests.filter(l => l.status === 'pending').length;
  const violationCount = overtimeWeeklySummary.filter(o => o.is_violation).length;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Absensi</h1>
        <p className="page-subtitle">Log kehadiran, rekap lembur, dan pengajuan cuti karyawan</p>
      </div>

      {/* Summary */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        <div className="stat-card stat-accent-teal">
          <div className="stat-label">Hadir Hari Ini</div>
          <div className="stat-value">{attendanceLogs.filter(a => a.tanggal === '2026-05-27' && a.status === 'hadir').length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Alpha</div>
          <div className="stat-value" style={{ color: '#dc2626' }}>{attendanceLogs.filter(a => a.tanggal === '2026-05-27' && a.status === 'alpha').length}</div>
        </div>
        <div className="stat-card stat-accent-pink">
          <div className="stat-label">Cuti Pending</div>
          <div className="stat-value" style={{ color: '#dc2626' }}>{pendingCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pelanggaran Lembur</div>
          <div className="stat-value" style={{ color: '#dc2626' }}>{violationCount}</div>
          <div className="stat-sub">Melebihi 14 jam/minggu</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {[
          { key: 'log', label: 'Log Harian' },
          { key: 'overtime', label: `Rekap Lembur` },
          { key: 'leave', label: `Pengajuan Cuti${pendingCount > 0 ? ` (${pendingCount})` : ''}` },
        ].map(t => (
          <div key={t.key} className={`tab${tab === t.key ? ' active' : ''}`} onClick={() => setTab(t.key)}>
            {t.label}
          </div>
        ))}
      </div>

      {/* Log Harian */}
      {tab === 'log' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">Log Kehadiran — 27 Mei 2026</span>
            <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{attendanceLogs.filter(a => a.tanggal === '2026-05-27').length} karyawan</span>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Karyawan</th>
                  <th>Tanggal</th>
                  <th>Jam Masuk</th>
                  <th>Jam Keluar</th>
                  <th>Durasi Kerja</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceLogs.filter(a => a.tanggal === '2026-05-27').map(a => {
                  let durasi = '-';
                  if (a.jam_masuk && a.jam_keluar) {
                    const [ih, im] = a.jam_masuk.split(':').map(Number);
                    const [oh, om] = a.jam_keluar.split(':').map(Number);
                    const mins = (oh * 60 + om) - (ih * 60 + im);
                    durasi = `${Math.floor(mins / 60)}j ${mins % 60}m`;
                  }
                  return (
                    <tr key={a.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{a.nama}</div>
                        <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{a.employee_id}</div>
                      </td>
                      <td>{a.tanggal}</td>
                      <td>{a.jam_masuk || <span style={{ color: 'var(--gray-300)' }}>—</span>}</td>
                      <td>{a.jam_keluar || <span style={{ color: 'var(--gray-300)' }}>—</span>}</td>
                      <td>{durasi}</td>
                      <td><span className={`badge ${statusBadge(a.status)}`}>{a.status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rekap Lembur */}
      {tab === 'overtime' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">Rekap Lembur Mingguan</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {violationCount > 0 && (
                <span className="badge badge-red">⚠ {violationCount} pelanggaran Kepmenaker</span>
              )}
            </div>
          </div>
          <div style={{ padding: '12px 20px 8px', background: '#fffbeb', borderBottom: '1px solid #fef3c7' }}>
            <p style={{ fontSize: 12, color: '#92400e' }}>
              <strong>Regulasi:</strong> Berdasarkan Kepmenaker, lembur maksimal 14 jam per minggu. Karyawan dengan <strong>Status Pelanggaran</strong> perlu segera ditindaklanjuti.
            </p>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Karyawan</th>
                  <th>Minggu</th>
                  <th>Total Lembur</th>
                  <th>Batas Maks</th>
                  <th>Status Kepatuhan</th>
                </tr>
              </thead>
              <tbody>
                {overtimeWeeklySummary.map(o => (
                  <tr key={o.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{o.nama}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{o.employee_id}</div>
                    </td>
                    <td>{o.minggu}</td>
                    <td>
                      <span style={{ fontWeight: 600, color: o.is_violation ? '#dc2626' : 'var(--gray-800)' }}>
                        {o.total_lembur_jam} jam
                      </span>
                    </td>
                    <td><span style={{ color: 'var(--gray-500)' }}>14 jam</span></td>
                    <td>
                      {o.is_violation ? (
                        <span className="badge badge-red">⚠ Pelanggaran</span>
                      ) : (
                        <span className="badge badge-green">✓ Sesuai</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Leave Requests */}
      {tab === 'leave' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">Pengajuan Cuti</span>
            <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{leaveRequests.length} pengajuan</span>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Karyawan</th>
                  <th>Jenis Cuti</th>
                  <th>Tanggal Mulai</th>
                  <th>Tanggal Selesai</th>
                  <th>Alasan</th>
                  <th>Diajukan</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map(l => (
                  <tr key={l.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{l.nama}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{l.employee_id}</div>
                    </td>
                    <td><span className="badge badge-teal">{l.jenis}</span></td>
                    <td>{l.tanggal_mulai}</td>
                    <td>{l.tanggal_selesai}</td>
                    <td style={{ maxWidth: 180 }}>
                      <span style={{ fontSize: 12, color: 'var(--gray-600)' }}>{l.alasan}</span>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--gray-500)' }}>{l.tanggal_pengajuan}</td>
                    <td><span className={`badge ${leaveStatusBadge(l.status)}`}>{l.status}</span></td>
                    <td>
                      {l.status === 'pending' ? (
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-success btn-sm" onClick={() => updateLeave(l.id, 'approved')}>Approve</button>
                          <button className="btn btn-danger btn-sm" onClick={() => updateLeave(l.id, 'rejected')}>Tolak</button>
                        </div>
                      ) : (
                        <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
