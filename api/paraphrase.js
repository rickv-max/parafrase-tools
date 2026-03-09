const PARAPHRASE_PROMPTS = {
  standard: "Parafrase teks berikut dengan gaya netral:\n",
  academic: "Parafrase teks berikut dengan gaya akademik formal:\n",
  casual: "Parafrase teks berikut dengan gaya santai:\n",
  seoFriendly: "Parafrase teks berikut agar SEO friendly:\n",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text, mode } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        error: "Text kosong",
      });
    }

    const prompt =
      (PARAPHRASE_PROMPTS[mode] || PARAPHRASE_PROMPTS.standard) +
      "\n\n" +
      text;

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
      }
    );

    const data = await response.json();

    if (!data.choices) {
      console.error("GROQ ERROR:", data);
      throw new Error("Groq API error");
    }

    const result = data.choices[0].message.content;

    return res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("SERVER ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
