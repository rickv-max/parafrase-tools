import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";

// Users Collection
export const createUserDoc = async (uid, data) => {
  return setDoc(
    doc(db, "users", uid),
    {
      uid,
      ...data,
      createdAt: Timestamp.now(),
      plan: "free",
      wordCount: 0,
    },
    { merge: true },
  );
};

export const getUserDoc = async (uid) => {
  const docSnap = await getDoc(doc(db, "users", uid));
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateUserDoc = async (uid, data) => {
  return updateDoc(doc(db, "users", uid), data);
};

// Paraphrase History
export const addParaphraseHistory = async (uid, data) => {
  return addDoc(collection(db, "paraphrase_history"), {
    uid,
    ...data,
    created_at: Timestamp.now(),
  });
};

export const getUserHistory = async (uid, limitCount = 50) => {
  const q = query(
    collection(db, "paraphrase_history"),
    where("uid", "==", uid),
    orderBy("created_at", "desc"),
    limit(limitCount),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteHistoryItem = async (docId) => {
  return deleteDoc(doc(db, "paraphrase_history", docId));
};

// Subscriptions
export const createSubscription = async (uid, data) => {
  return addDoc(collection(db, "subscriptions"), {
    uid,
    ...data,
    created_at: Timestamp.now(),
  });
};

export const getUserSubscription = async (uid) => {
  const q = query(
    collection(db, "subscriptions"),
    where("uid", "==", uid),
    orderBy("created_at", "desc"),
    limit(1),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length > 0 ? querySnapshot.docs[0].data() : null;
};

export const updateSubscription = async (uid, data) => {
  const q = query(
    collection(db, "subscriptions"),
    where("uid", "==", uid),
    orderBy("created_at", "desc"),
    limit(1),
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length > 0) {
    return updateDoc(querySnapshot.docs[0].ref, data);
  }
};

// Daily Usage Tracking
export const addDailyUsage = async (uid, wordCount) => {
  const today = new Date().toISOString().split("T")[0];
  const docId = `${uid}_${today}`;
  const docRef = doc(db, "daily_usage", docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return updateDoc(docRef, {
      wordCount: docSnap.data().wordCount + wordCount,
    });
  } else {
    return setDoc(docRef, {
      uid,
      wordCount,
      date: today,
      timestamp: Timestamp.now(),
    });
  }
};

export const getDailyUsage = async (uid) => {
  const today = new Date().toISOString().split("T")[0];
  const docSnap = await getDoc(doc(db, "daily_usage", `${uid}_${today}`));
  return docSnap.exists() ? docSnap.data().wordCount : 0;
};
