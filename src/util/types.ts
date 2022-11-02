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
  userId: string;
  usernames: string[];
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

// Discord

export interface DiscordIds {
  guildId: string;
  channelId: string;
}
