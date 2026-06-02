import { useState } from 'react';

// ─── Employee Database Data ────────────────────────────────
const employeeDatabase = [
  {
    id: 'EMP001',
    nik: '3171012203910001',
    nama: 'Andi Pratama',
    foto: null,
    jabatan: 'Senior Software Engineer',
    divisi: 'Teknologi',
    level: 'Senior',
    status: 'aktif',
    tipe_karyawan: 'PKWTT',
    join_date: '2021-03-15',
    // Personal
    tempat_lahir: 'Jakarta',
    tanggal_lahir: '1991-03-22',
    jenis_kelamin: 'Laki-laki',
    agama: 'Islam',
    golongan_darah: 'O',
    status_pernikahan: 'Menikah',
    jumlah_anak: 1,
    kewarganegaraan: 'WNI',
    // Kontak
    email_kerja: 'andi.pratama@selusa.com',
    email_pribadi: 'andi.p@gmail.com',
    no_hp: '081234560001',
    no_telepon_rumah: '021-7654001',
    kontak_darurat_nama: 'Siti Rahayu',
    kontak_darurat_hubungan: 'Istri',
    kontak_darurat_no: '081234560099',
    // Alamat
    alamat_ktp: 'Jl. Mawar No. 12, Kelurahan Cideng, Kecamatan Gambir, Jakarta Pusat',
    kelurahan: 'Cideng',
    kecamatan: 'Gambir',
    kota: 'Jakarta Pusat',
    provinsi: 'DKI Jakarta',
    kode_pos: '10150',
    alamat_domisili: 'Jl. Kenanga No. 5, Cilandak, Jakarta Selatan',
    // Pendidikan
    pendidikan_terakhir: 'S1',
    jurusan: 'Teknik Informatika',
    universitas: 'Universitas Indonesia',
    tahun_lulus: 2014,
    // Identitas
    no_ktp: '3171012203910001',
    no_npwp: '12.345.678.9-012.000',
    no_bpjs_kes: '0001234560001',
    no_bpjs_tk: '1700000001',
    no_rekening: '1234567890',
    nama_bank: 'BCA',
    nama_pemilik_rekening: 'Andi Pratama',
    // Riwayat
    masa_kerja_tahun: 5,
    atasan: 'EMP005',
    performance: 8.4,
    potential: 9.0,
  },
  {
    id: 'EMP002',
    nik: '3171054507880002',
    nama: 'Rina Setiawati',
    foto: null,
    jabatan: 'HR Manager',
    divisi: 'HR',
    level: 'Manager',
    status: 'aktif',
    tipe_karyawan: 'PKWTT',
    join_date: '2020-07-01',
    tempat_lahir: 'Bandung',
    tanggal_lahir: '1988-07-05',
    jenis_kelamin: 'Perempuan',
    agama: 'Islam',
    golongan_darah: 'A',
    status_pernikahan: 'Menikah',
    jumlah_anak: 2,
    kewarganegaraan: 'WNI',
    email_kerja: 'rina.setiawati@selusa.com',
    email_pribadi: 'rinaset@gmail.com',
    no_hp: '081234560002',
    no_telepon_rumah: '022-1234002',
    kontak_darurat_nama: 'Budi Setiawan',
    kontak_darurat_hubungan: 'Suami',
    kontak_darurat_no: '081234560088',
    alamat_ktp: 'Jl. Cihampelas No. 88, Bandung',
    kelurahan: 'Cipaganti',
    kecamatan: 'Coblong',
    kota: 'Bandung',
    provinsi: 'Jawa Barat',
    kode_pos: '40131',
    alamat_domisili: 'Jl. TB Simatupang No. 22, Pasar Minggu, Jakarta Selatan',
    pendidikan_terakhir: 'S2',
    jurusan: 'Manajemen SDM',
    universitas: 'Universitas Padjadjaran',
    tahun_lulus: 2013,
    no_ktp: '3273055507880002',
    no_npwp: '12.345.678.9-022.000',
    no_bpjs_kes: '0001234560002',
    no_bpjs_tk: '1700000002',
    no_rekening: '2345678901',
    nama_bank: 'Mandiri',
    nama_pemilik_rekening: 'Rina Setiawati',
    masa_kerja_tahun: 6,
    atasan: null,
    performance: 9.2,
    potential: 8.4,
  },
  {
    id: 'EMP003',
    nik: '3578011801950003',
    nama: 'Budi Santoso',
    foto: null,
    jabatan: 'Marketing Specialist',
    divisi: 'Marketing',
    level: 'Staff',
    status: 'aktif',
    tipe_karyawan: 'PKWT',
    join_date: '2022-01-10',
    tempat_lahir: 'Surabaya',
    tanggal_lahir: '1995-01-18',
    jenis_kelamin: 'Laki-laki',
    agama: 'Kristen',
    golongan_darah: 'B',
    status_pernikahan: 'Belum Menikah',
    jumlah_anak: 0,
    kewarganegaraan: 'WNI',
    email_kerja: 'budi.santoso@selusa.com',
    email_pribadi: 'budisan95@gmail.com',
    no_hp: '081234560003',
    no_telepon_rumah: '-',
    kontak_darurat_nama: 'Sri Santoso',
    kontak_darurat_hubungan: 'Ibu',
    kontak_darurat_no: '081234560077',
    alamat_ktp: 'Jl. Diponegoro No. 44, Surabaya',
    kelurahan: 'Darmo',
    kecamatan: 'Wonokromo',
    kota: 'Surabaya',
    provinsi: 'Jawa Timur',
    kode_pos: '60241',
    alamat_domisili: 'Jl. Raya Serpong No. 15, Tangerang Selatan',
    pendidikan_terakhir: 'S1',
    jurusan: 'Ilmu Komunikasi',
    universitas: 'Universitas Airlangga',
    tahun_lulus: 2017,
    no_ktp: '3578011801950003',
    no_npwp: '12.345.678.9-033.000',
    no_bpjs_kes: '0001234560003',
    no_bpjs_tk: '1700000003',
    no_rekening: '3456789012',
    nama_bank: 'BNI',
    nama_pemilik_rekening: 'Budi Santoso',
    masa_kerja_tahun: 4,
    atasan: 'EMP002',
    performance: 6.4,
    potential: 7.0,
  },
  {
    id: 'EMP004',
    nik: '3171086509900004',
    nama: 'Dewi Anggraini',
    foto: null,
    jabatan: 'Finance Analyst',
    divisi: 'Keuangan',
    level: 'Staff',
    status: 'aktif',
    tipe_karyawan: 'PKWTT',
    join_date: '2021-09-05',
    tempat_lahir: 'Yogyakarta',
    tanggal_lahir: '1990-09-25',
    jenis_kelamin: 'Perempuan',
    agama: 'Islam',
    golongan_darah: 'AB',
    status_pernikahan: 'Menikah',
    jumlah_anak: 1,
    kewarganegaraan: 'WNI',
    email_kerja: 'dewi.anggraini@selusa.com',
    email_pribadi: 'dewiang90@gmail.com',
    no_hp: '081234560004',
    no_telepon_rumah: '0274-234004',
    kontak_darurat_nama: 'Reza Anggraini',
    kontak_darurat_hubungan: 'Suami',
    kontak_darurat_no: '081234560066',
    alamat_ktp: 'Jl. Malioboro No. 100, Yogyakarta',
    kelurahan: 'Sosromenduran',
    kecamatan: 'Gedong Tengen',
    kota: 'Yogyakarta',
    provinsi: 'DI Yogyakarta',
    kode_pos: '55272',
    alamat_domisili: 'Jl. Casablanca Raya No. 30, Tebet, Jakarta Selatan',
    pendidikan_terakhir: 'S1',
    jurusan: 'Akuntansi',
    universitas: 'Universitas Gadjah Mada',
    tahun_lulus: 2013,
    no_ktp: '3171086509900004',
    no_npwp: '12.345.678.9-044.000',
    no_bpjs_kes: '0001234560004',
    no_bpjs_tk: '1700000004',
    no_rekening: '4567890123',
    nama_bank: 'BCA',
    nama_pemilik_rekening: 'Dewi Anggraini',
    masa_kerja_tahun: 5,
    atasan: 'EMP002',
    performance: 8.0,
    potential: 7.6,
  },
  {
    id: 'EMP005',
    nik: '3171098811850005',
    nama: 'Fajar Nugroho',
    foto: null,
    jabatan: 'Product Manager',
    divisi: 'Produk',
    level: 'Manager',
    status: 'aktif',
    tipe_karyawan: 'PKWTT',
    join_date: '2020-11-20',
    tempat_lahir: 'Semarang',
    tanggal_lahir: '1985-11-28',
    jenis_kelamin: 'Laki-laki',
    agama: 'Islam',
    golongan_darah: 'O',
    status_pernikahan: 'Menikah',
    jumlah_anak: 3,
    kewarganegaraan: 'WNI',
    email_kerja: 'fajar.nugroho@selusa.com',
    email_pribadi: 'fajarn85@gmail.com',
    no_hp: '081234560005',
    no_telepon_rumah: '024-7654005',
    kontak_darurat_nama: 'Anisa Nugroho',
    kontak_darurat_hubungan: 'Istri',
    kontak_darurat_no: '081234560055',
    alamat_ktp: 'Jl. Pandanaran No. 55, Semarang',
    kelurahan: 'Pekunden',
    kecamatan: 'Semarang Tengah',
    kota: 'Semarang',
    provinsi: 'Jawa Tengah',
    kode_pos: '50134',
    alamat_domisili: 'Jl. Kemang Selatan No. 8, Mampang, Jakarta Selatan',
    pendidikan_terakhir: 'S2',
    jurusan: 'Manajemen Teknologi',
    universitas: 'Institut Teknologi Bandung',
    tahun_lulus: 2010,
    no_ktp: '3374188811850005',
    no_npwp: '12.345.678.9-055.000',
    no_bpjs_kes: '0001234560005',
    no_bpjs_tk: '1700000005',
    no_rekening: '5678901234',
    nama_bank: 'Mandiri',
    nama_pemilik_rekening: 'Fajar Nugroho',
    masa_kerja_tahun: 6,
    atasan: null,
    performance: 8.8,
    potential: 9.6,
  },
  {
    id: 'EMP006',
    nik: '3578031204920006',
    nama: 'Sari Indah',
    foto: null,
    jabatan: 'UI/UX Designer',
    divisi: 'Teknologi',
    level: 'Staff',
    status: 'aktif',
    tipe_karyawan: 'PKWTT',
    join_date: '2022-04-12',
    tempat_lahir: 'Malang',
    tanggal_lahir: '1992-04-12',
    jenis_kelamin: 'Perempuan',
    agama: 'Islam',
    golongan_darah: 'A',
    status_pernikahan: 'Belum Menikah',
    jumlah_anak: 0,
    kewarganegaraan: 'WNI',
    email_kerja: 'sari.indah@selusa.com',
    email_pribadi: 'sariindah92@gmail.com',
    no_hp: '081234560006',
    no_telepon_rumah: '-',
    kontak_darurat_nama: 'Hadi Indah',
    kontak_darurat_hubungan: 'Ayah',
    kontak_darurat_no: '081234560044',
    alamat_ktp: 'Jl. Ijen No. 6, Malang',
    kelurahan: 'Oro-oro Dowo',
    kecamatan: 'Klojen',
    kota: 'Malang',
    provinsi: 'Jawa Timur',
    kode_pos: '65119',
    alamat_domisili: 'Jl. Fatmawati No. 25, Cilandak, Jakarta Selatan',
    pendidikan_terakhir: 'S1',
    jurusan: 'Desain Komunikasi Visual',
    universitas: 'Institut Teknologi Malang',
    tahun_lulus: 2015,
    no_ktp: '3573034204920006',
    no_npwp: '12.345.678.9-066.000',
    no_bpjs_kes: '0001234560006',
    no_bpjs_tk: '1700000006',
    no_rekening: '6789012345',
    nama_bank: 'BRI',
    nama_pemilik_rekening: 'Sari Indah',
    masa_kerja_tahun: 4,
    atasan: 'EMP001',
    performance: 7.6,
    potential: 8.2,
  },
  {
    id: 'EMP007',
    nik: '3201012302940007',
    nama: 'Hendra Wijaya',
    foto: null,
    jabatan: 'Sales Executive',
    divisi: 'Penjualan',
    level: 'Staff',
    status: 'aktif',
    tipe_karyawan: 'PKWT',
    join_date: '2023-02-01',
    tempat_lahir: 'Bekasi',
    tanggal_lahir: '1994-02-23',
    jenis_kelamin: 'Laki-laki',
    agama: 'Kristen',
    golongan_darah: 'B',
    status_pernikahan: 'Menikah',
    jumlah_anak: 1,
    kewarganegaraan: 'WNI',
    email_kerja: 'hendra.wijaya@selusa.com',
    email_pribadi: 'hendrawij94@gmail.com',
    no_hp: '081234560007',
    no_telepon_rumah: '-',
    kontak_darurat_nama: 'Lina Wijaya',
    kontak_darurat_hubungan: 'Istri',
    kontak_darurat_no: '081234560033',
    alamat_ktp: 'Jl. Pekayon Jaya No. 7, Bekasi Selatan',
    kelurahan: 'Pekayon Jaya',
    kecamatan: 'Bekasi Selatan',
    kota: 'Bekasi',
    provinsi: 'Jawa Barat',
    kode_pos: '17148',
    alamat_domisili: 'Jl. Pekayon Jaya No. 7, Bekasi Selatan',
    pendidikan_terakhir: 'S1',
    jurusan: 'Manajemen Pemasaran',
    universitas: 'Universitas Mercu Buana',
    tahun_lulus: 2017,
    no_ktp: '3275012302940007',
    no_npwp: '12.345.678.9-077.000',
    no_bpjs_kes: '0001234560007',
    no_bpjs_tk: '1700000007',
    no_rekening: '7890123456',
    nama_bank: 'BCA',
    nama_pemilik_rekening: 'Hendra Wijaya',
    masa_kerja_tahun: 3,
    atasan: 'EMP002',
    performance: 5.8,
    potential: 6.6,
  },
  {
    id: 'EMP008',
    nik: '3171078203870008',
    nama: 'Maya Kurniawan',
    foto: null,
    jabatan: 'Operations Manager',
    divisi: 'Operasional',
    level: 'Manager',
    status: 'aktif',
    tipe_karyawan: 'PKWTT',
    join_date: '2020-05-15',
    tempat_lahir: 'Medan',
    tanggal_lahir: '1987-03-22',
    jenis_kelamin: 'Perempuan',
    agama: 'Katolik',
    golongan_darah: 'O',
    status_pernikahan: 'Menikah',
    jumlah_anak: 2,
    kewarganegaraan: 'WNI',
    email_kerja: 'maya.kurniawan@selusa.com',
    email_pribadi: 'mayakurniawan87@gmail.com',
    no_hp: '081234560008',
    no_telepon_rumah: '061-4234008',
    kontak_darurat_nama: 'Rudi Kurniawan',
    kontak_darurat_hubungan: 'Suami',
    kontak_darurat_no: '081234560022',
    alamat_ktp: 'Jl. Imam Bonjol No. 88, Medan',
    kelurahan: 'Petisah Tengah',
    kecamatan: 'Medan Petisah',
    kota: 'Medan',
    provinsi: 'Sumatera Utara',
    kode_pos: '20111',
    alamat_domisili: 'Jl. Kelapa Gading Barat No. 12, Kelapa Gading, Jakarta Utara',
    pendidikan_terakhir: 'S2',
    jurusan: 'Manajemen Operasi',
    universitas: 'Universitas Sumatera Utara',
    tahun_lulus: 2012,
    no_ktp: '1271078203870008',
    no_npwp: '12.345.678.9-088.000',
    no_bpjs_kes: '0001234560008',
    no_bpjs_tk: '1700000008',
    no_rekening: '8901234567',
    nama_bank: 'BNI',
    nama_pemilik_rekening: 'Maya Kurniawan',
    masa_kerja_tahun: 6,
    atasan: null,
    performance: 9.4,
    potential: 9.2,
  },
  {
    id: 'EMP009',
    nik: '3578011808930009',
    nama: 'Rizky Firmansyah',
    foto: null,
    jabatan: 'Data Analyst',
    divisi: 'Teknologi',
    level: 'Staff',
    status: 'aktif',
    tipe_karyawan: 'PKWT',
    join_date: '2022-08-08',
    tempat_lahir: 'Surabaya',
    tanggal_lahir: '1993-08-18',
    jenis_kelamin: 'Laki-laki',
    agama: 'Islam',
    golongan_darah: 'A',
    status_pernikahan: 'Belum Menikah',
    jumlah_anak: 0,
    kewarganegaraan: 'WNI',
    email_kerja: 'rizky.firmansyah@selusa.com',
    email_pribadi: 'riskyfirman93@gmail.com',
    no_hp: '081234560009',
    no_telepon_rumah: '-',
    kontak_darurat_nama: 'Hasan Firmansyah',
    kontak_darurat_hubungan: 'Ayah',
    kontak_darurat_no: '081234560011',
    alamat_ktp: 'Jl. Rungkut Industri No. 9, Surabaya',
    kelurahan: 'Rungkut Tengah',
    kecamatan: 'Gunung Anyar',
    kota: 'Surabaya',
    provinsi: 'Jawa Timur',
    kode_pos: '60294',
    alamat_domisili: 'Jl. Pejaten Raya No. 15, Pasar Minggu, Jakarta Selatan',
    pendidikan_terakhir: 'S1',
    jurusan: 'Statistika',
    universitas: 'Institut Teknologi Sepuluh Nopember',
    tahun_lulus: 2016,
    no_ktp: '3578081808930009',
    no_npwp: '12.345.678.9-099.000',
    no_bpjs_kes: '0001234560009',
    no_bpjs_tk: '1700000009',
    no_rekening: '9012345678',
    nama_bank: 'Mandiri',
    nama_pemilik_rekening: 'Rizky Firmansyah',
    masa_kerja_tahun: 4,
    atasan: 'EMP001',
    performance: 7.0,
    potential: 8.6,
  },
  {
    id: 'EMP010',
    nik: '3171022006910010',
    nama: 'Nita Rahayu',
    foto: null,
    jabatan: 'Customer Success',
    divisi: 'Operasional',
    level: 'Staff',
    status: 'tidak aktif',
    tipe_karyawan: 'PKWT',
    join_date: '2021-06-20',
    tempat_lahir: 'Jakarta',
    tanggal_lahir: '1991-06-20',
    jenis_kelamin: 'Perempuan',
    agama: 'Islam',
    golongan_darah: 'B',
    status_pernikahan: 'Belum Menikah',
    jumlah_anak: 0,
    kewarganegaraan: 'WNI',
    email_kerja: 'nita.rahayu@selusa.com',
    email_pribadi: 'nitarahayu91@gmail.com',
    no_hp: '081234560010',
    no_telepon_rumah: '021-7654010',
    kontak_darurat_nama: 'Suharto Rahayu',
    kontak_darurat_hubungan: 'Ayah',
    kontak_darurat_no: '081234569999',
    alamat_ktp: 'Jl. Gajah Mada No. 10, Jakarta Barat',
    kelurahan: 'Krukut',
    kecamatan: 'Taman Sari',
    kota: 'Jakarta Barat',
    provinsi: 'DKI Jakarta',
    kode_pos: '11140',
    alamat_domisili: 'Jl. Gajah Mada No. 10, Jakarta Barat',
    pendidikan_terakhir: 'D3',
    jurusan: 'Administrasi Bisnis',
    universitas: 'Politeknik Negeri Jakarta',
    tahun_lulus: 2013,
    no_ktp: '3173022006910010',
    no_npwp: '12.345.678.9-110.000',
    no_bpjs_kes: '0001234560010',
    no_bpjs_tk: '1700000010',
    no_rekening: '0123456789',
    nama_bank: 'BRI',
    nama_pemilik_rekening: 'Nita Rahayu',
    masa_kerja_tahun: 5,
    atasan: 'EMP008',
    performance: 6.0,
    potential: 5.6,
  },
  {
    id: 'EMP011',
    nik: '3578011005940011',
    nama: 'Tommy Hadinata',
    foto: null,
    jabatan: 'Backend Engineer',
    divisi: 'Teknologi',
    level: 'Mid',
    status: 'aktif',
    tipe_karyawan: 'PKWT',
    join_date: '2023-05-10',
    tempat_lahir: 'Bandung',
    tanggal_lahir: '1994-05-10',
    jenis_kelamin: 'Laki-laki',
    agama: 'Kristen',
    golongan_darah: 'O',
    status_pernikahan: 'Belum Menikah',
    jumlah_anak: 0,
    kewarganegaraan: 'WNI',
    email_kerja: 'tommy.hadinata@selusa.com',
    email_pribadi: 'tommyhadi94@gmail.com',
    no_hp: '081234560011',
    no_telepon_rumah: '022-1234011',
    kontak_darurat_nama: 'Wendy Hadinata',
    kontak_darurat_hubungan: 'Kakak',
    kontak_darurat_no: '081234560012',
    alamat_ktp: 'Jl. Dago No. 45, Bandung',
    kelurahan: 'Lebak Siliwangi',
    kecamatan: 'Coblong',
    kota: 'Bandung',
    provinsi: 'Jawa Barat',
    kode_pos: '40132',
    alamat_domisili: 'Jl. Sudirman Kav. 52, Setiabudi, Jakarta Selatan',
    pendidikan_terakhir: 'S1',
    jurusan: 'Teknik Informatika',
    universitas: 'Universitas Telkom',
    tahun_lulus: 2016,
    no_ktp: '3273011005940011',
    no_npwp: '12.345.678.9-111.000',
    no_bpjs_kes: '0001234560011',
    no_bpjs_tk: '1700000011',
    no_rekening: '1122334455',
    nama_bank: 'BCA',
    nama_pemilik_rekening: 'Tommy Hadinata',
    masa_kerja_tahun: 3,
    atasan: 'EMP001',
    performance: 7.4,
    potential: 8.0,
  },
  {
    id: 'EMP012',
    nik: '3171051112780012',
    nama: 'Lestari Putri',
    foto: null,
    jabatan: 'Finance Manager',
    divisi: 'Keuangan',
    level: 'Manager',
    status: 'aktif',
    tipe_karyawan: 'PKWTT',
    join_date: '2019-12-01',
    tempat_lahir: 'Padang',
    tanggal_lahir: '1978-12-11',
    jenis_kelamin: 'Perempuan',
    agama: 'Islam',
    golongan_darah: 'A',
    status_pernikahan: 'Menikah',
    jumlah_anak: 3,
    kewarganegaraan: 'WNI',
    email_kerja: 'lestari.putri@selusa.com',
    email_pribadi: 'lestariputri78@gmail.com',
    no_hp: '081234560012',
    no_telepon_rumah: '0751-234012',
    kontak_darurat_nama: 'Ari Wibowo',
    kontak_darurat_hubungan: 'Suami',
    kontak_darurat_no: '081234560013',
    alamat_ktp: 'Jl. Sudirman No. 12, Padang',
    kelurahan: 'Kampung Jawa',
    kecamatan: 'Padang Barat',
    kota: 'Padang',
    provinsi: 'Sumatera Barat',
    kode_pos: '25117',
    alamat_domisili: 'Jl. Kuningan Mulia No. 9, Setiabudi, Jakarta Selatan',
    pendidikan_terakhir: 'S2',
    jurusan: 'Akuntansi Keuangan',
    universitas: 'Universitas Indonesia',
    tahun_lulus: 2004,
    no_ktp: '1371051112780012',
    no_npwp: '12.345.678.9-122.000',
    no_bpjs_kes: '0001234560012',
    no_bpjs_tk: '1700000012',
    no_rekening: '2233445566',
    nama_bank: 'Mandiri',
    nama_pemilik_rekening: 'Lestari Putri',
    masa_kerja_tahun: 7,
    atasan: null,
    performance: 9.0,
    potential: 8.6,
  },
  {
    id: 'EMP013',
    nik: '3171014511930013',
    nama: 'Inay',
    foto: null,
    jabatan: 'HR Specialist',
    divisi: 'HR',
    level: 'Staff',
    status: 'aktif',
    tipe_karyawan: 'PKWTT',
    join_date: '2022-03-01',
    tempat_lahir: 'Jakarta',
    tanggal_lahir: '1993-11-05',
    jenis_kelamin: 'Perempuan',
    agama: 'Islam',
    golongan_darah: 'A',
    status_pernikahan: 'Belum Menikah',
    jumlah_anak: 0,
    kewarganegaraan: 'WNI',
    email_kerja: 'inay@selusa.com',
    email_pribadi: 'inay93@gmail.com',
    no_hp: '081234560013',
    no_telepon_rumah: '021-7654013',
    kontak_darurat_nama: 'Suharto',
    kontak_darurat_hubungan: 'Ayah',
    kontak_darurat_no: '081234560091',
    alamat_ktp: 'Jl. Mangga No. 3, Kelurahan Tomang, Kecamatan Grogol, Jakarta Barat',
    kelurahan: 'Tomang',
    kecamatan: 'Grogol Petamburan',
    kota: 'Jakarta Barat',
    provinsi: 'DKI Jakarta',
    kode_pos: '11440',
    alamat_domisili: 'Jl. Mangga No. 3, Tomang, Jakarta Barat',
    pendidikan_terakhir: 'S1',
    jurusan: 'Psikologi',
    universitas: 'Universitas Tarumanagara',
    tahun_lulus: 2016,
    no_ktp: '3173014511930013',
    no_npwp: '12.345.678.9-133.000',
    no_bpjs_kes: '0001234560013',
    no_bpjs_tk: '1700000013',
    no_rekening: '3344556677',
    nama_bank: 'BCA',
    nama_pemilik_rekening: 'Inay',
    masa_kerja_tahun: 4,
    atasan: 'EMP002',
    performance: 8.2,
    potential: 8.0,
  },
  {
    id: 'EMP014',
    nik: '3278012802950014',
    nama: 'Chelsea',
    foto: null,
    jabatan: 'HR Specialist',
    divisi: 'HR',
    level: 'Staff',
    status: 'aktif',
    tipe_karyawan: 'PKWTT',
    join_date: '2023-01-16',
    tempat_lahir: 'Tangerang',
    tanggal_lahir: '1995-02-28',
    jenis_kelamin: 'Perempuan',
    agama: 'Kristen',
    golongan_darah: 'B',
    status_pernikahan: 'Belum Menikah',
    jumlah_anak: 0,
    kewarganegaraan: 'WNI',
    email_kerja: 'chelsea@selusa.com',
    email_pribadi: 'chelsea95@gmail.com',
    no_hp: '081234560014',
    no_telepon_rumah: '-',
    kontak_darurat_nama: 'Jennifer',
    kontak_darurat_hubungan: 'Ibu',
    kontak_darurat_no: '081234560092',
    alamat_ktp: 'Jl. Cendana No. 18, Kelurahan Karang Tengah, Kecamatan Ciledug, Tangerang',
    kelurahan: 'Karang Tengah',
    kecamatan: 'Ciledug',
    kota: 'Tangerang',
    provinsi: 'Banten',
    kode_pos: '15157',
    alamat_domisili: 'Jl. Permata Hijau No. 9, Kebayoran Lama, Jakarta Selatan',
    pendidikan_terakhir: 'S1',
    jurusan: 'Manajemen SDM',
    universitas: 'Universitas Bina Nusantara',
    tahun_lulus: 2018,
    no_ktp: '3603012802950014',
    no_npwp: '12.345.678.9-144.000',
    no_bpjs_kes: '0001234560014',
    no_bpjs_tk: '1700000014',
    no_rekening: '4455667788',
    nama_bank: 'Mandiri',
    nama_pemilik_rekening: 'Chelsea',
    masa_kerja_tahun: 3,
    atasan: 'EMP002',
    performance: 8.6,
    potential: 8.4,
  },
  {
    id: 'EMP015',
    nik: '3275010309910015',
    nama: 'Dian',
    foto: null,
    jabatan: 'HR Generalist',
    divisi: 'HR',
    level: 'Mid',
    status: 'aktif',
    tipe_karyawan: 'PKWTT',
    join_date: '2021-08-02',
    tempat_lahir: 'Bekasi',
    tanggal_lahir: '1991-09-03',
    jenis_kelamin: 'Perempuan',
    agama: 'Islam',
    golongan_darah: 'O',
    status_pernikahan: 'Menikah',
    jumlah_anak: 1,
    kewarganegaraan: 'WNI',
    email_kerja: 'dian@selusa.com',
    email_pribadi: 'dian91@gmail.com',
    no_hp: '081234560015',
    no_telepon_rumah: '-',
    kontak_darurat_nama: 'Andi Saputra',
    kontak_darurat_hubungan: 'Suami',
    kontak_darurat_no: '081234560093',
    alamat_ktp: 'Jl. Nangka No. 7, Kelurahan Jatibening, Kecamatan Pondok Gede, Bekasi',
    kelurahan: 'Jatibening',
    kecamatan: 'Pondok Gede',
    kota: 'Bekasi',
    provinsi: 'Jawa Barat',
    kode_pos: '17412',
    alamat_domisili: 'Jl. Nangka No. 7, Jatibening, Bekasi',
    pendidikan_terakhir: 'S1',
    jurusan: 'Ilmu Administrasi Negara',
    universitas: 'Universitas Indonesia',
    tahun_lulus: 2014,
    no_ktp: '3275010309910015',
    no_npwp: '12.345.678.9-155.000',
    no_bpjs_kes: '0001234560015',
    no_bpjs_tk: '1700000015',
    no_rekening: '5566778899',
    nama_bank: 'BNI',
    nama_pemilik_rekening: 'Dian',
    masa_kerja_tahun: 5,
    atasan: 'EMP002',
    performance: 8.8,
    potential: 8.6,
  },
];

