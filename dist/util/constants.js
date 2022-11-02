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
exports.COMMANDS = exports.NO_PERMISSION_TEXT = exports.NO_LEADERBOARD_DATA = exports.THUMBNAIL_IMAGE = exports.BANNER_IMAGE = exports.SOMETHING_WENT_WRONG_TEXT = exports.NOT_PLAYED_TEXT = exports.INVALID_SCORE_TEXT = exports.COMPLETED_ALREADY_TEXT = exports.PURGE_USER = exports.USER_COUNT = exports.SET_WORDLE_ADMIN_ROLE = exports.UPGRADE_SERVER = exports.POPULATE_USER = void 0;
var POPULATE_USER = function (user) {
    var achievements = [
        {
            id: 1,
            name: "Getting wordly",
            description: "Played your first wordle",
            complete: false
        },
        {
            id: 2,
            name: "Getting wordly",
            description: "Played 5 wordles",
            complete: false
        },
        {
            id: 3,
            name: "Getting wordly",
            description: "Played 10 wordles",
            complete: false
        },
        {
            id: 4,
            name: "Getting wordly",
            description: "Played 25 wordles",
            complete: false
        },
        {
            id: 5,
            name: "Getting wordly",
            description: "Played 50 wordles",
            complete: false
        },
        {
            id: 6,
            name: "Getting wordly",
            description: "Played 100 wordles",
            complete: false
        },
        {
            id: 7,
            name: "Streaking",
            description: "Complete 5 wordles in a row",
            complete: false
        },
        {
            id: 8,
            name: "Streaking",
            description: "Complete 10 wordles in a row",
            complete: false
        },
        {
            id: 9,
            name: "Streaking",
            description: "Complete 25 wordles in a row",
            complete: false
        },
        {
            id: 10,
            name: "Streaking",
            description: "Complete 50 wordles in a row",
            complete: false
        },
        {
            id: 11,
            name: "Streaking",
            description: "Complete 100 wordles in a row",
            complete: false
        },
        {
            id: 12,
            name: "Hard luck",
            description: "Failed a wordle",
            complete: false
        },
        {
            id: 13,
            name: "Wordle in 1",
            description: "Complete a wordle in 1 guess",
            complete: false
        },
        {
            id: 14,
            name: "Wordle in 2",
            description: "Complete a wordle in 2 guesses",
            complete: false
        },
        {
            id: 15,
            name: "Wordle in 3",
            description: "Complete a wordle in 3 guesses",
            complete: false
        },
        {
            id: 16,
            name: "Triple wordle",
            description: "Complete 3 wordles in a row with 3 guesses or less",
            complete: false
        },
        {
            id: 17,
            name: "Completed all achievements",
            description: "You've completed all the achievements!",
            complete: false
        },
    ];
    var USER = {
        userId: "",
        usernames: [],
        wordlesCompleted: 0,
        wordlesFailed: 0,
        totalWordles: 0,
        percentageCompleted: 0,
        percentageFailed: 0,
        completionGuesses: [],
        averageGuesses: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastGameNumber: 0,
        bestScore: 0,
        scores: [0, 0, 0, 0, 0, 0],
        achievements: __spreadArray([], achievements, true)
    };
    // simple type guard
    var wordlesCompleted = "wordlesCompleted" in user;
    if (wordlesCompleted) {
        return {
            userId: user.userId,
            usernames: __spreadArray([], user.usernames, true),
            wordlesCompleted: user.wordlesCompleted,
            wordlesFailed: user.wordlesFailed,
            totalWordles: user.totalWordles,
            percentageCompleted: user.percentageCompleted,
            percentageFailed: user.percentageFailed,
            completionGuesses: user.completionGuesses,
            averageGuesses: user.averageGuesses,
            currentStreak: user.currentStreak,
            longestStreak: user.longestStreak,
            lastGameNumber: user.lastGameNumber,
            bestScore: user.bestScore,
            scores: user.scores,
            achievements: __spreadArray(__spreadArray([], user.achievements, true), achievements, true)
        };
    }
    return __assign(__assign({}, USER), { userId: user.userId, usernames: __spreadArray([], user.usernames, true), achievements: __spreadArray([], achievements, true) });
};
exports.POPULATE_USER = POPULATE_USER;
var UPGRADE_SERVER = function (id) {
    return "Click [here](https://wordlediscordbot.com/upgrade/".concat(id, ") to upgrade your server to allow more users.");
};
exports.UPGRADE_SERVER = UPGRADE_SERVER;
var SET_WORDLE_ADMIN_ROLE = function (role) {
    if (!role)
        return "Opps, something went wrong";
    return "You have set the wordle admin role to **".concat(role, "**");
};
exports.SET_WORDLE_ADMIN_ROLE = SET_WORDLE_ADMIN_ROLE;
var USER_COUNT = function (count) {
    return "There are currently **".concat(count, "** users in the database");
};
exports.USER_COUNT = USER_COUNT;
var PURGE_USER = function (user) {
    return "You have purged **".concat(user, "** from the database");
};
exports.PURGE_USER = PURGE_USER;
var COMPLETED_ALREADY_TEXT = function (lastGameNumber) {
    return "Not so fast, you have already completed this wordle! Your last completed wordle was ".concat(lastGameNumber);
};
exports.COMPLETED_ALREADY_TEXT = COMPLETED_ALREADY_TEXT;
exports.INVALID_SCORE_TEXT = "That score seems to be invalid, make sure it follows the form of `X/6` or `1-6/6`";
exports.NOT_PLAYED_TEXT = "You have not played any wordles yet!";
exports.SOMETHING_WENT_WRONG_TEXT = "Oops, something went wrong. Please try again.";
exports.BANNER_IMAGE = "https://i.imgur.com/iK5igVK.png";
exports.THUMBNAIL_IMAGE = "https://cdn.discordapp.com/app-icons/1032088952116609055/307c23e55b3e11a56130e58507892b7b.png?size=256";
exports.NO_LEADERBOARD_DATA = "No leaderboard data yet!";
exports.NO_PERMISSION_TEXT = "You do not have permission to do that!";
exports.COMMANDS = [
    {
        name: "Help ```/help```",
        description: "Shows all the commands",
        permissions: "all"
    },
    {
        name: "Leaderboard ```/leaderboard```",
        description: "Shows the leaderboard",
        permissions: "all"
    },
    {
        name: "My Stats ```/my-stats```",
        description: "Shows your stats",
        permissions: "all"
    },
    {
        name: "My Achievements ```/my-achievements```",
        description: "Shows your achievements",
        permissions: "all"
    },
    {
        name: "Purge User ```/purge-user <@user>```",
        description: "Purges a user from the database",
        permissions: "admin"
    },
    {
        name: "Reset Leaderboard ```/reset-leaderboard```",
        description: "Resets the leaderboard",
        permissions: "admin"
    },
    {
        name: "Reset Users ```/reset-users```",
        description: "Resets all users",
        permissions: "admin"
    },
    {
        name: "Set Channel ```/set-channel```",
        description: "Sets the current channel as the wordle channel",
        permissions: "admin"
    },
    {
        name: "Set Role ```/set-role <@role>```",
        description: "Sets a role as the wordle admin role",
        permissions: "admin"
    },
    {
        name: "Upgrade Server ```/upgrade-server```",
        description: "Provides a link to upgrade server",
        permissions: "admin"
    },
    {
        name: "User Count ```/user-count```",
        description: "Shows the number of users currently in the database",
        permissions: "admin"
    },
];
