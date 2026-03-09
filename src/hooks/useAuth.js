import { useEffect, useState } from "react";
import { subscribeToAuthState } from "../services/authService";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const createUserDoc = async (currentUser) => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          plan: "free",
          wordsUsed: 0,
          createdAt: new Date(),
          email: currentUser.email,
        });
      }
    } catch (err) {
      console.error("Error creating user doc:", err);
    }
  };

  useEffect(() => {
    const unsubscribe = subscribeToAuthState(async (currentUser) => {
      if (currentUser) {
        await createUserDoc(currentUser);
      }

      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, error };
};
