// =============================================
// SELUSA HUB — DUMMY DATA
// =============================================

export const employees = [
  { id: 'EMP001', name: 'Andi Pratama', jabatan: 'Senior Software Engineer', divisi: 'Teknologi', status: 'aktif', join_date: '2021-03-15', performance: 8.4, potential: 9.0 },
  { id: 'EMP002', name: 'Rina Setiawati', jabatan: 'HR Manager', divisi: 'HR', status: 'aktif', join_date: '2020-07-01', performance: 9.2, potential: 8.4 },
  { id: 'EMP003', name: 'Budi Santoso', jabatan: 'Marketing Specialist', divisi: 'Marketing', status: 'aktif', join_date: '2022-01-10', performance: 6.4, potential: 7.0 },
  { id: 'EMP004', name: 'Dewi Anggraini', jabatan: 'Finance Analyst', divisi: 'Keuangan', status: 'aktif', join_date: '2021-09-05', performance: 8.0, potential: 7.6 },
  { id: 'EMP005', name: 'Fajar Nugroho', jabatan: 'Product Manager', divisi: 'Produk', status: 'aktif', join_date: '2020-11-20', performance: 8.8, potential: 9.6 },
  { id: 'EMP006', name: 'Sari Indah', jabatan: 'UI/UX Designer', divisi: 'Teknologi', status: 'aktif', join_date: '2022-04-12', performance: 7.6, potential: 8.2 },
  { id: 'EMP007', name: 'Hendra Wijaya', jabatan: 'Sales Executive', divisi: 'Penjualan', status: 'aktif', join_date: '2023-02-01', performance: 5.8, potential: 6.6 },
  { id: 'EMP008', name: 'Maya Kurniawan', jabatan: 'Operations Manager', divisi: 'Operasional', status: 'aktif', join_date: '2020-05-15', performance: 9.4, potential: 9.2 },
  { id: 'EMP009', name: 'Rizky Firmansyah', jabatan: 'Data Analyst', divisi: 'Teknologi', status: 'aktif', join_date: '2022-08-08', performance: 7.0, potential: 8.6 },
  { id: 'EMP010', name: 'Nita Rahayu', jabatan: 'Customer Success', divisi: 'Operasional', status: 'tidak aktif', join_date: '2021-06-20', performance: 6.0, potential: 5.6 },
  { id: 'EMP011', name: 'Tommy Hadinata', jabatan: 'Backend Engineer', divisi: 'Teknologi', status: 'aktif', join_date: '2023-05-10', performance: 7.4, potential: 8.0 },
  { id: 'EMP012', name: 'Lestari Putri', jabatan: 'Finance Manager', divisi: 'Keuangan', status: 'aktif', join_date: '2019-12-01', performance: 9.0, potential: 8.6 },
];

