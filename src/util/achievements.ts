import { countCompletedAchievements } from "./functions/bot";
import { User } from "./types";

// both of these arrays need to be the same length and have the correct
// corresponding achievement check

export const achievementChecks = [
  {
    check: (userData: User) => {
      if (
        userData.totalWordles > 0 &&
        userData.achievements.find(
          (achievement) => achievement.id === 1 && !achievement.complete
        )
      ) {
        console.log("achievement 1");
        return true;
      }
      return false;
    },
  },
  {
    check: (userData: User) => {
      if (
        userData.totalWordles >= 5 &&
        userData.achievements.find(
          (achievement) => achievement.id === 2 && !achievement.complete
        )
      ) {
        return true;
      }
      return false;
    },
  },
  {
    check: (userData: User) => {
      if (
        userData.totalWordles >= 10 &&
        userData.achievements.find(
          (achievement) => achievement.id === 3 && !achievement.complete
        )
      ) {
        return true;
      }
      return false;
    },
  },
  {
    check: (userData: User) => {
      if (
        userData.totalWordles >= 25 &&
        userData.achievements.find(
          (achievement) => achievement.id === 4 && !achievement.complete
        )
      ) {
        return true;
      }
      return false;
    },
  },
  {
    check: (userData: User) => {
      if (
        userData.totalWordles >= 50 &&
        userData.achievements.find(
          (achievement) => achievement.id === 5 && !achievement.complete
        )
      ) {
        return true;
      }
      return false;
    },
  },
  {
    check: (userData: User) => {
      if (
        userData.totalWordles >= 100 &&
        userData.achievements.find(
          (achievement) => achievement.id === 6 && !achievement.complete
        )
      ) {
        return true;
      }
      return false;
    },
  },
  {
    check: (userData: User) => {
      if (
        userData.currentStreak >= 5 &&
        userData.achievements.find(
          (achievement) => achievement.id === 7 && !achievement.complete
        )
      ) {
        return true;
      }
      return false;
    },
  },
  {
    check: (userData: User) => {
      if (
        userData.currentStreak >= 10 &&
        userData.achievements.find(
          (achievement) => achievement.id === 8 && !achievement.complete
        )
      ) {
        return true;
      }
      return false;
    },
  },
  {
    check: (userData: User) => {
      if (
        userData.currentStreak >= 25 &&
        userData.achievements.find(
          (achievement) => achievement.id === 9 && !achievement.complete
        )
      ) {
        return true;
      }
      return false;
    },
  },
  {
    check: (userData: User) => {
      if (
        userData.currentStreak >= 50 &&
        userData.achievements.find(
          (achievement) => achievement.id === 10 && !achievement.complete
        )
      ) {
        return true;
      }
      return false;
    },
  },
  {
    check: (userData: User) => {
      if (
        userData.currentStreak >= 100 &&
        userData.achievements.find(
          (achievement) => achievement.id === 11 && !achievement.complete
        )
      ) {
        return true;
      }
      return false;
    },
  },
  {
    check: (userData: User) => {
      if (
        userData.wordlesFailed > 0 &&
        userData.achievements.find(
          (achievement) => achievement.id === 12 && !achievement.complete
        )
      ) {
        return true;
      }
      return false;
    },
  },
  {
    check: (userData: User) => {
      if (
        userData.completionGuesses.includes(1) &&
        userData.achievements.find(
          (achievement) => achievement.id === 13 && !achievement.complete
        )
      ) {
        return true;
      }
      return false;
    },
  },
  {
    check: (userData: User) => {
      if (
        userData.completionGuesses.includes(2) &&
        userData.achievements.find(
          (achievement) => achievement.id === 14 && !achievement.complete
        )
      ) {
        return true;
      }
      return false;
    },
  },
  {
    check: (userData: User) => {
      if (
        userData.completionGuesses.includes(3) &&
        userData.achievements.find(
          (achievement) => achievement.id === 15 && !achievement.complete
        )
      ) {
        return true;
      }
      return false;
    },
  },
  {
    check: (userData: User) => {
      const streak = userData.completionGuesses.slice(-3);
      if (
        streak.length === 3 &&
        streak.every((guess) => guess <= 3) &&
        userData.achievements.find(
          (achievement) => achievement.id === 16 && !achievement.complete
        )
      ) {
        return true;
      }
      return false;
    },
  },
  {
    check: (userData: User) => {
      const completedAchievements = countCompletedAchievements(userData);
      if (
        completedAchievements === achievements.length - 1 &&
        userData.achievements.find(
          (achievement) => achievement.id === 17 && !achievement.complete
        )
      ) {
        return true;
      }
      return false;
    },
  },
];

export const achievements = [
  {
    id: 1,
    name: "Getting wordly",
    description: "Played your first wordle",
    complete: false,
  },
  {
    id: 2,
    name: "Getting wordly",
    description: "Played 5 wordles",
    complete: false,
  },
  {
    id: 3,
    name: "Getting wordly",
    description: "Played 10 wordles",
    complete: false,
  },
  {
    id: 4,
    name: "Getting wordly",
    description: "Played 25 wordles",
    complete: false,
  },
  {
    id: 5,
    name: "Getting wordly",
    description: "Played 50 wordles",
    complete: false,
  },
  {
    id: 6,
    name: "Getting wordly",
    description: "Played 100 wordles",
    complete: false,
  },
  {
    id: 7,
    name: "Streaking",
    description: "Complete 5 wordles in a row",
    complete: false,
  },
  {
    id: 8,
    name: "Streaking",
    description: "Complete 10 wordles in a row",
    complete: false,
  },
  {
    id: 9,
    name: "Streaking",
    description: "Complete 25 wordles in a row",
    complete: false,
  },
  {
    id: 10,
    name: "Streaking",
    description: "Complete 50 wordles in a row",
    complete: false,
  },
  {
    id: 11,
    name: "Streaking",
    description: "Complete 100 wordles in a row",
    complete: false,
  },
  {
    id: 12,
    name: "Hard luck",
    description: "Failed a wordle",
    complete: false,
  },
  {
    id: 13,
    name: "Wordle in 1",
    description: "Complete a wordle in 1 guess",
    complete: false,
  },
  {
    id: 14,
    name: "Wordle in 2",
    description: "Complete a wordle in 2 guesses",
    complete: false,
  },
  {
    id: 15,
    name: "Wordle in 3",
    description: "Complete a wordle in 3 guesses",
    complete: false,
  },
  {
    id: 16,
    name: "Triple wordle",
    description: "Complete 3 wordles in a row with 3 guesses or less",
    complete: false,
  },
  {
    id: 17,
    name: "Completed all achievements",
    description: "You've completed all the achievements!",
    complete: false,
  },
];
