import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getUserHistory, deleteHistoryItem } from "../firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";

const History = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/login");
      return;
    }
    loadHistory();
  }, [user, loading]);

  const loadHistory = async () => {
    const data = await getUserHistory(user.uid);
    setHistory(data);
    setLoadingHistory(false);
  };

  const handleDelete = async (id) => {
    await deleteHistoryItem(id);
    setHistory(history.filter((item) => item.id !== id));
  };

  if (loading || loadingHistory) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#0f0e11]">
        <div className="w-9 h-9 rounded-full border-2 border-[#272229] border-t-[#c9a96e] animate-spin" />
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#4a4450]">
          Memuat...
        </span>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#0f0e11] text-[#e8e3dc]"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
      `}</style>

      <div className="max-w-2xl mx-auto px-4 py-8 pb-20">

        {/* ── Header ── */}
        <div className="mb-9">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c9a96e] mb-2">
            Akun Saya
          </p>
          <h1
            className="text-[clamp(26px,6vw,38px)] font-semibold text-[#f2ede6] leading-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Riwayat Parafrase
          </h1>
          <p className="mt-2 text-[13px] font-light text-[#736d65]">
            Semua hasil parafrase tersimpan di sini
          </p>
          <div className="w-12 h-0.5 mt-5 rounded-full bg-gradient-to-r from-[#c9a96e] to-transparent" />
          {history.length > 0 && (
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.08em] text-[#c9a96e] bg-[#c9a96e]/10 border border-[#c9a96e]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
              {history.length} riwayat tersimpan
            </div>
          )}
        </div>

        {/* ── Empty state ── */}
        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/[0.07] text-2xl mb-1">
              📄
            </div>
            <p
              className="text-lg text-[#f2ede6]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Belum ada riwayat
            </p>
            <p className="text-[13px] text-[#574f47] max-w-[240px] leading-relaxed">
              Hasil parafrase kamu akan muncul di sini setelah kamu mulai menggunakannya.
            </p>
          </div>
        )}

        {/* ── Cards ── */}
        <div className="flex flex-col gap-4">
          {history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              className="group bg-[#17151a] border border-[#272229] rounded-2xl overflow-hidden hover:border-[#3a3340] hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f1c23] bg-white/[0.015]">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-semibold tracking-[0.08em] uppercase text-[#c9a96e] bg-[#c9a96e]/10 border border-[#c9a96e]/20">
                    <span className="w-1 h-1 rounded-full bg-[#c9a96e]" />
                    {item.mode}
                  </span>
                  {item.createdAt && (
                    <span className="text-[11px] font-light text-[#4a4450]">
                      {new Date(item.createdAt?.seconds * 1000).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-transparent text-[#4a4450] hover:bg-red-500/10 hover:border-red-500/25 hover:text-red-400 transition-all duration-150"
                  title="Hapus"
                >
                  <FiTrash2 size={13} />
                </button>
              </div>

              {/* Content grid — stacked on mobile, side-by-side on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* Teks Asli */}
                <div className="p-4 sm:p-5">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase text-[#4a4450] mb-2.5">
                    <span className="w-1 h-1 rounded-full bg-[#736d65]" />
                    Teks Asli
                  </p>
                  <p
                    className="text-sm leading-relaxed text-[#c4bdb5] line-clamp-4"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {item.input}
                  </p>
                </div>

                {/* Divider */}
                <div className="block sm:hidden border-t border-[#1f1c23]" />

                {/* Hasil Parafrase */}
                <div className="p-4 sm:p-5 sm:border-l border-[#1f1c23]">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase text-[#8a7d6a] mb-2.5">
                    <span className="w-1 h-1 rounded-full bg-[#c9a96e]" />
                    Hasil Parafrase
                  </p>
                  <p
                    className="text-sm leading-relaxed text-[#ddd7ce] line-clamp-4"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {item.output}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default History;
