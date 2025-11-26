import { ChatInputCommandInteraction, MessageFlags } from 'discord.js';
import { PURGE_USER } from '../../util/constants';
import { purgeUser } from '../../util/firebase/firebaseQueries';

interface Props {
  interaction: ChatInputCommandInteraction;
  guildId: string;
  hasValidPermissions: boolean;
}

export const purgeUserCommandHandler = async ({
  interaction,
  guildId,
  hasValidPermissions,
}: Props) => {
  const member = interaction.options.getUser('user');

  if (hasValidPermissions && member) {
    await purgeUser(guildId as string, member.id);
    await interaction.reply({
      content: PURGE_USER(member.username),
      flags: MessageFlags.Ephemeral,
    });
  }
};