// Payroll data (per bulan)
export const payrollData = [
  {
    id: 'PAY001', employee_id: 'EMP001', bulan: '2026-05', nama: 'Andi Pratama',
    gaji_pokok: 18000000, tunjangan_jabatan: 3000000, tunjangan_transport: 800000,
    tunjangan_makan: 600000, tunjangan_kesehatan: 500000, tunjangan_komunikasi: 400000,
    tunjangan_lainnya: 200000, uang_lembur: 1500000, bonus_kinerja: 2000000,
    thr: 0, tunjangan_keluarga: 500000,
    pph21: 2100000, bpjs_tk: 576000, bpjs_kes: 360000,
    alpha_potongan: 0, kasbon: 0, cicilan_koperasi: 0,
    divisi: 'Teknologi',
  },
  {
    id: 'PAY002', employee_id: 'EMP002', bulan: '2026-05', nama: 'Rina Setiawati',
    gaji_pokok: 16000000, tunjangan_jabatan: 4000000, tunjangan_transport: 800000,
    tunjangan_makan: 600000, tunjangan_kesehatan: 500000, tunjangan_komunikasi: 500000,
    tunjangan_lainnya: 300000, uang_lembur: 0, bonus_kinerja: 1500000,
    thr: 0, tunjangan_keluarga: 750000,
    pph21: 2050000, bpjs_tk: 512000, bpjs_kes: 360000,
    alpha_potongan: 0, kasbon: 1000000, cicilan_koperasi: 500000,
    divisi: 'HR',
  },
  {
    id: 'PAY003', employee_id: 'EMP003', bulan: '2026-05', nama: 'Budi Santoso',
    gaji_pokok: 9000000, tunjangan_jabatan: 1000000, tunjangan_transport: 600000,
    tunjangan_makan: 450000, tunjangan_kesehatan: 300000, tunjangan_komunikasi: 300000,
    tunjangan_lainnya: 100000, uang_lembur: 500000, bonus_kinerja: 800000,
    thr: 0, tunjangan_keluarga: 0,
    pph21: 780000, bpjs_tk: 288000, bpjs_kes: 180000,
    alpha_potongan: 450000, kasbon: 0, cicilan_koperasi: 0,
    divisi: 'Marketing',
  },
  {
    id: 'PAY004', employee_id: 'EMP004', bulan: '2026-05', nama: 'Dewi Anggraini',
    gaji_pokok: 12000000, tunjangan_jabatan: 1500000, tunjangan_transport: 700000,
    tunjangan_makan: 500000, tunjangan_kesehatan: 400000, tunjangan_komunikasi: 350000,
    tunjangan_lainnya: 200000, uang_lembur: 800000, bonus_kinerja: 1000000,
    thr: 0, tunjangan_keluarga: 500000,
    pph21: 1120000, bpjs_tk: 384000, bpjs_kes: 240000,
    alpha_potongan: 0, kasbon: 0, cicilan_koperasi: 300000,
    divisi: 'Keuangan',
  },
  {
    id: 'PAY005', employee_id: 'EMP005', bulan: '2026-05', nama: 'Fajar Nugroho',
    gaji_pokok: 20000000, tunjangan_jabatan: 5000000, tunjangan_transport: 1000000,
    tunjangan_makan: 700000, tunjangan_kesehatan: 600000, tunjangan_komunikasi: 600000,
    tunjangan_lainnya: 400000, uang_lembur: 0, bonus_kinerja: 3000000,
    thr: 0, tunjangan_keluarga: 1000000,
    pph21: 3100000, bpjs_tk: 640000, bpjs_kes: 360000,
    alpha_potongan: 0, kasbon: 0, cicilan_koperasi: 0,
    divisi: 'Produk',
  },
  {
    id: 'PAY006', employee_id: 'EMP006', bulan: '2026-05', nama: 'Sari Indah',
    gaji_pokok: 11000000, tunjangan_jabatan: 1200000, tunjangan_transport: 600000,
    tunjangan_makan: 450000, tunjangan_kesehatan: 350000, tunjangan_komunikasi: 300000,
    tunjangan_lainnya: 150000, uang_lembur: 600000, bonus_kinerja: 900000,
    thr: 0, tunjangan_keluarga: 0,
    pph21: 990000, bpjs_tk: 352000, bpjs_kes: 220000,
    alpha_potongan: 0, kasbon: 500000, cicilan_koperasi: 0,
    divisi: 'Teknologi',
  },
  {
    id: 'PAY007', employee_id: 'EMP007', bulan: '2026-05', nama: 'Hendra Wijaya',
    gaji_pokok: 8000000, tunjangan_jabatan: 800000, tunjangan_transport: 500000,
    tunjangan_makan: 400000, tunjangan_kesehatan: 250000, tunjangan_komunikasi: 250000,
    tunjangan_lainnya: 100000, uang_lembur: 400000, bonus_kinerja: 1200000,
    thr: 0, tunjangan_keluarga: 250000,
    pph21: 620000, bpjs_tk: 256000, bpjs_kes: 160000,
    alpha_potongan: 300000, kasbon: 0, cicilan_koperasi: 200000,
    divisi: 'Penjualan',
  },
  {
    id: 'PAY008', employee_id: 'EMP008', bulan: '2026-05', nama: 'Maya Kurniawan',
    gaji_pokok: 17000000, tunjangan_jabatan: 4500000, tunjangan_transport: 900000,
    tunjangan_makan: 650000, tunjangan_kesehatan: 550000, tunjangan_komunikasi: 500000,
    tunjangan_lainnya: 350000, uang_lembur: 0, bonus_kinerja: 2500000,
    thr: 0, tunjangan_keluarga: 750000,
    pph21: 2700000, bpjs_tk: 544000, bpjs_kes: 360000,
    alpha_potongan: 0, kasbon: 0, cicilan_koperasi: 500000,
    divisi: 'Operasional',
  },
  {
    id: 'PAY009', employee_id: 'EMP009', bulan: '2026-05', nama: 'Rizky Firmansyah',
    gaji_pokok: 11500000, tunjangan_jabatan: 1300000, tunjangan_transport: 650000,
    tunjangan_makan: 500000, tunjangan_kesehatan: 350000, tunjangan_komunikasi: 350000,
    tunjangan_lainnya: 150000, uang_lembur: 900000, bonus_kinerja: 1100000,
    thr: 0, tunjangan_keluarga: 0,
    pph21: 1010000, bpjs_tk: 368000, bpjs_kes: 230000,
    alpha_potongan: 0, kasbon: 0, cicilan_koperasi: 0,
    divisi: 'Teknologi',
  },
  {
    id: 'PAY010', employee_id: 'EMP010', bulan: '2026-05', nama: 'Nita Rahayu',
    gaji_pokok: 7500000, tunjangan_jabatan: 700000, tunjangan_transport: 450000,
    tunjangan_makan: 350000, tunjangan_kesehatan: 200000, tunjangan_komunikasi: 200000,
    tunjangan_lainnya: 100000, uang_lembur: 0, bonus_kinerja: 500000,
    thr: 0, tunjangan_keluarga: 0,
    pph21: 480000, bpjs_tk: 240000, bpjs_kes: 150000,
    alpha_potongan: 750000, kasbon: 0, cicilan_koperasi: 0,
    divisi: 'Operasional',
  },
  // Bulan April
  {
    id: 'PAY011', employee_id: 'EMP001', bulan: '2026-04', nama: 'Andi Pratama',
    gaji_pokok: 18000000, tunjangan_jabatan: 3000000, tunjangan_transport: 800000,
    tunjangan_makan: 600000, tunjangan_kesehatan: 500000, tunjangan_komunikasi: 400000,
    tunjangan_lainnya: 200000, uang_lembur: 900000, bonus_kinerja: 0,
    thr: 0, tunjangan_keluarga: 500000,
    pph21: 1980000, bpjs_tk: 576000, bpjs_kes: 360000,
    alpha_potongan: 0, kasbon: 0, cicilan_koperasi: 0,
    divisi: 'Teknologi',
  },
  {
    id: 'PAY012', employee_id: 'EMP005', bulan: '2026-04', nama: 'Fajar Nugroho',
    gaji_pokok: 20000000, tunjangan_jabatan: 5000000, tunjangan_transport: 1000000,
    tunjangan_makan: 700000, tunjangan_kesehatan: 600000, tunjangan_komunikasi: 600000,
    tunjangan_lainnya: 400000, uang_lembur: 1200000, bonus_kinerja: 0,
    thr: 20000000, tunjangan_keluarga: 1000000,
    pph21: 4200000, bpjs_tk: 640000, bpjs_kes: 360000,
    alpha_potongan: 0, kasbon: 0, cicilan_koperasi: 0,
    divisi: 'Produk',
  },
];

