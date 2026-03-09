import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiShield, FiLock, FiEye, FiTrash2 } from "react-icons/fi";
import Footer from "../components/Footer";

const Privacy = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "1. Komitmen Privasi Kami",
      content:
        "Parafrase AI berkomitmen untuk melindungi privasi Anda dan data pribadi Anda. Kami memahami betapa pentingnya kepercayaan dalam layanan digital, dan kami serius dalam menjaga informasi Anda tetap aman dan rahasia.",
    },
    {
      icon: <FiEye className="w-6 h-6" />,
      title: "2. Informasi yang Kami Kumpulkan",
      content:
        "Kami mengumpulkan informasi minimal ketika Anda membuat akun atau menggunakan layanan kami:",
      subcontent: [
        "Informasi Profil: Nama, email, foto profil (jika disediakan)",
        "Teks yang Diparafrase: Teks yang Anda kirimkan untuk diproses disimpan dalam riwayat akun Anda",
        "Data Penggunaan: Statistik tentang penggunaan layanan (jumlah parafrase, mode yang digunakan)",
        "Cookies: Kami menggunakan cookies untuk autentikasi dan preferensi pengguna",
        "Informasi Perangkat: Tipe perangkat, browser, dan alamat IP (untuk keamanan)",
      ],
    },
    {
      icon: <FiLock className="w-6 h-6" />,
      title: "3. Bagaimana Kami Menggunakan Data Anda",
      content: "Data Anda digunakan hanya untuk tujuan berikut:",
      subcontent: [
        "Menyediakan Layanan Parafrase: Memproses dan menyimpan teks Anda untuk layanan parafrase",
        "Peningkatan Fitur: Menganalisis data anonim untuk meningkatkan algoritma dan fitur layanan",
        "Komunikasi: Mengirimkan notifikasi penting, update, dan dukungan pelanggan",
        "Keamanan: Mencegah penyalahgunaan, penipuan, dan aktivitas berbahaya lainnya",
        "Pembayaran: Memproses pembayaran melalui PakKasir (data pembayaran tidak disimpan oleh kami)",
      ],
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "4. Keamanan Data",
      content:
        "Kami memprioritaskan keamanan data Anda dengan implementasi standar industri:",
      subcontent: [
        "Enkripsi End-to-End: Data disimpan dengan enkripsi di Firebase Cloud Firestore",
        "Koneksi HTTPS: Semua komunikasi dengan server kami dienkripsi",
        "Akses Terbatas: Hanya karyawan yang berwenang yang dapat mengakses data Anda",
        "Backup Reguler: Data Anda di-backup secara berkala untuk mencegah kehilangan",
        "Audit Keamanan: Kami melakukan audit keamanan reguler dan penetration testing",
      ],
    },
    {
      icon: <FiEye className="w-6 h-6" />,
      title: "5. Bagian Ketiga & Data Sharing",
      content:
        "Kami tidak membagikan data pribadi Anda kepada pihak ketiga kecuali:",
      subcontent: [
        "Penyedia Pembayaran: PakKasir menerima informasi pembayaran untuk memproses transaksi",
        "Penyedia Cloud: Google Firebase menghosting data kami (dengan standar privasi ketat)",
        "Hukum & Penegakan: Jika diwajibkan oleh hukum atau untuk melindungi hak legal kami",
        "Persetujuan Anda: Jika Anda secara eksplisit menyetujui untuk berbagi data",
      ],
    },
    {
      icon: <FiTrash2 className="w-6 h-6" />,
      title: "6. Penghapusan & Kontrol Data",
      content: "Anda memiliki kontrol penuh atas data Anda:",
      subcontent: [
        "Hapus Riwayat: Anda dapat menghapus riwayat parafrase individual atau semuanya dari dashboard",
        "Hapus Akun: Anda dapat menghapus akun Anda sepenuhnya, yang akan menghapus semua data Anda",
        "Unduh Data: Anda dapat meminta untuk mengunduh semua data pribadi Anda",
        "Perbarui Info: Anda dapat memperbarui atau mengubah informasi profil kapan saja",
      ],
    },
    {
      title: "7. Cookies & Teknologi Pelacakan",
      content: "Kami menggunakan cookies untuk meningkatkan pengalaman Anda:",
      subcontent: [
        "Cookies Autentikasi: Untuk menjaga Anda tetap login",
        "Cookies Preferensi: Untuk menyimpan tema (dark/light mode) dan preferensi lainnya",
        "Analytics: Kami menggunakan Google Analytics untuk memahami bagaimana pengguna menggunakan layanan (data anonim)",
      ],
    },
    {
      title: "8. Anak-Anak & Privasi",
      content:
        "Parafrase AI tidak ditujukan untuk anak-anak di bawah 13 tahun. Kami tidak secara sengaja mengumpulkan data dari anak-anak. Jika kami mengetahui bahwa kami telah mengumpulkan data dari anak di bawah 13 tahun, kami akan menghapusnya segera.",
    },
    {
      title: "9. Retensi Data",
      content:
        "Kami menyimpan data Anda sesuai dengan periode retensi berikut:",
      subcontent: [
        "Riwayat Parafrase: Disimpan selama akun Anda aktif (dapat dihapus kapan saja)",
        "Akun Dihapus: Data dapat disimpan hingga 90 hari sebelum penghapusan permanen",
        "Log Keamanan: Disimpan hingga 6 bulan untuk tujuan keamanan dan audit",
      ],
    },
    {
      title: "10. Pembaruan Kebijakan Privasi",
      content:
        "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan signifikan akan dikomunikasikan melalui email atau pemberitahuan di website. Penggunaan berkelanjutan layanan kami setelah perubahan berarti Anda menerima pembaruan ini.",
    },
    {
      title: "11. Hak Privasi Anda",
      content:
        "Tergantung pada yurisdiksi Anda, Anda mungkin memiliki hak tertentu:",
      subcontent: [
        "Hak Akses: Minta untuk melihat data apa yang kami miliki tentang Anda",
        "Hak Koreksi: Perbaiki atau perbarui informasi yang tidak akurat",
        'Hak Penghapusan: Minta penghapusan data Anda ("Hak Lupa")',
        "Hak Portabilitas: Terima data Anda dalam format yang dapat ditransfer",
      ],
    },
    {
      title: "12. Kontak Privasi",
      content:
        "Jika Anda memiliki pertanyaan atau kekhawatiran tentang privasi Anda, silakan hubungi kami:",
      subcontent: [
        "Email: rickpipor@gmail.com",
        "Website: https://parafrase-tools.com",
        "Kami akan merespons dalam waktu 7-10 hari kerja",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 transition-colors"
          >
            <FiArrowLeft />
            <span>Kembali</span>
          </button>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Kebijakan Privasi
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Kami menghormati privasi Anda. Pelajari bagaimana kami mengumpulkan,
            menggunakan, dan melindungi data Anda.
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">
            Terakhir diperbarui: Maret 2026
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-soft"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                {section.icon && (
                  <span className="text-primary-600 dark:text-primary-400">
                    {section.icon}
                  </span>
                )}
                {section.title}
              </h2>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                {section.content}
              </p>

              {section.subcontent && (
                <ul className="space-y-3 ml-6">
                  {section.subcontent.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-3"
                    >
                      <span className="text-primary-600 dark:text-primary-400 font-bold flex-shrink-0 mt-1">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-700/50"
        >
          <div className="flex gap-4">
            <FiShield className="text-green-600 dark:text-green-400 flex-shrink-0 w-6 h-6 mt-1" />
            <div>
              <h3 className="font-bold text-green-900 dark:text-green-300 mb-2">
                Privasi Adalah Prioritas Kami
              </h3>
              <p className="text-green-800 dark:text-green-200">
                Kami percaya bahwa privasi adalah hak fundamental. Data Anda
                adalah milik Anda, dan kami berkomitmen untuk melindunginya
                dengan serius. Jika Anda memiliki pertanyaan atau kekhawatiran
                tentang bagaimana kami menangani data Anda, jangan ragu untuk
                menghubungi kami.
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Pertanyaan Umum
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Apakah Parafrase Tools menjual data saya ke pihak ketiga?",
                a: "Tidak, kami tidak pernah menjual atau membagikan data pribadi Anda kepada pihak ketiga untuk tujuan pemasaran atau komersial lainnya. Data Anda hanya dibagikan jika diwajibkan oleh hukum atau dengan persetujuan eksplisit Anda.",
              },
              {
                q: "Seberapa lama data saya disimpan?",
                a: "Data riwayat parafrase disimpan selama akun Anda aktif. Anda dapat menghapusnya kapan saja. Jika Anda menghapus akun, data akan dihapus permanen setelah 90 hari.",
              },
              {
                q: "Bagaimana kami dapat meminta penghapusan akun?",
                a: "Anda dapat meminta penghapusan akun dari pengaturan akun di dashboard. Semua data pribadi Anda akan dihapus secara permanen dalam waktu 90 hari.",
              },
              {
                q: "Apakah data saya aman?",
                a: "Ya, kami menggunakan enkripsi end-to-end, koneksi HTTPS, dan standar keamanan industri lainnya untuk melindungi data Anda. Namun, tidak ada sistem yang 100% aman, dan kami tidak dapat menjamin keamanan absolut.",
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
              >
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                  {faq.q}
                </h4>
                <p className="text-slate-700 dark:text-slate-300">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
