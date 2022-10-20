import { SlashCommandBuilder } from "@discordjs/builders";

const statsCommand = new SlashCommandBuilder()
  .setName("stats")
  .setDescription("Shows your stats");

export default statsCommand.toJSON();