export const computeNetSalary = (row) => {
  const pendapatan = row.gaji_pokok + row.tunjangan_jabatan + row.tunjangan_transport +
    row.tunjangan_makan + row.tunjangan_kesehatan + row.tunjangan_komunikasi +
    row.tunjangan_lainnya + row.uang_lembur + row.bonus_kinerja + row.thr + row.tunjangan_keluarga;
  const potongan = row.pph21 + row.bpjs_tk + row.bpjs_kes + row.alpha_potongan + row.kasbon + row.cicilan_koperasi;
  return { pendapatan, potongan, net: pendapatan - potongan };
};

// Attendance data
export const attendanceLogs = [
  { id: 'ATT001', employee_id: 'EMP001', nama: 'Andi Pratama', tanggal: '2026-05-27', jam_masuk: '08:02', jam_keluar: '17:15', status: 'hadir' },
  { id: 'ATT002', employee_id: 'EMP002', nama: 'Rina Setiawati', tanggal: '2026-05-27', jam_masuk: '07:55', jam_keluar: '18:00', status: 'hadir' },
  { id: 'ATT003', employee_id: 'EMP003', nama: 'Budi Santoso', tanggal: '2026-05-27', jam_masuk: null, jam_keluar: null, status: 'alpha' },
  { id: 'ATT004', employee_id: 'EMP004', nama: 'Dewi Anggraini', tanggal: '2026-05-27', jam_masuk: '09:30', jam_keluar: '17:05', status: 'terlambat' },
  { id: 'ATT005', employee_id: 'EMP005', nama: 'Fajar Nugroho', tanggal: '2026-05-27', jam_masuk: '08:00', jam_keluar: '19:30', status: 'hadir' },
  { id: 'ATT006', employee_id: 'EMP006', nama: 'Sari Indah', tanggal: '2026-05-27', jam_masuk: '08:15', jam_keluar: '17:10', status: 'hadir' },
  { id: 'ATT007', employee_id: 'EMP007', nama: 'Hendra Wijaya', tanggal: '2026-05-27', jam_masuk: null, jam_keluar: null, status: 'izin' },
  { id: 'ATT008', employee_id: 'EMP008', nama: 'Maya Kurniawan', tanggal: '2026-05-27', jam_masuk: '07:45', jam_keluar: '17:00', status: 'hadir' },
  { id: 'ATT009', employee_id: 'EMP009', nama: 'Rizky Firmansyah', tanggal: '2026-05-27', jam_masuk: '08:05', jam_keluar: '18:45', status: 'hadir' },
  { id: 'ATT010', employee_id: 'EMP010', nama: 'Nita Rahayu', tanggal: '2026-05-27', jam_masuk: null, jam_keluar: null, status: 'sakit' },
  { id: 'ATT011', employee_id: 'EMP001', nama: 'Andi Pratama', tanggal: '2026-05-24', jam_masuk: '08:00', jam_keluar: '22:00', status: 'hadir' },
  { id: 'ATT012', employee_id: 'EMP005', nama: 'Fajar Nugroho', tanggal: '2026-05-24', jam_masuk: '08:00', jam_keluar: '21:30', status: 'hadir' },
  { id: 'ATT013', employee_id: 'EMP009', nama: 'Rizky Firmansyah', tanggal: '2026-05-24', jam_masuk: '08:00', jam_keluar: '20:00', status: 'hadir' },
];

export const overtimeWeeklySummary = [
  { id: 'OVT001', employee_id: 'EMP001', nama: 'Andi Pratama', minggu: '2026-W21', total_lembur_jam: 16.5, is_violation: true },
  { id: 'OVT002', employee_id: 'EMP005', nama: 'Fajar Nugroho', minggu: '2026-W21', total_lembur_jam: 12.0, is_violation: false },
  { id: 'OVT003', employee_id: 'EMP009', nama: 'Rizky Firmansyah', minggu: '2026-W21', total_lembur_jam: 9.5, is_violation: false },
  { id: 'OVT004', employee_id: 'EMP002', nama: 'Rina Setiawati', minggu: '2026-W21', total_lembur_jam: 6.0, is_violation: false },
  { id: 'OVT005', employee_id: 'EMP006', nama: 'Sari Indah', minggu: '2026-W21', total_lembur_jam: 15.0, is_violation: true },
  { id: 'OVT006', employee_id: 'EMP001', nama: 'Andi Pratama', minggu: '2026-W20', total_lembur_jam: 8.0, is_violation: false },
  { id: 'OVT007', employee_id: 'EMP008', nama: 'Maya Kurniawan', minggu: '2026-W20', total_lembur_jam: 4.5, is_violation: false },
  { id: 'OVT008', employee_id: 'EMP011', nama: 'Tommy Hadinata', minggu: '2026-W21', total_lembur_jam: 18.0, is_violation: true },
];

