import axios from "axios";

const PAKKASIR_API_URL = "https://app.pakkasir.id/api";
const PAKKASIR_API_KEY = import.meta.env.VITE_PAKKASIR_API_KEY;

const api = axios.create({
  baseURL: PAKKASIR_API_URL,
  headers: {
    Authorization: `Bearer ${PAKKASIR_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export const createInvoice = async (data) => {
  try {
    const response = await api.post("/invoices", {
      amount: data.amount,
      customer_name: data.customerName,
      customer_email: data.customerEmail,
      customer_phone: data.customerPhone,
      description: data.description,
      items: [
        {
          name: data.planName,
          quantity: 1,
          price: data.amount,
        },
      ],
      payment_method: "all",
      redirect_url: `${window.location.origin}/payment-success`,
      webhook_url: `${import.meta.env.VITE_API_BASE_URL}/webhooks/pakkasir`,
    });

    return response.data;
  } catch (error) {
    console.error("Payment invoice creation error:", error);
    throw new Error("Gagal membuat invoice pembayaran");
  }
};

export const checkInvoiceStatus = async (invoiceId) => {
  try {
    const response = await api.get(`/invoices/${invoiceId}`);
    return response.data;
  } catch (error) {
    console.error("Check invoice status error:", error);
    throw error;
  }
};

export const getPricingPlans = () => {
  return [
    {
      id: "free",
      name: "Gratis",
      price: 0,
      period: "selamanya",
      features: [
        "50 kata per proses",
        "Mode basic (Standard, Formal, Casual)",
        "Akses web tanpa login",
      ],
      features_list: ["50 kata", "Mode basic", "Tanpa login"],
    },
    {
      id: "pro",
      name: "Pro",
      price: 29999,
      period: "per bulan",
      features: [
        "500 kata per proses",
        "Semua mode parafrase",
        "Riwayat parafrase unlimited",
        "Unlimited regenerate",
        "Support prioritas",
      ],
      features_list: [
        "500 kata",
        "Semua mode",
        "Riwayat unlimited",
        "Regenerate unlimited",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: 56000,
      period: "per bulan",
      features: [
        "Unlimited kata",
        "Mode pemikiran mahasiswa S2 (10 jurusan)",
        "Mode Academic Advanced",
        "AI Humanizer",
        "Anti AI Detection",
        "Priority support 24/7",
      ],
      features_list: [
        "Unlimited kata",
        "Mode S2",
        "AI Humanizer",
        "Anti AI Detection",
        "Support 24/7",
      ],
    },
  ];
};
