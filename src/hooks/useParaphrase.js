import { useState } from "react";
import { paraphraseText, countWords } from "../services/geminiService";
import { addParaphraseHistory } from "../firebase/firestore";

export const useParaphrase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const paraphrase = async (text, mode, user) => {
    setLoading(true);
    setError(null);

    try {
      const paraphrasedText = await paraphraseText(text, mode);

      const wordCount = countWords(text);

      // simpan history jika user login
      if (user) {
        await addParaphraseHistory(user.uid, {
          input: text,
          output: paraphrasedText,
          mode: mode,
        });
      }

      return {
        input: text,
        output: paraphrasedText,
        wordCount,
        mode,
      };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { paraphrase, loading, error };
};
