import { REST } from '@discordjs/rest';
import {
  Client,
  GatewayIntentBits,
  Interaction,
  Message,
  MessageFlags,
  Routes,
} from 'discord.js';
import dotenv from 'dotenv';
import commands from './commands';
import { achievementsEmbed } from './embeds';
import { disableNotificationsCommandHandler } from './commands/handlers/disable-notifications';
import { enableNotificationsCommandHandler } from './commands/handlers/enable-notifications';
import { exportDataCommandHandler } from './commands/handlers/export-data';
import { helpCommandHandler } from './commands/handlers/help';
import { leaderboardCommandHandler } from './commands/handlers/leaderboard';
import { myAchievementsCommandHandler } from './commands/handlers/my-achievements';
import { myStatsCommandHandler } from './commands/handlers/my-stats';
import { purgeUserCommandHandler } from './commands/handlers/purge-user';
import { resetLeaderboardCommandHandler } from './commands/handlers/reset-leaderboard';
import { resetUsersCommandHandler } from './commands/handlers/reset-users';
import { serverStatusCommandHandler } from './commands/handlers/server-status';
import { setChannelCommandHandler } from './commands/handlers/set-channel';
import { setRoleCommandHandler } from './commands/handlers/set-role';
import { simpleLeaderboardCommandHandler } from './commands/handlers/simple-leaderboard';
import { upgradeServerCommandHandler } from './commands/handlers/upgrade-server';
import {
  getInteractionCreateVars,
  getMessageCreateVars,
  getUserLeaderboardData,
  getUserWordleData,
  getWordleNumber,
  isRegularMessage,
  isValidWordleScore,
  updateLeaderboardData,
  updateUserData,
} from './util/botFunctions';
import {
  COMPLETED_ALREADY_TEXT,
  INVALID_SCORE_TEXT,
  LIMIT_REACHED,
  SOMETHING_WENT_WRONG_TEXT,
} from './util/constants';
import {
  createGuild,
  decrementServersJoined,
  deleteGuild,
  getGuildLeaderboard,
  getGuildWordleChannel,
  getGuildWordles,
  incrementServersJoined,
  incrementWordlesEntered,
  logError,
} from './util/firebase/firebaseQueries';
import { DiscordIds } from './types';

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
  await incrementServersJoined();
});

client.on('guildDelete', async (guild) => {
  console.log(`Left guild ${guild.name}`);
  await deleteGuild(guild.id);
  await decrementServersJoined();
});

client.on('messageCreate', async (content: Message) => {
  if (isRegularMessage(content)) {
    // Return if the message is not a wordle message
    return;
  }
  const time = new Date().getTime();
  const { guildId, channelId } = content as DiscordIds;
  const isWordleChannel = await getGuildWordleChannel(guildId, channelId);

  if (!isWordleChannel) return;

  try {
    const { guildId, id, username, notifications, serverLimitReached } =
      await getMessageCreateVars(content);

    // check if server has reached user limit
    if (serverLimitReached) {
      if (notifications['limits']) {
        await content.reply({ content: LIMIT_REACHED });
        return;
      }
      return;
    }

    const wordles = await getGuildWordles(guildId);
    const leaderboards = await getGuildLeaderboard(guildId);
    const wordleNumber = getWordleNumber(content)!;

    const { isValid, isHardMode, score } = isValidWordleScore(content);

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

      // Update the user data
      const { userData: newData, newAchievements } = await updateUserData({
        username,
        data: userData,
        completed,
        total,
        isHardMode,
        wordleNumber,
        guildId,
        id,
      });

      // Update the leaderboard data
      await updateLeaderboardData({
        username,
        data: leaderboardData,
        completed,
        total,
        isHardMode,
        wordleNumber,
        guildId,
      });

      // If the user has new achievements, send them a message if notifications are enabled
      if (newAchievements.length && notifications['achievements'] === true) {
        await content.reply({
          embeds: [achievementsEmbed(newData, newAchievements)],
        });
      }

      await incrementWordlesEntered();

      console.log(`MESSAGE: Time taken: ${new Date().getTime() - time}ms`);
    } else {
      // If the user tries to submit an invalid score, return an error message
      console.log(`MESSAGE: Time taken: ${new Date().getTime() - time}ms`);
      await content.reply(INVALID_SCORE_TEXT);
    }
  } catch (error) {
    console.log(`MESSAGE: Time taken: ${new Date().getTime() - time}ms`);
    await content.reply(SOMETHING_WENT_WRONG_TEXT);
    logError((error as Error).message, 'messageCreate');
  }
});

client.on('interactionCreate', async (interaction: Interaction) => {
  const time = new Date().getTime();
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
      notifications,
      isActive,
    } = await getInteractionCreateVars(interaction);

    if (commandName === 'set-channel') {
      setChannelCommandHandler({
        interaction,
        guildId,
        guildName,
        channelId,
        hasValidPermissions,
      });
    }

    if (commandName === 'set-role') {
      setRoleCommandHandler({
        interaction,
        guildId,
        hasValidPermissions,
      });
    }

    if (commandName === 'purge-user') {
      purgeUserCommandHandler({
        interaction,
        guildId,
        hasValidPermissions,
      });
    }

    if (commandName === 'reset-users') {
      resetUsersCommandHandler({
        interaction,
        guildId,
        hasValidPermissions,
      });
    }

    if (commandName === 'reset-leaderboard') {
      resetLeaderboardCommandHandler({
        interaction,
        guildId,
        hasValidPermissions,
      });
    }

    if (commandName === 'server-status') {
      serverStatusCommandHandler({
        interaction,
        guildId,
        hasValidPermissions,
        isPremium,
        premiumExpires,
        notifications,
        isActive,
      });
    }

    if (commandName === 'upgrade-server') {
      upgradeServerCommandHandler({
        interaction,
        guildId,
        hasValidPermissions,
      });
    }

    if (commandName === 'enable-notifications') {
      enableNotificationsCommandHandler({
        interaction,
        guildId,
        hasValidPermissions,
      });
    }

    if (commandName === 'disable-notifications') {
      disableNotificationsCommandHandler({
        interaction,
        guildId,
        hasValidPermissions,
      });
    }

    if (commandName === 'my-stats') {
      myStatsCommandHandler({
        interaction,
        guildId,
        userId,
      });
    }

    if (commandName === 'my-achievements') {
      myAchievementsCommandHandler({
        interaction,
        guildId,
        userId,
      });
    }

    if (commandName === 'leaderboard') {
      leaderboardCommandHandler({
        interaction,
        guildId,
      });
    }

    if (commandName === 'simple-leaderboard') {
      simpleLeaderboardCommandHandler({
        interaction,
        guildId,
      });
    }

    if (commandName === 'help') {
      helpCommandHandler({
        interaction,
        hasValidPermissions,
      });
    }

    if (commandName === 'export-data') {
      exportDataCommandHandler({
        interaction,
        guildId,
        hasValidPermissions,
      });
    }

    console.log(`COMMAND: Time taken: ${new Date().getTime() - time}ms`);
  } catch (error) {
    await interaction.reply({
      content: SOMETHING_WENT_WRONG_TEXT,
      flags: MessageFlags.Ephemeral,
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
