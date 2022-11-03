import { SlashCommandBuilder } from '@discordjs/builders';

const serverStatusCommand = new SlashCommandBuilder()
  .setName('server-status')
  .setDescription('Shows the server status');

export default serverStatusCommand.toJSON();
