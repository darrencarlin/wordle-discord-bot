"use strict";
exports.__esModule = true;
var builders_1 = require("@discordjs/builders");
var statsCommand = new builders_1.SlashCommandBuilder()
    .setName("stats")
    .setDescription("Shows your stats");
exports["default"] = statsCommand.toJSON();