export const initialLeaveRequests = [
  { id: 'LVR001', employee_id: 'EMP003', nama: 'Budi Santoso', jenis: 'Cuti Tahunan', tanggal_mulai: '2026-06-05', tanggal_selesai: '2026-06-07', alasan: 'Liburan keluarga', status: 'pending', tanggal_pengajuan: '2026-05-28' },
  { id: 'LVR002', employee_id: 'EMP007', nama: 'Hendra Wijaya', jenis: 'Cuti Sakit', tanggal_mulai: '2026-05-27', tanggal_selesai: '2026-05-27', alasan: 'Demam tinggi', status: 'approved', tanggal_pengajuan: '2026-05-27' },
  { id: 'LVR003', employee_id: 'EMP006', nama: 'Sari Indah', jenis: 'Cuti Melahirkan', tanggal_mulai: '2026-07-01', tanggal_selesai: '2026-09-30', alasan: 'Melahirkan anak pertama', status: 'approved', tanggal_pengajuan: '2026-05-20' },
  { id: 'LVR004', employee_id: 'EMP009', nama: 'Rizky Firmansyah', jenis: 'Cuti Tahunan', tanggal_mulai: '2026-06-10', tanggal_selesai: '2026-06-12', alasan: 'Pernikahan saudara', status: 'pending', tanggal_pengajuan: '2026-05-29' },
  { id: 'LVR005', employee_id: 'EMP004', nama: 'Dewi Anggraini', jenis: 'Cuti Penting', tanggal_mulai: '2026-06-01', tanggal_selesai: '2026-06-01', alasan: 'Urusan keluarga mendesak', status: 'rejected', tanggal_pengajuan: '2026-05-31' },
  { id: 'LVR006', employee_id: 'EMP011', nama: 'Tommy Hadinata', jenis: 'Cuti Tahunan', tanggal_mulai: '2026-06-17', tanggal_selesai: '2026-06-21', alasan: 'Liburan akhir tahun', status: 'pending', tanggal_pengajuan: '2026-05-30' },
];

// ATS
export const pipelineStages = ['Applied', 'Screening', 'Interview 1', 'Interview 2', 'Offer', 'Hired'];

export const initialCandidates = [
  { id: 'CAN001', nama: 'Ahmad Fauzi', posisi: 'Backend Engineer', sumber: 'LinkedIn', tanggal_apply: '2026-05-01', status: 'Hired', time_to_hire_days: 25, auto_reply_sent: true, converted_to_employee_id: 'EMP011', catatan: 'Sangat kompeten, lulus semua tahap.' },
  { id: 'CAN002', nama: 'Citra Dewi', posisi: 'UI/UX Designer', sumber: 'Jobstreet', tanggal_apply: '2026-05-05', status: 'Interview 2', time_to_hire_days: null, auto_reply_sent: true, converted_to_employee_id: null, catatan: 'Portfolio kuat, perlu diskusi gaji.' },
  { id: 'CAN003', nama: 'Gunawan Halim', posisi: 'Data Analyst', sumber: 'Referral', tanggal_apply: '2026-05-08', status: 'Offer', time_to_hire_days: null, auto_reply_sent: true, converted_to_employee_id: null, catatan: 'Ditawarkan 14 juta, menunggu keputusan.' },
  { id: 'CAN004', nama: 'Hana Marlina', posisi: 'Marketing Specialist', sumber: 'Glints', tanggal_apply: '2026-05-10', status: 'Screening', time_to_hire_days: null, auto_reply_sent: true, converted_to_employee_id: null, catatan: 'CV menarik, jadwalkan wawancara awal.' },
  { id: 'CAN005', nama: 'Ivan Setiadi', posisi: 'Finance Analyst', sumber: 'LinkedIn', tanggal_apply: '2026-05-12', status: 'Applied', time_to_hire_days: null, auto_reply_sent: true, converted_to_employee_id: null, catatan: '' },
  { id: 'CAN006', nama: 'Julia Permata', posisi: 'Product Manager', sumber: 'Kalibrr', tanggal_apply: '2026-05-14', status: 'Interview 1', time_to_hire_days: null, auto_reply_sent: true, converted_to_employee_id: null, catatan: 'Berpengalaman di e-commerce.' },
  { id: 'CAN007', nama: 'Kevin Sulistio', posisi: 'Backend Engineer', sumber: 'LinkedIn', tanggal_apply: '2026-05-15', status: 'Applied', time_to_hire_days: null, auto_reply_sent: false, converted_to_employee_id: null, catatan: '' },
  { id: 'CAN008', nama: 'Laila Ramadhan', posisi: 'HR Generalist', sumber: 'Jobstreet', tanggal_apply: '2026-05-17', status: 'Screening', time_to_hire_days: null, auto_reply_sent: true, converted_to_employee_id: null, catatan: 'Pengalaman 3 tahun di HR.' },
  { id: 'CAN009', nama: 'Miko Santana', posisi: 'Sales Executive', sumber: 'Referral', tanggal_apply: '2026-05-18', status: 'Interview 1', time_to_hire_days: null, auto_reply_sent: true, converted_to_employee_id: null, catatan: 'Referral dari Hendra Wijaya.' },
  { id: 'CAN010', nama: 'Nadia Kusuma', posisi: 'Data Analyst', sumber: 'Kalibrr', tanggal_apply: '2026-05-20', status: 'Applied', time_to_hire_days: null, auto_reply_sent: true, converted_to_employee_id: null, catatan: '' },
];

