// at the top of your file
import { EmbedBuilder } from "discord.js";
import {
  achievements,
  achievements as allAchievements,
} from "../util/achievements";
import { BANNER_IMAGE } from "../util/constants";
import { countCompletedAchievements } from "../util/functions/bot";
import { User } from "../util/types";

const achievementsListEmbed = (userData: User) => {
  const completedAchievements = countCompletedAchievements(userData);

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`Achievement${achievements.length > 1 ? "s" : ""} Unlocked`);

  embed.setDescription(
    `You have unlocked ${completedAchievements} out of ${allAchievements.length} achievements`
  );

  userData.achievements.forEach((achievement, index) => {
    embed.addFields({
      name: `${index + 1}. ${achievement.name} ${
        achievement.complete ? "✅" : "❌"
      }`,
      value: achievement.description,
    });
  });

  embed.setImage(BANNER_IMAGE);

  return embed;
};

export default achievementsListEmbed;
