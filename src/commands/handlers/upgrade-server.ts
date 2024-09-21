import { ChatInputCommandInteraction } from 'discord.js';
import { NO_PERMISSION_TEXT, UPGRADE_SERVER } from '../../util/constants';

interface Props {
  interaction: ChatInputCommandInteraction;
  guildId: string;
  hasValidPermissions: boolean;
}

export const upgradeServerCommandHandler = async ({
  interaction,
  guildId,
  hasValidPermissions,
}: Props) => {
  if (hasValidPermissions) {
    await interaction.reply({
      content: UPGRADE_SERVER(guildId as string),
      ephemeral: true,
    });
  } else {
    await interaction.reply({
      content: NO_PERMISSION_TEXT,
      ephemeral: true,
    });
  }
};
