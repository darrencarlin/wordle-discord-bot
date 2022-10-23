import { REST } from "@discordjs/rest";
import {
  Client,
  GatewayIntentBits,
  Interaction,
  Message,
  Routes,
} from "discord.js";
import dotenv from "dotenv";
import LeaderboardCommand from "./commands/leaderboard";
import SetChannelCommand from "./commands/setChannel";
import StatsCommand from "./commands/stats";
import {
  COMPLETED_ALREADY_TEXT,
  INVALID_SCORE_TEXT,
  NOT_PLAYED_TEXT,
  SOMETHING_WENT_WRONG_TEXT,
} from "./util/constants";
import {
  calculateBestScore,
  checkForNewUsername,
  calculateUpdatedWordleData,
  createGuild,
  deleteGuild,
  generateLeaderboard,
  generateUserStats,
  getGuildWordles,
  getUserWordleData,
  getWordle,
  getGuildWordleChannel,
  getWordles,
  isValidWordleScore,
  calculateStreak,
  setWordleChannel,
  updateGuildUserData,
  getWordleNumber,
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

client.on("messageCreate", async (c: Message) => {
  const isRegularMessage =
    c.author.bot || !c.content.trim().startsWith("Wordle ");

  if (isRegularMessage) return;

  // variable setup
  const { guildId, channelId } = c as { guildId: string; channelId: string };
  const { id: userId, username } = c.author;

  // TODO: store this ahead of time potentially to avoid multiple calls
  const isWordleChannel = await getGuildWordleChannel(guildId, channelId);

  if (isWordleChannel) {
    const wordles = await getGuildWordles(guildId);

    const wordleNumber = getWordleNumber(c.content)!;

    const { isValid, score } = isValidWordleScore(c.content);

    if (isValid) {
      const [completed, total] = score.split("/");

      // Get the existing user data or create a new one
      let userData = getUserWordleData(wordles, userId, username);
      // If the user tries to submit the same wordle or an earlier one, return
      if (wordleNumber <= userData.lastGameNumber) {
        await c.reply(
          COMPLETED_ALREADY_TEXT(userData.lastGameNumber.toString())
        );
        return;
      }

      // various functions to update the user data
      userData = checkForNewUsername(username, userData);
      userData = calculateUpdatedWordleData(completed, total, userData);
      userData = calculateStreak(completed, userData, wordleNumber);
      userData = calculateBestScore(completed, userData);
      await updateGuildUserData(guildId, userId, userData);
    } else {
      await c.reply(INVALID_SCORE_TEXT);
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
        await interaction.reply(NOT_PLAYED_TEXT);
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
      await interaction.reply(SOMETHING_WENT_WRONG_TEXT);
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
