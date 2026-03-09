import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiGithub } from "react-icons/fi";
import { SiGoogle } from "react-icons/si";
import {
  loginUser,
  loginWithGoogleAuth,
  loginWithGithubAuth,
} from "../services/authService";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/tools";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginUser(email, password);
      toast.success("Login berhasil!");
      navigate(redirectTo);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogleAuth();
      toast.success("Login dengan Google berhasil!");
      navigate(redirectTo);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    try {
      await loginWithGithubAuth();
      toast.success("Login dengan GitHub berhasil!");
      navigate(redirectTo);
    } catch (error) {
      toast.error(error.message);
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
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft-lg p-8 border border-slate-200 dark:border-slate-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="rounded-lg flex items-center justify-center mx-auto mb-4">
              <img src="/favicon-parafrase.PNG" className="h-12 w-auto" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Login
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Akses parafrase tools Anda
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-bold hover:shadow-lg hover:shadow-primary-500/30 disabled:opacity-50 transition-all"
            >
              {loading ? "Masuk..." : "Masuk"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300 dark:border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-800 text-slate-500">
                Atau lanjutkan dengan
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              <SiGoogle /> Google
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGithubLogin}
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              <FiGithub /> GitHub
            </motion.button>
          </div>

          {/* Footer */}
          <p className="text-center text-slate-600 dark:text-slate-400">
            Belum punya akun?{" "}
            <Link
              to="/signup"
              className="text-primary-600 dark:text-primary-400 font-bold hover:underline"
            >
              Daftar gratis
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
