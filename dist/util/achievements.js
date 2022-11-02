"use strict";
exports.__esModule = true;
exports.achievementChecks = void 0;
var bot_1 = require("./functions/bot");
// both of these arrays need to be the same length and have the correct
// corresponding achievement check
exports.achievementChecks = [
    {
        check: function (userData) {
            if (userData.totalWordles >= 1 &&
                userData.achievements.find(function (achievement) { return achievement.id === 1 && !achievement.complete; })) {
                return true;
            }
            return false;
        }
    },
    {
        check: function (userData) {
            if (userData.totalWordles >= 5 &&
                userData.achievements.find(function (achievement) { return achievement.id === 2 && !achievement.complete; })) {
                return true;
            }
            return false;
        }
    },
    {
        check: function (userData) {
            if (userData.totalWordles >= 10 &&
                userData.achievements.find(function (achievement) { return achievement.id === 3 && !achievement.complete; })) {
                return true;
            }
            return false;
        }
    },
    {
        check: function (userData) {
            if (userData.totalWordles >= 25 &&
                userData.achievements.find(function (achievement) { return achievement.id === 4 && !achievement.complete; })) {
                return true;
            }
            return false;
        }
    },
    {
        check: function (userData) {
            if (userData.totalWordles >= 50 &&
                userData.achievements.find(function (achievement) { return achievement.id === 5 && !achievement.complete; })) {
                return true;
            }
            return false;
        }
    },
    {
        check: function (userData) {
            if (userData.totalWordles >= 100 &&
                userData.achievements.find(function (achievement) { return achievement.id === 6 && !achievement.complete; })) {
                return true;
            }
            return false;
        }
    },
    {
        check: function (userData) {
            if (userData.currentStreak >= 5 &&
                userData.achievements.find(function (achievement) { return achievement.id === 7 && !achievement.complete; })) {
                return true;
            }
            return false;
        }
    },
    {
        check: function (userData) {
            if (userData.currentStreak >= 10 &&
                userData.achievements.find(function (achievement) { return achievement.id === 8 && !achievement.complete; })) {
                return true;
            }
            return false;
        }
    },
    {
        check: function (userData) {
            if (userData.currentStreak >= 25 &&
                userData.achievements.find(function (achievement) { return achievement.id === 9 && !achievement.complete; })) {
                return true;
            }
            return false;
        }
    },
    {
        check: function (userData) {
            if (userData.currentStreak >= 50 &&
                userData.achievements.find(function (achievement) { return achievement.id === 10 && !achievement.complete; })) {
                return true;
            }
            return false;
        }
    },
    {
        check: function (userData) {
            if (userData.currentStreak >= 100 &&
                userData.achievements.find(function (achievement) { return achievement.id === 11 && !achievement.complete; })) {
                return true;
            }
            return false;
        }
    },
    {
        check: function (userData) {
            if (userData.wordlesFailed >= 1 &&
                userData.achievements.find(function (achievement) { return achievement.id === 12 && !achievement.complete; })) {
                return true;
            }
            return false;
        }
    },
    {
        check: function (userData) {
            if (userData.completionGuesses.includes(1) &&
                userData.achievements.find(function (achievement) { return achievement.id === 13 && !achievement.complete; })) {
                return true;
            }
            return false;
        }
    },
    {
        check: function (userData) {
            if (userData.completionGuesses.includes(2) &&
                userData.achievements.find(function (achievement) { return achievement.id === 14 && !achievement.complete; })) {
                return true;
            }
            return false;
        }
    },
    {
        check: function (userData) {
            if (userData.completionGuesses.includes(3) &&
                userData.achievements.find(function (achievement) { return achievement.id === 15 && !achievement.complete; })) {
                return true;
            }
            return false;
        }
    },
    {
        check: function (userData) {
            var streak = userData.completionGuesses.slice(-3);
            if (streak.length === 3 &&
                streak.every(function (guess) { return guess <= 3; }) &&
                userData.achievements.find(function (achievement) { return achievement.id === 16 && !achievement.complete; })) {
                return true;
            }
            return false;
        }
    },
    {
        check: function (userData) {
            var completedAchievements = (0, bot_1.countCompletedAchievements)(userData);
            var totalAchievements = userData.achievements.length;
            if (completedAchievements === totalAchievements - 1 &&
                userData.achievements.find(function (achievement) { return achievement.id === 17 && !achievement.complete; })) {
                return true;
            }
            return false;
        }
    },
];
