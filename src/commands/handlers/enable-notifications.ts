import { ChatInputCommandInteraction, MessageFlags } from 'discord.js';
import { enableNotifications } from '../../util/firebase/firebaseQueries';
import { NO_PERMISSION_TEXT } from '../../util/constants';

interface Props {
  interaction: ChatInputCommandInteraction;
  guildId: string;
  hasValidPermissions: boolean;
}

export const enableNotificationsCommandHandler = async ({
  interaction,
  guildId,
  hasValidPermissions,
}: Props) => {
  if (hasValidPermissions) {
    const option = interaction.options.getString('type') ?? '';

    await enableNotifications(guildId as string, option);

    await interaction.reply({
      content: `You have enabled ${option} notifications!`,
      flags: MessageFlags.Ephemeral,
    });
  } else {
    await interaction.reply({
      content: NO_PERMISSION_TEXT,
      flags: MessageFlags.Ephemeral,
    });
  }
};
