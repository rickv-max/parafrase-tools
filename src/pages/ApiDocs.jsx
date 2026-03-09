import React from "react";
import { motion } from "framer-motion";
import { FiCopy } from "react-icons/fi";

const ApiDocs = () => {
  const copy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero */}
      <section className="py-20 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-slate-900 dark:text-white mb-4"
        >
          API Documentation
        </motion.h1>

        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Gunakan API Parafrase Tools untuk mengintegrasikan kemampuan parafrase
          AI ke dalam aplikasi Anda.
        </p>
      </section>

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 px-6 pb-20">
        {/* Sidebar */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Dokumentasi
          </h3>

          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>Introduction</li>
            <li>Authentication</li>
            <li>Paraphrase API</li>
            <li>Response</li>
            <li>Error Handling</li>
          </ul>
        </div>

        {/* Content */}
        <div className="md:col-span-3 space-y-10">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Introduction
            </h2>

            <p className="text-slate-600 dark:text-slate-400">
              API ini memungkinkan developer untuk mengakses fitur parafrase AI
              secara programmatic.
            </p>
          </section>

          {/* Endpoint */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Endpoint
            </h2>

            <div className="bg-slate-800 text-white rounded-lg p-4 flex justify-between items-center">
              <code>POST https://api.parafrase.ai/api/paraphrase</code>

              <button
                onClick={() => copy("https://api.parafrase.ai/api/paraphrase")}
              >
                <FiCopy />
              </button>
            </div>
          </section>

          {/* Request Example */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Request Example
            </h2>

            <div className="bg-slate-800 text-green-400 p-4 rounded-lg overflow-x-auto">
              <pre>
                {`curl -X POST https://api.parafrase.ai/api/paraphrase
-H "Content-Type: application/json"
-d '{
"text":"AI sangat membantu pekerjaan manusia",
"mode":"standard"
}'`}
              </pre>
            </div>
          </section>

          {/* Response */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Response
            </h2>

            <div className="bg-slate-800 text-green-400 p-4 rounded-lg">
              <pre>
                {`{
 "success": true,
 "result": "Kecerdasan buatan sangat membantu aktivitas manusia."
}`}
              </pre>
            </div>
          </section>

          {/* Error */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Error Response
            </h2>

            <div className="bg-slate-800 text-red-400 p-4 rounded-lg">
              <pre>
                {`{
 "error": "Max 1000 kata"
}`}
              </pre>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;
