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
  
  // Handle multiple chunks if leaderboard exceeds Discord's 2000 character limit
  if (Array.isArray(leaderboard)) {
    // Send first message as reply
    await interaction.reply(leaderboard[0]);
    // Send remaining chunks as follow-ups
    for (let i = 1; i < leaderboard.length; i++) {
      await interaction.followUp(leaderboard[i]);
    }
  } else {
    await interaction.reply(leaderboard);
  }
};
