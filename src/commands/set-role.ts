import { SlashCommandBuilder } from "@discordjs/builders";

const setAdminRoleCommand = new SlashCommandBuilder()
  .setName("set-role")
  .setDescription("Set a user role to be able to use admin commands")
  .addRoleOption((option) =>
    option
      .setName("role")
      .setDescription("The role you want to use for admin commands")
      .setRequired(true)
  );

export default setAdminRoleCommand.toJSON();
