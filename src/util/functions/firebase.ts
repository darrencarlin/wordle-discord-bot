// Firebase functions
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { User } from "../types";

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

export const setWordleChannel = async (
  id: string,
  channelId: string,
  guildName: string
) => {
  await setDoc(
    doc(db, "guilds", id),
    { channelId: channelId, guildId: id, name: guildName },
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

export const getGuildLeaderboard = async (id: string) => {
  const leaderboardSubcollection = collection(db, "guilds", id, "leaderboard");
  const leaderboardSnapshot = await getDocs(leaderboardSubcollection);
  const leaderboard: User[] = [];
  leaderboardSnapshot.forEach((doc) => {
    leaderboard.push(doc.data() as User);
  });
  return leaderboard ?? [];
};

export const updateGuildUserData = async (
  id: string,
  userId: string,
  userData: User
) => {
  const usersSubcollection = collection(db, "guilds", id, "users");
  await setDoc(doc(usersSubcollection, userId), userData, { merge: true });
};

export const updateGuildLeaderboardData = async (
  id: string,
  userData: User
) => {
  const leaderboardSubcollection = collection(db, "guilds", id, "leaderboard");

  await setDoc(doc(leaderboardSubcollection, userData.userId), userData, {
    merge: true,
  });
};

export const resetLeaderboard = async (id: string) => {
  const leaderboardSubcollection = collection(db, "guilds", id, "leaderboard");
  const leaderboardSnapshot = await getDocs(leaderboardSubcollection);
  leaderboardSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
};

export const resetUsers = async (id: string) => {
  const usersSubcollection = collection(db, "guilds", id, "users");
  const usersSnapshot = await getDocs(usersSubcollection);
  usersSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
};

export const setAdminRole = async (id: string, roleId: string) => {
  await setDoc(doc(db, "guilds", id), { adminRoleId: roleId }, { merge: true });
};

export const getAdminRoleId = async (id: string) => {
  const docRef = doc(db, "guilds", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data()?.adminRoleId;
  } else {
    return "";
  }
};

export const purgeUser = async (id: string, userId: string) => {
  const usersSubcollection = collection(db, "guilds", id, "users");
  const leaderboardSubcollection = collection(db, "guilds", id, "leaderboard");
  await deleteDoc(doc(usersSubcollection, userId));
  await deleteDoc(doc(leaderboardSubcollection, userId));
};

export const getUserCount = async (id: string) => {
  const usersSubcollection = collection(db, "guilds", id, "users");
  const usersSnapshot = await getDocs(usersSubcollection);
  return usersSnapshot.size;
};
