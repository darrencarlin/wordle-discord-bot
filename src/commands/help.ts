import { SlashCommandBuilder } from "@discordjs/builders";

const helpCommand = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Shows the server's commands");

export default helpCommand.toJSON();
