"use strict";
exports.__esModule = true;
var builders_1 = require("@discordjs/builders");
var achievementsCommands = new builders_1.SlashCommandBuilder()
    .setName("achievements")
    .setDescription("Shows your achievements")
    .addBooleanOption(function (option) {
    return option
        .setName("ephemeral")
        .setDescription("Whether or not the echo should be ephemeral");
});
exports["default"] = achievementsCommands.toJSON();
