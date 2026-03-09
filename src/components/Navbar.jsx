import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../services/authService";
import { useTheme } from "../hooks/useTheme";
import { BsSun, BsMoon } from "react-icons/bs";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
      setMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuItems = [
    { label: "Tools", href: "/tools" },
    { label: "Upgrade", href: "/pricing" },
  ];

  if (user) {
    menuItems.push({ label: "History", href: "/history" });
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/20 dark:border-slate-700/20 shadow-soft"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/logo-parafrase.PNG" className="h-12 w-auto" />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <motion.div key={item.label} whileHover={{ y: -2 }}>
                <Link
                  to={item.href}
                  className="text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Theme Toggle & Auth */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {isDark ? (
                <BsSun className="text-yellow-500" size={20} />
              ) : (
                <BsMoon className="text-slate-700" size={20} />
              )}
            </motion.button>

            {/* Auth Links */}
            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                >
                  <FiUser size={18} />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
                >
                  <FiLogOut size={18} />
                </motion.button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-medium hover:shadow-lg hover:shadow-primary-500/30 transition-all"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: mobileMenuOpen ? 1 : 0,
            height: mobileMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden border-t border-slate-200/20 dark:border-slate-700/20"
        >
          <div className="py-4 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-200/20 dark:border-slate-700/20">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-medium text-center"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
