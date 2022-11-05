// at the top of your file
import { EmbedBuilder } from 'discord.js';
import { Achievement, User } from '../util/types';
import { BANNER_IMAGE } from '../util/constants';
import { countCompletedAchievements } from '../util/botFunctions';

const achievementsEmbed = (userData: User, newAchievements: Achievement[]) => {
  const completedAchievements = countCompletedAchievements(userData);

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`Achievement${newAchievements.length > 1 ? 's' : ''} Unlocked`);

  embed.setDescription(
    `You have unlocked ${completedAchievements} out of ${userData.achievements.length} `,
  );

  newAchievements.forEach((achievement) => {
    embed.addFields({ name: achievement.name, value: achievement.description });
  });

  embed.setImage(BANNER_IMAGE);

  return embed;
};

export default achievementsEmbed;
