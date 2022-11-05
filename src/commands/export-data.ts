import { SlashCommandBuilder } from '@discordjs/builders';

const exportDataCommand = new SlashCommandBuilder()
  .setName('export-data')
  .setDescription("Provides a link to the your server's data in JSON format");

export default exportDataCommand.toJSON();
