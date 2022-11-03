"use strict";
exports.__esModule = true;
// at the top of your file
var discord_js_1 = require("discord.js");
var statsEmbed = function (stats) {
    // inside a command, event listener, etc.
    var embed = new discord_js_1.EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Stats for ".concat(stats[0], "!"))
        .addFields({ name: 'Total Wordles: ', value: stats[1] })
        .addFields({ name: 'Percentage Completed: ', value: stats[2] })
        .addFields({ name: 'Average Guesses: ', value: stats[3] })
        .addFields({ name: 'Current Streak: ', value: stats[4] })
        .addFields({ name: 'Best Score: ', value: stats[5] })
        .addFields({ name: 'Last Game Number: ', value: stats[6] })
        .addFields({ name: 'Score Breakdown: ', value: stats[7] });
    return embed;
};
exports["default"] = statsEmbed;
