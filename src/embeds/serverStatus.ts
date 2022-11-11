// at the top of your file
import { EmbedBuilder } from 'discord.js';
import { SERVER_LIMIT } from '../util/constants';
import { Notifications } from '../util/types';
import { capitalizeEachWord } from '../util/utilfunctions';

const serverStatusEmbed = (
  count: number,
  isPremium: boolean,
  premiumExpires: number,
  notifications: Notifications,
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

  Object.keys(notifications).forEach((key) => {
    const enabled = notifications[key as keyof Notifications];

    embed.addFields({
      name: `${capitalizeEachWord(key)} Notifications: `,
      value: enabled ? 'On' : 'Off',
    });
  });

  return embed;
};

export default serverStatusEmbed;
