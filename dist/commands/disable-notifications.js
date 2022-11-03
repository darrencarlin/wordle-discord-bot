"use strict";
exports.__esModule = true;
var builders_1 = require("@discordjs/builders");
var disableNotifications = new builders_1.SlashCommandBuilder()
    .setName('disable-notifications')
    .setDescription('Disable notifications for all, achievements, or limits')
    .addStringOption(function (option) {
    return option
        .setName('type')
        .setDescription('The type of notifications to disable')
        .setRequired(true)
        .addChoices({
        name: 'Achievement Notifications',
        value: 'achievements'
    }, {
        name: 'Server Limit Notifications',
        value: 'limits'
    });
});
exports["default"] = disableNotifications.toJSON();
