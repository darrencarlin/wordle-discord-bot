"use strict";
exports.__esModule = true;
var builders_1 = require("@discordjs/builders");
var leaderboardCommand = new builders_1.SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Shows the current leaderboard")
    // add multiselect choices
    .addStringOption(function (option) {
    return option
        .setName("sort")
        .setDescription("Sort by")
        .addChoices({ name: "Average guesses", value: "averageGuesses" }, { name: "Current streak", value: "currentStreak" }, { name: "Best score", value: "bestScore" }, { name: "Total wordles", value: "totalWordles" }, { name: "Wordles Completed", value: "wordlesCompleted" }, { name: "Wordles Failed", value: "wordlesFailed" });
})
    .addBooleanOption(function (option) {
    return option
        .setName("ephemeral")
        .setDescription("Do you want this message to be only visible to you?");
});
exports["default"] = leaderboardCommand.toJSON();
