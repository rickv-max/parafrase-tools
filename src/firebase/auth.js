import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "./config";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signUpWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const loginWithGithub = () => {
  return signInWithPopup(auth, githubProvider);
};

export const logout = () => {
  return signOut(auth);
};

export const updateUserProfile = (user, displayName, photoURL) => {
  return updateProfile(user, {
    displayName,
    photoURL,
  });
};

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = () => {
  return auth.currentUser;
};
