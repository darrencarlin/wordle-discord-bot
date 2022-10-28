// at the top of your file
import { EmbedBuilder } from "discord.js";
import { Achievement, User } from "../util/types";
import { achievements as allAchievements } from "../util/achievements";
import { BANNER_IMAGE } from "../util/constants";
import { countCompletedAchievements } from "../util/functions/bot";

const achievementsEmbed = (userData: User, achievements: Achievement[]) => {
  // inside a command, event listener, etc.

  const completedAchievements = countCompletedAchievements(userData);

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`Achievement${achievements.length > 1 ? "s" : ""} Unlocked`);

  embed.setDescription(
    `You have unlocked ${completedAchievements} out of ${allAchievements.length} achievements`
  );

  achievements.forEach((achievement) => {
    embed.addFields({ name: achievement.name, value: achievement.description });
  });

  embed.setImage(BANNER_IMAGE);

  return embed;
};

export default achievementsEmbed;
