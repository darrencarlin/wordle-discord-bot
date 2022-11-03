import { SlashCommandBuilder } from '@discordjs/builders';

const statsCommand = new SlashCommandBuilder()
  .setName('my-stats')
  .setDescription('Shows your stats')
  .addBooleanOption((option) =>
    option
      .setName('ephemeral')
      .setDescription('Whether or not the echo should be ephemeral'),
  );

export default statsCommand.toJSON();
