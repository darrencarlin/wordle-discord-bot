// Firebase functions
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { USER } from "./constants";
import { db } from "./firebase";
import { User } from "./types";

export const getWordles = async (id: string) => {
  const wordles: User[] = [];
  const usersSubcollection = collection(db, "guilds", id, "users");
  const usersSnapshot = await getDocs(usersSubcollection);
  usersSnapshot.forEach((doc) => {
    wordles.push(doc.data() as User);
  });
  return wordles ?? [];
};

export const getWordle = async (id: string, userId: string) => {
  const usersSubcollection = collection(db, "guilds", id, "users");
  const userDoc = doc(usersSubcollection, userId);
  const userDocSnap = await getDoc(userDoc);
  if (userDocSnap.exists()) {
    return userDocSnap.data() as User;
  }
  return false;
};

export const createGuild = async (id: string, name: string) => {
  await setDoc(doc(db, "guilds", id), { guildId: id, name: name });
};

export const deleteGuild = async (id: string) => {
  await deleteDoc(doc(db, "guilds", id));
};

export const setWordleChannel = async (id: string, channelId: string) => {
  await setDoc(
    doc(db, "guilds", id),
    { channelId: channelId },
    { merge: true }
  );
};

export const getGuildWordleChannel = async (id: string, channelId: string) => {
  const docRef = doc(db, "guilds", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data()?.channelId === channelId;
  } else {
    return false;
  }
};

export const getGuildWordles = async (id: string) => {
  const usersSubcollection = collection(db, "guilds", id, "users");
  const usersSnapshot = await getDocs(usersSubcollection);
  const wordles: User[] = [];
  usersSnapshot.forEach((doc) => {
    wordles.push(doc.data() as User);
  });
  return wordles ?? [];
};

export const updateGuildUserData = async (
  id: string,
  userId: string,
  userData: User
) => {
  const usersSubcollection = collection(db, "guilds", id, "users");
  await setDoc(doc(usersSubcollection, userId), userData, { merge: true });
};

// Discord bot functions

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
  let str = "";

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

  leaderboard.forEach((user, index) => {
    str += `** #${index + 1} **. ${user.usernames[0]} - ${
      user.percentageCompleted
    }% completed / ${user.totalWordles} games total / average ${
      user.averageGuesses
    } guesses per game.\n`;
  });

  return str;
};

export const generateUserStats = (stats: User) => {
  const str = `\n**Stats for ${stats.usernames[0]}**\n\nTotal Wordles: ${
    stats.totalWordles
  }\nWordles Completed: ${stats.wordlesCompleted}\nWordles Failed: ${
    stats.wordlesFailed
  }\nPercentage Completed: ${stats.percentageCompleted}%\nPercentage Failed: ${
    stats.percentageFailed
  }%\nAverage Guesses Per Wordle: ${stats.averageGuesses}\nCurrent Streak ${
    stats.currentStreak
  }\nLongest Streak: ${stats.longestStreak}\nBest Score: ${
    stats.bestScore
  }\n\n**Score Breakdown**:\n\n${stats.scores
    .map((score, index) => `${index + 1} word gueses x ${score}`)
    .join("\n")}`;

  return str;
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
  console.log({ isStreak });
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
