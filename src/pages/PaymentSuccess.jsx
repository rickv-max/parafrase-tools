import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { updateUserDoc } from "../firebase/firestore";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const PaymentSuccess = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const plan = params.get("plan");
  const now = new Date();
  const expires = new Date();

  expires.setDate(now.getDate() + 30);

  useEffect(() => {
    if (loading) return;

    const activatePlan = async () => {
      if (!user || !plan) return;

      try {
        console.log("ACTIVATING PLAN:", plan);

        await updateUserDoc(user.uid, {
          plan: plan,
          planStartedAt: now,
          planExpiresAt: expires,
        });

        toast.success("Langganan berhasil diaktifkan!");

        navigate("/tools");
      } catch (err) {
        console.error("UPDATE ERROR:", err);
      }
    };

    activatePlan();
  }, [loading, user, plan]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-10 text-center max-w-md w-full"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900"
        >
          <span className="text-4xl">✅</span>
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Pembayaran Berhasil!
        </h1>

        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Langganan Anda telah berhasil diaktifkan.
        </p>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold mb-6">
          👑 PLAN AKTIF
        </div>

        {/* Redirect info */}
        <p className="text-sm text-slate-500 mb-6">
          Anda akan diarahkan ke halaman tools...
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/tools")}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-bold hover:shadow-lg transition"
        >
          Buka Parafrase Tools 🚀
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
