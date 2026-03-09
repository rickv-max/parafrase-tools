import React from "react";
import { motion } from "framer-motion";
import { FiCopy, FiDownload, FiRefreshCw } from "react-icons/fi";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const ResultBox = ({ result, loading, onRegenerate, isAuthenticated }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast.success("Hasil parafrase disalin");
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([result], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "parafrase.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Hasil berhasil diunduh");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft-lg p-6 border border-slate-200/50 dark:border-slate-700/50">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Hasil Parafrase
          </h3>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : result ? (
          <>
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-slate-900 dark:to-slate-800 rounded-xl p-4 min-h-64 mb-4">
              <p className="text-slate-900 dark:text-white leading-relaxed whitespace-pre-wrap">
                {result}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
              >
                <FiCopy size={18} />
                <span>Salin</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 font-medium transition-colors"
              >
                <FiDownload size={18} />
                <span>Download</span>
              </motion.button>

              {isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onRegenerate}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 font-medium transition-colors"
                >
                  <FiRefreshCw size={18} />
                  <span>Buat Ulang</span>
                </motion.button>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400 dark:text-slate-500">
            <ClipboardDocumentIcon className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-center">Hasil parafrase akan muncul di sini</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResultBox;
