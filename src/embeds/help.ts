// at the top of your file
import { EmbedBuilder } from "discord.js";
import { COMMANDS } from "../util/constants";

const helpEmbed = (hasValidPermissions: boolean) => {
  const embed = new EmbedBuilder().setColor(0x0099ff).setTitle(`Commands`);

  if (hasValidPermissions) {
    COMMANDS.forEach((achievement) => {
      embed.addFields({
        name: achievement.name,
        value: achievement.description,
      });
    });
  } else {
    COMMANDS.filter((command) => command.permissions === "all").forEach(
      (achievement) => {
        embed.addFields({
          name: achievement.name,
          value: achievement.description,
        });
      }
    );
  }

  return embed;
};

export default helpEmbed;
