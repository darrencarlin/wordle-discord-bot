"use strict";
exports.__esModule = true;
// at the top of your file
var discord_js_1 = require("discord.js");
var constants_1 = require("../util/constants");
var helpEmbed = function (hasValidPermissions) {
    var embed = new discord_js_1.EmbedBuilder().setColor(0x0099ff).setTitle("Commands");
    if (hasValidPermissions) {
        constants_1.COMMANDS.forEach(function (achievement) {
            embed.addFields({
                name: achievement.name,
                value: achievement.description
            });
        });
    }
    else {
        constants_1.COMMANDS.filter(function (command) { return command.permissions === "all"; }).forEach(function (achievement) {
            embed.addFields({
                name: achievement.name,
                value: achievement.description
            });
        });
    }
    return embed;
};
exports["default"] = helpEmbed;
