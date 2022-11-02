import { SlashCommandBuilder } from "@discordjs/builders";

const myAchievementsCommand = new SlashCommandBuilder()
  .setName("my-achievements")
  .setDescription("Shows your achievements")
  .addBooleanOption((option) =>
    option
      .setName("ephemeral")
      .setDescription("Whether or not the echo should be ephemeral")
  );

export default myAchievementsCommand.toJSON();
