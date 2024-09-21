import { ChatInputCommandInteraction } from 'discord.js';
import { serverStatusEmbed } from '../../embeds';
import { NO_PERMISSION_TEXT } from '../../util/constants';
import { getUserCount } from '../../util/firebase/firebaseQueries';
import { Notifications } from '../../types';

interface Props {
  interaction: ChatInputCommandInteraction;
  guildId: string;
  hasValidPermissions: boolean;
  isPremium: boolean;
  premiumExpires: number;
  notifications: Notifications;
  isActive: boolean;
}

export const serverStatusCommandHandler = async ({
  interaction,
  guildId,
  hasValidPermissions,
  isPremium,
  premiumExpires,
  notifications,
  isActive,
}: Props) => {
  if (hasValidPermissions) {
    const count = await getUserCount(guildId as string);

    await interaction.reply({
      embeds: [
        serverStatusEmbed(
          count,
          isPremium,
          premiumExpires,
          notifications,
          isActive,
        ),
      ],
      ephemeral: true,
    });
  } else {
    await interaction.reply({
      content: NO_PERMISSION_TEXT,
      ephemeral: true,
    });
  }
};
