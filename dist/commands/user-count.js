"use strict";
exports.__esModule = true;
var builders_1 = require("@discordjs/builders");
var userCountCommand = new builders_1.SlashCommandBuilder()
    .setName('user-count')
    .setDescription('Shows the number of users participating in wordles');
exports["default"] = userCountCommand.toJSON();
