import { SlashCommandBuilder } from "@discordjs/builders";

const resetUsersCommand = new SlashCommandBuilder()
  .setName("reset-users")
  .setDescription("Resets all users");

export default resetUsersCommand.toJSON();
