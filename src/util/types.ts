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
  firstWordleDate: number;
}

// Discord

export interface DiscordIds {
  guildId: string;
  channelId: string;
}

// Functions

export interface UpdateUserDataProps {
  username: string;
  data: User;
  completed: string;
  total: string;
  wordleNumber: number;
  guildId: string;
  id: string;
}

export interface UpdateLeaderboardDataProps {
  username: string;
  data: User;
  completed: string;
  total: string;
  wordleNumber: number;
  guildId: string;
}

export interface GuildMessageVariables {
  guildId: string;
  channelId: string;
  id: string;
  username: string;
  notificiations: { [key: string]: boolean };
  isPremium: boolean;
  premiumExpires: string;
  serverLimitReached: boolean;
}