// Talent Pool
export const initialTalentPool = [
  { id: 'TLP001', nama: 'Oscar Wibowo', keahlian: ['Python', 'Machine Learning', 'SQL'], sumber: 'LinkedIn', tanggal_masuk: '2026-04-01', catatan: 'Data scientist senior, open to work per Q4', kontak: 'oscar@email.com' },
  { id: 'TLP002', nama: 'Prila Anggraeni', keahlian: ['React', 'TypeScript', 'Node.js'], sumber: 'Referral', tanggal_masuk: '2026-04-05', catatan: 'Frontend expert, direferensikan oleh Andi', kontak: 'prila@email.com' },
  { id: 'TLP003', nama: 'Qori Hidayat', keahlian: ['Digital Marketing', 'SEO', 'Google Ads'], sumber: 'Event/Webinar', tanggal_masuk: '2026-04-10', catatan: 'Cocok untuk posisi Marketing Lead jika ada', kontak: 'qori@email.com' },
  { id: 'TLP004', nama: 'Rosa Amelia', keahlian: ['Finance', 'Accounting', 'SAP'], sumber: 'LinkedIn', tanggal_masuk: '2026-04-12', catatan: 'CPA holder, pengalaman di Big 4', kontak: 'rosa@email.com' },
  { id: 'TLP005', nama: 'Samuel Tan', keahlian: ['Product Strategy', 'Agile', 'B2B SaaS'], sumber: 'Referral', tanggal_masuk: '2026-04-15', catatan: 'Mantan CPO startup fintech', kontak: 'samuel@email.com' },
  { id: 'TLP006', nama: 'Tara Sanjaya', keahlian: ['UI/UX', 'Figma', 'User Research'], sumber: 'Portofolio', tanggal_masuk: '2026-04-18', catatan: 'Desain portfolionya sangat outstanding', kontak: 'tara@email.com' },
  { id: 'TLP007', nama: 'Udin Prayoga', keahlian: ['DevOps', 'Kubernetes', 'AWS'], sumber: 'GitHub', tanggal_masuk: '2026-04-20', catatan: 'Kontributor aktif open source', kontak: 'udin@email.com' },
  { id: 'TLP008', nama: 'Vina Cahaya', keahlian: ['HR', 'Talent Acquisition', 'HRIS'], sumber: 'LinkedIn', tanggal_masuk: '2026-04-22', catatan: 'Berpengalaman di perusahaan multinasional', kontak: 'vina@email.com' },
  { id: 'TLP009', nama: 'Wahyu Darmawan', keahlian: ['Mobile', 'Flutter', 'React Native'], sumber: 'Jobfair', tanggal_masuk: '2026-04-25', catatan: 'Fresh grad tapi portfolio sangat kuat', kontak: 'wahyu@email.com' },
  { id: 'TLP010', nama: 'Xenia Putri', keahlian: ['Content Writing', 'Copywriting', 'Social Media'], sumber: 'Referral', tanggal_masuk: '2026-04-28', catatan: 'Cocok untuk posisi Brand Content jika dibuka', kontak: 'xenia@email.com' },
];

// KPI Data
export const kpiDivisi = [
  // Teknologi
  { id: 'KD001', divisi: 'Teknologi', kpi: 'Uptime sistem', target: 99.9, realisasi: 99.95, satuan: '%', periode: 'Mei 2026' },
  { id: 'KD002', divisi: 'Teknologi', kpi: 'Bug resolved per sprint', target: 90, realisasi: 85, satuan: '%', periode: 'Mei 2026' },
  { id: 'KD003', divisi: 'Teknologi', kpi: 'Deployment frequency', target: 8, realisasi: 10, satuan: 'kali/bulan', periode: 'Mei 2026' },
  // Marketing
  { id: 'KD004', divisi: 'Marketing', kpi: 'Revenue dari campaign', target: 500000000, realisasi: 512000000, satuan: 'Rp', periode: 'Mei 2026' },
  { id: 'KD005', divisi: 'Marketing', kpi: 'Conversion rate', target: 3.5, realisasi: 3.1, satuan: '%', periode: 'Mei 2026' },
  { id: 'KD006', divisi: 'Marketing', kpi: 'Jumlah leads baru', target: 200, realisasi: 215, satuan: 'leads', periode: 'Mei 2026' },
  // Keuangan
  { id: 'KD007', divisi: 'Keuangan', kpi: 'Budget variance', target: 5, realisasi: 3.2, satuan: '%', periode: 'Mei 2026', lowerIsBetter: true },
  { id: 'KD008', divisi: 'Keuangan', kpi: 'Laporan tepat waktu', target: 100, realisasi: 95, satuan: '%', periode: 'Mei 2026' },
  { id: 'KD009', divisi: 'Keuangan', kpi: 'AR collection rate', target: 95, realisasi: 96, satuan: '%', periode: 'Mei 2026' },
  // Penjualan
  { id: 'KD010', divisi: 'Penjualan', kpi: 'GMV bulanan', target: 2000000000, realisasi: 2150000000, satuan: 'Rp', periode: 'Mei 2026' },
  { id: 'KD011', divisi: 'Penjualan', kpi: 'Jumlah deal closed', target: 25, realisasi: 28, satuan: 'deal', periode: 'Mei 2026' },
  { id: 'KD012', divisi: 'Penjualan', kpi: 'Win rate', target: 40, realisasi: 38, satuan: '%', periode: 'Mei 2026' },
  // HR
  { id: 'KD013', divisi: 'HR', kpi: 'Turnover rate', target: 5, realisasi: 3, satuan: '%', periode: 'Mei 2026', lowerIsBetter: true },
  { id: 'KD014', divisi: 'HR', kpi: 'Time to hire', target: 30, realisasi: 35, satuan: 'hari', periode: 'Mei 2026', lowerIsBetter: true },
  { id: 'KD015', divisi: 'HR', kpi: 'Training completion rate', target: 90, realisasi: 95, satuan: '%', periode: 'Mei 2026' },
  // Operasional
  { id: 'KD016', divisi: 'Operasional', kpi: 'Order fulfillment rate', target: 98, realisasi: 99, satuan: '%', periode: 'Mei 2026' },
  { id: 'KD017', divisi: 'Operasional', kpi: 'Customer satisfaction score', target: 90, realisasi: 92, satuan: '%', periode: 'Mei 2026' },
  // Produk
  { id: 'KD018', divisi: 'Produk', kpi: 'Feature adoption rate', target: 60, realisasi: 55, satuan: '%', periode: 'Mei 2026' },
  { id: 'KD019', divisi: 'Produk', kpi: 'Time to market', target: 14, realisasi: 12, satuan: 'hari', periode: 'Mei 2026', lowerIsBetter: true },
];

