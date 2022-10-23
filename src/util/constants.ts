import { User } from "./types";

export const USER = (id: string, username: string): User => {
  return {
    userId: id,
    usernames: [username],
    wordlesCompleted: 0,
    wordlesFailed: 0,
    totalWordles: 0,
    percentageCompleted: 0,
    percentageFailed: 0,
    completionGuesses: [],
    averageGuesses: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastGameNumber: 0,
    bestScore: 0,
    scores: [0, 0, 0, 0, 0, 0],
  };
};

export const COMPLETED_ALREADY_TEXT = (lastGameNumber: string) =>
  `Not so fast, you have already completed this wordle! Your last completed wordle was ${lastGameNumber}`;

export const INVALID_SCORE_TEXT =
  "That score seems to be invalid, make sure it follows the form of `X/6` or `1-6/6`";

export const NOT_PLAYED_TEXT = "You have not played any wordles yet!";

export const SOMETHING_WENT_WRONG_TEXT =
  "Oops, something went wrong. Please try again.";
