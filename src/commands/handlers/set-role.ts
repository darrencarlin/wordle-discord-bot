import { ChatInputCommandInteraction } from 'discord.js';
import {
  NO_PERMISSION_TEXT,
  SET_WORDLE_ADMIN_ROLE,
} from '../../util/constants';
import { setAdminRole } from '../../util/firebase/firebaseQueries';

interface Props {
  interaction: ChatInputCommandInteraction;
  guildId: string;
  hasValidPermissions: boolean;
}

export const setRoleCommandHandler = async ({
  interaction,
  guildId,
  hasValidPermissions,
}: Props) => {
  const role = interaction.options.getRole('role');
  const isValid = hasValidPermissions && role;

  if (!isValid) {
    return await interaction.reply({
      content: NO_PERMISSION_TEXT,
      ephemeral: true,
    });
  }

  await setAdminRole(guildId as string, role.id);
  await interaction.reply({
    content: SET_WORDLE_ADMIN_ROLE(role.name),
    ephemeral: true,
  });
};
