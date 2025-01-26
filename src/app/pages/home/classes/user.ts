export interface User {
    id: number;
    username: string;
    password: string;
    score: number; // Track the user's score
    hasPlayedToday: boolean; // Track if the user has played today
    lastPlayedDate: string; // Add this field (format: YYYY-MM-DD)
  }