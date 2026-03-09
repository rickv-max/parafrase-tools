import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { getUserDoc } from "../firebase/firestore";
import TextInput from "../components/TextInput";
import ResultBox from "../components/ResultBox";
import ModeSelector from "../components/ModeSelector";
import WordCounter from "../components/WordCounter";
import Footer from "../components/Footer";
import { useParaphrase } from "../hooks/useParaphrase";
import toast from "react-hot-toast";

const Tools = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { paraphrase, loading: paraphraseLoading } = useParaphrase();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedMode, setSelectedMode] = useState("standard");
  const [userPlan, setUserPlan] = useState("free");

  React.useEffect(() => {
    if (user) {
      checkUserPlan();
    }
  }, [user]);

  const checkUserPlan = async () => {
    const userDoc = await getUserDoc(user.uid);

    if (!userDoc) return;

    const expire = new Date(userDoc.planExpiresAt);
    const now = new Date();

    if (expire < now) {
      await updateUserDoc(user.uid, {
        plan: "free",
      });

      setUserPlan("free");
      return;
    }

    setUserPlan(userDoc.plan);
  };

  const handleParaphrase = async () => {
    if (!inputText.trim()) {
      toast.error("Silakan masukkan teks terlebih dahulu");
      return;
    }

    const wordCount = inputText
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;

    if (wordCount > wordLimit) {
      if (!user) {
        toast.error("Login untuk parafrase hingga 150 kata.");
        setTimeout(() => navigate("/login"), 800);
      } else if (userPlan === "free") {
        toast.error("Upgrade ke PRO untuk parafrase hingga 500 kata.");
      } else if (userPlan === "pro") {
        toast.error("Upgrade ke PREMIUM untuk parafrase tanpa batas.");
      }
      return;
    }

    try {
      const result = await paraphrase(inputText, selectedMode, user);
      setOutputText(result.output);
      toast.success("✨ Parafrase berhasil dibuat!");
    } catch (error) {
      console.log("FULL ERROR:", error);
      toast.error(error.message || "Terjadi kesalahan saat memproses teks");
    }
  };

  const handleRegenerate = async () => {
    if (!inputText.trim()) return;
    handleParaphrase();
  };

  const availableModes =
    userPlan === "premium"
      ? [
          "standard",
          "academic",
          "formal",
          "casual",
          "seoFriendly",
          "creative",
          "humanRewrite",
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
        ]
      : userPlan === "pro"
        ? [
            "standard",
            "academic",
            "formal",
            "casual",
            "seoFriendly",
            "creative",
            "humanRewrite",
          ]
        : ["standard", "formal", "casual"];

  const getWordLimit = () => {
    if (!user) return 50;
    if (userPlan === "premium") return Infinity;
    if (userPlan === "pro") return 500;
    return 150;
  };

  const wordLimit = getWordLimit();

  React.useEffect(() => {
    if (user && !user.emailVerified) {
      toast.error("Silakan verifikasi email terlebih dahulu");

      navigate("/verify-email");
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          {user ? (
            <div className="flex flex-col items-center gap-3">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-secondary-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                {(user.displayName || user.email)[0].toUpperCase()}
              </div>

              {/* Welcome text */}
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Selamat Datang
              </p>

              {/* Username + Plan */}
              <div className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white">
                <span>{user.displayName || user.email}</span>

                {userPlan === "free" && (
                  <span className="px-2 py-1 text-xs rounded-md bg-gray-500 text-white">
                    free
                  </span>
                )}

                {userPlan === "pro" && (
                  <span className="px-2 py-1 text-xs rounded-md bg-blue-500 text-white font-bold">
                    PRO
                  </span>
                )}

                {userPlan === "premium" && (
                  <span className="px-3 py-1 text-xs rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold shadow">
                    👑 PREMIUM
                  </span>
                )}
              </div>
            </div>
          ) : (
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Tulis ulang teks (50 kata gratis, login 150 kata)
            </p>
          )}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <TextInput
              value={inputText}
              onChange={setInputText}
              placeholder="Masukkan teks yang ingin diparafrase di sini..."
            />

            <ModeSelector
              selectedMode={selectedMode}
              onModeChange={setSelectedMode}
              availableModes={availableModes}
              isPremium={userPlan === "premium"}
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleParaphrase}
              disabled={paraphraseLoading || !inputText.trim()}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {paraphraseLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Memproses...
                </>
              ) : (
                "✨ Parafrase Sekarang"
              )}
            </motion.button>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <WordCounter
              text={inputText}
              limit={wordLimit === Infinity ? 999999 : wordLimit}
            />
          </div>
        </div>

        {/* Result */}
        <ResultBox
          result={outputText}
          loading={paraphraseLoading}
          onRegenerate={handleRegenerate}
          isAuthenticated={!!user}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Tools;
