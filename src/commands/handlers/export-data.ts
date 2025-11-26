import { ChatInputCommandInteraction, MessageFlags } from 'discord.js';
import { EXPORT_DATA_TEXT, NO_PERMISSION_TEXT } from '../../util/constants';

interface Props {
  interaction: ChatInputCommandInteraction;
  guildId: string;
  hasValidPermissions: boolean;
}

export const exportDataCommandHandler = async ({
  interaction,
  guildId,
  hasValidPermissions,
}: Props) => {
  if (hasValidPermissions) {
    await interaction.reply({
      content: EXPORT_DATA_TEXT(guildId),
      flags: MessageFlags.Ephemeral,
    });
  } else {
    await interaction.reply({
      content: NO_PERMISSION_TEXT,
      flags: MessageFlags.Ephemeral,
    });
  }
};
