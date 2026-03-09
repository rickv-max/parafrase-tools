import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FiCopy, FiDownload, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

const TextInput = ({
  value,
  onChange,
  placeholder = "Masukkan teks yang ingin diparafrase...",
}) => {
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const handleChange = useCallback(
    (e) => {
      const text = e.target.value;
      onChange(text);

      setCharCount(text.length);
      const words = text
        .trim()
        .split(/\s+/)
        .filter((w) => w.length > 0);
      setWordCount(words.length);
    },
    [onChange],
  );

  const handleClear = () => {
    onChange("");
    setCharCount(0);
    setWordCount(0);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success("Teks disalin ke clipboard");
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([value], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Teks berhasil diunduh");
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
            Teks Asli
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {wordCount} kata • {charCount} karakter
            </span>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full h-64 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all"
        />

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            disabled={!value}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiCopy size={18} />
            <span className="hidden sm:inline">Salin</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            disabled={!value}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiDownload size={18} />
            <span className="hidden sm:inline">Download</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClear}
            disabled={!value}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiTrash2 size={18} />
            <span className="hidden sm:inline">Bersihkan</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TextInput;
