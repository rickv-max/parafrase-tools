// Paraphrase request
export const paraphraseText = async (text, mode = "standard") => {
  try {
    const res = await fetch("/api/paraphrase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        mode,
      }),
    });

    // jika response bukan 200
    if (!res.ok) {
      const errorText = await res.text();

      console.error("SERVER RESPONSE:", errorText);

      throw new Error("Server error saat memproses teks");
    }

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error || "Paraphrase gagal");
    }

    return data.result;

  } catch (error) {
    console.error("FULL ERROR:", error);
    throw new Error(error.message || "Terjadi kesalahan saat memproses teks");
  }
};


// hitung jumlah kata
export const countWords = (text) => {
  if (!text) return 0;

  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
};


// hitung jumlah karakter
export const countCharacters = (text) => {
  if (!text) return 0;
  return text.length;
};
