import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo-parafrase.PNG" className="h-12 w-auto" />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Platform parafrase terbaik dengan teknologi Canggih
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
              Produk
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/tools"
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600"
                >
                  Tools
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <a
                  href="api-docs"
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600"
                >
                  API Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="contact"
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
              Follow
            </h4>
            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-primary-600"
              >
                <FiGithub size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-primary-600"
              >
                <FiTwitter size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:text-primary-600"
              >
                <FiLinkedin size={20} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 dark:border-slate-700 pt-8 flex justify-between items-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © 2026 Parafrase . Semua hak dilindungi.
          </p>
          <p className="text-sm text-slate-600 text-uppercase dark:text-slate-400">
            Powered By <img src="/logo-parafrase.PNG" className="h-8 w-auto" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
