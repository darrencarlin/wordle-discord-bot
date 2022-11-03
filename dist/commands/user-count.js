"use strict";
exports.__esModule = true;
var builders_1 = require("@discordjs/builders");
var serverStatusCommand = new builders_1.SlashCommandBuilder()
    .setName('server-status')
    .setDescription('Shows the server status');
exports["default"] = serverStatusCommand.toJSON();
