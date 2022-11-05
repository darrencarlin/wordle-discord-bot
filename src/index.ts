import { REST } from '@discordjs/rest';
import {
  Client,
  GatewayIntentBits,
  Interaction,
  Message,
  Routes,
} from 'discord.js';
import dotenv from 'dotenv';
import commands from './commands';
import {
  achievementsEmbed,
  achievementsListEmbed,
  helpEmbed,
  serverStatusEmbed,
  statsEmbed,
} from './embeds';

import {
  COMPLETED_ALREADY_TEXT,
  EXPORT_DATA_TEXT,
  INVALID_SCORE_TEXT,
  LIMIT_REACHED,
  NOT_PLAYED_TEXT,
  NO_PERMISSION_TEXT,
  PURGE_USER,
  SET_WORDLE_ADMIN_ROLE,
  SOMETHING_WENT_WRONG_TEXT,
  UPGRADE_SERVER,
} from './util/constants';
import {
  generateLeaderboard,
  generateUserStats,
  getUserLeaderboardData,
  getUserWordleData,
  getMessageCreateVariables,
  getWordleNumber,
  isRegularMessage,
  isValidWordleScore,
  updateLeaderboardData,
  updateUserData,
  getInteractionCreateVariables,
} from './util/botFunctions';
import {
  createGuild,
  deleteGuild,
  disableNotifications,
  enableNotifications,
  getGuildLeaderboard,
  getGuildWordleChannel,
  getGuildWordles,
  getUserCount,
  getWordle,
  logError,
  purgeUser,
  resetLeaderboard,
  resetUsers,
  setAdminRole,
  setWordleChannel,
} from './util/firebase/firebaseQueries';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

client.on('ready', () => {
  console.log(`${client?.user?.username} has logged in!`);
});

client.on('guildCreate', async (guild) => {
  console.log(`Joined guild ${guild.name}`);
  await createGuild(guild.id, guild.name);
});

client.on('guildDelete', async (guild) => {
  console.log(`Left guild ${guild.name}`);
  await deleteGuild(guild.id);
});

client.on('messageCreate', async (content: Message) => {
  if (isRegularMessage(content)) return;

  try {
    const {
      guildId,
      channelId,
      id,
      username,
      notifications,
      serverLimitReached,
    } = await getMessageCreateVariables(content);

    if (serverLimitReached) {
      if (notifications['limits']) {
        await content.reply({ content: LIMIT_REACHED });
        return;
      }
      return;
    }

    const isWordleChannel = await getGuildWordleChannel(guildId, channelId);

    if (isWordleChannel) {
      const wordles = await getGuildWordles(guildId);
      const leaderboards = await getGuildLeaderboard(guildId);
      const wordleNumber = getWordleNumber(content)!;

      const { isValid, score } = isValidWordleScore(content);

      if (isValid) {
        const [completed, total] = score.split('/');

        // Get the existing user data or create a new one
        const userData = getUserWordleData(wordles, id, username);

        const leaderboardData = getUserLeaderboardData(
          leaderboards,
          id,
          username,
        );

        // If the user tries to submit the same wordle or an earlier one, return
        if (wordleNumber <= userData.lastGameNumber) {
          await content.reply(
            COMPLETED_ALREADY_TEXT(userData.lastGameNumber.toString()),
          );
          return;
        }

        const { userData: newData, newAchievements } = await updateUserData({
          username,
          data: userData,
          completed,
          total,
          wordleNumber,
          guildId,
          id,
        });

        await updateLeaderboardData({
          username,
          data: leaderboardData,
          completed,
          total,
          wordleNumber,
          guildId,
        });

        if (newAchievements.length && notifications['achievements'] === true) {
          await content.reply({
            embeds: [achievementsEmbed(newData, newAchievements)],
          });
        }
      } else {
        await content.reply(INVALID_SCORE_TEXT);
      }
    }
  } catch (error) {
    await content.reply(SOMETHING_WENT_WRONG_TEXT);
    logError((error as Error).message, 'messageCreate');
  }
});

