import { useAuth } from "../hooks/useAuth";
import { sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cooldown, setCooldown] = useState(0);
  const [checking, setChecking] = useState(true);

  // Auto check verification
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(async () => {
      await user.reload();

      if (user.emailVerified) {
        toast.success("Email berhasil diverifikasi!");
        navigate("/tools");
      }

      setChecking(false);
    }, 3000);

    return () => clearInterval(interval);
  }, [user]);

  const resendEmail = async () => {
    if (!user) return;

    if (cooldown > 0) {
      toast.error(`Tunggu ${cooldown} detik`);
      return;
    }

    try {
      await sendEmailVerification(user);

      toast.success("Email verifikasi dikirim ulang");

      setCooldown(60);

      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      if (err.code === "auth/too-many-requests") {
        toast.error("Terlalu banyak percobaan. Coba lagi nanti.");
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-xl text-center max-w-md w-full border border-slate-200 dark:border-slate-700"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-5xl mb-6"
        >
          📧
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Verifikasi Email
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Kami telah mengirim link verifikasi ke email Anda. Silakan buka email
          dan klik link verifikasi.
        </p>

        {/* Progress Indicator */}
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-6 overflow-hidden">
          <motion.div
            animate={{ width: checking ? "60%" : "100%" }}
            transition={{ duration: 1 }}
            className="h-2 bg-green-500"
          />
        </div>

        {/* Resend Button */}
        <button
          disabled={cooldown > 0}
          onClick={resendEmail}
          className="w-full py-3 bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-bold rounded-lg hover:shadow-lg disabled:opacity-50 transition mb-4"
        >
          {cooldown > 0
            ? `Kirim ulang dalam ${cooldown}s`
            : "Kirim ulang email"}
        </button>

        {/* Verify button */}
        <button
          onClick={async () => {
            await user.reload();

            if (user.emailVerified) {
              toast.success("Email berhasil diverifikasi!");
              navigate("/tools");
            } else {
              toast.error("Email belum diverifikasi");
            }
          }}
          className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
        >
          Saya sudah verifikasi
        </button>

        {/* Spam Note */}
        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
          📩 Jika email tidak muncul di inbox, coba cek folder
          <span className="font-semibold"> Spam </span>
          atau
          <span className="font-semibold"> Promotions</span>.
        </p>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
