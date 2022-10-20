import { SlashCommandBuilder } from "@discordjs/builders";

const leaderboardCommand = new SlashCommandBuilder()
  .setName("leaderboard")
  .setDescription("Shows the current leaderboard");

export default leaderboardCommand.toJSON();
