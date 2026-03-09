import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const whatsappNumber = "6285856618965";

  const handleSend = () => {
    const text = `
Halo Admin Parafrase Tools
`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-slate-900 dark:text-white mb-4"
        >
          Hubungi Kami
        </motion.h1>

        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Jika Anda memiliki pertanyaan, saran, atau ingin bekerja sama dengan
          Parafrase Tools, silakan hubungi kami melalui form berikut atau
          langsung melalui WhatsApp.
        </p>
      </section>

      {/* Contact Container */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 pb-20">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Informasi Kontak
          </h2>

          <p className="text-slate-600 dark:text-slate-400">
            Tim kami siap membantu Anda jika ada pertanyaan terkait penggunaan
            tools, kerjasama, atau kendala teknis.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FiMail className="text-primary-500" size={20} />
              <span className="text-slate-700 dark:text-slate-300">
                support@parafrase.com
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FiPhone className="text-primary-500" size={20} />
              <span className="text-slate-700 dark:text-slate-300">
                +62 858 566 189 65
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FiMessageCircle className="text-primary-500" size={20} />
              <span className="text-slate-700 dark:text-slate-300">
                WhatsApp Support
              </span>
            </div>
          </div>

          {/* WhatsApp Button */}
          <button
            onClick={handleSend}
            className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
          >
            <FaWhatsapp size={22} />
            Chat via WhatsApp
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
