// at the top of your file
import { EmbedBuilder } from 'discord.js';
import { SERVER_LIMIT } from '../util/constants';

const serverStatusEmbed = (
  count: number,
  isPremium: boolean,
  premiumExpires: number,
) => {
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`Server Status 🟩`)
    .addFields({
      name: 'Status: ',
      value: isPremium ? 'Premium' : 'Free',
    })
    .addFields({
      name: 'Total Users: ',
      value: `${String(count)} out of ${
        isPremium
          ? '**unlimited**.'
          : `**${SERVER_LIMIT}**. Consider upgrading to premium to allow more users.`
      }`,
    })
    .addFields({
      name: 'Premium Expires: ',
      value:
        premiumExpires === 0 ? 'Never' : new Date(premiumExpires).toUTCString(),
    });

  return embed;
};

export default serverStatusEmbed;
