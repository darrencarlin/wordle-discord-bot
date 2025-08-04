// Discord bot functions
import {
  CommandInteraction,
  GuildMemberRoleManager,
  Message,
} from 'discord.js';
import { achievementChecks } from './achievements';
import { NO_LEADERBOARD_DATA, POPULATE_USER, SERVER_LIMIT } from './constants';
import {
  Achievement,
  Command,
  DiscordIds,
  UpdateLeaderboardDataProps,
  UpdateUserDataProps,
  User,
} from '../types';
import {
  getAdminRoleId,
  getGuildData,
  updateGuildLeaderboardData,
  updateGuildUserData,
} from './firebase/firebaseQueries';

export const getMessageCreateVars = async (content: Message) => {
  const { guildId } = content as DiscordIds;
  const { id, username } = content.author;
  const { notifications, isPremium, premiumExpires, users, serverCount } =
    await getGuildData(guildId);

  const userLimit = serverCount >= SERVER_LIMIT;
  const premium = isPremium || premiumExpires > new Date().getTime();
  const newWordleUser = users.filter((user) => user.userId === id).length === 0;
  const serverLimitReached = userLimit && !premium && newWordleUser;

  return {
    guildId,
    id,
    username,
    notifications,
    serverLimitReached,
  };
};

export const getInteractionCreateVars = async (
  interaction: CommandInteraction,
) => {
  const serverOwnerId = interaction.guild?.ownerId;
  const commandName = interaction.commandName as Command;
  const userId = interaction.user.id;
  const guildId = interaction.guildId as string;
  const channelId = interaction.channelId;
  const guildName = interaction.guild?.name as string;

  const { isPremium, premiumExpires, notifications, isActive } =
    await getGuildData(guildId);

  const adminRoleId = await getAdminRoleId(guildId ?? '');
  const isAdmin = (
    interaction?.member?.roles as GuildMemberRoleManager
  ).cache.has(adminRoleId);

  const serverOwner = serverOwnerId === userId;

  const hasValidPermissions = isAdmin || serverOwner;

  return {
    hasValidPermissions,
    commandName,
    userId,
    guildId,
    channelId,
    guildName,
    isPremium,
    premiumExpires,
    notifications,
    isActive,
  };
};

export const isRegularMessage = (content: Message) =>
  content.author.bot || !content.content.trim().startsWith('Wordle ');

export const sanitizeUserData = (userData: User): User => {
  // Fix any NaN values that might exist in the data
  if (isNaN(userData.bestScore)) {
    userData.bestScore = 0;
  }
  if (isNaN(userData.averageGuesses)) {
    userData.averageGuesses = 0;
  }
  if (isNaN(userData.currentStreak)) {
    userData.currentStreak = 0;
  }
  if (isNaN(userData.longestStreak)) {
    userData.longestStreak = 0;
  }
  if (isNaN(userData.percentageCompleted)) {
    userData.percentageCompleted = 0;
  }
  if (isNaN(userData.percentageFailed)) {
    userData.percentageFailed = 0;
  }

  // Remove any NaN values from completion guesses array
  userData.completionGuesses = userData.completionGuesses.filter(guess => !isNaN(guess));

  // Recalculate average if completionGuesses was cleaned
  if (userData.completionGuesses.length > 0) {
    userData.averageGuesses = Math.round(
      userData.completionGuesses.reduce((a, b) => a + b) / userData.completionGuesses.length,
    );
  }

  return userData;
};

export const getUserWordleData = (
  wordles: User[],
  id: string,
  username: string,
) => {
  const user = wordles.find((user) => user.userId === id);

  if (user) {
    const populatedUser = { ...POPULATE_USER(user), ...user };
    return sanitizeUserData(populatedUser);
  }

  const newUser = { userId: id, usernames: [username] };

  return {
    ...POPULATE_USER(newUser),
  };
};

export const getUserLeaderboardData = (
  leaderboards: User[],
  id: string,
  username: string,
) => {
  const user = leaderboards.find((user) => user.userId === id);

  if (user) {
    const populatedUser = { ...POPULATE_USER(user), ...user };
    return sanitizeUserData(populatedUser);
  }

  const newUser = { userId: id, usernames: [username] };

  return {
    ...POPULATE_USER(newUser),
  };
};

