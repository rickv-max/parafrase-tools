import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import NodeCache from "node-cache";
import path from "path";

import webhookRoutes from "./webhook.js";

dotenv.config({ path: path.resolve("../.env") });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/webhooks", webhookRoutes);

const cache = new NodeCache({
  stdTTL: 3600,
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const PARAPHRASE_PROMPTS = {
  standard: "Parafrase teks berikut dengan gaya netral:\n",
  academic: "Parafrase teks berikut dengan gaya akademik formal:\n",
  casual: "Parafrase teks berikut dengan gaya santai:\n",
  seoFriendly: "Parafrase teks berikut agar SEO friendly:\n",
};

let lastRequestTime = 0;

app.post("/api/paraphrase", async (req, res) => {
  try {
    const { text, mode } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "Text kosong",
      });
    }

    const wordCount = text.split(/\s+/).length;

    if (wordCount > 1000) {
      return res.status(403).json({
        error: "Max 1000 kata untuk free user",
      });
    }

    const cacheKey = `${mode}_${text}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      return res.json({
        success: true,
        result: cached,
        cached: true,
      });
    }

    const now = Date.now();

    if (now - lastRequestTime < 2000) {
      await sleep(2000);
    }

    lastRequestTime = Date.now();

    const prompt =
      (PARAPHRASE_PROMPTS[mode] || PARAPHRASE_PROMPTS.standard) + `\n\n${text}`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
        }),
      },
    );

    const data = await response.json();

    if (!data.choices) {
      console.log(data);
      throw new Error("Groq API error");
    }

    const result = data.choices[0].message.content;

    cache.set(cacheKey, result);

    res.json({
      success: true,
      result,
      cached: false,
    });
  } catch (error) {
    console.error("🔥 Groq API Error:", error);

    res.status(500).json({
      error: "Sisem processing error",
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 AI Server running on port ${PORT}`);
});
