"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.calculateAchievements = exports.calculateBestScore = exports.calculateStreak = exports.calculateUpdatedWordleData = exports.checkForNewUsername = exports.getWordleNumber = exports.generateUserStats = exports.generateLeaderboard = exports.isValidWordleScore = exports.getUserWordleData = void 0;
// Discord bot functions
var achievements_1 = require("../achievements");
var constants_1 = require("../constants");
var getUserWordleData = function (wordles, id, username) {
    var user = wordles.find(function (user) { return user.userId === id; });
    return __assign(__assign({}, (0, constants_1.USER)(id, username)), user);
};
exports.getUserWordleData = getUserWordleData;
var isValidWordleScore = function (data) {
    var firstLine = data.split("\n")[0];
    // Get the score
    var score = firstLine.substring(firstLine.length - 3);
    // Regex to test score
    var regex = /^([1-6]{1}|X)+\/[1-6]+$/i;
    // Test it
    var isValid = regex.test(score);
    return { isValid: isValid, score: score };
};
exports.isValidWordleScore = isValidWordleScore;
var generateLeaderboard = function (wordles) {
    // Sort the leaderboard by percentageCompleted if the totalWordles are the same, then by averageGuesses, then by totalWordles, then by currentStreak, then by bestScore.
    var leaderboard = wordles.sort(function (a, b) {
        if (a.percentageCompleted === b.percentageCompleted) {
            if (a.averageGuesses === b.averageGuesses) {
                if (a.totalWordles === b.totalWordles) {
                    if (a.currentStreak === b.currentStreak) {
                        return b.bestScore - a.bestScore;
                    }
                    return b.currentStreak - a.currentStreak;
                }
                return b.totalWordles - a.totalWordles;
            }
            return a.averageGuesses - b.averageGuesses;
        }
        return b.percentageCompleted - a.percentageCompleted;
    });
    var str = "```";
    leaderboard.forEach(function (user, index) {
        str += "#".concat(index + 1, ". ").concat(user.usernames[0], " - ").concat(user.percentageCompleted, "% completed / ").concat(user.totalWordles, " games / average ").concat(user.averageGuesses, " guesses per game. / current streak: ").concat(user.currentStreak, " / best score: ").concat(user.bestScore);
    });
    str += "```";
    return str;
};
exports.generateLeaderboard = generateLeaderboard;
var generateUserStats = function (data) {
    var stats = [];
    stats.push(data.usernames[0]);
    stats.push("".concat(data.totalWordles));
    stats.push("".concat(data.percentageCompleted, "%"));
    stats.push("".concat(data.averageGuesses));
    stats.push("".concat(data.currentStreak));
    stats.push("".concat(data.bestScore));
    stats.push("".concat(data.lastGameNumber));
    stats.push("".concat(data.scores
        .map(function (score, index) { return "".concat(index + 1, " word gueses x ").concat(score); })
        .join("\n")));
    return stats;
};
exports.generateUserStats = generateUserStats;
var getWordleNumber = function (content) {
    var wordleNumber = content.split(" ")[1];
    if (wordleNumber) {
        return Number(wordleNumber);
    }
};
exports.getWordleNumber = getWordleNumber;
var checkForNewUsername = function (username, userData) {
    if (!userData.usernames.includes(username)) {
        userData.usernames.push(username);
    }
    return userData;
};
exports.checkForNewUsername = checkForNewUsername;
var calculateUpdatedWordleData = function (completed, total, userData) {
    // If the user completed the wordle
    if (Number(completed) <= Number(total)) {
        userData.wordlesCompleted++;
        userData.totalWordles++;
        userData.completionGuesses.push(Number(completed));
        userData.averageGuesses = Math.round(userData.completionGuesses.reduce(function (a, b) { return a + b; }) /
            userData.completionGuesses.length);
    }
    // If the user failed the wordle
    if (completed === "X") {
        userData.wordlesFailed++;
        userData.totalWordles++;
    }
    userData.percentageCompleted = Math.round((userData.wordlesCompleted / userData.totalWordles) * 100);
    userData.percentageFailed = Math.round((userData.wordlesFailed / userData.totalWordles) * 100);
    return userData;
};
exports.calculateUpdatedWordleData = calculateUpdatedWordleData;
var calculateStreak = function (completed, userData, wordleNumber) {
    // 0 = first game
    if (userData.lastGameNumber === 0) {
        userData.lastGameNumber = wordleNumber;
        userData.currentStreak++;
        userData.longestStreak++;
        return userData;
    }
    var isStreak = (userData.lastGameNumber + 1 === wordleNumber && completed !== "X") ||
        completed === "x";
    if (isStreak) {
        userData.currentStreak++;
        if (userData.currentStreak > userData.longestStreak) {
            userData.longestStreak = userData.currentStreak;
        }
    }
    if (!isStreak) {
        userData.currentStreak = 0;
    }
    userData.lastGameNumber = wordleNumber;
    return userData;
};
exports.calculateStreak = calculateStreak;
var calculateBestScore = function (completed, userData) {
    if (Number(completed) < userData.bestScore || userData.bestScore === 0) {
        userData.bestScore = Number(completed);
    }
    // update the scores array
    if (Number(completed) !== NaN) {
        userData.scores[Number(completed) - 1]++;
    }
    return userData;
};
exports.calculateBestScore = calculateBestScore;
var calculateAchievements = function (userData) {
    var achievementsGained = achievements_1.achievements
        .map(function (achievement) { return achievement.check(userData); })
        .flatMap(function (achievement) { return (achievement ? [achievement] : []); });
    userData.achievements = __spreadArray(__spreadArray([], userData.achievements, true), achievementsGained, true);
    return { newUserData: userData, newAchievements: achievementsGained };
};
exports.calculateAchievements = calculateAchievements;