export const isValidWordleScore = (content: Message) => {
  // Get the first line of the message and remove the asterisk if present
  const firstLine = content.content.split('\n')[0].replace('*', '');
  // Check if it's hard mode
  const isHardMode = content.content.includes('*');
  // Get the score
  const score = firstLine.substring(firstLine.length - 3);
  // Regex to test score
  const regex = /^([1-6]{1}|X)+\/[1-6]+$/i;
  // Test it
  const isValid = regex.test(score);

  return { isValid, isHardMode, score };
};

export const sortLeaderboard = (wordles: User[], option: string) => {
  let leaderboard;

  if (option) {
    const key = option as keyof User;

    // lower is better
    const oppositeSortOrder = key === 'averageGuesses' || key === 'bestScore';

    leaderboard = wordles.sort((a, b) => {
      if (a[key] > b[key]) return oppositeSortOrder ? 1 : -1;
      if (a[key] < b[key]) return oppositeSortOrder ? 1 : -1;
      return 0;
    });

    if (option === 'hardWordlesCompleted') {
      leaderboard = leaderboard.sort((a, b) => {
        if (a.hardWordlesCompleted > b.hardWordlesCompleted) return -1;
        if (a.hardWordlesCompleted < b.hardWordlesCompleted) return 1;
        return 0;
      });
    }

    return leaderboard;
  }

  // sort the leaderboard by averageGuesses
  leaderboard = wordles.sort((a, b) => {
    if (a.averageGuesses > b.averageGuesses) return 1;
    if (a.averageGuesses < b.averageGuesses) return -1;
    return 0;
  });

  // sort the leaderboard by currentStreak
  leaderboard.sort((a, b) => {
    if (a.currentStreak > b.currentStreak) return -1;
    if (a.currentStreak < b.currentStreak) return 1;
    return 0;
  });

  return leaderboard;
};

export const generateLeaderboard = (wordles: User[], option: string) => {
  const leaderboard = sortLeaderboard(wordles, option);

  let str = '```';

  leaderboard?.forEach((user, index) => {
    str += `#${index + 1}. ${user.usernames[0]} - ${user.totalWordles} games (${
      user.percentageCompleted
    }% completed) / ${
      user.hardWordlesCompleted
    } hard games completed / average ${
      user.averageGuesses
    } guesses per game. / current streak: ${user.currentStreak} / best score: ${
      user.bestScore
    }\n`;
  });

  str += '```';

  if (str === '``````') {
    return NO_LEADERBOARD_DATA;
  }

  return str;
};

export const generateSimpleLeaderboard = (wordles: User[], option: string) => {
  const leaderboard = sortLeaderboard(wordles, option);
  let extra: string;
  switch (option) {
    case 'averageGuesses':
      extra = ' guesses per game';
      break;
    case 'currentStreak':
      extra = ' current streak';
      break;
    case 'bestScore':
      extra = ' best score';
      break;
    case 'totalWordles':
      extra = ' total wordles';
      break;
    case 'hardWordlesCompleted':
      extra = ' hard wordles completed';
      break;
    case 'wordlesCompleted':
      extra = ' wordles completed';
      break;
    case 'wordlesFailed':
      extra = ' wordles failed';
      break;
    default:
      extra = '';
      break;
  }

  let str = '```';

  leaderboard?.forEach((user, index) => {
    str += `${index + 1}. ${user.usernames[0]} `;

    if (extra != '') {
      const value = user[option as keyof User];
      str += `- ${value}${extra}\n`;
    }
  });

  str += '```';

  if (str === '``````') {
    return NO_LEADERBOARD_DATA;
  }

  return str;
};

export const generateUserStats = (data: User) => {
  const stats = [];

  stats.push(data.usernames[0]);
  stats.push(`${data.totalWordles}`);
  stats.push(`${data.percentageCompleted}%`);
  stats.push(`${data.averageGuesses}`);
  stats.push(`${data.currentStreak}`);
  stats.push(`${data.bestScore}`);
  stats.push(`${data.lastGameNumber}`);
  stats.push(
    `${data.scores
      .map((score, index) => `${index + 1} word guesses x ${score}`)
      .join('\n')}`,
  );

  return stats;
};

