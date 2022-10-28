import { SlashCommandBuilder } from "@discordjs/builders";

const achievementsCommands = new SlashCommandBuilder()
  .setName("achievements")
  .setDescription("Shows your achievements");

export default achievementsCommands.toJSON();
