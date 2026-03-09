import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Tools = lazy(() => import("./pages/Tools"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const History = lazy(() => import("./pages/History"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Payment = lazy(() => import("./pages/Payment"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const Signup = lazy(() => import("./pages/Signup"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const Contact = lazy(() => import("./pages/Contact"));
const ApiDocs = lazy(() => import("./pages/ApiDocs"));

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
  </div>
);

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/tools" /> : <Login />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/history"
            element={user ? <History /> : <Navigate to="/login" />}
          />
          <Route
            path="/payment"
            element={user ? <Payment /> : <Navigate to="/login" />}
          />

          <Route
            path="/signup"
            element={user ? <Navigate to="/tools" /> : <Signup />}
          />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/api-docs" element={<ApiDocs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