export const initialKpiIndividu = [
  { id: 'KI001', employee_id: 'EMP001', nama: 'Andi Pratama', kpi: 'Sprint point completed', target: 40, realisasi: 42, satuan: 'poin', periode: 'Mei 2026' },
  { id: 'KI002', employee_id: 'EMP002', nama: 'Rina Setiawati', kpi: 'Karyawan di-hire', target: 5, realisasi: 3, satuan: 'orang', periode: 'Mei 2026' },
  { id: 'KI003', employee_id: 'EMP003', nama: 'Budi Santoso', kpi: 'Leads didapatkan', target: 50, realisasi: 55, satuan: 'leads', periode: 'Mei 2026' },
  { id: 'KI004', employee_id: 'EMP004', nama: 'Dewi Anggraini', kpi: 'Laporan budget variance', target: 2, realisasi: 3, satuan: '%', periode: 'Mei 2026', lowerIsBetter: true },
  { id: 'KI005', employee_id: 'EMP005', nama: 'Fajar Nugroho', kpi: 'User stories delivered', target: 15, realisasi: 15, satuan: 'fitur', periode: 'Mei 2026' },
  { id: 'KI006', employee_id: 'EMP006', nama: 'Sari Indah', kpi: 'Desain diselesaikan', target: 10, realisasi: 8, satuan: 'desain', periode: 'Mei 2026' },
  { id: 'KI007', employee_id: 'EMP007', nama: 'Hendra Wijaya', kpi: 'Revenue Personal', target: 200000000, realisasi: 215000000, satuan: 'Rp', periode: 'Mei 2026' },
  { id: 'KI008', employee_id: 'EMP008', nama: 'Maya Kurniawan', kpi: 'Order processing time', target: 24, realisasi: 20, satuan: 'jam', periode: 'Mei 2026', lowerIsBetter: true },
  { id: 'KI009', employee_id: 'EMP009', nama: 'Rizky Firmansyah', kpi: 'Query request resolved', target: 30, realisasi: 25, satuan: 'tiket', periode: 'Mei 2026' },
  { id: 'KI010', employee_id: 'EMP010', nama: 'Nita Rahayu', kpi: 'CSAT Personal', target: 95, realisasi: 98, satuan: '%', periode: 'Mei 2026' },
];

// Engagement Survey
export const surveyQuarters = ['Q1 2026', 'Q2 2026'];

export const engagementSurveyData = [
  {
    quarter: 'Q1 2026',
    total_responden: 11,
    hasil: [
      { pertanyaan: 'Saya merasa dihargai di tempat kerja', rata_rata: 8.2 },
      { pertanyaan: 'Saya memiliki keseimbangan kerja-kehidupan yang baik', rata_rata: 7.4 },
      { pertanyaan: 'Manajemen berkomunikasi dengan jelas', rata_rata: 7.8 },
      { pertanyaan: 'Saya memiliki peluang berkembang', rata_rata: 8.4 },
      { pertanyaan: 'Saya merasa terhubung dengan tujuan perusahaan', rata_rata: 8.0 },
      { pertanyaan: 'Lingkungan kerja mendukung produktivitas', rata_rata: 8.6 },
      { pertanyaan: 'Saya puas dengan kompensasi dan benefit', rata_rata: 7.0 },
      { pertanyaan: 'Tim saya bekerja sama dengan efektif', rata_rata: 8.8 },
    ],
    NPS: 42,
  },
  {
    quarter: 'Q2 2026',
    total_responden: 10,
    hasil: [
      { pertanyaan: 'Saya merasa dihargai di tempat kerja', rata_rata: 8.6 },
      { pertanyaan: 'Saya memiliki keseimbangan kerja-kehidupan yang baik', rata_rata: 7.8 },
      { pertanyaan: 'Manajemen berkomunikasi dengan jelas', rata_rata: 8.2 },
      { pertanyaan: 'Saya memiliki peluang berkembang', rata_rata: 8.8 },
      { pertanyaan: 'Saya merasa terhubung dengan tujuan perusahaan', rata_rata: 8.4 },
      { pertanyaan: 'Lingkungan kerja mendukung produktivitas', rata_rata: 9.0 },
      { pertanyaan: 'Saya puas dengan kompensasi dan benefit', rata_rata: 7.6 },
      { pertanyaan: 'Tim saya bekerja sama dengan efektif', rata_rata: 9.2 },
    ],
    NPS: 55,
  },
];

