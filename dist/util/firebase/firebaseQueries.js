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
exports.getAdminRoleId = exports.logError = exports.getWordle = exports.disableNotifications = exports.enableNotifications = exports.getGuildNotifications = exports.getUserCount = exports.purgeUser = exports.getAdminRole = exports.setAdminRole = exports.resetUsers = exports.resetLeaderboard = exports.updateGuildLeaderboardData = exports.updateGuildUserData = exports.getGuildLeaderboard = exports.getGuildWordles = exports.getGuildWordleChannel = exports.setWordleChannel = exports.deleteGuild = exports.createGuild = exports.getGuildData = void 0;
var firebaseAdmin_1 = require("./firebaseAdmin");
var constants_1 = require("../constants");
// potentially add an option to choose what you need... minimzing calls to db
var getGuildData = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var guild, guildData, users, usersData, serverCount, leaderboards, leaderboardsData, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db.collection('guilds').doc(id).get()];
            case 1:
                guild = _a.sent();
                guildData = guild.data();
                return [4 /*yield*/, firebaseAdmin_1.db.collection("guilds/".concat(id, "/users")).get()];
            case 2:
                users = _a.sent();
                usersData = users.docs.map(function (doc) { return doc.data(); });
                serverCount = users.docs.length;
                return [4 /*yield*/, firebaseAdmin_1.db.collection("guilds/".concat(id, "/leaderboard")).get()];
            case 3:
                leaderboards = _a.sent();
                leaderboardsData = leaderboards.docs.map(function (doc) { return doc.data(); });
                data = {
                    adminRoleId: guildData === null || guildData === void 0 ? void 0 : guildData.adminRoleId,
                    channelId: guildData === null || guildData === void 0 ? void 0 : guildData.channelId,
                    guildId: guildData === null || guildData === void 0 ? void 0 : guildData.guildId,
                    isPremium: guildData === null || guildData === void 0 ? void 0 : guildData.isPremium,
                    name: guildData === null || guildData === void 0 ? void 0 : guildData.name,
                    notifications: __assign(__assign({}, guildData === null || guildData === void 0 ? void 0 : guildData.notifications), constants_1.DEFAULT_NOTIFICATIONS),
                    premiumExpires: guildData === null || guildData === void 0 ? void 0 : guildData.premiumExpires,
                    users: usersData,
                    leaderboards: leaderboardsData,
                    serverCount: serverCount
                };
                return [2 /*return*/, data];
        }
    });
}); };
exports.getGuildData = getGuildData;
var createGuild = function (id, name) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db.collection('guilds').doc(id).set({
                    name: name,
                    guildId: id,
                    isPremium: false,
                    premiumExpires: new Date().getTime(),
                    notifications: constants_1.DEFAULT_NOTIFICATIONS
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.createGuild = createGuild;
var deleteGuild = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db.collection('guilds').doc(id)["delete"]()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.deleteGuild = deleteGuild;
var setWordleChannel = function (id, channelId, guildName) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db.collection('guilds').doc(id).set({
                    channelId: channelId,
                    guildId: id,
                    name: guildName
                }, { merge: true })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.setWordleChannel = setWordleChannel;
var getGuildWordleChannel = function (id, channelId) { return __awaiter(void 0, void 0, void 0, function () {
    var channel;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db.collection('guilds').doc(id).get()];
            case 1:
                channel = _b.sent();
                if (channel.exists) {
                    return [2 /*return*/, ((_a = channel.data()) === null || _a === void 0 ? void 0 : _a.channelId) === channelId];
                }
                else {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getGuildWordleChannel = getGuildWordleChannel;
var getGuildWordles = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var users, wordles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db.collection("guilds/".concat(id, "/users")).get()];
            case 1:
                users = _a.sent();
                wordles = users.docs.map(function (doc) { return doc.data(); });
                return [2 /*return*/, wordles];
        }
    });
}); };
exports.getGuildWordles = getGuildWordles;
var getGuildLeaderboard = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var leaderboards, leaderboard;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db.collection("guilds/".concat(id, "/leaderboard")).get()];
            case 1:
                leaderboards = _a.sent();
                leaderboard = leaderboards.docs.map(function (doc) { return doc.data(); });
                return [2 /*return*/, leaderboard];
        }
    });
}); };
exports.getGuildLeaderboard = getGuildLeaderboard;
var updateGuildUserData = function (id, userId, userData) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db
                    .collection("guilds/".concat(id, "/users"))
                    .doc(userId)
                    .set(userData, { merge: true })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.updateGuildUserData = updateGuildUserData;
