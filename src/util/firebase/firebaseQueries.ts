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
    notifications: guildData?.notifications,
    premiumExpires: guildData?.premiumExpires,
    users: usersData as User[],
    leaderboards: leaderboardsData as User[],
    isActive: guildData?.isActive ?? false,
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
  const timestamp = new Date().toUTCString();
  await db.collection('errors').doc(timestamp).set({
    error,
    type,
    timestamp,
  });
};

export const getAdminRoleId = async (id: string) => {
  const guild = await db.collection('guilds').doc(id).get();
  return guild.data()?.adminRoleId;
};

export const incrementWordlesEntered = async () => {
  const total = await db.collection('total').doc('LUv3w892t28Vxkf3djha').get();
  const totalData = total.data();
  const count = totalData?.count;
  await db
    .collection('total')
    .doc('LUv3w892t28Vxkf3djha')
    .set({ count: count + 1 }, { merge: true });
};

interface Field {
  name: string;
  value: string | number | boolean;
}
export const addNewFieldToUsersAndLeaderboards = async ({
  name,
  value,
}: Field) => {
  // Get a snapshot of all guilds
  const guildsSnapshot = await db.collection('guilds').get();

  // Iterate over each guild and update users and leaderboards
  guildsSnapshot.forEach(async (guild) => {
    const guildId = guild.id;

    // Create a batched write for efficient multiple operations
    const batch = db.batch();

    // Function to update users and leaderboards for a specific guild
    const updateUsersAndLeaderboards = async () => {
      // Get snapshots of users and leaderboards for the current guild
      const usersSnapshot = await db
        .collection(`guilds/${guildId}/users`)
        .get();
      const leaderboardsSnapshot = await db
        .collection(`guilds/${guildId}/leaderboard`)
        .get();

      // Update each user with the new field
      usersSnapshot.forEach((user) => {
        const userId = user.id;
        const userData = user.data();

        // Create a reference to the user document and add it to the batch
        const userRef = db.collection(`guilds/${guildId}/users`).doc(userId);
        batch.set(userRef, { ...userData, [name]: value }, { merge: true });
      });

      // Update each leaderboard entry with the new field
      leaderboardsSnapshot.forEach((user) => {
        const userId = user.id;
        const userData = user.data();

        // Create a reference to the leaderboard document and add it to the batch
        const leaderboardRef = db
          .collection(`guilds/${guildId}/leaderboard`)
          .doc(userId);
        batch.set(
          leaderboardRef,
          { ...userData, [name]: value },
          { merge: true },
        );
      });
    };

    // Execute the batched write to update users and leaderboards for the current guild
    await updateUsersAndLeaderboards();
    // Commit the batch for the current guild
    await batch.commit();
  });
};
