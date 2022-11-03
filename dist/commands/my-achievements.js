"use strict";
exports.__esModule = true;
var builders_1 = require("@discordjs/builders");
var myAchievementsCommand = new builders_1.SlashCommandBuilder()
    .setName('my-achievements')
    .setDescription('Shows your achievements')
    .addBooleanOption(function (option) {
    return option
        .setName('ephemeral')
        .setDescription('Whether or not the echo should be ephemeral');
});
exports["default"] = myAchievementsCommand.toJSON();
