import { SlashCommandBuilder } from '@discordjs/builders';

const resetLeaderboardCommand = new SlashCommandBuilder()
  .setName('reset-leaderboard')
  .setDescription('Resets the leaderboard');

export default resetLeaderboardCommand.toJSON();
