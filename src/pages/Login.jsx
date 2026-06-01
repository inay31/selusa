import { useState } from 'react';

// ─── Credentials ───────────────────────────────────────────
// HR Accounts  : lihat daftar di bawah
// Employees    : [employeeId]  / Karyawan@123
// ───────────────────────────────────────────────────────────

const HR_CREDENTIALS = [
  { email: 'inay@selusa.com', password: 'inay123', nama: 'Inay', jabatan: 'HR Specialist' },
  { email: 'chelsea@selusa.com', password: 'chelsea123', nama: 'Chelsea', jabatan: 'HR Specialist' },
  { email: 'dian@selusa.com', password: 'dian123', nama: 'Dian', jabatan: 'HR Generalist' },
];

const EMPLOYEE_CREDENTIALS = [
  { id: 'EMP001', password: 'Karyawan@123', nama: 'Andi Pratama', jabatan: 'Senior Software Engineer', divisi: 'Teknologi' },
  { id: 'EMP002', password: 'Karyawan@123', nama: 'Rina Setiawati', jabatan: 'HR Manager', divisi: 'HR' },
  { id: 'EMP003', password: 'Karyawan@123', nama: 'Budi Santoso', jabatan: 'Marketing Specialist', divisi: 'Marketing' },
  { id: 'EMP004', password: 'Karyawan@123', nama: 'Dewi Anggraini', jabatan: 'Finance Analyst', divisi: 'Keuangan' },
  { id: 'EMP005', password: 'Karyawan@123', nama: 'Fajar Nugroho', jabatan: 'Product Manager', divisi: 'Produk' },
  { id: 'EMP006', password: 'Karyawan@123', nama: 'Sari Indah', jabatan: 'UI/UX Designer', divisi: 'Teknologi' },
  { id: 'EMP007', password: 'Karyawan@123', nama: 'Hendra Wijaya', jabatan: 'Sales Executive', divisi: 'Penjualan' },
  { id: 'EMP008', password: 'Karyawan@123', nama: 'Maya Kurniawan', jabatan: 'Operations Manager', divisi: 'Operasional' },
  { id: 'EMP009', password: 'Karyawan@123', nama: 'Rizky Firmansyah', jabatan: 'Data Analyst', divisi: 'Teknologi' },
  { id: 'EMP010', password: 'Karyawan@123', nama: 'Nita Rahayu', jabatan: 'Customer Success', divisi: 'Operasional' },
];

// ─── Role Card ──────────────────────────────────────────────
function RoleCard({ role, selected, onClick }) {
  const isHR = role === 'hr';
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '20px 18px',
        borderRadius: 10,
        border: `2px solid ${selected ? (isHR ? 'var(--teal)' : 'var(--pink)') : 'var(--gray-200)'}`,
        background: selected ? (isHR ? 'var(--teal-light)' : 'var(--pink-light)') : 'var(--white)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.15s',
        outline: 'none',
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 8, marginBottom: 12,
        background: selected ? (isHR ? 'var(--teal)' : 'var(--pink)') : 'var(--gray-100)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, transition: 'all 0.15s',
      }}>
        {isHR ? '🏢' : '👤'}
      </div>
      <div style={{ fontWeight: 700, fontSize: 14, color: selected ? (isHR ? 'var(--teal-dark)' : 'var(--pink-dark)') : 'var(--gray-700)', marginBottom: 4 }}>
        {isHR ? 'HR' : 'Employee'}
      </div>
      <div style={{ fontSize: 12, color: 'var(--gray-500)', lineHeight: 1.4 }}>
        {isHR ? 'Akses penuh ke semua modul HR' : 'Lihat slip gaji, absensi & pengajuan'}
      </div>
    </button>
  );
}

