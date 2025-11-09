import { create } from "zustand";

export const useProfileStore = create((set) => ({
  // ✅ default values (IMPORTANT)
  name: "Yash Gupta",
  role: "Guest",
  avatar: null, // will store URI when uploaded

  setName: (name) => set({ name }),
  setRole: (role) => set({ role }),
  setAvatar: (avatar) => set({ avatar }),
}));
