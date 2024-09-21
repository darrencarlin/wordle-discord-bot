import { ChatInputCommandInteraction } from 'discord.js';
import { helpEmbed } from '../../embeds';

interface Props {
  interaction: ChatInputCommandInteraction;
  hasValidPermissions: boolean;
}

export const helpCommandHandler = async ({
  interaction,
  hasValidPermissions,
}: Props) => {
  await interaction.reply({
    embeds: [helpEmbed(hasValidPermissions)],
    ephemeral: true,
  });
};
