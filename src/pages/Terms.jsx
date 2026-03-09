import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import Footer from "../components/Footer";

const Terms = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Penerimaan Syarat & Ketentuan",
      content: [
        "Dengan mengakses atau menggunakan Parafrase AI, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini.",
        "Jika Anda tidak setuju dengan bagian mana pun dari syarat ini, Anda tidak boleh menggunakan layanan kami.",
        "Kami berhak mengubah, memodifikasi, atau memperbarui syarat ini kapan saja tanpa pemberitahuan sebelumnya.",
      ],
    },
    {
      title: "2. Akun Pengguna",
      content: [
        "Anda bertanggung jawab atas semua aktivitas yang terjadi di bawah akun Anda.",
        "Anda harus menjaga keamanan informasi login (email dan password) Anda dengan ketat.",
        "Anda harus segera memberi tahu kami jika terjadi akses tidak sah ke akun Anda.",
        "Kami tidak bertanggung jawab atas kerugian yang timbul dari kegagalan Anda menjaga keamanan akun.",
      ],
    },
    {
      title: "3. Pembatasan Penggunaan",
      content: [
        "Anda tidak boleh menyalahgunakan atau memanfaatkan layanan parafrase API kami.",
        "Anda tidak boleh mengirimkan konten yang ilegal, kasar, menyerang, atau melanggar hak cipta.",
        "Anda tidak boleh mencoba melakukan hacking, reverse engineering, atau mengganggu infrastruktur kami.",
        "Anda tidak boleh mengirimkan spam, malware, atau konten berbahaya lainnya.",
        "Pelanggaran dapat menyebabkan suspensi atau penghapusan akun Anda.",
      ],
    },
    {
      title: "4. Hak Kekayaan Intelektual",
      content: [
        "Semua kode, desain, dan properti intelektual milik Parafrase AI dilindungi oleh hukum hak cipta.",
        "Anda tidak diizinkan untuk menyalin, mendistribusikan, atau mereproduksi konten kami tanpa izin.",
        "Konten yang Anda kirimkan untuk diparafrase tetap menjadi milik Anda.",
        "Kami memiliki hak untuk menggunakan konten Anda untuk meningkatkan layanan (dengan persetujuan).",
      ],
    },
    {
      title: "5. Langganan & Pembayaran",
      content: [
        "Langganan Anda dikelola melalui PakKasir Payment Gateway.",
        "Anda akan menerima tagihan sesuai dengan paket yang Anda pilih (bulanan atau tahunan).",
        "Pembayaran akan diproses secara otomatis pada tanggal tagihan yang ditetapkan.",
        "Anda dapat membatalkan langganan kapan saja dari pengaturan akun Anda.",
        "Kebijakan pengembalian dana berlaku sesuai dengan yang dijelaskan di halaman Pricing.",
        "Jika pembayaran gagal, kami akan mencoba lagi beberapa kali sebelum menangguhkan akun.",
      ],
    },
    {
      title: "6. Batasan Tanggung Jawab",
      content: [
        'Parafrase AI disediakan "sebagaimana adanya" tanpa jaminan apa pun.',
        "Kami tidak bertanggung jawab atas setiap kerusakan, kerugian, atau kehilangan data yang timbul dari penggunaan layanan kami.",
        "Kami tidak menjamin bahwa layanan kami akan selalu bebas dari kesalahan atau gangguan.",
        "Tanggung jawab maksimal kami terbatas pada jumlah yang telah Anda bayarkan dalam sebulan terakhir.",
      ],
    },
    {
      title: "7. Konten & Privasi",
      content: [
        "Konten yang Anda parafrase disimpan dalam riwayat Anda untuk kemudahan penggunaan.",
        "Data pribadi Anda dilindungi sesuai dengan Kebijakan Privasi kami.",
        "Kami tidak akan membagikan konten Anda kepada pihak ketiga tanpa persetujuan Anda.",
        "Anda dapat menghapus riwayat parafrase kapan saja dari dashboard Anda.",
      ],
    },
    {
      title: "8. Pembaruan Layanan",
      content: [
        "Kami dapat menghentikan, menangguhkan, atau memodifikasi layanan kami kapan saja.",
        "Kami akan berusaha memberikan pemberitahuan jika ada perubahan signifikan.",
        "Anda tidak berhak atas kompensasi jika kami menghentikan layanan.",
      ],
    },
    {
      title: "9. Ganti Rugi",
      content: [
        "Anda setuju untuk mengganti kerugian Parafrase AI dari semua klaim, kerugian, atau biaya yang timbul dari penggunaan Anda terhadap layanan kami yang melanggar syarat ini.",
      ],
    },
    {
      title: "10. Hukum yang Berlaku",
      content: [
        "Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Indonesia.",
        "Setiap perselisihan akan diselesaikan di pengadilan yang berwenang di Indonesia.",
      ],
    },
    {
      title: "11. Kontak & Dukungan",
      content: [
        "Untuk pertanyaan atau keberatan mengenai Syarat dan Ketentuan, hubungi kami di:",
        "Email: rickpipor@gmail.com",
        "Website: https://parafrase-tools.com",
        "Kami akan merespons dalam waktu 24-48 jam kerja.",
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
            Syarat & Ketentuan Penggunaan
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
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
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <FiCheckCircle className="text-primary-600 dark:text-primary-400" />
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.content.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-slate-700 dark:text-slate-300 leading-relaxed"
                  >
                    <span className="block ml-8 relative">
                      <span className="absolute -ml-4 text-primary-600 dark:text-primary-400 font-bold">
                        •
                      </span>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-700/50"
        >
          <p className="text-blue-900 dark:text-blue-300">
            <strong>Catatan Penting:</strong> Dengan menggunakan Parafrase
            Tools, Anda menyatakan bahwa Anda telah membaca, memahami, dan
            menyetujui semua Syarat dan Ketentuan di atas. Jika Anda memiliki
            pertanyaan atau kekhawatiran, jangan ragu untuk menghubungi tim
            dukungan kami.
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
