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

    // jika belum login redirect
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
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Riwayat Parafrase</h1>

      {history.length === 0 && (
        <div className="text-slate-500 text-center">
          Belum ada riwayat parafrase
        </div>
      )}

      <div className="space-y-6">
        {history.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border"
          >
            <div className="flex justify-between mb-3">
              <span className="text-sm text-primary-500">
                Mode: {item.mode}
              </span>

              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500"
              >
                <FiTrash2 />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-slate-400 mb-1">Teks Asli</p>

                <p>{item.input}</p>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-1">Hasil Parafrase</p>

                <p>{item.output}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default History;
