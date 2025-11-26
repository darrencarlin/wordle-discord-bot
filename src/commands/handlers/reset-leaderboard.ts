import { ChatInputCommandInteraction, MessageFlags } from 'discord.js';
import { NO_PERMISSION_TEXT } from '../../util/constants';
import { resetLeaderboard } from '../../util/firebase/firebaseQueries';

interface Props {
  interaction: ChatInputCommandInteraction;
  guildId: string;
  hasValidPermissions: boolean;
}

export const resetLeaderboardCommandHandler = async ({
  interaction,
  guildId,
  hasValidPermissions,
}: Props) => {
  if (hasValidPermissions) {
    await resetLeaderboard(guildId as string);
    await interaction.reply('The leaderboard has been reset.');
  } else {
    await interaction.reply({
      content: NO_PERMISSION_TEXT,
      flags: MessageFlags.Ephemeral,
    });
  }
};
