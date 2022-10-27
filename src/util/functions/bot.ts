// Discord bot functions
import { achievements } from "../achievements";
import { USER } from "../constants";
import { Achievement, User } from "../types";

export const getUserWordleData = (
  wordles: User[],
  id: string,
  username: string
) => {
  const user = wordles.find((user) => user.userId === id);
  return { ...USER(id, username), ...user };
};

export const isValidWordleScore = (data: string) => {
  const firstLine = data.split("\n")[0];
  // Get the score
  const score = firstLine.substring(firstLine.length - 3);
  // Regex to test score
  const regex = /^([1-6]{1}|X)+\/[1-6]+$/i;
  // Test it
  const isValid = regex.test(score);

  return { isValid, score };
};

export const generateLeaderboard = (wordles: User[]) => {
  // Sort the leaderboard by percentageCompleted if the totalWordles are the same, then by averageGuesses, then by totalWordles, then by currentStreak, then by bestScore.

  const leaderboard = wordles.sort((a, b) => {
    if (a.percentageCompleted === b.percentageCompleted) {
      if (a.averageGuesses === b.averageGuesses) {
        if (a.totalWordles === b.totalWordles) {
          if (a.currentStreak === b.currentStreak) {
            return b.bestScore - a.bestScore;
          }
          return b.currentStreak - a.currentStreak;
        }
        return b.totalWordles - a.totalWordles;
      }
      return a.averageGuesses - b.averageGuesses;
    }
    return b.percentageCompleted - a.percentageCompleted;
  });

  let str = "```";

  leaderboard.forEach((user, index) => {
    str += `#${index + 1}. ${user.usernames[0]} - ${
      user.percentageCompleted
    }% completed / ${user.totalWordles} games / average ${
      user.averageGuesses
    } guesses per game. / current streak: ${user.currentStreak} / best score: ${
      user.bestScore
    }`;
  });

  str += "```";

  return str;
};

export const generateUserStats = (data: User) => {
  let stats = [];

  stats.push(data.usernames[0]);
  stats.push(`${data.totalWordles}`);
  stats.push(`${data.percentageCompleted}%`);
  stats.push(`${data.averageGuesses}`);
  stats.push(`${data.currentStreak}`);
  stats.push(`${data.bestScore}`);
  stats.push(`${data.lastGameNumber}`);
  stats.push(
    `${data.scores
      .map((score, index) => `${index + 1} word gueses x ${score}`)
      .join("\n")}`
  );

  return stats;
};

export const getWordleNumber = (content: string) => {
  const wordleNumber = content.split(" ")[1];
  if (wordleNumber) {
    return Number(wordleNumber);
  }
};

export const checkForNewUsername = (username: string, userData: User) => {
  if (!userData.usernames.includes(username)) {
    userData.usernames.push(username);
  }
  return userData;
};

export const calculateUpdatedWordleData = (
  completed: string,
  total: string,
  userData: User
) => {
  // If the user completed the wordle
  if (Number(completed) <= Number(total)) {
    userData.wordlesCompleted++;
    userData.totalWordles++;
    userData.completionGuesses.push(Number(completed));
    userData.averageGuesses = Math.round(
      userData.completionGuesses.reduce((a, b) => a + b) /
        userData.completionGuesses.length
    );
  }
  // If the user failed the wordle
  if (completed === "X") {
    userData.wordlesFailed++;
    userData.totalWordles++;
  }

  userData.percentageCompleted = Math.round(
    (userData.wordlesCompleted / userData.totalWordles) * 100
  );

  userData.percentageFailed = Math.round(
    (userData.wordlesFailed / userData.totalWordles) * 100
  );

  return userData;
};

export const calculateStreak = (
  completed: string,
  userData: User,
  wordleNumber: number
) => {
  // 0 = first game
  if (userData.lastGameNumber === 0) {
    userData.lastGameNumber = wordleNumber;
    userData.currentStreak++;
    userData.longestStreak++;
    return userData;
  }

  const isStreak =
    (userData.lastGameNumber + 1 === wordleNumber && completed !== "X") ||
    completed === "x";

  if (isStreak) {
    userData.currentStreak++;
    if (userData.currentStreak > userData.longestStreak) {
      userData.longestStreak = userData.currentStreak;
    }
  }

  if (!isStreak) {
    userData.currentStreak = 0;
  }

  userData.lastGameNumber = wordleNumber;

  return userData;
};

export const calculateBestScore = (completed: string, userData: User) => {
  if (Number(completed) < userData.bestScore || userData.bestScore === 0) {
    userData.bestScore = Number(completed);
  }

  // update the scores array
  if (Number(completed) !== NaN) {
    userData.scores[Number(completed) - 1]++;
  }

  return userData;
};

export const calculateAchievements = (userData: User) => {
  const achievementsGained = achievements
    .map((achievement) => achievement.check(userData))
    .flatMap((achievement) => (achievement ? [achievement] : []));

  userData.achievements = [...userData.achievements, ...achievementsGained];

  return { newUserData: userData, newAchievements: achievementsGained };
};
