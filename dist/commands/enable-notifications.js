"use strict";
exports.__esModule = true;
var builders_1 = require("@discordjs/builders");
var enableNotificationsCommand = new builders_1.SlashCommandBuilder()
    .setName('enable-notifications')
    .setDescription('Enable notifications for all, achievements, or limits')
    .addStringOption(function (option) {
    return option
        .setName('type')
        .setDescription('The type of notifications to enable')
        .setRequired(true)
        .addChoices({
        name: 'Achievement Notifications',
        value: 'achievements'
    }, {
        name: 'Server Limits Notifications',
        value: 'limits'
    });
});
exports["default"] = enableNotificationsCommand.toJSON();