var updateGuildLeaderboardData = function (id, userData) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db
                    .collection("guilds/".concat(id, "/leaderboard"))
                    .doc(userData.userId)
                    .set(userData, { merge: true })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.updateGuildLeaderboardData = updateGuildLeaderboardData;
var resetLeaderboard = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db
                    .collection("guilds/".concat(id, "/leaderboard"))
                    .get()
                    .then(function (snapshot) {
                    snapshot.forEach(function (doc) {
                        doc.ref["delete"]();
                    });
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.resetLeaderboard = resetLeaderboard;
var resetUsers = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db
                    .collection("guilds/".concat(id, "/users"))
                    .get()
                    .then(function (snapshot) {
                    snapshot.forEach(function (doc) {
                        doc.ref["delete"]();
                    });
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.resetUsers = resetUsers;
var setAdminRole = function (id, roleId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db.collection('guilds').doc(id).set({
                    adminRoleId: roleId
                }, { merge: true })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.setAdminRole = setAdminRole;
var getAdminRole = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var guild;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db.collection('guilds').doc(id).get()];
            case 1:
                guild = _b.sent();
                return [2 /*return*/, (_a = guild.data()) === null || _a === void 0 ? void 0 : _a.adminRoleId];
        }
    });
}); };
exports.getAdminRole = getAdminRole;
var purgeUser = function (id, userId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db.collection("guilds/".concat(id, "/users")).doc(userId)["delete"]()];
            case 1:
                _a.sent();
                return [4 /*yield*/, firebaseAdmin_1.db.collection("guilds/".concat(id, "/leaderboard")).doc(userId)["delete"]()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.purgeUser = purgeUser;
var getUserCount = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db.collection("guilds/".concat(id, "/users")).get()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, users.docs.length];
        }
    });
}); };
exports.getUserCount = getUserCount;
var getGuildNotifications = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var guild;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db.collection('guilds').doc(id).get()];
            case 1:
                guild = _b.sent();
                return [2 /*return*/, __assign(__assign({}, (_a = guild.data()) === null || _a === void 0 ? void 0 : _a.notifications), constants_1.DEFAULT_NOTIFICATIONS)];
        }
    });
}); };
exports.getGuildNotifications = getGuildNotifications;
var enableNotifications = function (id, option) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db
                    .collection('guilds')
                    .doc(id)
                    .set({
                    notifications: (_a = {},
                        _a[option] = true,
                        _a)
                }, { merge: true })];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.enableNotifications = enableNotifications;
var disableNotifications = function (id, option) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db
                    .collection('guilds')
                    .doc(id)
                    .set({
                    notifications: (_a = {},
                        _a[option] = false,
                        _a)
                }, { merge: true })];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.disableNotifications = disableNotifications;
var getWordle = function (id, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var wordle;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db.collection("guilds/".concat(id, "/users")).doc(userId).get()];
            case 1:
                wordle = _a.sent();
                if (wordle.exists) {
                    return [2 /*return*/, wordle.data()];
                }
                else {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getWordle = getWordle;
var logError = function (error, type) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db.collection('errors').add({
                    error: error,
                    type: type,
                    timestamp: new Date().getTime()
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.logError = logError;
var getAdminRoleId = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var guild;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, firebaseAdmin_1.db.collection('guilds').doc(id).get()];
            case 1:
                guild = _b.sent();
                return [2 /*return*/, (_a = guild.data()) === null || _a === void 0 ? void 0 : _a.adminRoleId];
        }
    });
}); };
exports.getAdminRoleId = getAdminRoleId;
