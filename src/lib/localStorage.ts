// Local storage keys
const STORAGE_KEYS = {
  COMPLETED_CHALLENGES: "completedChallenges",
  USER_CODE: "userCode",
  USER_PROFILE: "userProfile",
  LAST_SYNC: "lastSync",
};

// Get completed challenges from local storage
export const getCompletedChallenges = (): string[] => {
  const completedChallenges = localStorage.getItem(
    STORAGE_KEYS.COMPLETED_CHALLENGES
  );
  return completedChallenges ? JSON.parse(completedChallenges) : [];
};

// Save completed challenge to local storage
export const saveCompletedChallenge = (date: string): void => {
  const completedChallenges = getCompletedChallenges();
  if (!completedChallenges.includes(date)) {
    completedChallenges.push(date);
    localStorage.setItem(
      STORAGE_KEYS.COMPLETED_CHALLENGES,
      JSON.stringify(completedChallenges)
    );
  }
};

// Save an array of completed challenges to local storage
export const saveCompletedChallenges = (dates: string[]): void => {
  const uniqueDates = Array.from(new Set(dates)); // Ensure no duplicates
  localStorage.setItem(
    STORAGE_KEYS.COMPLETED_CHALLENGES,
    JSON.stringify(uniqueDates)
  );
};

// Get user code for a specific date
export const getUserCode = (date: string): string => {
  const userCode = localStorage.getItem(`${STORAGE_KEYS.USER_CODE}_${date}`);
  return userCode || "";
};

// Save user code for a specific date
export const saveUserCode = (date: string, code: string): void => {
  localStorage.setItem(`${STORAGE_KEYS.USER_CODE}_${date}`, code);
};

// Get user profile from local storage
export const getUserProfile = () => {
  const userProfile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  return userProfile ? JSON.parse(userProfile) : null;
};

// Save user profile to local storage
export const saveUserProfile = (profile: any): void => {
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
};

// Clear user profile from local storage
export const clearUserProfile = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
};
