"use strict";
exports.__esModule = true;
var builders_1 = require("@discordjs/builders");
var helpCommand = new builders_1.SlashCommandBuilder()
    .setName('help')
    .setDescription("Shows the server's commands");
exports["default"] = helpCommand.toJSON();