export const getWordleNumber = (content: Message) => {
  const wordleNumber = content.content.split(' ')[1].replace(',', '');
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
  isHardMode: boolean,
  userData: User,
) => {
  // If the user completed the wordle (not failed with 'X')
  if (completed !== 'X' && completed !== 'x' && Number(completed) <= Number(total)) {
    // defaulting to zero - this will catch new users because we added this field later
    const hardWordlesCompleted = userData.hardWordlesCompleted;

    userData.wordlesCompleted++;
    userData.totalWordles++;
    userData.hardWordlesCompleted = isHardMode
      ? hardWordlesCompleted + 1
      : hardWordlesCompleted;
    userData.completionGuesses.push(Number(completed));
    userData.averageGuesses = Math.round(
      userData.completionGuesses.reduce((a, b) => a + b) /
        userData.completionGuesses.length,
    );
  }
  // If the user failed the wordle
  if (completed === 'X' || completed === 'x') {
    userData.wordlesFailed++;
    userData.totalWordles++;
  }

  userData.percentageCompleted = Math.round(
    (userData.wordlesCompleted / userData.totalWordles) * 100,
  );

  userData.percentageFailed = Math.round(
    (userData.wordlesFailed / userData.totalWordles) * 100,
  );

  return userData;
};

export const calculateStreak = (
  completed: string,
  userData: User,
  wordleNumber: number,
) => {
  // 0 = first game
  if (userData.lastGameNumber === 0) {
    userData.lastGameNumber = wordleNumber;
    userData.currentStreak++;
    userData.longestStreak++;
    return userData;
  }

  const isStreak =
    (userData.lastGameNumber + 1 === wordleNumber && completed !== 'X') ||
    completed === 'x';

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
  // Only update best score if the user completed the wordle (not 'X')
  if (completed !== 'X' && completed !== 'x') {
    const completedNumber = Number(completed);
    if (completedNumber < userData.bestScore || userData.bestScore === 0) {
      userData.bestScore = completedNumber;
    }
  }

  // Only update scores array if the user completed the wordle
  if (completed !== 'X' && completed !== 'x') {
    const completedNumber = Number(completed);
    if (completedNumber >= 1 && completedNumber <= 6) {
      userData.scores[completedNumber - 1]++;
    }
  }

  return userData;
};

export const countCompletedAchievements = (userData: User) => {
  const count = userData.achievements.filter(
    (achievement: Achievement) => achievement.complete,
  ).length;

  return count;
};

export const calculateAchievements = (userData: User) => {
  const newAchievements: Achievement[] = [];

  userData.achievements.map((achieve) => {
    const isComplete = achievementChecks[achieve.id - 1].check(userData);

    if (isComplete && !achieve.complete) {
      newAchievements.push(achieve);
      achieve.complete = true;
    }

    return achieve;
  });

  return { userData, newAchievements };
};

export const updateUserData = async ({
  username,
  data,
  completed,
  total,
  isHardMode,
  wordleNumber,
  guildId,
  id,
}: UpdateUserDataProps) => {
  // Update the user data
  data = checkForNewUsername(username, data);
  data = calculateUpdatedWordleData(completed, total, isHardMode, data);
  data = calculateStreak(completed, data, wordleNumber);
  data = calculateBestScore(completed, data);
  const { userData, newAchievements } = calculateAchievements(data);

  await updateGuildUserData(guildId, id, userData);
  return { userData, newAchievements };
};

export const updateLeaderboardData = async ({
  username,
  data,
  completed,
  total,
  isHardMode,
  wordleNumber,
  guildId,
}: UpdateLeaderboardDataProps) => {
  data = checkForNewUsername(username, data);
  data = calculateUpdatedWordleData(completed, total, isHardMode, data);
  data = calculateStreak(completed, data, wordleNumber);
  data = calculateBestScore(completed, data);
  await updateGuildLeaderboardData(guildId, data);
};
