"use strict";
exports.__esModule = true;
var builders_1 = require("@discordjs/builders");
var upgradeServerCommand = new builders_1.SlashCommandBuilder()
    .setName("upgrade-server")
    .setDescription("Provides a link to upgrade your server for more users");
exports["default"] = upgradeServerCommand.toJSON();
