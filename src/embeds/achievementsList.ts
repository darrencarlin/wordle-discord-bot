import { EmbedBuilder } from 'discord.js';
import { BANNER_IMAGE } from '../util/constants';
import { countCompletedAchievements } from '../util/botFunctions';
import { User } from '../util/types';

const achievementsListEmbed = (userData: User) => {
  const completedAchievements = countCompletedAchievements(userData);
  const count = userData.achievements.length;

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`Achievement${count > 1 ? 's' : ''} Unlocked`);

  embed.setDescription(
    `You have unlocked ${completedAchievements} out of ${count} achievements`,
  );

  userData.achievements.forEach((achievement, index) => {
    embed.addFields({
      name: `${index + 1}. ${achievement.name} ${
        achievement.complete ? '✅' : '❌'
      }`,
      value: achievement.description,
    });
  });

  embed.setImage(BANNER_IMAGE);

  return embed;
};

export default achievementsListEmbed;
