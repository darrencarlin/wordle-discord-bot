"use strict";
exports.__esModule = true;
var builders_1 = require("@discordjs/builders");
var resetLeaderboardCommand = new builders_1.SlashCommandBuilder()
    .setName('reset-leaderboard')
    .setDescription('Resets the leaderboard');
exports["default"] = resetLeaderboardCommand.toJSON();
