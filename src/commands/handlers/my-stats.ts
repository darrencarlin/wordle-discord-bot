import { ChatInputCommandInteraction, MessageFlags } from 'discord.js';
import { getWordle } from '../../util/firebase/firebaseQueries';
import { generateUserStats } from '../../util/botFunctions';
import { statsEmbed } from '../../embeds';
import { NOT_PLAYED_TEXT } from '../../util/constants';

interface Props {
  interaction: ChatInputCommandInteraction;
  guildId: string;
  userId: string;
}

export const myStatsCommandHandler = async ({
  interaction,
  guildId,
  userId,
}: Props) => {
  const data = await getWordle(guildId as string, userId);
  if (data) {
    const stats = generateUserStats(data);
    const isEphemeral = interaction.options.getBoolean('ephemeral') ?? false;
    await interaction.reply({
      embeds: [statsEmbed(stats)],
      ...(isEphemeral && { flags: MessageFlags.Ephemeral }),
    });
  } else {
    await interaction.reply(NOT_PLAYED_TEXT);
  }
};
