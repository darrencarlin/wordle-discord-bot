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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.updateLeaderboardData = exports.updateUserData = exports.calculateAchievements = exports.countCompletedAchievements = exports.calculateBestScore = exports.calculateStreak = exports.calculateUpdatedWordleData = exports.checkForNewUsername = exports.getWordleNumber = exports.generateUserStats = exports.generateLeaderboard = exports.sortLeaderboard = exports.isValidWordleScore = exports.getUserLeaderboardData = exports.getUserWordleData = exports.isRegularMessage = exports.getInteractionCreateVars = exports.getMessageCreateVars = void 0;
var achievements_1 = require("./achievements");
var constants_1 = require("./constants");
var firebaseQueries_1 = require("./firebase/firebaseQueries");
var getMessageCreateVars = function (content) { return __awaiter(void 0, void 0, void 0, function () {
    var guildId, _a, id, username, _b, notifications, isPremium, premiumExpires, users, serverCount, userLimit, premium, newWordleUser, serverLimitReached;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                guildId = content.guildId;
                _a = content.author, id = _a.id, username = _a.username;
                return [4 /*yield*/, (0, firebaseQueries_1.getGuildData)(guildId)];
            case 1:
                _b = _c.sent(), notifications = _b.notifications, isPremium = _b.isPremium, premiumExpires = _b.premiumExpires, users = _b.users, serverCount = _b.serverCount;
                userLimit = serverCount >= constants_1.SERVER_LIMIT;
                premium = isPremium || premiumExpires > new Date().getTime();
                newWordleUser = users.filter(function (user) { return user.userId === id; }).length === 0;
                serverLimitReached = userLimit && !premium && newWordleUser;
                return [2 /*return*/, {
                        guildId: guildId,
                        id: id,
                        username: username,
                        notifications: notifications,
                        serverLimitReached: serverLimitReached
                    }];
        }
    });
}); };
exports.getMessageCreateVars = getMessageCreateVars;
var getInteractionCreateVars = function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var serverOwnerId, commandName, userId, guildId, channelId, guildName, _a, isPremium, premiumExpires, adminRoleId, isAdmin, serverOwner, hasValidPermissions;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                serverOwnerId = (_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.ownerId;
                commandName = interaction.commandName;
                userId = interaction.user.id;
                guildId = interaction.guildId;
                channelId = interaction.channelId;
                guildName = (_c = interaction.guild) === null || _c === void 0 ? void 0 : _c.name;
                return [4 /*yield*/, (0, firebaseQueries_1.getGuildData)(guildId)];
            case 1:
                _a = _e.sent(), isPremium = _a.isPremium, premiumExpires = _a.premiumExpires;
                return [4 /*yield*/, (0, firebaseQueries_1.getAdminRoleId)(guildId !== null && guildId !== void 0 ? guildId : '')];
            case 2:
                adminRoleId = _e.sent();
                isAdmin = ((_d = interaction === null || interaction === void 0 ? void 0 : interaction.member) === null || _d === void 0 ? void 0 : _d.roles).cache.has(adminRoleId);
                serverOwner = serverOwnerId === userId;
                hasValidPermissions = isAdmin || serverOwner;
                return [2 /*return*/, {
                        hasValidPermissions: hasValidPermissions,
                        commandName: commandName,
                        userId: userId,
                        guildId: guildId,
                        channelId: channelId,
                        guildName: guildName,
                        isPremium: isPremium,
                        premiumExpires: premiumExpires
                    }];
        }
    });
}); };
exports.getInteractionCreateVars = getInteractionCreateVars;
var isRegularMessage = function (content) {
    return content.author.bot || !content.content.trim().startsWith('Wordle ');
};
exports.isRegularMessage = isRegularMessage;
var getUserWordleData = function (wordles, id, username) {
    var user = wordles.find(function (user) { return user.userId === id; });
    if (user) {
        return __assign(__assign({}, (0, constants_1.POPULATE_USER)(user)), user);
    }
    var newUser = { userId: id, usernames: [username] };
    return __assign({}, (0, constants_1.POPULATE_USER)(newUser));
};
exports.getUserWordleData = getUserWordleData;
var getUserLeaderboardData = function (leaderboards, id, username) {
    var user = leaderboards.find(function (user) { return user.userId === id; });
    if (user)
        return __assign(__assign({}, (0, constants_1.POPULATE_USER)(user)), user);
    var newUser = { userId: id, usernames: [username] };
    return __assign({}, (0, constants_1.POPULATE_USER)(newUser));
};
exports.getUserLeaderboardData = getUserLeaderboardData;
var isValidWordleScore = function (content) {
    var firstLine = content.content.split('\n')[0];
    // Get the score
    var score = firstLine.substring(firstLine.length - 3);
    // Regex to test score
    var regex = /^([1-6]{1}|X)+\/[1-6]+$/i;
    // Test it
    var isValid = regex.test(score);
    return { isValid: isValid, score: score };
};
exports.isValidWordleScore = isValidWordleScore;
var sortLeaderboard = function (wordles, option) {
    var leaderboard;
    if (option) {
        var key_1 = option;
        // lower is better
        var oppositeSortOrder_1 = key_1 === 'averageGuesses' || key_1 === 'bestScore';
        leaderboard = wordles.sort(function (a, b) {
            if (a[key_1] > b[key_1])
                return oppositeSortOrder_1 ? 1 : -1;
            if (a[key_1] < b[key_1])
                return oppositeSortOrder_1 ? 1 : -1;
            return 0;
        });
        return leaderboard;
    }
    // sort the leaderboard by averageGuesses
    leaderboard = wordles.sort(function (a, b) {
        if (a.averageGuesses > b.averageGuesses)
            return 1;
        if (a.averageGuesses < b.averageGuesses)
            return -1;
        return 0;
    });
    // sort the leaderboard by currentStreak
    leaderboard.sort(function (a, b) {
        if (a.currentStreak > b.currentStreak)
            return -1;
        if (a.currentStreak < b.currentStreak)
            return 1;
        return 0;
    });
    return leaderboard;
};
exports.sortLeaderboard = sortLeaderboard;
var generateLeaderboard = function (wordles, option) {
    var leaderboard = (0, exports.sortLeaderboard)(wordles, option);
    var str = '```';
    leaderboard === null || leaderboard === void 0 ? void 0 : leaderboard.forEach(function (user, index) {
        str += "#".concat(index + 1, ". ").concat(user.usernames[0], " - ").concat(user.totalWordles, " games (").concat(user.percentageCompleted, "% completed) / average ").concat(user.averageGuesses, " guesses per game. / current streak: ").concat(user.currentStreak, " / best score: ").concat(user.bestScore, "\n");
    });
    str += '```';
    if (str === '``````') {
        return constants_1.NO_LEADERBOARD_DATA;
    }
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
        .join('\n')));
    return stats;
};
exports.generateUserStats = generateUserStats;
var getWordleNumber = function (content) {
    var wordleNumber = content.content.split(' ')[1];
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
    if (completed === 'X') {
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
    var isStreak = (userData.lastGameNumber + 1 === wordleNumber && completed !== 'X') ||
        completed === 'x';
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
    if (isNaN(Number(completed))) {
        userData.scores[Number(completed) - 1]++;
    }
    return userData;
};
exports.calculateBestScore = calculateBestScore;
var countCompletedAchievements = function (userData) {
    var count = userData.achievements.filter(function (achievement) { return achievement.complete; }).length;
    return count;
};
exports.countCompletedAchievements = countCompletedAchievements;
var calculateAchievements = function (userData) {
    var newAchievements = [];
    userData.achievements.map(function (achieve) {
        var isComplete = achievements_1.achievementChecks[achieve.id - 1].check(userData);
        if (isComplete && !achieve.complete) {
            newAchievements.push(achieve);
            achieve.complete = true;
        }
        return achieve;
    });
    return { userData: userData, newAchievements: newAchievements };
};
exports.calculateAchievements = calculateAchievements;
var updateUserData = function (_a) {
    var username = _a.username, data = _a.data, completed = _a.completed, total = _a.total, wordleNumber = _a.wordleNumber, guildId = _a.guildId, id = _a.id;
    return __awaiter(void 0, void 0, void 0, function () {
        var _b, userData, newAchievements;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    // Update the user data
                    data = (0, exports.checkForNewUsername)(username, data);
                    data = (0, exports.calculateUpdatedWordleData)(completed, total, data);
                    data = (0, exports.calculateStreak)(completed, data, wordleNumber);
                    data = (0, exports.calculateBestScore)(completed, data);
                    _b = (0, exports.calculateAchievements)(data), userData = _b.userData, newAchievements = _b.newAchievements;
                    return [4 /*yield*/, (0, firebaseQueries_1.updateGuildUserData)(guildId, id, userData)];
                case 1:
                    _c.sent();
                    return [2 /*return*/, { userData: userData, newAchievements: newAchievements }];
            }
        });
    });
};
exports.updateUserData = updateUserData;
var updateLeaderboardData = function (_a) {
    var username = _a.username, data = _a.data, completed = _a.completed, total = _a.total, wordleNumber = _a.wordleNumber, guildId = _a.guildId;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = (0, exports.checkForNewUsername)(username, data);
                    data = (0, exports.calculateUpdatedWordleData)(completed, total, data);
                    data = (0, exports.calculateStreak)(completed, data, wordleNumber);
                    data = (0, exports.calculateBestScore)(completed, data);
                    return [4 /*yield*/, (0, firebaseQueries_1.updateGuildLeaderboardData)(guildId, data)];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.updateLeaderboardData = updateLeaderboardData;
