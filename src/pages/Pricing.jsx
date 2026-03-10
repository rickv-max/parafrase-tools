import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import { getPricingPlans } from "../services/paymentService";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const Pricing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const plans = getPricingPlans();
  const [billingCycle, setBillingCycle] = useState("monthly");

  const handleUpgrade = (planId) => {
    if (!user && planId !== "free") {
      toast.error("Silakan login terlebih dahulu");
      localStorage.setItem("redirectAfterLogin", `/payment?plan=${planId}`);
      navigate("/login");
      return;
    }

    if (planId === "free") {
      navigate("/tools");
      return;
    }

    // Redirect to payment
    navigate(`/payment?plan=${planId}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      {/* Header */}
<section className="relative py-24 px-4 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 -z-10" />

  <div className="max-w-5xl mx-auto text-center">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
        🔥 Promo Terbatas
      </span>

      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
        Pilih Paket Terbaik
      </h1>

      <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
        Gunakan fitur parafrase lengkap dengan berbagai mode penulisan.
        Mulai gratis atau upgrade untuk membuka semua fitur.
      </p>
    </motion.div>
  </div>
</section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl border-2 transition-all ${
                  index === 2
                    ? "border-primary-500 lg:scale-105 lg:-my-4 shadow-lg"
                    : "border-slate-200 dark:border-slate-700"
                } p-8 bg-white dark:bg-slate-800`}
              >
                {index === 2 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-600 text-white text-sm font-bold">
                    Rekomendasi
                  </div>
                )}

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {plan.name}
                </h3>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">
                    Rp {plan.price.toLocaleString("id-ID")}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 ml-2">
                    / {plan.period}
                  </span>
                </div>

                <button
                  onClick={() => handleUpgrade(plan.id)}
                  className={`w-full py-3 px-6 rounded-lg font-bold mb-8 transition-all flex items-center justify-center gap-2 ${
                    index === 2
                      ? "bg-gradient-to-r from-primary-500 to-secondary-600 text-white hover:shadow-lg"
                      : "border-2 border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                  }`}
                >
                  {plan.id === "free" ? "Mulai Gratis" : "Upgrade Sekarang"}
                  <FiArrowRight />
                </button>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <FiCheck className="text-primary-500 flex-shrink-0 mt-1" />
                      <span className="text-slate-700 dark:text-slate-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Pertanyaan Umum
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Bisakah saya mengubah paket kapan saja?",
                a: "Ya, Anda dapat upgrade paket kapan saja. Perubahan akan langsung berlaku.",
              },
              {
                q: "Apakah ada jaminan uang kembali?",
                a: "Ya, kami menawarkan jaminan uang kembali 30 hari untuk pelanggan yang ada kendala terhadap sistem.",
              },
              {
                q: "Bagaimana dengan pembayaran?",
                a: "Kami menerima pembayaran melalui PakKasir dengan berbagai metode termasuk transfer bank dan e-wallet.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              >
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                  {item.q}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
