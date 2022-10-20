"use strict";
exports.__esModule = true;
var builders_1 = require("@discordjs/builders");
var leaderboardCommand = new builders_1.SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Shows the current leaderboard");
exports["default"] = leaderboardCommand.toJSON();