// Contracts
export const contractsData = [
  { id: 'CTR001', employee_id: 'EMP001', nama: 'Andi Pratama', tipe: 'PKWTT', tanggal_mulai: '2023-03-15', tanggal_berakhir: null, status: 'aktif', catatan: 'Pengangkatan karyawan tetap' },
  { id: 'CTR002', employee_id: 'EMP001', nama: 'Andi Pratama', tipe: 'PKWT', tanggal_mulai: '2021-03-15', tanggal_berakhir: '2023-03-14', status: 'selesai', catatan: 'Kontrak awal 2 tahun' },
  { id: 'CTR003', employee_id: 'EMP002', nama: 'Rina Setiawati', tipe: 'PKWTT', tanggal_mulai: '2022-07-01', tanggal_berakhir: null, status: 'aktif', catatan: 'Karyawan tetap' },
  { id: 'CTR004', employee_id: 'EMP003', nama: 'Budi Santoso', tipe: 'PKWT', tanggal_mulai: '2022-01-10', tanggal_berakhir: '2026-01-09', status: 'perpanjangan', catatan: 'Kontrak pertama selesai, sedang review' },
  { id: 'CTR005', employee_id: 'EMP005', nama: 'Fajar Nugroho', tipe: 'PKWTT', tanggal_mulai: '2022-11-20', tanggal_berakhir: null, status: 'aktif', catatan: 'Dipromosikan ke Product Manager' },
  { id: 'CTR006', employee_id: 'EMP007', nama: 'Hendra Wijaya', tipe: 'PKWT', tanggal_mulai: '2023-02-01', tanggal_berakhir: '2025-01-31', status: 'aktif', catatan: 'Kontrak 2 tahun' },
  { id: 'CTR007', employee_id: 'EMP009', nama: 'Rizky Firmansyah', tipe: 'PKWT', tanggal_mulai: '2022-08-08', tanggal_berakhir: '2026-08-07', status: 'aktif', catatan: 'Review untuk pengangkatan tetap' },
  { id: 'CTR008', employee_id: 'EMP011', nama: 'Tommy Hadinata', tipe: 'PKWT', tanggal_mulai: '2023-05-10', tanggal_berakhir: '2025-05-09', status: 'aktif', catatan: 'Kontrak 2 tahun' },
  { id: 'CTR009', employee_id: 'EMP012', nama: 'Lestari Putri', tipe: 'PKWTT', tanggal_mulai: '2021-12-01', tanggal_berakhir: null, status: 'aktif', catatan: 'Finance Manager senior' },
  { id: 'CTR010', employee_id: 'EMP010', nama: 'Nita Rahayu', tipe: 'PKWT', tanggal_mulai: '2021-06-20', tanggal_berakhir: '2023-06-19', status: 'selesai', catatan: 'Tidak diperpanjang' },
];

export const salaryHistory = [
  { id: 'SH001', employee_id: 'EMP001', nama: 'Andi Pratama', tanggal_efektif: '2021-03-15', gaji_baru: 12000000, gaji_lama: null, alasan: 'Awal bergabung', jabatan_baru: 'Junior Engineer' },
  { id: 'SH002', employee_id: 'EMP001', nama: 'Andi Pratama', tanggal_efektif: '2022-04-01', gaji_baru: 15000000, gaji_lama: 12000000, alasan: 'Kenaikan tahunan', jabatan_baru: 'Software Engineer' },
  { id: 'SH003', employee_id: 'EMP001', nama: 'Andi Pratama', tanggal_efektif: '2023-04-01', gaji_baru: 18000000, gaji_lama: 15000000, alasan: 'Promosi Senior', jabatan_baru: 'Senior Software Engineer' },
  { id: 'SH004', employee_id: 'EMP005', nama: 'Fajar Nugroho', tanggal_efektif: '2020-11-20', gaji_baru: 14000000, gaji_lama: null, alasan: 'Awal bergabung', jabatan_baru: 'Product Analyst' },
  { id: 'SH005', employee_id: 'EMP005', nama: 'Fajar Nugroho', tanggal_efektif: '2022-01-01', gaji_baru: 17000000, gaji_lama: 14000000, alasan: 'Promosi ke PM', jabatan_baru: 'Product Manager' },
  { id: 'SH006', employee_id: 'EMP005', nama: 'Fajar Nugroho', tanggal_efektif: '2026-01-01', gaji_baru: 20000000, gaji_lama: 17000000, alasan: 'Kenaikan tahunan + outstanding performance', jabatan_baru: 'Product Manager' },
  { id: 'SH007', employee_id: 'EMP002', nama: 'Rina Setiawati', tanggal_efektif: '2020-07-01', gaji_baru: 12000000, gaji_lama: null, alasan: 'Awal bergabung', jabatan_baru: 'HR Specialist' },
  { id: 'SH008', employee_id: 'EMP002', nama: 'Rina Setiawati', tanggal_efektif: '2022-07-01', gaji_baru: 16000000, gaji_lama: 12000000, alasan: 'Promosi ke HR Manager', jabatan_baru: 'HR Manager' },
  { id: 'SH009', employee_id: 'EMP008', nama: 'Maya Kurniawan', tanggal_efektif: '2020-05-15', gaji_baru: 14000000, gaji_lama: null, alasan: 'Awal bergabung', jabatan_baru: 'Operations Supervisor' },
  { id: 'SH010', employee_id: 'EMP008', nama: 'Maya Kurniawan', tanggal_efektif: '2023-01-01', gaji_baru: 17000000, gaji_lama: 14000000, alasan: 'Promosi ke Manager', jabatan_baru: 'Operations Manager' },
];

