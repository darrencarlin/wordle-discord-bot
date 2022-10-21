// Firebase functions
import {
  addDoc,
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

export const getWordleChannel = async (id: string, channelId: string) => {
  const docRef = doc(db, "guilds", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data()?.channelId === channelId;
  } else {
    return false;
  }
};

export const getGuildUsers = async (id: string) => {
  const usersSubcollection = collection(db, "guilds", id, "users");
  const usersSnapshot = await getDocs(usersSubcollection);
  const wordles: User[] = [];
  usersSnapshot.forEach((doc) => {
    wordles.push(doc.data() as User);
  });
  return wordles ?? [];
};

export const updateGuildUsers = async (
  id: string,
  userId: string,
  userData: User
) => {
  const usersSubcollection = collection(db, "guilds", id, "users");
  await setDoc(doc(usersSubcollection, userId), userData, { merge: true });
};

// Discord bot functions

export const getUserData = (wordles: User[], id: string, username: string) => {
  const user = wordles.find((user) => user.userId === id);
  return { ...USER(id, username), ...user };
};

export const isValidScore = (data: string) => {
  const firstLine = data.split("\n")[0];
  // Get the score
  const score = firstLine.substring(firstLine.length - 3);
  // Regex to test score
  const regex = /^([1-6]|X)+\/[1-6]+$/i;
  // Test it
  const isValid = regex.test(score);

  return { isValid, score };
};

export const generateLeaderboard = (wordles: User[]) => {
  let str = "";
  // Sort the leaderboard by percentage completed, then by average guesses, then by total wordles
  const leaderboard = wordles.sort((a, b) => {
    if (a.percentageCompleted === b.percentageCompleted) {
      if (a.averageGuesses === b.averageGuesses) {
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
  // Build the stats message
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
  // Send the stats message

  return str;
};

export const completedToday = (lastGame: string) => {
  if (lastGame == "") return false;
  const currentDate = new Date();
  const lastGameDate = new Date(lastGame);

  return currentDate.getDate() === lastGameDate.getDate();
};

export const checkForNewUsername = (username: string, userData: User) => {
  if (!userData.usernames.includes(username)) {
    userData.usernames.push(username);
  }
  return userData;
};

export const completedWordle = (
  completed: string,
  total: string,
  userData: User
) => {
  // If the user completed the wordle
  if (Number(completed) <= Number(total)) {
    userData.wordlesCompleted++;
    userData.totalWordles++;
    userData.percentageCompleted = Math.round(
      (userData.wordlesCompleted / userData.totalWordles) * 100
    );
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
    userData.percentageFailed = Math.round(
      (userData.wordlesFailed / userData.totalWordles) * 100
    );
  }

  return userData;
};

export const isValidStreak = (userData: User) => {
  const currentDate = new Date().toISOString();
  const lastGameDate = userData.lastGameDate ?? "";
  // We can change this up once everyone has a lastGameDate
  const isValid = lastGameDate !== "" ? isValidStreakTime(lastGameDate) : true;

  if (isValid) {
    userData.currentStreak++;
    if (userData.currentStreak > userData.longestStreak) {
      userData.longestStreak = userData.currentStreak;
    }
  }

  if (!isValid) {
    userData.currentStreak = 0;
  }

  // update the last game date to today
  userData.lastGameDate = currentDate;

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

// check if date is over 24 hours and less than 48 hours
export const isValidStreakTime = (date: string) => {
  const currentDate = new Date();
  const lastGameDate = new Date(date);
  const diff = currentDate.getTime() - lastGameDate.getTime();
  const hours = Math.abs(diff / 36e5);
  return hours > 24 && hours < 48;
};
