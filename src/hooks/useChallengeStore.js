import { create } from "zustand";

const useChallengeStore = create((set) => ({
  selectedDate: new Date(),
  completedDates: [],
  setSelectedDate: (date) => set({ selectedDate: date }),
  setCompletedDates: (dates) => set({ completedDates: dates }),
}));
export default useChallengeStore;
