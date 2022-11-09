import { SlashCommandBuilder } from '@discordjs/builders';

const leaderboardCommand = new SlashCommandBuilder()
  .setName('leaderboard')
  .setDescription('Shows the current leaderboard')
  // add multiselect choices
  .addStringOption((option) =>
    option
      .setName('sort')
      .setDescription('Sort by')
      .addChoices(
        { name: 'Average guesses', value: 'averageGuesses' },
        { name: 'Current streak', value: 'currentStreak' },
        { name: 'Best score', value: 'bestScore' },
        { name: 'Total wordles ', value: 'totalWordles' },
        { name: 'Wordles Completed', value: 'wordlesCompleted' },
        { name: 'Wordles Failed', value: 'wordlesFailed' },
      ),
  )
  .addBooleanOption((option) =>
    option
      .setName('ephemeral')
      .setDescription('Do you want this message to be only visible to you?'),
  );

export default leaderboardCommand.toJSON();
