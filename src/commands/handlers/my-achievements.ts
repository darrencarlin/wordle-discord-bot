import { ChatInputCommandInteraction } from 'discord.js';
import { achievementsListEmbed } from '../../embeds';
import { getWordle } from '../../util/firebase/firebaseQueries';
import { NOT_PLAYED_TEXT } from '../../util/constants';

interface Props {
  interaction: ChatInputCommandInteraction;
  guildId: string;
  userId: string;
}

export const myAchievementsCommandHandler = async ({
  interaction,
  guildId,
  userId,
}: Props) => {
  const data = await getWordle(guildId as string, userId);
  if (data) {
    await interaction.reply({
      embeds: [achievementsListEmbed(data)],
      ephemeral: interaction.options.getBoolean('ephemeral') ?? false,
    });
  } else {
    await interaction.reply(NOT_PLAYED_TEXT);
  }
};
