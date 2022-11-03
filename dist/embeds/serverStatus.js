"use strict";
exports.__esModule = true;
// at the top of your file
var discord_js_1 = require("discord.js");
var constants_1 = require("../util/constants");
var serverStatusEmbed = function (count, isPremium, premiumExpires) {
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
        name: 'Premium Expires: ',
        value: premiumExpires === 0 ? 'Never' : new Date(premiumExpires).toUTCString()
    });
    return embed;
};
exports["default"] = serverStatusEmbed;
