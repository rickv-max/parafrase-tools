import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const ModeSelector = ({
  selectedMode,
  onModeChange,
  availableModes,
  isPremium,
}) => {
  const [open, setOpen] = useState(false);

  const modeDescriptions = {
    standard: "Parafrase netral profesional",
    academic: "Gaya akademik ilmiah",
    formal: "Gaya formal berwibawa",
    casual: "Gaya santai ringan",
    seoFriendly: "Optimasi SEO",
    creative: "Gaya kreatif unik",
    humanRewrite: "Tertulis seperti manusia",
    antiAIDetection: "Tidak terdeteksi AI",
    graduate_teknik: "🎓 S2 Teknik",
    graduate_kedokteran: "🎓 S2 Kedokteran",
    graduate_ekonomi: "🎓 S2 Ekonomi",
    graduate_hukum: "🎓 S2 Hukum",
    graduate_pendidikan: "🎓 S2 Pendidikan",
    graduate_psikologi: "🎓 S2 Psikologi",
    graduate_manajemen: "🎓 S2 Manajemen",
    graduate_informatika: "🎓 S2 Informatika",
    graduate_akuntansi: "🎓 S2 Akuntansi",
    graduate_sosialpolitik: "🎓 S2 Sosial & Politik",
  };

  const premiumModes = [
    "antiAIDetection",
    "graduate_teknik",
    "graduate_kedokteran",
    "graduate_ekonomi",
    "graduate_hukum",
    "graduate_pendidikan",
    "graduate_psikologi",
    "graduate_manajemen",
    "graduate_informatika",
    "graduate_akuntansi",
    "graduate_sosialpolitik",
  ];

  const handleModeSelect = (mode) => {
    if (premiumModes.includes(mode) && !isPremium) {
      return;
    }

    onModeChange(mode);
    setOpen(false);
  };

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">
          Mode Parafrase
        </h3>

        {/* Dropdown Button */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-700 rounded-lg"
        >
          <span className="font-medium">{modeDescriptions[selectedMode]}</span>

          <FiChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 max-h-[300px] overflow-y-auto space-y-2"
            >
              {availableModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleModeSelect(mode)}
                  className={`w-full p-3 rounded-lg text-left border transition ${
                    selectedMode === mode
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-primary-300"
                  } ${
                    premiumModes.includes(mode) && !isPremium
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{modeDescriptions[mode]}</p>

                      <p className="text-xs text-slate-400">Mode: {mode}</p>
                    </div>

                    {premiumModes.includes(mode) && !isPremium && (
                      <span className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded">
                        Premium
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ModeSelector;
