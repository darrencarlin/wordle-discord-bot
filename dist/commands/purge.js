"use strict";
exports.__esModule = true;
var builders_1 = require("@discordjs/builders");
var purgeCommand = new builders_1.SlashCommandBuilder()
    .setName("purge")
    .setDescription("Purges a user's stats")
    .addUserOption(function (option) {
    return option
        .setName("user")
        .setDescription("The user you want to purge")
        .setRequired(true);
});
exports["default"] = purgeCommand.toJSON();
