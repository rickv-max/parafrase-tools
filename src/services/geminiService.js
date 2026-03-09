export const paraphraseText = async (text, mode = "standard") => {
  const res = await fetch("http://localhost:3001/api/paraphrase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      mode,
    }),
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.error);
  }

  return data.result;
};

export const countWords = (text) => {
  if (!text) return 0;

  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
};

export const countCharacters = (text) => {
  if (!text) return 0;
  return text.length;
};
