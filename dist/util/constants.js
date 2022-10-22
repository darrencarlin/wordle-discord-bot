"use strict";
exports.__esModule = true;
exports.SOMETHING_WENT_WRONG_TEXT = exports.NOT_PLAYED_TEXT = exports.INVALID_SCORE_TEXT = exports.COMPLETED_TODAY_TEXT = exports.USER = void 0;
var date_fns_1 = require("date-fns");
var USER = function (id, username) {
    return {
        userId: id,
        usernames: [username],
        wordlesCompleted: 0,
        wordlesFailed: 0,
        totalWordles: 0,
        percentageCompleted: 0,
        percentageFailed: 0,
        completionGuesses: [],
        averageGuesses: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastGameDate: "",
        bestScore: 0,
        scores: [0, 0, 0, 0, 0, 0]
    };
};
exports.USER = USER;
var COMPLETED_TODAY_TEXT = function (lastGameDate) {
    return "Not so fast, you have already completed a wordle in the past 24 hours. Please wait until tomorrow to enter a new score. Last game date: ".concat((0, date_fns_1.format)(new Date(lastGameDate), "LLL, do"));
};
exports.COMPLETED_TODAY_TEXT = COMPLETED_TODAY_TEXT;
exports.INVALID_SCORE_TEXT = "That score seems to be invalid, make sure it follows the form of `X/6` or `1-6/6`";
exports.NOT_PLAYED_TEXT = "You have not played any wordles yet!";
exports.SOMETHING_WENT_WRONG_TEXT = "Oops, something went wrong. Please try again.";
