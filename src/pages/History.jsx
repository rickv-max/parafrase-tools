import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getUserHistory, deleteHistoryItem } from "../firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiClock, FiFileText, FiZap } from "react-icons/fi";

const History = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

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
    setDeletingId(id);
    await deleteHistoryItem(id);
    setHistory(history.filter((item) => item.id !== id));
    setDeletingId(null);
  };

  if (loading || loadingHistory) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-primary-500 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-sm text-slate-400 tracking-wide">Memuat riwayat…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 sm:mb-10"
        >
          <div className="flex items-center gap-2.5 mb-1">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-500/10 text-primary-500">
              <FiClock size={16} />
            </span>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-500">
              Riwayat
            </p>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
            Riwayat Parafrase
          </h1>
          {history.length > 0 && (
            <p className="mt-1 text-sm text-slate-400">
              {history.length} entri tersimpan
            </p>
          )}
        </motion.div>

        {/* Empty state */}
        {history.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
              <FiFileText size={28} className="text-slate-300 dark:text-slate-600" />
            </div>
            <p className="font-semibold text-slate-500 dark:text-slate-400">Belum ada riwayat</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
              Hasil parafrase akan muncul di sini
            </p>
          </motion.div>
        )}

        {/* List */}
        <div className="space-y-4">
          <AnimatePresence>
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, scale: 0.97 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                {/* Card header */}
                <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-primary-500/10 text-primary-500">
                      <FiZap size={12} />
                    </span>
                    <span className="text-xs font-semibold text-primary-500 tracking-wide">
                      {item.mode}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-150 disabled:opacity-40"
                    aria-label="Hapus"
                  >
                    {deletingId === item.id ? (
                      <span className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FiTrash2 size={14} />
                    )}
                  </button>
                </div>

                {/* Card body */}
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-700">
                  {/* Teks Asli */}
                  <div className="px-4 sm:px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                      Teks Asli
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-5">
                      {item.input}
                    </p>
                  </div>

                  {/* Hasil Parafrase */}
                  <div className="px-4 sm:px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                      Hasil Parafrase
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-5">
                      {item.output}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default History;
