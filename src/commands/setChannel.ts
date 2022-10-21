import { SlashCommandBuilder } from "@discordjs/builders";

const setChannelCommand = new SlashCommandBuilder()
  .setName("set-channel")
  .setDescription("Set the channel used for wordles");

export default setChannelCommand.toJSON();
