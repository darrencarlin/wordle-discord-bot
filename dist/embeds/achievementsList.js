"use strict";
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var constants_1 = require("../util/constants");
var bot_1 = require("../util/functions/bot");
var achievementsListEmbed = function (userData) {
    var completedAchievements = (0, bot_1.countCompletedAchievements)(userData);
    var count = userData.achievements.length;
    var embed = new discord_js_1.EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Achievement".concat(count > 1 ? "s" : "", " Unlocked"));
    embed.setDescription("You have unlocked ".concat(completedAchievements, " out of ").concat(count, " achievements"));
    userData.achievements.forEach(function (achievement, index) {
        embed.addFields({
            name: "".concat(index + 1, ". ").concat(achievement.name, " ").concat(achievement.complete ? "✅" : "❌"),
            value: achievement.description
        });
    });
    embed.setImage(constants_1.BANNER_IMAGE);
    return embed;
};
exports["default"] = achievementsListEmbed;