// ─── Helpers ────────────────────────────────────────────────
// All division badges use the same neutral monochrome style
const DIVISI_STYLE = { bg: '#f1f5f9', color: '#334155', border: '#e2e8f0' };

const STATUS_COLORS = {
  aktif: { bg: '#f0fdf4', color: '#166534', border: '#bbf7d0' },
  'tidak aktif': { bg: '#fef2f2', color: '#991b1b', border: '#fecaca' },
};

// All level badges: monochrome
const LEVEL_STYLE = { bg: '#f8fafc', color: '#475569', border: '#e2e8f0' };


function getInitials(name) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

function calcAge(dobStr) {
  if (!dobStr) return '-';
  const dob = new Date(dobStr);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age + ' tahun';
}

function ScoreBadge({ score }) {
  const color = score >= 8.5 ? '#166534' : score >= 7 ? '#92400e' : '#991b1b';
  const bg = score >= 8.5 ? '#f0fdf4' : score >= 7 ? '#fffbeb' : '#fef2f2';
  const border = score >= 8.5 ? '#bbf7d0' : score >= 7 ? '#fde68a' : '#fecaca';
  return (
    <span style={{ background: bg, color, fontWeight: 700, fontSize: 12, padding: '2px 8px', borderRadius: 4, border: `1px solid ${border}`, fontFamily: 'monospace' }}>
      {score.toFixed(1)}
    </span>
  );
}

