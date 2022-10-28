export interface Achievement {
  id: number;
  name: string;
  description: string;
  complete: boolean;
}

export type Wordles = User[];

export interface NewUser {
  userId: string;
  usernames: string[];
}

export interface User {
  usernames: string[];
  userId: string;
  wordlesCompleted: number;
  wordlesFailed: number;
  totalWordles: number;
  percentageCompleted: number;
  percentageFailed: number;
  completionGuesses: number[];
  averageGuesses: number;
  currentStreak: number;
  longestStreak: number;
  lastGameNumber: number;
  bestScore: number;
  scores: number[];
  achievements: Achievement[];
}
