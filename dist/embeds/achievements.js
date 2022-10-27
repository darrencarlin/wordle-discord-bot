"use strict";
exports.__esModule = true;
// at the top of your file
var discord_js_1 = require("discord.js");
var achievements_1 = require("../util/achievements");
var constants_1 = require("../util/constants");
var achievementsEmbed = function (userData, achievements) {
    // inside a command, event listener, etc.
    var embed = new discord_js_1.EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Achievement".concat(achievements.length > 1 ? "s" : "", " Unlocked"));
    embed.setDescription("You have unlocked ".concat(userData.achievements.length, " out of ").concat(achievements_1.achievements.length, " achievements"));
    achievements.forEach(function (achievement) {
        embed.addFields({ name: achievement.name, value: achievement.description });
    });
    embed.setImage(constants_1.BANNER_IMAGE);
    return embed;
};
exports["default"] = achievementsEmbed;
