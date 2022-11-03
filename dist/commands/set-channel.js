"use strict";
exports.__esModule = true;
var builders_1 = require("@discordjs/builders");
var setChannelCommand = new builders_1.SlashCommandBuilder()
    .setName('set-channel')
    .setDescription('Set the channel used for wordles');
exports["default"] = setChannelCommand.toJSON();