client.on('interactionCreate', async (interaction: Interaction) => {
  const command = interaction.isChatInputCommand();

  if (!command) return;

  try {
    const {
      hasValidPermissions,
      commandName,
      userId,
      guildId,
      channelId,
      guildName,
      isPremium,
      premiumExpires,
    } = await getInteractionCreateVariables(interaction);

    if (commandName === 'set-channel') {
      if (guildId && channelId) {
        await setWordleChannel(guildId, channelId, guildName);
        await interaction.reply({
          content: 'Wordle channel set!',
          embeds: [helpEmbed(hasValidPermissions)],
        });
      } else {
        await interaction.reply(SOMETHING_WENT_WRONG_TEXT);
      }
    }

    if (commandName === 'set-role') {
      const role = interaction.options.getRole('role');
      if (hasValidPermissions && role) {
        await setAdminRole(guildId as string, role.id);
        await interaction.reply({
          content: SET_WORDLE_ADMIN_ROLE(role.name),
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: NO_PERMISSION_TEXT,
          ephemeral: true,
        });
      }
    }

    if (commandName === 'purge-user') {
      const member = interaction.options.getUser('user');

      if (hasValidPermissions && member) {
        await purgeUser(guildId as string, member.id);
        await interaction.reply({
          content: PURGE_USER(member.username),
          ephemeral: true,
        });
      }
    }

    if (commandName === 'reset-users') {
      if (hasValidPermissions) {
        await resetUsers(guildId as string);
        await interaction.reply('All users have been reset.');
      } else {
        await interaction.reply({
          content: NO_PERMISSION_TEXT,
          ephemeral: true,
        });
      }
    }

    if (commandName === 'reset-leaderboard') {
      if (hasValidPermissions) {
        await resetLeaderboard(guildId as string);
        await interaction.reply('The leaderboard has been reset.');
      } else {
        await interaction.reply({
          content: NO_PERMISSION_TEXT,
          ephemeral: true,
        });
      }
    }

    if (commandName === 'server-status') {
      if (hasValidPermissions) {
        const count = await getUserCount(guildId as string);

        await interaction.reply({
          embeds: [serverStatusEmbed(count, isPremium, premiumExpires)],
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: NO_PERMISSION_TEXT,
          ephemeral: true,
        });
      }
    }

    if (commandName === 'upgrade-server') {
      if (hasValidPermissions) {
        await interaction.reply({
          content: UPGRADE_SERVER(guildId as string),
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: NO_PERMISSION_TEXT,
          ephemeral: true,
        });
      }
    }

    if (commandName === 'enable-notifications') {
      if (hasValidPermissions) {
        const option = interaction.options.getString('type') ?? '';

        await enableNotifications(guildId as string, option);

        await interaction.reply({
          content: `You have enabled ${option} notifications!`,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: NO_PERMISSION_TEXT,
          ephemeral: true,
        });
      }
    }

    if (commandName === 'disable-notifications') {
      if (hasValidPermissions) {
        const option = interaction.options.getString('type') ?? '';

        await disableNotifications(guildId as string, option);

        await interaction.reply({
          content: `You have disabled ${option} notifications!`,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: NO_PERMISSION_TEXT,
          ephemeral: true,
        });
      }
    }

    if (commandName === 'my-stats') {
      const data = await getWordle(guildId as string, userId);
      if (data) {
        const stats = generateUserStats(data);
        await interaction.reply({
          embeds: [statsEmbed(stats)],
          ephemeral: interaction.options.getBoolean('ephemeral') ?? false,
        });
      } else {
        await interaction.reply(NOT_PLAYED_TEXT);
      }
    }

    if (commandName === 'my-achievements') {
      const data = await getWordle(guildId as string, userId);
      if (data) {
        await interaction.reply({
          embeds: [achievementsListEmbed(data)],
          ephemeral: interaction.options.getBoolean('ephemeral') ?? false,
        });
      } else {
        await interaction.reply(NOT_PLAYED_TEXT);
      }
    }

    if (commandName === 'leaderboard') {
      const option = interaction.options.getString('sort') ?? '';
      const wordles = await getGuildLeaderboard(guildId as string);
      const leaderboard = generateLeaderboard(wordles, option);
      await interaction.reply(leaderboard);
    }

    if (commandName === 'help') {
      await interaction.reply({
        embeds: [helpEmbed(hasValidPermissions)],
        ephemeral: true,
      });
    }

    if (commandName === 'export-data') {
      if (hasValidPermissions) {
        await interaction.reply({
          content: EXPORT_DATA_TEXT(guildId),
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: NO_PERMISSION_TEXT,
          ephemeral: true,
        });
      }
    }
  } catch (error) {
    await interaction.reply({
      content: SOMETHING_WENT_WRONG_TEXT,
      ephemeral: true,
    });
    logError((error as Error).message, 'interactionCreate');
  }
});
(async () => {
  try {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
      body: commands,
    });
    client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    logError((error as Error).message, 'applicationCommands');
  }
})();
