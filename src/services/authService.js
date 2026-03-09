import {
  signUpWithEmail,
  loginWithEmail,
  loginWithGoogle,
  loginWithGithub,
  logout,
  updateUserProfile,
  onAuthStateChangedListener,
  getCurrentUser,
} from "../firebase/auth";
import {
  createUserDoc,
  getUserDoc,
  updateUserDoc,
} from "../firebase/firestore";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";

export const createUser = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await updateProfile(userCredential.user, {
    displayName: name,
  });

  return userCredential;
};

export const registerUser = async (email, password, displayName) => {
  try {
    const { user } = await signUpWithEmail(email, password);

    await updateUserProfile(user, displayName, null);

    await createUserDoc(user.uid, {
      name: displayName,
      email: user.email,
      photo: user.photoURL || null,
      plan: "free",
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const { user } = await loginWithEmail(email, password);
    return user;
  } catch (error) {
    throw error;
  }
};

export const loginWithGoogleAuth = async () => {
  try {
    const { user } = await loginWithGoogle();

    // Check if user exists in Firestore
    const userDoc = await getUserDoc(user.uid);
    if (!userDoc) {
      await createUserDoc(user.uid, {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        plan: "free",
      });
    }

    return user;
  } catch (error) {
    throw error;
  }
};

export const loginWithGithubAuth = async () => {
  try {
    const { user } = await loginWithGithub();

    // Check if user exists in Firestore
    const userDoc = await getUserDoc(user.uid);
    if (!userDoc) {
      await createUserDoc(user.uid, {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        plan: "free",
      });
    }

    return user;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await logout();
  } catch (error) {
    throw error;
  }
};

export const subscribeToAuthState = (callback) => {
  return onAuthStateChangedListener(callback);
};

export const getCurrentLoggedInUser = () => {
  return getCurrentUser();
};
