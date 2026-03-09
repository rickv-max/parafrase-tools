import React from "react";
import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";

const WordCounter = ({ text, limit = 300 }) => {
  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  const charCount = text.length;
  const percentage = Math.min((wordCount / limit) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50"
    >
      <div className="flex items-center gap-3 mb-3">
        <FiFileText className="text-primary-500" size={20} />
        <h4 className="font-semibold text-slate-900 dark:text-white">
          Statistik Teks
        </h4>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Jumlah Kata
            </span>
            <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
              {wordCount} / {limit}
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              className={`h-2 rounded-full transition-colors ${
                percentage > 90
                  ? "bg-red-500"
                  : percentage > 70
                    ? "bg-amber-500"
                    : "bg-primary-500"
              }`}
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Total Karakter
          </span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {charCount}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default WordCounter;
