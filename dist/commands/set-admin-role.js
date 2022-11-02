"use strict";
exports.__esModule = true;
var builders_1 = require("@discordjs/builders");
var setAdminRoleCommand = new builders_1.SlashCommandBuilder()
    .setName("set-admin-role")
    .setDescription("Set a user role to be able to use admin commands")
    .addRoleOption(function (option) {
    return option
        .setName("role")
        .setDescription("The role you want to use for admin commands")
        .setRequired(true);
});
exports["default"] = setAdminRoleCommand.toJSON();
