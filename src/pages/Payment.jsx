import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { getPricingPlans } from "../services/paymentService";
import toast from "react-hot-toast";

const Payment = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const planId = params.get("plan");

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const PAKKASIR_SLUG = "paraphrase-tools"; // slug project pakkasir kamu

  useEffect(() => {
    const plans = getPricingPlans();
    const selectedPlan = plans.find((p) => p.id === planId);

    if (!selectedPlan) {
      toast.error("Paket tidak ditemukan");
      navigate("/pricing");
      return;
    }

    setPlan(selectedPlan);
  }, [planId, navigate]);

  const handleCheckout = () => {
    if (!user) {
      toast.error("Silakan login terlebih dahulu");
      navigate("/login");
      return;
    }

    setLoading(true);

    const orderId = `INV-${Date.now()}`;
    const amount = plan.price;

    const successUrl = `${window.location.origin}/payment-success?plan=${planId}`;

    const paymentUrl = `https://app.pakasir.com/pay/${PAKKASIR_SLUG}/${amount}?order_id=${orderId}&redirect=${encodeURIComponent(successUrl)}&return_url=${encodeURIComponent(successUrl)}`;

    window.location.href = paymentUrl;
  };

  if (!plan) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700"
        >
          <h1 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">
            Checkout Paket
          </h1>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Paket</span>

              <span className="font-semibold text-slate-900 dark:text-white">
                {plan.name}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Harga</span>

              <span className="font-semibold text-slate-900 dark:text-white">
                Rp {plan.price.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">
                Periode
              </span>

              <span className="font-semibold text-slate-900 dark:text-white">
                {plan.period}
              </span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-bold text-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Bayar Sekarang"}
          </button>

          <p className="text-center text-sm text-slate-500 mt-4">
            Pembayaran diproses melalui PakKasir
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;
