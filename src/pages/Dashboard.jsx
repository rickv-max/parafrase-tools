import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLogOut, FiClock, FiTrendingUp, FiStar } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import {
  getUserDoc,
  getUserHistory,
  getDailyUsage,
} from "../firebase/firestore";
import { logoutUser } from "../services/authService";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [history, setHistory] = useState([]);
  const [dailyUsage, setDailyUsage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    try {
      const [userDoc, userHistory, usage] = await Promise.all([
        getUserDoc(user.uid),
        getUserHistory(user.uid),
        getDailyUsage(user.uid),
      ]);

      setUserData(userDoc);
      setHistory(userHistory);
      setDailyUsage(usage);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
      toast.success("Berhasil logout");
    } catch (error) {
      toast.error("Gagal logout");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Selamat datang, {user?.displayName || user?.email}
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <FiLogOut />
            Logout
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Plan Saat Ini
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white capitalize">
                  {userData?.plan || "free"}
                </p>
              </div>
              <FiStar className="text-primary-500 text-2xl" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Penggunaan Hari Ini
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {dailyUsage.toLocaleString()} kata
                </p>
              </div>
              <FiClock className="text-secondary-500 text-2xl" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Total Parafrase
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {history.length}
                </p>
              </div>
              <FiTrendingUp className="text-amber-500 text-2xl" />
            </div>
          </motion.div>
        </div>

        {/* History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft-lg p-6 border border-slate-200 dark:border-slate-700"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Riwayat Parafrase
          </h2>

          {history.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 capitalize">
                      {item.mode}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {item.created_at
                        ?.toDate?.()
                        .toLocaleDateString?.("id-ID") || "Baru"}
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 line-clamp-2 mb-2">
                    {item.input_text}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {item.word_count} kata
                    </span>
                    <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 dark:text-slate-400 py-8">
              Belum ada riwayat parafrase
            </p>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