// ─── SVG Icons ───────────────────────────────────────────────
function IconPhone() {
  return (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}
function IconLocation() {
  return (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

// ─── Detail Modal ────────────────────────────────────────────
function DetailModal({ emp, allEmployees, onClose }) {
  const [tab, setTab] = useState('personal');
  const atasan = allEmployees.find(e => e.id === emp.atasan);
  const statusStyle = STATUS_COLORS[emp.status] || { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' };

  const tabs = [
    { key: 'personal', label: 'Data Diri' },
    { key: 'kontak', label: 'Kontak & Alamat' },
    { key: 'kepegawaian', label: 'Kepegawaian' },
    { key: 'pendidikan', label: 'Pendidikan & Identitas' },
  ];

  const Row = ({ label, value }) => (
    <div style={{ display: 'flex', gap: 12, padding: '9px 0', borderBottom: '1px solid var(--gray-100)' }}>
      <div style={{ width: 200, flexShrink: 0, fontSize: 12.5, color: 'var(--gray-400)', fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 13, color: 'var(--gray-800)', fontWeight: 500, flex: 1 }}>{value || '-'}</div>
    </div>
  );

  const SectionLabel = ({ children }) => (
    <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: 4, marginTop: 16, paddingBottom: 6, borderBottom: '1px solid var(--gray-100)' }}>
      {children}
    </div>
  );

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(3px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 12, width: '100%', maxWidth: 700,
          maxHeight: '90vh', display: 'flex', flexDirection: 'column',
          boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '22px 28px', borderBottom: '1px solid var(--gray-100)', display: 'flex', gap: 16, alignItems: 'center', flexShrink: 0 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 10,
            background: '#1e293b',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 18, fontWeight: 700, flexShrink: 0, letterSpacing: 1,
          }}>
            {getInitials(emp.nama)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 3 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-900)', margin: 0, letterSpacing: '-0.3px' }}>{emp.nama}</h2>
              <span style={{ fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}`, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                {emp.status === 'aktif' ? 'Aktif' : 'Non-Aktif'}
              </span>
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--gray-500)', marginBottom: 8 }}>{emp.jabatan} · {emp.divisi}</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: '#f1f5f9', color: '#64748b', fontWeight: 600, fontFamily: 'monospace' }}>{emp.id}</span>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: '#f1f5f9', color: '#64748b', fontWeight: 600 }}>{emp.tipe_karyawan}</span>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: '#f1f5f9', color: '#64748b', fontWeight: 600 }}>{emp.level}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'var(--gray-100)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16, color: 'var(--gray-500)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >×</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, padding: '0 28px', borderBottom: '1px solid var(--gray-100)', flexShrink: 0, overflowX: 'auto' }}>
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '12px 16px',
                fontSize: 12.5, fontWeight: 600, fontFamily: 'inherit',
                color: tab === t.key ? '#0f172a' : 'var(--gray-400)',
                borderBottom: `2px solid ${tab === t.key ? '#0f172a' : 'transparent'}`,
                transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div style={{ overflowY: 'auto', padding: '20px 28px', flex: 1 }}>
          {tab === 'personal' && (
            <div>
              <Row label="Nama Lengkap" value={emp.nama} />
              <Row label="NIK KTP" value={emp.nik} />
              <Row label="Tempat Lahir" value={emp.tempat_lahir} />
              <Row label="Tanggal Lahir" value={`${formatDate(emp.tanggal_lahir)} (${calcAge(emp.tanggal_lahir)})`} />
              <Row label="Jenis Kelamin" value={emp.jenis_kelamin} />
              <Row label="Agama" value={emp.agama} />
              <Row label="Golongan Darah" value={emp.golongan_darah} />
              <Row label="Status Pernikahan" value={emp.status_pernikahan} />
              <Row label="Jumlah Anak" value={emp.jumlah_anak} />
              <Row label="Kewarganegaraan" value={emp.kewarganegaraan} />
            </div>
          )}

          {tab === 'kontak' && (
            <div>
              <SectionLabel>Kontak</SectionLabel>
              <Row label="Email Kerja" value={emp.email_kerja} />
              <Row label="Email Pribadi" value={emp.email_pribadi} />
              <Row label="No. HP" value={emp.no_hp} />
              <Row label="No. Telepon Rumah" value={emp.no_telepon_rumah} />
              <SectionLabel>Kontak Darurat</SectionLabel>
              <Row label="Nama" value={emp.kontak_darurat_nama} />
              <Row label="Hubungan" value={emp.kontak_darurat_hubungan} />
              <Row label="No. HP Darurat" value={emp.kontak_darurat_no} />
              <SectionLabel>Alamat</SectionLabel>
              <Row label="Alamat KTP" value={emp.alamat_ktp} />
              <Row label="Kelurahan" value={emp.kelurahan} />
              <Row label="Kecamatan" value={emp.kecamatan} />
              <Row label="Kota/Kabupaten" value={emp.kota} />
              <Row label="Provinsi" value={emp.provinsi} />
              <Row label="Kode Pos" value={emp.kode_pos} />
              <Row label="Alamat Domisili" value={emp.alamat_domisili} />
            </div>
          )}

          {tab === 'kepegawaian' && (
            <div>
              <Row label="ID Karyawan" value={emp.id} />
              <Row label="Jabatan" value={emp.jabatan} />
              <Row label="Divisi" value={emp.divisi} />
              <Row label="Level" value={emp.level} />
              <Row label="Status Karyawan" value={emp.status} />
              <Row label="Tipe Kontrak" value={emp.tipe_karyawan} />
              <Row label="Tanggal Bergabung" value={formatDate(emp.join_date)} />
              <Row label="Masa Kerja" value={`${emp.masa_kerja_tahun} tahun`} />
              <Row label="Atasan Langsung" value={atasan ? atasan.nama : '-'} />
              <Row label="Skor Performa" value={<ScoreBadge score={emp.performance} />} />
              <Row label="Skor Potensi" value={<ScoreBadge score={emp.potential} />} />
            </div>
          )}

          {tab === 'pendidikan' && (
            <div>
              <SectionLabel>Pendidikan</SectionLabel>
              <Row label="Pendidikan Terakhir" value={emp.pendidikan_terakhir} />
              <Row label="Jurusan" value={emp.jurusan} />
              <Row label="Universitas/Institusi" value={emp.universitas} />
              <Row label="Tahun Lulus" value={emp.tahun_lulus} />
              <SectionLabel>Identitas & Keuangan</SectionLabel>
              <Row label="No. KTP" value={emp.no_ktp} />
              <Row label="No. NPWP" value={emp.no_npwp} />
              <Row label="No. BPJS Kesehatan" value={emp.no_bpjs_kes} />
              <Row label="No. BPJS Ketenagakerjaan" value={emp.no_bpjs_tk} />
              <Row label="Bank" value={emp.nama_bank} />
              <Row label="No. Rekening" value={emp.no_rekening} />
              <Row label="Nama Pemilik Rekening" value={emp.nama_pemilik_rekening} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function EmployeeDatabase() {
  const [search, setSearch] = useState('');
  const [filterDivisi, setFilterDivisi] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [view, setView] = useState('table'); // 'table' | 'grid'

  const allDivisi = [...new Set(employeeDatabase.map(e => e.divisi))].sort();

  const filtered = employeeDatabase.filter(e => {
    const q = search.toLowerCase();
    const matchSearch = !search ||
      e.nama.toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q) ||
      e.nik.includes(q) ||
      e.jabatan.toLowerCase().includes(q) ||
      e.email_kerja.toLowerCase().includes(q);
    const matchDivisi = !filterDivisi || e.divisi === filterDivisi;
    const matchStatus = !filterStatus || e.status === filterStatus;
    const matchLevel = !filterLevel || e.level === filterLevel;
    return matchSearch && matchDivisi && matchStatus && matchLevel;
  });

  const stats = {
    total: employeeDatabase.length,
    aktif: employeeDatabase.filter(e => e.status === 'aktif').length,
    pkwtt: employeeDatabase.filter(e => e.tipe_karyawan === 'PKWTT').length,
    pkwt: employeeDatabase.filter(e => e.tipe_karyawan === 'PKWT').length,
  };

  return (
    <div className="page-content">
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Karyawan', value: stats.total, color: '#0f172a', bg: '#f8fafc', border: '#e2e8f0',
            icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
          { label: 'Karyawan Aktif', value: stats.aktif, color: '#166534', bg: '#f0fdf4', border: '#bbf7d0',
            icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> },
          { label: 'Karyawan Tetap', value: stats.pkwtt, color: '#1e40af', bg: '#eff6ff', border: '#bfdbfe',
            icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg> },
          { label: 'Karyawan Kontrak', value: stats.pkwt, color: '#92400e', bg: '#fffbeb', border: '#fde68a',
            icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 8, padding: '16px 20px', border: `1px solid ${s.border}`, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: s.bg, border: `1px solid ${s.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', lineHeight: 1, letterSpacing: '-0.5px' }}>{s.value}</div>
              <div style={{ fontSize: 11.5, color: 'var(--gray-400)', marginTop: 3, fontWeight: 500 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid var(--gray-200)', padding: '12px 16px', marginBottom: 14, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 180 }}>
          <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input
            style={{ width: '100%', padding: '8px 12px 8px 32px', border: '1px solid var(--gray-200)', borderRadius: 6, fontSize: 13, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', color: '#0f172a' }}
            placeholder="Cari nama, ID, NIK, jabatan..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        {[
          { label: 'Semua Divisi', value: filterDivisi, set: setFilterDivisi, options: allDivisi },
          { label: 'Semua Status', value: filterStatus, set: setFilterStatus, options: ['aktif', 'tidak aktif'] },
          { label: 'Semua Level', value: filterLevel, set: setFilterLevel, options: ['Staff', 'Mid', 'Senior', 'Manager'] },
        ].map(f => (
          <select
            key={f.label}
            value={f.value}
            onChange={e => f.set(e.target.value)}
            style={{ padding: '8px 10px', border: '1px solid var(--gray-200)', borderRadius: 6, fontSize: 12.5, outline: 'none', fontFamily: 'inherit', background: '#fff', cursor: 'pointer', color: '#334155' }}
          >
            <option value="">{f.label}</option>
            {f.options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}

        {/* View Toggle */}
        <div style={{ display: 'flex', gap: 2, marginLeft: 'auto', border: '1px solid var(--gray-200)', borderRadius: 6, overflow: 'hidden' }}>
          {[{ key: 'table', label: 'Tabel' }, { key: 'grid', label: 'Kartu' }].map(v => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              style={{
                background: view === v.key ? '#0f172a' : '#fff',
                border: 'none', cursor: 'pointer', padding: '7px 14px',
                fontSize: 12, color: view === v.key ? '#fff' : 'var(--gray-500)',
                fontWeight: 600, transition: 'all 0.15s', fontFamily: 'inherit',
              }}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div style={{ fontSize: 11.5, color: 'var(--gray-400)', whiteSpace: 'nowrap' }}>
          {filtered.length} dari {employeeDatabase.length} karyawan
        </div>
      </div>

      {/* Table View */}
      {view === 'table' && (
        <div style={{ background: '#fff', borderRadius: 8, border: '1px solid var(--gray-200)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--gray-200)' }}>
                  {['Karyawan', 'NIK', 'Divisi', 'Jabatan', 'Level', 'Kontrak', 'No. HP', 'Email Kerja', 'Status', ''].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 10.5, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((emp) => {
                  const statusStyle = STATUS_COLORS[emp.status] || {};
                  return (
                    <tr
                      key={emp.id}
                      style={{ borderBottom: '1px solid var(--gray-100)', cursor: 'pointer', transition: 'background 0.1s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                      onMouseLeave={e => e.currentTarget.style.background = ''}
                      onClick={() => setSelectedEmp(emp)}
                    >
                      <td style={{ padding: '11px 14px', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 34, height: 34, borderRadius: 8,
                            background: '#1e293b',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0, letterSpacing: 0.5,
                          }}>{getInitials(emp.nama)}</div>
                          <div>
                            <div style={{ fontWeight: 600, color: '#0f172a', fontSize: 13 }}>{emp.nama}</div>
                            <div style={{ fontSize: 11, color: 'var(--gray-400)', fontFamily: 'monospace' }}>{emp.id}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '11px 14px', color: 'var(--gray-400)', fontFamily: 'monospace', fontSize: 12 }}>{emp.nik}</td>
                      <td style={{ padding: '11px 14px' }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: DIVISI_STYLE.bg, color: DIVISI_STYLE.color, border: `1px solid ${DIVISI_STYLE.border}` }}>{emp.divisi}</span>
                      </td>
                      <td style={{ padding: '11px 14px', color: '#334155', whiteSpace: 'nowrap', fontSize: 12.5 }}>{emp.jabatan}</td>
                      <td style={{ padding: '11px 14px' }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: LEVEL_STYLE.bg, color: LEVEL_STYLE.color, border: `1px solid ${LEVEL_STYLE.border}` }}>{emp.level}</span>
                      </td>
                      <td style={{ padding: '11px 14px', color: '#475569', fontWeight: 600, fontSize: 12 }}>{emp.tipe_karyawan}</td>
                      <td style={{ padding: '11px 14px', color: '#475569', fontFamily: 'monospace', fontSize: 12 }}>{emp.no_hp}</td>
                      <td style={{ padding: '11px 14px', color: '#64748b', fontSize: 12 }}>{emp.email_kerja}</td>
                      <td style={{ padding: '11px 14px' }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}` }}>
                          {emp.status === 'aktif' ? 'Aktif' : 'Non-Aktif'}
                        </span>
                      </td>
                      <td style={{ padding: '11px 14px' }}>
                        <button
                          onClick={e => { e.stopPropagation(); setSelectedEmp(emp); }}
                          style={{ background: 'none', border: '1px solid var(--gray-200)', borderRadius: 5, padding: '4px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: '#475569', transition: 'all 0.15s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#0f172a'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#0f172a'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#475569'; e.currentTarget.style.borderColor = 'var(--gray-200)'; }}
                        >
                          Lihat
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--gray-400)' }}>
                <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
                  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                </div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>Tidak ada karyawan ditemukan</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>Coba ubah filter atau kata kunci pencarian</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grid View */}
      {view === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {filtered.map(emp => {
            const statusStyle = STATUS_COLORS[emp.status] || {};
            return (
              <div
                key={emp.id}
                onClick={() => setSelectedEmp(emp)}
                style={{
                  background: '#fff', borderRadius: 8, border: '1px solid var(--gray-200)',
                  padding: 18, cursor: 'pointer', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = '#94a3b8'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--gray-200)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 8,
                    background: '#1e293b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 15, fontWeight: 700, flexShrink: 0, letterSpacing: 0.5,
                  }}>{getInitials(emp.nama)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 13.5, marginBottom: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{emp.nama}</div>
                    <div style={{ fontSize: 12, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{emp.jabatan}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2, fontFamily: 'monospace' }}>{emp.id}</div>
                  </div>
                  <span style={{ fontSize: 10.5, fontWeight: 600, padding: '2px 7px', borderRadius: 4, background: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}`, flexShrink: 0 }}>
                    {emp.status === 'aktif' ? 'Aktif' : 'Non-Aktif'}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, borderTop: '1px solid #f1f5f9', paddingTop: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b' }}>
                    <IconPhone />
                    <span style={{ fontSize: 12, fontFamily: 'monospace' }}>{emp.no_hp}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b' }}>
                    <IconMail />
                    <span style={{ fontSize: 11.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{emp.email_kerja}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b' }}>
                    <IconLocation />
                    <span style={{ fontSize: 12 }}>{emp.kota}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 5, marginTop: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: DIVISI_STYLE.bg, color: DIVISI_STYLE.color, border: `1px solid ${DIVISI_STYLE.border}` }}>{emp.divisi}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: LEVEL_STYLE.bg, color: LEVEL_STYLE.color, border: `1px solid ${LEVEL_STYLE.border}` }}>{emp.level}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' }}>{emp.tipe_karyawan}</span>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px 0', color: 'var(--gray-400)' }}>
              <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              </div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>Tidak ada karyawan ditemukan</div>
            </div>
          )}
        </div>
      )}

      {/* Detail Modal */}
      {selectedEmp && (
        <DetailModal emp={selectedEmp} allEmployees={employeeDatabase} onClose={() => setSelectedEmp(null)} />
      )}
    </div>
  );
}
