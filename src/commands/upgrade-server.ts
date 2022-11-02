import { SlashCommandBuilder } from "@discordjs/builders";

const upgradeServerCommand = new SlashCommandBuilder()
  .setName("upgrade-server")
  .setDescription("Provides a link to upgrade your server for more users");

export default upgradeServerCommand.toJSON();