// ─── Credential Hint ────────────────────────────────────────
function CredentialHint({ role }) {
  const [open, setOpen] = useState(false);
  const isHR = role === 'hr';
  return (
    <div style={{ marginTop: 10 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ fontSize: 12, color: 'var(--teal)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
      >
        {open ? '▲' : '▼'} Lihat demo credentials
      </button>
      {open && (
        <div style={{ marginTop: 8, background: 'var(--gray-50)', borderRadius: 8, padding: 12, border: '1px solid var(--gray-200)' }}>
          {isHR ? (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>HR Accounts</div>
              {HR_CREDENTIALS.map(c => (
                <div key={c.email} style={{ fontSize: 12, color: 'var(--gray-600)', marginBottom: 4 }}>
                  <code style={{ background: 'var(--gray-200)', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>{c.email}</code>
                  {' · '}
                  <code style={{ background: 'var(--gray-200)', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>{c.password}</code>
                  <span style={{ color: 'var(--gray-400)', fontSize: 11, marginLeft: 6 }}>— {c.nama}</span>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                Employee Accounts <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— password semua: <code style={{ background: 'var(--gray-200)', padding: '1px 5px', borderRadius: 3 }}>Karyawan@123</code></span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px' }}>
                {EMPLOYEE_CREDENTIALS.slice(0, 6).map(c => (
                  <div key={c.id} style={{ fontSize: 12, color: 'var(--gray-600)' }}>
                    <code style={{ background: 'var(--gray-200)', padding: '1px 5px', borderRadius: 3, fontSize: 11 }}>{c.id}</code>
                    <span style={{ color: 'var(--gray-400)', fontSize: 11, marginLeft: 6 }}>{c.nama.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 6 }}>+ {EMPLOYEE_CREDENTIALS.length - 6} akun lainnya (EMP007–EMP010)</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Login Page ────────────────────────────────────────
export default function Login({ onLogin }) {
  const [role, setRole] = useState('hr');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (role === 'hr') {
        const match = HR_CREDENTIALS.find(c => c.email === identifier.trim() && c.password === password);
        if (match) {
          onLogin({ role: 'hr', nama: match.nama, jabatan: match.jabatan });
        } else {
          setError('Email atau password salah. Coba cek demo credentials di bawah.');
        }
      } else {
        const match = EMPLOYEE_CREDENTIALS.find(c => c.id === identifier.trim().toUpperCase() && c.password === password);
        if (match) {
          onLogin({ role: 'employee', employeeId: match.id, nama: match.nama, jabatan: match.jabatan, divisi: match.divisi });
        } else {
          setError('ID Karyawan atau password salah. Gunakan format EMP001 dan password Karyawan@123.');
        }
      }
      setLoading(false);
    }, 600);
  };

  const handleRoleSwitch = (r) => {
    setRole(r);
    setIdentifier('');
    setPassword('');
    setError('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 480px',
      background: 'var(--white)',
    }}>
      {/* ── Left Panel ── */}
      <div style={{
        background: 'var(--gray-50)',
        borderRight: '1px solid var(--gray-200)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 80px',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 56 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: 'var(--teal)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: 18,
          }}>S</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.5px' }}>Selusa Hub</div>
            <div style={{ fontSize: 12, color: 'var(--gray-400)', fontWeight: 500 }}>Human Resource System</div>
          </div>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: 34, fontWeight: 800, color: 'var(--gray-900)', lineHeight: 1.2, letterSpacing: '-1px', marginBottom: 16 }}>
          Satu platform<br />untuk semua<br />kebutuhan HR.
        </h1>
        <p style={{ fontSize: 15, color: 'var(--gray-500)', lineHeight: 1.6, maxWidth: 380, marginBottom: 32 }}>
          Kelola payroll, absensi, rekrutmen, KPI, hingga engagement survey dalam satu sistem terintegrasi.
        </p>


        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { icon: '◈', text: 'Payroll 24 komponen otomatis' },
            { icon: '◆', text: 'ATS Pipeline drag-and-drop' },
            { icon: '⊞', text: '9 Box Talent Mapping' },
            { icon: '◎', text: 'KPI & Engagement Survey' },
          ].map(f => (
            <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 7, background: 'var(--white)',
                border: '1px solid var(--gray-200)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--teal)', fontSize: 14, flexShrink: 0,
              }}>{f.icon}</div>
              <span style={{ fontSize: 13.5, color: 'var(--gray-600)', fontWeight: 500 }}>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 48px',
      }}>
        <div style={{ maxWidth: 380, width: '100%', margin: '0 auto' }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.3px', marginBottom: 6 }}>
              Masuk ke Selusa Hub
            </h2>
            <p style={{ fontSize: 13.5, color: 'var(--gray-500)' }}>Pilih role dan masukkan kredensial Anda</p>
          </div>

          {/* Role selector */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)', marginBottom: 10 }}>Masuk sebagai</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <RoleCard role="hr" selected={role === 'hr'} onClick={() => handleRoleSwitch('hr')} />
              <RoleCard role="employee" selected={role === 'employee'} onClick={() => handleRoleSwitch('employee')} />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">
                {role === 'hr' ? 'Email HR' : 'ID Karyawan'}
              </label>
              <input
                className="form-input"
                type={role === 'hr' ? 'email' : 'text'}
                placeholder={role === 'hr' ? 'Masukkan email' : 'Masukkan ID'}
                value={identifier}
                onChange={e => { setIdentifier(e.target.value); setError(''); }}
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="form-input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  autoComplete="current-password"
                  style={{ paddingRight: 44, width: '100%' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)',
                    fontSize: 13, padding: 0, fontFamily: 'inherit',
                  }}
                >
                  {showPass ? 'Sembunyikan' : 'Tampilkan'}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: '#fee2e2', border: '1px solid #fca5a5',
                borderRadius: 6, padding: '10px 12px',
                fontSize: 12.5, color: '#b91c1c', lineHeight: 1.4,
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{
                width: '100%', padding: '11px 0', fontSize: 14, fontWeight: 600,
                justifyContent: 'center', marginTop: 4,
                opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer',
                background: role === 'hr' ? 'var(--teal)' : 'var(--pink)',
              }}
            >
              {loading ? 'Memverifikasi...' : `Masuk sebagai ${role === 'hr' ? 'HR' : 'Karyawan'}`}
            </button>
          </form>

          {/* Demo credentials hint */}
          <CredentialHint role={role} />

          {/* Footer */}
          <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--gray-100)', textAlign: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>
              © 2024 Selusa Hub · Versi Demo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
