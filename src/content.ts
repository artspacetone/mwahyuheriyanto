// src/content.ts

import { AppContentStructure } from './types';
import heroImage from './assets/hero-image.jpg';
// ======================================================================
// == PERBAIKAN SEO & ATS: Impor gambar portofolio secara lokal        ==
// ======================================================================
import portfolioImage1 from './assets/portfolio-1.jpg';
import portfolioImage2 from './assets/portfolio-2.jpg';

export const content: AppContentStructure = {
    header: {
        name: 'Moch. Wahyu Heriyanto',
        navLinks: [
            { href: '#projects', label: 'Proyek Teknis' },
            { href: '#toolkit', label: 'Keterampilan' },
            { href: '#journey', label: 'Pengalaman' },
            { href: '#about', label: 'Tentang Saya' },
        ],
        ctaUrl: 'https://wa.me/6289672003771?text=Halo%2C%20saya%20tertarik%20untuk%20mendiskusikan%20peluang%20kerja%20sama.',
        ctaButton: 'Hubungi Saya'
    },
    hero: {
        greeting: "Halo, saya Wahyu Heriyanto.",
        title: 'Saya menjembatani akuntansi dan teknologi untuk mendorong efisiensi bisnis.',
        subtitle: 'Sebagai Accounting Supervisor dengan pengalaman 10+ tahun, saya memanfaatkan Python, JavaScript, dan SQL untuk mengotomatisasi proses keuangan, menganalisis data kompleks, dan memberikan insight yang akurat untuk mendukung pertumbuhan bisnis.',
        ctaPrimary: 'Lihat Proyek Teknis',
        ctaSecondary: 'Jelajahi Keterampilan',
        heroImageUrl: heroImage,
        heroImageAlt: 'Seorang profesional menganalisis data keuangan di depan laptop dengan grafik dan kode'
    },
    portfolio: {
        id: 'projects',
        title: 'Proyek Teknis Relevan',
        subtitle: 'Studi kasus nyata tentang bagaimana saya menerapkan keterampilan teknis untuk memecahkan masalah di dunia akuntansi dan keuangan.',
        data: [
            {
                title: 'Otomatisasi Laporan Rekonsiliasi Bulanan',
                client: 'Internal Project @ Trans TV',
                // ===============================================
                // == PERBAIKAN: Menggunakan gambar lokal       ==
                // ===============================================
                visualUrl: portfolioImage1,
                visualAlt: 'Otomatisasi proses rekonsiliasi dengan skrip Python dan data spreadsheet',
                situation: 'Proses rekonsiliasi laporan bulanan dilakukan secara manual dengan menggabungkan data dari beberapa file Excel, memakan waktu yang signifikan dan rentan terhadap human error.',
                action: 'Saya mengembangkan sebuah skrip Python menggunakan library Pandas untuk secara otomatis menarik data dari berbagai sumber file Excel, membersihkannya, menggabungkannya, dan menghasilkan draf laporan laba rugi bulanan dalam format yang konsisten.',
                result: [
                    { value: '40%', label: 'Pengurangan Waktu Pengerjaan' },
                    { value: '15%', label: 'Penurunan Kesalahan Input' },
                    { value: 'Otomatis', label: 'Proses Pelaporan Bulanan' }
                ],
                tags: ['Python', 'Pandas', 'Automasi Proses', 'Data Cleansing', 'Pelaporan Keuangan', 'Excel'],
            },
            {
                title: 'Dashboard Visualisasi Anggaran Departemen',
                client: 'Internal Project',
                // ===============================================
                // == PERBAIKAN: Menggunakan gambar lokal       ==
                // ===============================================
                visualUrl: portfolioImage2,
                visualAlt: 'Dashboard interaktif yang menampilkan grafik penggunaan anggaran secara real-time',
                situation: 'Kepala departemen kesulitan melacak penggunaan anggaran secara real-time, sehingga pengambilan keputusan terkait pengeluaran menjadi lambat dan kurang berbasis data.',
                action: 'Saya membangun sebuah web dashboard interaktif menggunakan JavaScript dan Node.js (sebagai backend) untuk mengambil data anggaran. Dashboard ini memvisualisasikan perbandingan antara penggunaan anggaran aktual dengan target secara real-time.',
                result: [
                    { value: 'Real-time', label: 'Pelacakan Anggaran' },
                    { value: 'Lebih Cepat', label: 'Pengambilan Keputusan' },
                    { value: 'Penuh', label: 'Transparansi Pengeluaran' }
                ],
                tags: ['JavaScript', 'Node.js', 'Visualisasi Data', 'Dashboard', 'Manajemen Anggaran', 'Real-time Analytics'],
            },
        ]
    },
    toolkit: {
        id: 'toolkit',
        title: "Keterampilan Inti",
        subtitle: 'Kombinasi keahlian di bidang keuangan, teknis, dan manajerial yang menjadi fondasi profesional saya.',
        data: [
            { 
                name: 'Analisis Data & Otomatisasi',
                description: 'Menggunakan Python (Pandas, NumPy) dan SQL untuk membersihkan, menganalisis, dan mengotomatisasi laporan data keuangan.',
                icon: 'M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.125 1.125 0 010 2.25H5.625a1.125 1.125 0 010-2.25z'
            },
            { 
                name: 'Software Akuntansi & ERP',
                description: 'Sangat mahir dalam menggunakan Accurate, sistem ERP (SAP/Oracle), dan Microsoft Excel tingkat lanjut (PivotTable, VLOOKUP).',
                icon: 'M2.25 21h19.5m-18-18v18A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0019.5 3h-15A2.25 2.25 0 002.25 5.25v1.5z'
            },
            { 
                name: 'Pengembangan Web Dasar',
                description: 'Mampu membangun aplikasi internal sederhana dan dashboard menggunakan JavaScript (ES6+) dan Node.js (Express.js).',
                icon: 'M17.25 6.75l-5.25 5.25-5.25-5.25m10.5 6l-5.25 5.25-5.25-5.25m-2.25-3l-1.5-1.5-1.5 1.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            },
            { 
                name: 'Kepemimpinan & Manajemen',
                description: 'Berpengalaman menyupervisi dan membimbing tim, mengelola proses akhir bulan, dan memastikan akurasi dalam setiap siklus akuntansi.',
                icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663M12 3.375c-1.621 0-3.074.467-4.22 1.254a4.125 4.125 0 10-7.533 2.493h.003v-.003c.01-.024.015-.048.022-.072c.067-.218.158-.425.268-.622c.11-.197.23-.386.368-.564c.138-.178.288-.347.448-.507c.16-.16.328-.312.502-.454c.174-.142.355-.275.542-.397c.187-.122.38-.234.576-.336c.196-.102.398-.193.602-.274c.204-.081.413-.15.626-.205c.213-.055.43-.098.65-.129c.22-.03.444-.048.67-.056c.226-.008.453-.012.68-.012z'
            },
        ]
    },
    journey: {
        id: 'journey',
        title: 'Pengalaman Profesional',
        subtitle: 'Setiap peran telah membangun keahlian saya, baik di bidang akuntansi maupun teknis.',
        data: [
            {
                period: 'Juni 2019 - Sekarang',
                title: 'Accounting Supervisor',
                company: 'PT Televisi Transformasi Indonesia (Trans TV), Jakarta',
                description: 'Menyupervisi tim, memastikan akurasi transaksi (AR, AP, GL), mengelola budgeting, dan bertanggung jawab atas proses penutupan bulanan dan tahunan. Berhasil mengimplementasikan skrip otomatisasi yang signifikan.'
            },
            {
                period: 'Agustus 2015 - Mei 2019',
                title: 'Accounting Staff',
                company: 'PT Televisi Transformasi Indonesia (Trans TV), Jakarta',
                description: 'Melakukan pencatatan jurnal harian, rekonsiliasi bank, mengelola invoice, dan membantu persiapan data untuk budgeting dan audit.'
            },
            {
                period: 'Maret 2012 - April 2014',
                title: 'Store Manager',
                company: 'J.CO Donuts & Coffee, Cirebon',
                description: 'Mengelola laporan Laba & Rugi, anggaran operasional, dan melakukan analisis penjualan harian untuk mencapai target profit.'
            }
        ]
    },
    pendidikan: {
        id: 'education',
        title: 'Pendidikan',
        data: {
            degree: 'Sarjana Ekonomi (S.E.) - Akuntansi',
            degreeUrl: 'https://drive.google.com/file/d/1lba4iROTXz0-WwDr2lxNF1scnnl0cmXG/view',			
            university: 'Universitas Muhammadiyah Prof. Dr. Hamka, Jakarta',
            details: 'Lulus 2010 - IPK: 3.28 / 4.00'
        }
    },
    aboutMe: {
      id: 'about',
      title: 'Ringkasan Profesional',
      paragraph1: 'Saya adalah seorang Accounting Supervisor berorientasi hasil dengan rekam jejak lebih dari 10 tahun dalam manajemen siklus akuntansi, pelaporan keuangan, dan kepemimpinan tim. Saya terbukti berhasil meningkatkan efisiensi proses dan akurasi data di industri media.',
      paragraph2: 'Saya memiliki gairah untuk memanfaatkan skill pemrograman untuk memecahkan masalah bisnis. Saya percaya otomatisasi dan analisis data yang tepat adalah kunci untuk membuka potensi pertumbuhan dan efisiensi di departemen mana pun, terutama keuangan.',
      profilePicture: {
        url: 'https://www.datocms-assets.com/171203/1758882145-ft.png', 
        alt: 'Foto Moch. Wahyu Heriyanto'
      }
    },
    footer: {
        title: 'Mari Terhubung.',
        subtitle: 'Saya tertarik untuk menerapkan keahlian analisis keuangan dan teknis untuk mendukung pertumbuhan bisnis di perusahaan Anda. Mari diskusikan bagaimana saya bisa berkontribusi.',
        copyright: 'Moch. Wahyu Heriyanto. All rights reserved.'
    },
    seo: {
        title: 'Portfolio Moch. Wahyu Heriyanto | Otomatisasi & Analisis Data Keuangan',
        description: 'Portofolio Moch. Wahyu Heriyanto, seorang Accounting Supervisor dengan keahlian Python, JavaScript, dan SQL untuk otomatisasi proses akuntansi dan analisis data keuangan.',
        keywords: 'Analisis Data Keuangan, Otomatisasi Akuntansi, Python, Pandas, SQL, JavaScript, Node.js, SAP, Oracle, Portfolio, Moch Wahyu Heriyanto',
        socialImageUrl: "https://images.unsplash.com/photo-1637420425895-97a23905c236?q=80&w=1200&h=630&auto=format&fit=crop"
    },
};