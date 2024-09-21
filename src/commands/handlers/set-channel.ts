import type { ChatInputCommandInteraction } from 'discord.js';
import { helpEmbed } from '../../embeds';
import { SOMETHING_WENT_WRONG_TEXT } from '../../util/constants';
import { setWordleChannel } from '../../util/firebase/firebaseQueries';

interface Props {
  interaction: ChatInputCommandInteraction;
  guildId: string;
  guildName: string;
  channelId: string;
  hasValidPermissions: boolean;
}

export const setChannelCommandHandler = async ({
  interaction,
  guildId,
  guildName,
  channelId,
  hasValidPermissions,
}: Props) => {
  const isValid = guildId && channelId;

  if (!isValid) {
    await interaction.reply(SOMETHING_WENT_WRONG_TEXT);
    return;
  }
  await setWordleChannel(guildId, channelId, guildName);
  await interaction.reply({
    content: 'Wordle channel set!',
    embeds: [helpEmbed(hasValidPermissions)],
  });
};
