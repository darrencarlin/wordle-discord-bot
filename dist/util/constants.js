"use strict";
exports.__esModule = true;
exports.USER = void 0;
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
        lastGameDate: new Date().toISOString(),
        bestScore: 0,
        scores: [0, 0, 0, 0, 0, 0]
    };
};
exports.USER = USER;
