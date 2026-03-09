import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { createUser } from "../services/authService";
import { createUserDoc } from "../firebase/firestore";
import toast from "react-hot-toast";
import { sendEmailVerification } from "firebase/auth";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Email tidak valid");
      return;
    }

    if (password.length < 6) {
      toast.error("Password minimal 6 karakter");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUser(email, password, name);

      await createUserDoc(userCredential.user.uid, {
        name,
        email,
        plan: "free",
      });

      // kirim email verifikasi
      await sendEmailVerification(userCredential.user);

      toast.success("Akun dibuat! Silakan cek email untuk verifikasi.");

      navigate("/verify-email");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
          <h1 className="text-3xl font-bold text-center mb-6 text-slate-900 dark:text-white">
            Daftar Gratis
          </h1>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                required
              />
            </div>

            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                required
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-bold"
            >
              {loading ? "Membuat akun..." : "Daftar"}
            </motion.button>
          </form>

          <p className="text-center text-slate-600 dark:text-slate-400 mt-6">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-primary-600 dark:text-primary-400 font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
