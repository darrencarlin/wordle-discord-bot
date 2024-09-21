import { ChatInputCommandInteraction } from 'discord.js';
import { disableNotifications } from '../../util/firebase/firebaseQueries';
import { NO_PERMISSION_TEXT } from '../../util/constants';

interface Props {
  interaction: ChatInputCommandInteraction;
  guildId: string;
  hasValidPermissions: boolean;
}

export const disableNotificationsCommandHandler = async ({
  interaction,
  guildId,
  hasValidPermissions,
}: Props) => {
  if (hasValidPermissions) {
    const option = interaction.options.getString('type') ?? '';

    await disableNotifications(guildId as string, option);

    await interaction.reply({
      content: `You have disabled ${option} notifications!`,
      ephemeral: true,
    });
  } else {
    await interaction.reply({
      content: NO_PERMISSION_TEXT,
      ephemeral: true,
    });
  }
};
