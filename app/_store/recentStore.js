// app/store/recentStore.js
import { create } from "zustand";

export const useRecentStore = create((set) => ({
  recent: [],

  addRecent: (room) =>
    set((state) => {
      // Prevent duplicates → keep latest at front
      const filtered = state.recent.filter((r) => r.id !== room.id);
      return { recent: [room, ...filtered].slice(0, 20) }; // limit list to 20
    }),

  removeRecent: (id) =>
    set((state) => ({
      recent: state.recent.filter((r) => r.id !== id),
    })),

  clearRecent: () => set({ recent: [] }),
}));
