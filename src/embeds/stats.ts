// at the top of your file
import { EmbedBuilder } from "discord.js";

const statsEmbed = (stats: string[]) => {
  // inside a command, event listener, etc.
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`Stats for ${stats[0]}!`)
    .addFields({ name: "Total Wordles: ", value: stats[1] })
    .addFields({ name: "Percentage Completed: ", value: stats[2] })
    .addFields({ name: "Average Guesses: ", value: stats[3] })
    .addFields({ name: "Current Streak: ", value: stats[4] })
    .addFields({ name: "Best Score: ", value: stats[5] })
    .addFields({ name: "Last Game Number: ", value: stats[6] })
    .addFields({ name: "Score Breakdown: ", value: stats[7] });

  return embed;
};

export default statsEmbed;
