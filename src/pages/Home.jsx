import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiZap,
  FiShield,
  FiCheckCircle,
  FiEdit,
  FiBookOpen,
} from "react-icons/fi";
import Footer from "../components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO */}
      <section className="relative flex items-center justify-center px-6 pt-28 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
        {/* background */}
        <div
          className="absolute inset-0 
bg-gradient-to-br 
from-blue-50 via-white to-purple-50
dark:from-slate-900 dark:via-slate-900 dark:to-slate-800
"
        />

        {/* content */}
        <div className="relative z-10 max-w-3xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
            Parafrase Tools
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-8">
            Menulis Ulang Teks Lebih Mudah
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/tools")}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:scale-105 transition"
            >
              Parafrase Sekarang →
            </button>

            <button
              onClick={() => navigate("/pricing")}
              className="px-7 py-3 rounded-xl border border-blue-500 text-blue-500 dark:text-blue-400 hover:bg-blue-500/10 transition"
            >
              Lihat Paket
            </button>
          </div>
        </div>
      </section>

      {/* PENJELASAN */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">
            Apa Itu Parafrase Tools?
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-left sm:text-justify">
            Parafrase Tools adalah platform yang membantu pengguna menulis ulang
            teks dengan struktur kalimat yang berbeda namun tetap mempertahankan
            makna utama dari tulisan tersebut. Alat ini sangat berguna bagi
            mahasiswa, penulis, blogger, maupun pembuat konten yang ingin
            menghasilkan tulisan lebih rapi dan mudah dipahami.
          </p>
        </motion.div>
      </section>

      {/* KEUNGGULAN */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white"
          >
            Keunggulan Parafrase Tools
          </motion.h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <FiZap size={28} />,
                title: "Proses Cepat",
                desc: "Tulisan diproses dalam hitungan detik tanpa harus menulis ulang secara manual.",
              },
              {
                icon: <FiShield size={28} />,
                title: "Privasi Aman",
                desc: "Teks yang Anda proses tidak disimpan sehingga data tetap aman.",
              },
              {
                icon: <FiCheckCircle size={28} />,
                title: "Hasil Natural",
                desc: "Struktur kalimat diubah sehingga tulisan lebih natural.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="p-8 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-primary-500 mb-4"
                >
                  {item.icon}
                </motion.div>

                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CARA KERJA */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white"
          >
            Cara Menggunakan Parafrase Tools
          </motion.h2>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 text-center">
            {[
              {
                icon: <FiEdit size={28} />,
                title: "Masukkan Teks",
                desc: "Tempel teks yang ingin diproses.",
              },
              {
                icon: <FiBookOpen size={28} />,
                title: "Pilih Mode",
                desc: "Pilih gaya penulisan sesuai kebutuhan.",
              },
              {
                icon: <FiCheckCircle size={28} />,
                title: "Dapatkan Hasil",
                desc: "Sistem akan menghasilkan versi baru dari teks Anda.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="flex justify-center text-primary-500 mb-4"
                >
                  {step.icon}
                </motion.div>

                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-500 to-secondary-600 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Mulai Menulis Ulang Teks Sekarang
          </h2>

          <button
            onClick={() => navigate("/tools")}
            className="px-8 py-4 rounded-xl bg-white text-primary-600 font-bold hover:shadow-xl transition"
          >
            Coba Gratis
          </button>
        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
