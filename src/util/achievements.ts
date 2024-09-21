import { countCompletedAchievements } from './botFunctions';
import { User } from '../types';

// both of these arrays need to be the same length and have the correct
// corresponding achievement check

export const achievementChecks = [
  {
    check: (userData: User) => {
      if (
        userData.totalWordles >= 1 &&
        userData.achievements.find(
          (achievement) => achievement.id === 1 && !achievement.complete,
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
        userData.totalWordles >= 5 &&
        userData.achievements.find(
          (achievement) => achievement.id === 2 && !achievement.complete,
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
          (achievement) => achievement.id === 3 && !achievement.complete,
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
          (achievement) => achievement.id === 4 && !achievement.complete,
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
          (achievement) => achievement.id === 5 && !achievement.complete,
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
          (achievement) => achievement.id === 6 && !achievement.complete,
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
          (achievement) => achievement.id === 7 && !achievement.complete,
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
          (achievement) => achievement.id === 8 && !achievement.complete,
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
          (achievement) => achievement.id === 9 && !achievement.complete,
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
          (achievement) => achievement.id === 10 && !achievement.complete,
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
          (achievement) => achievement.id === 11 && !achievement.complete,
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
        userData.wordlesFailed >= 1 &&
        userData.achievements.find(
          (achievement) => achievement.id === 12 && !achievement.complete,
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
          (achievement) => achievement.id === 13 && !achievement.complete,
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
          (achievement) => achievement.id === 14 && !achievement.complete,
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
          (achievement) => achievement.id === 15 && !achievement.complete,
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
          (achievement) => achievement.id === 16 && !achievement.complete,
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
      const totalAchievements = userData.achievements.length;
      if (
        completedAchievements === totalAchievements - 1 &&
        userData.achievements.find(
          (achievement) => achievement.id === 17 && !achievement.complete,
        )
      ) {
        return true;
      }
      return false;
    },
  },
  // Hardmode Achievements
  {
    check: (userData: User) => {
      if (
        userData.hardWordlesCompleted >= 1 &&
        userData.achievements.find(
          (achievement) => achievement.id === 18 && !achievement.complete,
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
        userData.hardWordlesCompleted >= 5 &&
        userData.achievements.find(
          (achievement) => achievement.id === 19 && !achievement.complete,
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
        userData.hardWordlesCompleted >= 10 &&
        userData.achievements.find(
          (achievement) => achievement.id === 20 && !achievement.complete,
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
        userData.hardWordlesCompleted >= 25 &&
        userData.achievements.find(
          (achievement) => achievement.id === 21 && !achievement.complete,
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
        userData.hardWordlesCompleted >= 50 &&
        userData.achievements.find(
          (achievement) => achievement.id === 22 && !achievement.complete,
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
        userData.hardWordlesCompleted >= 100 &&
        userData.achievements.find(
          (achievement) => achievement.id === 23 && !achievement.complete,
        )
      ) {
        return true;
      }
      return false;
    },
  },
];
