"use strict";
exports.__esModule = true;
var builders_1 = require("@discordjs/builders");
var resetUsersCommand = new builders_1.SlashCommandBuilder()
    .setName('reset-users')
    .setDescription('Resets all users');
exports["default"] = resetUsersCommand.toJSON();
