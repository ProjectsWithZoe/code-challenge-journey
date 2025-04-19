const useChallengeStore = create((set) => ({
  selectedDate: new Date(),
  completedDates: [],
  currentChallenge: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
  setCompletedDates: (dates) => set({ completedDates: dates }),
  setCurrentChallenge: (challenge) => set({ currentChallenge: challenge }),
}));
