"use strict";
exports.__esModule = true;
var builders_1 = require("@discordjs/builders");
var exportDataCommand = new builders_1.SlashCommandBuilder()
    .setName('export-data')
    .setDescription("Provides a link to the your server's data in JSON format");
exports["default"] = exportDataCommand.toJSON();
