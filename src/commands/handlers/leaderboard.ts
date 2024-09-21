import { ChatInputCommandInteraction } from 'discord.js';
import { getGuildLeaderboard } from '../../util/firebase/firebaseQueries';
import { generateLeaderboard } from '../../util/botFunctions';

interface Props {
  interaction: ChatInputCommandInteraction;
  guildId: string;
}

export const leaderboardCommandHandler = async ({
  interaction,
  guildId,
}: Props) => {
  const option = interaction.options.getString('sort') ?? '';
  const wordles = await getGuildLeaderboard(guildId as string);
  const leaderboard = generateLeaderboard(wordles, option);
  await interaction.reply(leaderboard);
};
