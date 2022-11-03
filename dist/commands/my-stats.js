"use strict";
exports.__esModule = true;
var builders_1 = require("@discordjs/builders");
var statsCommand = new builders_1.SlashCommandBuilder()
    .setName('my-stats')
    .setDescription('Shows your stats')
    .addBooleanOption(function (option) {
    return option
        .setName('ephemeral')
        .setDescription('Whether or not the echo should be ephemeral');
});
exports["default"] = statsCommand.toJSON();
