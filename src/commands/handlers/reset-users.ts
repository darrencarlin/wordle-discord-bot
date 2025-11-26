import { ChatInputCommandInteraction, MessageFlags } from 'discord.js';
import { NO_PERMISSION_TEXT } from '../../util/constants';
import { resetUsers } from '../../util/firebase/firebaseQueries';

interface Props {
  interaction: ChatInputCommandInteraction;
  guildId: string;
  hasValidPermissions: boolean;
}

export const resetUsersCommandHandler = async ({
  interaction,
  guildId,
  hasValidPermissions,
}: Props) => {
  if (hasValidPermissions) {
    await resetUsers(guildId as string);
    await interaction.reply('All users have been reset.');
  } else {
    await interaction.reply({
      content: NO_PERMISSION_TEXT,
      flags: MessageFlags.Ephemeral,
    });
  }
};
