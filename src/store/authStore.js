import { create } from "zustand";
import { subscribeToAuthState } from "../services/authService";

export const useAuthStore = create((set) => {
  subscribeToAuthState((user) => {
    set({ user, isLoading: false });
  });

  return {
    user: null,
    isLoading: true,
    setUser: (user) => set({ user }),
    setLoading: (isLoading) => set({ isLoading }),
  };
});
