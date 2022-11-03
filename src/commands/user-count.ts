import { SlashCommandBuilder } from '@discordjs/builders';

const userCountCommand = new SlashCommandBuilder()
  .setName('user-count')
  .setDescription('Shows the number of users participating in wordles');

export default userCountCommand.toJSON();
