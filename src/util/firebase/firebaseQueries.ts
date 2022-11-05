import { db } from './firebaseAdmin';
import { DEFAULT_NOTIFICATIONS } from '../constants';
import { User } from '../types';

// potentially add an option to choose what you need... minimzing calls to db
export const getGuildData = async (id: string) => {
  const guild = await db.collection('guilds').doc(id).get();
  const guildData = guild.data();

  const users = await db.collection(`guilds/${id}/users`).get();
  const usersData = users.docs.map((doc) => doc.data());
  const serverCount = users.docs.length;

  const leaderboards = await db.collection(`guilds/${id}/leaderboard`).get();
  const leaderboardsData = leaderboards.docs.map((doc) => doc.data());

  const data = {
    adminRoleId: guildData?.adminRoleId,
    channelId: guildData?.channelId,
    guildId: guildData?.guildId,
    isPremium: guildData?.isPremium,
    name: guildData?.name,
    notifications: { ...guildData?.notifications, ...DEFAULT_NOTIFICATIONS },
    premiumExpires: guildData?.premiumExpires,
    users: usersData as User[],
    leaderboards: leaderboardsData as User[],
    serverCount,
  };

  return data;
};

export const createGuild = async (id: string, name: string) => {
  await db.collection('guilds').doc(id).set({
    name,
    guildId: id,
    isPremium: false,
    premiumExpires: new Date().getTime(),
    notifications: DEFAULT_NOTIFICATIONS,
  });
};

export const deleteGuild = async (id: string) => {
  await db.collection('guilds').doc(id).delete();
};

export const setWordleChannel = async (
  id: string,
  channelId: string,
  guildName: string,
) => {
  await db.collection('guilds').doc(id).set(
    {
      channelId,
      guildId: id,
      name: guildName,
    },
    { merge: true },
  );
};

export const getGuildWordleChannel = async (id: string, channelId: string) => {
  const channel = await db.collection('guilds').doc(id).get();

  if (channel.exists) {
    return channel.data()?.channelId === channelId;
  } else {
    return false;
  }
};

export const getGuildWordles = async (id: string) => {
  const users = await db.collection(`guilds/${id}/users`).get();
  const wordles = users.docs.map((doc) => doc.data() as User);
  return wordles;
};

export const getGuildLeaderboard = async (id: string) => {
  const leaderboards = await db.collection(`guilds/${id}/leaderboard`).get();
  const leaderboard = leaderboards.docs.map((doc) => doc.data() as User);
  return leaderboard;
};

export const updateGuildUserData = async (
  id: string,
  userId: string,
  userData: User,
) => {
  await db
    .collection(`guilds/${id}/users`)
    .doc(userId)
    .set(userData, { merge: true });
};

export const updateGuildLeaderboardData = async (
  id: string,
  userData: User,
) => {
  await db
    .collection(`guilds/${id}/leaderboard`)
    .doc(userData.userId)
    .set(userData, { merge: true });
};

export const resetLeaderboard = async (id: string) => {
  await db
    .collection(`guilds/${id}/leaderboard`)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
};

export const resetUsers = async (id: string) => {
  await db
    .collection(`guilds/${id}/users`)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
};

export const setAdminRole = async (id: string, roleId: string) => {
  await db.collection('guilds').doc(id).set(
    {
      adminRoleId: roleId,
    },
    { merge: true },
  );
};

export const getAdminRole = async (id: string) => {
  const guild = await db.collection('guilds').doc(id).get();
  return guild.data()?.adminRoleId;
};

export const purgeUser = async (id: string, userId: string) => {
  await db.collection(`guilds/${id}/users`).doc(userId).delete();
  await db.collection(`guilds/${id}/leaderboard`).doc(userId).delete();
};

export const getUserCount = async (id: string) => {
  const users = await db.collection(`guilds/${id}/users`).get();
  return users.docs.length;
};

export const getGuildNotifications = async (id: string) => {
  const guild = await db.collection('guilds').doc(id).get();
  return { ...guild.data()?.notifications, ...DEFAULT_NOTIFICATIONS };
};

export const enableNotifications = async (id: string, option: string) => {
  await db
    .collection('guilds')
    .doc(id)
    .set(
      {
        notifications: {
          [option]: true,
        },
      },
      { merge: true },
    );
};

export const disableNotifications = async (id: string, option: string) => {
  await db
    .collection('guilds')
    .doc(id)
    .set(
      {
        notifications: {
          [option]: false,
        },
      },
      { merge: true },
    );
};

export const getWordle = async (id: string, userId: string) => {
  const wordle = await db.collection(`guilds/${id}/users`).doc(userId).get();
  if (wordle.exists) {
    return wordle.data() as User;
  } else {
    return false;
  }
};

export const logError = async (error: string, type: string) => {
  await db.collection('errors').add({
    error,
    type,
    timestamp: new Date().getTime(),
  });
};

export const getAdminRoleId = async (id: string) => {
  const guild = await db.collection('guilds').doc(id).get();
  return guild.data()?.adminRoleId;
};
