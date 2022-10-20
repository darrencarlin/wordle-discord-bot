import dotenv from "dotenv";
dotenv.config();
import { REST } from "@discordjs/rest";
import {
  Client,
  GatewayIntentBits,
  Interaction,
  Routes,
  TextChannel,
} from "discord.js";
import { collection, setDoc, getDocs, doc, getDoc } from "firebase/firestore";
import LeaderboardCommand from "./commands/leaderboard";
import StatsCommand from "./commands/stats";
import { db } from "./util/firebase";
import { User, Wordles } from "./util/types";

const wordleChannel = process.env.WORDLE_CHANNEL!;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

client.on("ready", () =>
  console.log(`${client?.user?.username} has logged in!`)
);

client.on("messageCreate", async (message) => {
  // Ignore if it's a bot message
  if (message.author.bot || !message.content.startsWith("Wordle ")) {
    return;
  }
  const channel = client.channels.cache.get(wordleChannel) as TextChannel;
  const channelId = message.channelId;

  // If the message is in the wordle channel
  if (channelId === wordleChannel) {
    const wordles: Wordles = [];
    // Get users from database
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);
    snapshot.forEach((doc) => {
      wordles.push(doc.data() as User);
    });

    // Get the message content
    const content = message.content;
    // Get the first line of the message
    const firstLine = content.split("\n")[0];
    // Get the score
    const score = firstLine.substring(firstLine.length - 3);
    // Regex to test score
    const regex = /^([1-6]|X)+\/[1-6]+$/i;
    // Test it
    const isValidScore = regex.test(score);

    if (isValidScore) {
      const [completed, total] = score.split("/");

      const userId = message.author.id;
      const username = message.author.username;
      // Get the existing user data or create a new one
      const userData = wordles.find((user) => user.userId === userId) ?? {
        usernames: [username],
        userId,
        wordlesCompleted: 0,
        wordlesFailed: 0,
        totalWordles: 0,
        percentageCompleted: 0,
        percentageFailed: 0,
        completionGuesses: [],
        averageGuesses: 0,
      };

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
      // Update the database
      await setDoc(doc(db, "users", userId), userData);
    } else {
      await channel?.send(
        "That score seems to be invalid, make sure it follows the form of `X/6` or `1-6/6`"
      );
    }
  }
});

client.on("interactionCreate", async (interaction: Interaction) => {
  // Get the channel
  const channel = client.channels.cache.get(wordleChannel) as TextChannel;

  if (interaction.isChatInputCommand()) {
    console.log("interaction - input");
    const commandName = interaction.commandName;
    const userId = interaction.user.id;

    console.log(interaction.user);

    if (commandName === "leaderboard") {
      const wordles: Wordles = [];
      // Get users from database
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      snapshot.forEach((doc) => {
        wordles.push(doc.data() as User);
      });

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

      // Build the leaderboard message

      let str = "";

      leaderboard.forEach((user, index) => {
        str += `** #${index + 1} **. ${user.usernames[0]} - ${
          user.percentageCompleted
        }% completed / ${user.totalWordles} games total / average ${
          user.averageGuesses
        } guesses per game.\n`;
      });

      // Send the leaderboard message
      await interaction.reply({
        content: str,
      });
    } else if (commandName === "stats") {
      // Get the user data
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      // If the user exists
      if (docSnap.exists()) {
        const data = docSnap.data();

        // Build the stats message
        const str = `**Stats for ${data.usernames[0]}**\n\nTotal Wordles: ${data.totalWordles}\nWordles Completed: ${data.wordlesCompleted}\nWordles Failed: ${data.wordlesFailed}\nPercentage Completed: ${data.percentageCompleted}%\nPercentage Failed: ${data.percentageFailed}%\nAverage Guesses Per Wordle: ${data.averageGuesses}`;
        // Send the stats message
        await interaction.reply({
          content: str,
        });
      } else {
        await interaction.reply({
          content: "You have not played any wordles yet!",
        });
      }
    }
  }
});

async function main() {
  const commands = [LeaderboardCommand, StatsCommand];
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID!,
        process.env.GUILD_ID!
      ),
      {
        body: commands,
      }
    );
    client.login(process.env.DISCORD_TOKEN);
  } catch (err) {
    console.log(err);
  }
}

main();
