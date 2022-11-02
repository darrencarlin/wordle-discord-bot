"use strict";
exports.__esModule = true;
// at the top of your file
var discord_js_1 = require("discord.js");
var constants_1 = require("../util/constants");
var bot_1 = require("../util/functions/bot");
var achievementsEmbed = function (userData, newAchievements) {
    var completedAchievements = (0, bot_1.countCompletedAchievements)(userData);
    var embed = new discord_js_1.EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Achievement".concat(newAchievements.length > 1 ? "s" : "", " Unlocked"));
    embed.setDescription("You have unlocked ".concat(completedAchievements, " out of ").concat(userData.achievements.length, " "));
    newAchievements.forEach(function (achievement) {
        embed.addFields({ name: achievement.name, value: achievement.description });
    });
    embed.setImage(constants_1.BANNER_IMAGE);
    return embed;
};
exports["default"] = achievementsEmbed;
