import { REST } from "@discordjs/rest";
import { Client, GatewayIntentBits, Interaction, Routes } from "discord.js";
import dotenv from "dotenv";
import LeaderboardCommand from "./commands/leaderboard";
import SetChannelCommand from "./commands/setChannel";
import StatsCommand from "./commands/stats";
import {
  createGuild,
  deleteGuild,
  generateLeaderboard,
  generateUserStats,
  getGuildUsers,
  getUserData,
  getWordle,
  getWordleChannel,
  getWordles,
  isValidScore,
  isValidStreakTime,
  setWordleChannel,
  updateGuildUsers,
} from "./util/functions";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

client.on("ready", () => {
  console.log(`${client?.user?.username} has logged in!`);
});

client.on("guildCreate", async (guild) => {
  console.log(`Joined guild ${guild.name}`);
  await createGuild(guild.id, guild.name);
});

client.on("guildDelete", async (guild) => {
  console.log(`Left guild ${guild.name}`);
  await deleteGuild(guild.id);
});

client.on("messageCreate", async (c) => {
  // Ignore if it's a bot message or just a regular message
  if (c.author.bot || !c.content.startsWith("Wordle ")) {
    return;
  }

  // variable setup
  const guildId = c.guildId;
  const channelId = c.channelId;
  const userId = c.author.id;
  const username = c.author.username;

  // TODO: store this ahead of time potentially to avoid multiple calls
  const isWordleChannel = await getWordleChannel(guildId as string, channelId);

  // If the message is in the wordle channel
  if (isWordleChannel) {
    const wordles = await getGuildUsers(guildId as string);

    const { isValid, score } = isValidScore(c.content);

    if (isValid) {
      const [completed, total] = score.split("/");

      // Get the existing user data or create and return a new one
      const userData = getUserData(wordles, userId, username);

      // Check if username has been updated and add to array if so
      // safe guarding against username changes, render the last one in leaderboards
      if (!userData.usernames.includes(username)) {
        userData.usernames.push(username);
      }

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

      // calculate the streak using the last game date
      const currentDate = new Date().toISOString();
      const lastGameDate = userData.lastGameDate ?? "";
      // We can change this up once everyone has a lastGameDate
      const isValid =
        lastGameDate !== "" ? isValidStreakTime(lastGameDate) : true;

      if (isValid) {
        userData.currentStreak++;
        if (userData.currentStreak > userData.longestStreak) {
          userData.longestStreak = userData.currentStreak;
        }
      }

      if (!isValid) {
        userData.currentStreak = 0;
      }

      // calculate the best score if it needs to be updated

      if (Number(completed) < userData.bestScore || userData.bestScore === 0) {
        userData.bestScore = Number(completed);
      }

      // update the scores array
      if (Number(completed) !== NaN) {
        userData.scores[Number(completed) - 1]++;
      }

      // update the last game date to today
      userData.lastGameDate = currentDate;

      await updateGuildUsers(guildId as string, userId, userData);
    } else {
      await c.reply(
        "That score seems to be invalid, make sure it follows the form of `X/6` or `1-6/6`"
      );
    }
  }
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (interaction.isChatInputCommand()) {
    const commandName = interaction.commandName;
    const userId = interaction.user.id;
    const guildId = interaction.guildId;

    if (commandName === "stats") {
      const data = await getWordle(guildId as string, userId);
      if (data) {
        const stats = generateUserStats(data);
        await interaction.reply(stats);
      } else {
        await interaction.reply({
          content: "You have not played any wordles yet!",
        });
      }

      return;
    }

    if (commandName === "leaderboard") {
      const wordles = await getWordles(guildId as string);
      const leaderboard = generateLeaderboard(wordles);
      await interaction.reply(leaderboard);

      return;
    }

    if (commandName === "set-channel") {
      const guildId = interaction.guildId;
      const channelId = interaction.channelId;

      if (guildId && channelId) {
        await setWordleChannel(guildId, channelId);
        await interaction.reply("Wordle channel set!");
        return;
      }
      await interaction.reply("Oops, something went wrong. Please try again.");

      return;
    }
  }
});

async function main() {
  const commands = [LeaderboardCommand, StatsCommand, SetChannelCommand];
  try {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
      body: commands,
    });
    client.login(process.env.DISCORD_TOKEN);
  } catch (err) {
    console.log(err);
  }
}

main();