// PHL Data
export const phlPool = [
  { id: 'PHL001', nama: 'Agus Rahmadi', keahlian: 'Picker Gudang', reliability_rate: 95, avg_performance: 4.3, status: 'aktif', kontak: '08111234001', kota: 'Jakarta' },
  { id: 'PHL002', nama: 'Bambang Suharto', keahlian: 'Packer', reliability_rate: 88, avg_performance: 3.9, status: 'aktif', kontak: '08111234002', kota: 'Bekasi' },
  { id: 'PHL003', nama: 'Cicih Rosita', keahlian: 'Kasir', reliability_rate: 92, avg_performance: 4.1, status: 'aktif', kontak: '08111234003', kota: 'Depok' },
  { id: 'PHL004', nama: 'Darsono', keahlian: 'Driver', reliability_rate: 78, avg_performance: 3.5, status: 'tidak aktif', kontak: '08111234004', kota: 'Tangerang' },
  { id: 'PHL005', nama: 'Erna Wulandari', keahlian: 'Customer Service', reliability_rate: 96, avg_performance: 4.6, status: 'aktif', kontak: '08111234005', kota: 'Jakarta' },
  { id: 'PHL006', nama: 'Firman Nurhadi', keahlian: 'Picker Gudang', reliability_rate: 85, avg_performance: 4.0, status: 'aktif', kontak: '08111234006', kota: 'Bekasi' },
  { id: 'PHL007', nama: 'Gita Soraya', keahlian: 'Promotor', reliability_rate: 90, avg_performance: 4.2, status: 'aktif', kontak: '08111234007', kota: 'Jakarta' },
  { id: 'PHL008', nama: 'Harto Suseno', keahlian: 'Driver', reliability_rate: 82, avg_performance: 3.7, status: 'aktif', kontak: '08111234008', kota: 'Bogor' },
  { id: 'PHL009', nama: 'Indri Fitriani', keahlian: 'Packer', reliability_rate: 93, avg_performance: 4.4, status: 'aktif', kontak: '08111234009', kota: 'Jakarta' },
  { id: 'PHL010', nama: 'Joko Priyatno', keahlian: 'Security', reliability_rate: 97, avg_performance: 4.5, status: 'aktif', kontak: '08111234010', kota: 'Depok' },
];

export const phlCampaigns = [
  { id: 'CAM001', nama: 'Harbolnas 12.12', tanggal_mulai: '2026-12-10', tanggal_selesai: '2026-12-13', target_gmv: 2000000000, realisasi_gmv: 2150000000, status: 'selesai', kebutuhan_phl: 15 },
  { id: 'CAM002', nama: 'Flash Sale Lebaran', tanggal_mulai: '2026-04-05', tanggal_selesai: '2026-04-07', target_gmv: 1500000000, realisasi_gmv: 1620000000, status: 'selesai', kebutuhan_phl: 12 },
  { id: 'CAM003', nama: 'Mid Year Sale', tanggal_mulai: '2026-06-15', tanggal_selesai: '2026-06-17', target_gmv: 1000000000, realisasi_gmv: null, status: 'akan datang', kebutuhan_phl: 10 },
  { id: 'CAM004', nama: 'Back to School', tanggal_mulai: '2026-07-10', tanggal_selesai: '2026-07-12', target_gmv: 800000000, realisasi_gmv: null, status: 'akan datang', kebutuhan_phl: 8 },
  { id: 'CAM005', nama: 'Weekend Sale Mei', tanggal_mulai: '2026-05-25', tanggal_selesai: '2026-05-26', target_gmv: 500000000, realisasi_gmv: 487000000, status: 'selesai', kebutuhan_phl: 6 },
];

export const phlDeployments = [
  { id: 'DEP001', campaign_id: 'CAM002', phl_id: 'PHL001', nama: 'Agus Rahmadi', tanggal: '2026-04-05', shift: 'Pagi', jam: '06:00-14:00', peran: 'Picker Gudang', payment_harian: 250000, hadir: true },
  { id: 'DEP002', campaign_id: 'CAM002', phl_id: 'PHL002', nama: 'Bambang Suharto', tanggal: '2026-04-05', shift: 'Pagi', jam: '06:00-14:00', peran: 'Packer', payment_harian: 220000, hadir: true },
  { id: 'DEP003', campaign_id: 'CAM002', phl_id: 'PHL005', nama: 'Erna Wulandari', tanggal: '2026-04-05', shift: 'Siang', jam: '14:00-22:00', peran: 'Customer Service', payment_harian: 280000, hadir: true },
  { id: 'DEP004', campaign_id: 'CAM002', phl_id: 'PHL007', nama: 'Gita Soraya', tanggal: '2026-04-05', shift: 'Siang', jam: '14:00-22:00', peran: 'Promotor', payment_harian: 300000, hadir: false },
  { id: 'DEP005', campaign_id: 'CAM002', phl_id: 'PHL009', nama: 'Indri Fitriani', tanggal: '2026-04-06', shift: 'Pagi', jam: '06:00-14:00', peran: 'Packer', payment_harian: 220000, hadir: true },
  { id: 'DEP006', campaign_id: 'CAM005', phl_id: 'PHL001', nama: 'Agus Rahmadi', tanggal: '2026-05-25', shift: 'Pagi', jam: '07:00-15:00', peran: 'Picker Gudang', payment_harian: 250000, hadir: true },
  { id: 'DEP007', campaign_id: 'CAM005', phl_id: 'PHL003', nama: 'Cicih Rosita', tanggal: '2026-05-25', shift: 'Siang', jam: '13:00-21:00', peran: 'Kasir', payment_harian: 260000, hadir: true },
  { id: 'DEP008', campaign_id: 'CAM005', phl_id: 'PHL006', nama: 'Firman Nurhadi', tanggal: '2026-05-25', shift: 'Pagi', jam: '07:00-15:00', peran: 'Picker Gudang', payment_harian: 250000, hadir: true },
  { id: 'DEP009', campaign_id: 'CAM005', phl_id: 'PHL010', nama: 'Joko Priyatno', tanggal: '2026-05-26', shift: 'Malam', jam: '22:00-06:00', peran: 'Security', payment_harian: 320000, hadir: true },
  { id: 'DEP010', campaign_id: 'CAM005', phl_id: 'PHL008', nama: 'Harto Suseno', tanggal: '2026-05-26', shift: 'Pagi', jam: '07:00-15:00', peran: 'Driver', payment_harian: 270000, hadir: false },
];
