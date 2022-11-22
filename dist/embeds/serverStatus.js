"use strict";
exports.__esModule = true;
// at the top of your file
var discord_js_1 = require("discord.js");
var constants_1 = require("../util/constants");
var utilfunctions_1 = require("../util/utilfunctions");
var serverStatusEmbed = function (count, isPremium, premiumExpires, notifications, isActive) {
    var embed = new discord_js_1.EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Server Status \uD83D\uDFE9")
        .addFields({
        name: 'Status: ',
        value: isPremium ? 'Premium' : 'Free'
    })
        .addFields({
        name: 'Total Users: ',
        value: "".concat(String(count), " out of ").concat(isPremium
            ? '**unlimited**.'
            : "**".concat(constants_1.SERVER_LIMIT, "**. Consider upgrading to premium to allow more users."))
    })
        .addFields({
        name: isActive ? 'Premium Renews: ' : 'Premium Expires: ',
        value: premiumExpires === 0 ? 'Never' : new Date(premiumExpires).toUTCString()
    });
    Object.keys(notifications).forEach(function (key) {
        var enabled = notifications[key];
        embed.addFields({
            name: "".concat((0, utilfunctions_1.capitalizeEachWord)(key), " Notifications: "),
            value: enabled ? 'On' : 'Off'
        });
    });
    return embed;
};
exports["default"] = serverStatusEmbed;
