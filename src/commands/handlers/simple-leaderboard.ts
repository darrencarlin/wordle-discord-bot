import { ChatInputCommandInteraction } from 'discord.js';
import { generateSimpleLeaderboard } from '../../util/botFunctions';
import { getGuildLeaderboard } from '../../util/firebase/firebaseQueries';

interface Props {
  interaction: ChatInputCommandInteraction;
  guildId: string;
}

export const simpleLeaderboardCommandHandler = async ({
  interaction,
  guildId,
}: Props) => {
  const option = interaction.options.getString('sort') ?? '';
  const wordles = await getGuildLeaderboard(guildId as string);
  const simpleLeaderboard = generateSimpleLeaderboard(wordles, option);
  await interaction.reply(simpleLeaderboard);
};
