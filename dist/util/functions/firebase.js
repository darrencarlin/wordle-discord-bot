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
exports.disableNotifications = exports.enableNotifications = exports.getGuidNotifications = exports.logError = exports.getUsers = exports.getUserCount = exports.getGuildMetadata = exports.purgeUser = exports.getAdminRoleId = exports.setAdminRole = exports.resetUsers = exports.resetLeaderboard = exports.updateGuildLeaderboardData = exports.updateGuildUserData = exports.getGuildLeaderboard = exports.getGuildWordles = exports.getGuildWordleChannel = exports.setWordleChannel = exports.deleteGuild = exports.createGuild = exports.getWordle = void 0;
// Firebase functions
var firestore_1 = require("firebase/firestore");
var constants_1 = require("../constants");
var firebase_1 = require("../firebase");
var getWordle = function (id, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var usersSubcollection, userDoc, userDocSnap;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                usersSubcollection = (0, firestore_1.collection)(firebase_1.db, 'guilds', id, 'users');
                userDoc = (0, firestore_1.doc)(usersSubcollection, userId);
                return [4 /*yield*/, (0, firestore_1.getDoc)(userDoc)];
            case 1:
                userDocSnap = _a.sent();
                if (userDocSnap.exists()) {
                    return [2 /*return*/, userDocSnap.data()];
                }
                return [2 /*return*/, false];
        }
    });
}); };
exports.getWordle = getWordle;
var createGuild = function (id, name) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.db, 'guilds', id), {
                    guildId: id,
                    name: name,
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
            case 0: return [4 /*yield*/, (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_1.db, 'guilds', id))];
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
            case 0: return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.db, 'guilds', id), { channelId: channelId, guildId: id, name: guildName }, { merge: true })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.setWordleChannel = setWordleChannel;
var getGuildWordleChannel = function (id, channelId) { return __awaiter(void 0, void 0, void 0, function () {
    var docRef, docSnap;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                docRef = (0, firestore_1.doc)(firebase_1.db, 'guilds', id);
                return [4 /*yield*/, (0, firestore_1.getDoc)(docRef)];
            case 1:
                docSnap = _b.sent();
                if (docSnap.exists()) {
                    return [2 /*return*/, ((_a = docSnap.data()) === null || _a === void 0 ? void 0 : _a.channelId) === channelId];
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
    var usersSubcollection, usersSnapshot, wordles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                usersSubcollection = (0, firestore_1.collection)(firebase_1.db, 'guilds', id, 'users');
                return [4 /*yield*/, (0, firestore_1.getDocs)(usersSubcollection)];
            case 1:
                usersSnapshot = _a.sent();
                wordles = [];
                usersSnapshot.forEach(function (doc) {
                    wordles.push(doc.data());
                });
                return [2 /*return*/, wordles !== null && wordles !== void 0 ? wordles : []];
        }
    });
}); };
exports.getGuildWordles = getGuildWordles;
var getGuildLeaderboard = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var leaderboardSubcollection, leaderboardSnapshot, leaderboard;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                leaderboardSubcollection = (0, firestore_1.collection)(firebase_1.db, 'guilds', id, 'leaderboard');
                return [4 /*yield*/, (0, firestore_1.getDocs)(leaderboardSubcollection)];
            case 1:
                leaderboardSnapshot = _a.sent();
                leaderboard = [];
                leaderboardSnapshot.forEach(function (doc) {
                    leaderboard.push(doc.data());
                });
                return [2 /*return*/, leaderboard !== null && leaderboard !== void 0 ? leaderboard : []];
        }
    });
}); };
exports.getGuildLeaderboard = getGuildLeaderboard;
var updateGuildUserData = function (id, userId, userData) { return __awaiter(void 0, void 0, void 0, function () {
    var usersSubcollection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                usersSubcollection = (0, firestore_1.collection)(firebase_1.db, 'guilds', id, 'users');
                return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(usersSubcollection, userId), userData, { merge: true })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.updateGuildUserData = updateGuildUserData;
var updateGuildLeaderboardData = function (id, userData) { return __awaiter(void 0, void 0, void 0, function () {
    var leaderboardSubcollection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                leaderboardSubcollection = (0, firestore_1.collection)(firebase_1.db, 'guilds', id, 'leaderboard');
                return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(leaderboardSubcollection, userData.userId), userData, {
                        merge: true
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.updateGuildLeaderboardData = updateGuildLeaderboardData;
var resetLeaderboard = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var leaderboardSubcollection, leaderboardSnapshot;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                leaderboardSubcollection = (0, firestore_1.collection)(firebase_1.db, 'guilds', id, 'leaderboard');
                return [4 /*yield*/, (0, firestore_1.getDocs)(leaderboardSubcollection)];
            case 1:
                leaderboardSnapshot = _a.sent();
                leaderboardSnapshot.forEach(function (doc) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, firestore_1.deleteDoc)(doc.ref)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
exports.resetLeaderboard = resetLeaderboard;
var resetUsers = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var usersSubcollection, usersSnapshot;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                usersSubcollection = (0, firestore_1.collection)(firebase_1.db, 'guilds', id, 'users');
                return [4 /*yield*/, (0, firestore_1.getDocs)(usersSubcollection)];
            case 1:
                usersSnapshot = _a.sent();
                usersSnapshot.forEach(function (doc) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, firestore_1.deleteDoc)(doc.ref)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
exports.resetUsers = resetUsers;
var setAdminRole = function (id, roleId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.db, 'guilds', id), { adminRoleId: roleId }, { merge: true })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.setAdminRole = setAdminRole;
var getAdminRoleId = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var docRef, docSnap;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                docRef = (0, firestore_1.doc)(firebase_1.db, 'guilds', id);
                return [4 /*yield*/, (0, firestore_1.getDoc)(docRef)];
            case 1:
                docSnap = _b.sent();
                if (docSnap.exists()) {
                    return [2 /*return*/, (_a = docSnap.data()) === null || _a === void 0 ? void 0 : _a.adminRoleId];
                }
                else {
                    return [2 /*return*/, ''];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getAdminRoleId = getAdminRoleId;
var purgeUser = function (id, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var usersSubcollection, leaderboardSubcollection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                usersSubcollection = (0, firestore_1.collection)(firebase_1.db, 'guilds', id, 'users');
                leaderboardSubcollection = (0, firestore_1.collection)(firebase_1.db, 'guilds', id, 'leaderboard');
                return [4 /*yield*/, (0, firestore_1.deleteDoc)((0, firestore_1.doc)(usersSubcollection, userId))];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, firestore_1.deleteDoc)((0, firestore_1.doc)(leaderboardSubcollection, userId))];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.purgeUser = purgeUser;
var getGuildMetadata = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var docRef, docSnap;
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                docRef = (0, firestore_1.doc)(firebase_1.db, 'guilds', id);
                return [4 /*yield*/, (0, firestore_1.getDoc)(docRef)];
            case 1:
                docSnap = _j.sent();
                return [2 /*return*/, {
                        adminRoleId: (_b = (_a = docSnap.data()) === null || _a === void 0 ? void 0 : _a.adminRoleId) !== null && _b !== void 0 ? _b : '',
                        notifications: (_d = (_c = docSnap.data()) === null || _c === void 0 ? void 0 : _c.notifications) !== null && _d !== void 0 ? _d : constants_1.DEFAULT_NOTIFICATIONS,
                        isPremium: (_f = (_e = docSnap.data()) === null || _e === void 0 ? void 0 : _e.isPremium) !== null && _f !== void 0 ? _f : false,
                        premiumExpires: (_h = (_g = docSnap.data()) === null || _g === void 0 ? void 0 : _g.premiumExpires) !== null && _h !== void 0 ? _h : new Date().getTime() - 1
                    }];
        }
    });
}); };
exports.getGuildMetadata = getGuildMetadata;
var getUserCount = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var usersSubcollection, usersSnapshot;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                usersSubcollection = (0, firestore_1.collection)(firebase_1.db, 'guilds', id, 'users');
                return [4 /*yield*/, (0, firestore_1.getDocs)(usersSubcollection)];
            case 1:
                usersSnapshot = _a.sent();
                return [2 /*return*/, usersSnapshot.size];
        }
    });
}); };
exports.getUserCount = getUserCount;
var getUsers = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var usersSubcollection, usersSnapshot, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                usersSubcollection = (0, firestore_1.collection)(firebase_1.db, 'guilds', id, 'users');
                return [4 /*yield*/, (0, firestore_1.getDocs)(usersSubcollection)];
            case 1:
                usersSnapshot = _a.sent();
                users = [];
                usersSnapshot.forEach(function (doc) {
                    users.push(doc.data());
                });
                return [2 /*return*/, users];
        }
    });
}); };
exports.getUsers = getUsers;
var logError = function (error, type) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.db, 'errors', new Date().toUTCString()), {
                    error: error,
                    type: type
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.logError = logError;
var getGuidNotifications = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var docRef, docSnap;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                docRef = (0, firestore_1.doc)(firebase_1.db, 'guilds', id);
                return [4 /*yield*/, (0, firestore_1.getDoc)(docRef)];
            case 1:
                docSnap = _b.sent();
                if (docSnap.exists()) {
                    return [2 /*return*/, __assign(__assign({}, (_a = docSnap.data()) === null || _a === void 0 ? void 0 : _a.notifications), constants_1.DEFAULT_NOTIFICATIONS)];
                }
                else {
                    return [2 /*return*/, constants_1.DEFAULT_NOTIFICATIONS];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getGuidNotifications = getGuidNotifications;
var enableNotifications = function (id, option) { return __awaiter(void 0, void 0, void 0, function () {
    var docRef, docSnap, notifications;
    var _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                docRef = (0, firestore_1.doc)(firebase_1.db, 'guilds', id);
                return [4 /*yield*/, (0, firestore_1.getDoc)(docRef)];
            case 1:
                docSnap = _c.sent();
                if (!docSnap.exists()) return [3 /*break*/, 5];
                notifications = (_b = docSnap.data()) === null || _b === void 0 ? void 0 : _b.notifications;
                if (!notifications) return [3 /*break*/, 3];
                notifications[option] = true;
                return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.db, 'guilds', id), { notifications: notifications }, { merge: true })];
            case 2:
                _c.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.db, 'guilds', id), { notifications: (_a = {}, _a[option] = true, _a) }, { merge: true })];
            case 4:
                _c.sent();
                _c.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.enableNotifications = enableNotifications;
var disableNotifications = function (id, option) { return __awaiter(void 0, void 0, void 0, function () {
    var docRef, docSnap, notifications;
    var _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                docRef = (0, firestore_1.doc)(firebase_1.db, 'guilds', id);
                return [4 /*yield*/, (0, firestore_1.getDoc)(docRef)];
            case 1:
                docSnap = _c.sent();
                if (!docSnap.exists()) return [3 /*break*/, 5];
                notifications = (_b = docSnap.data()) === null || _b === void 0 ? void 0 : _b.notifications;
                if (!notifications) return [3 /*break*/, 3];
                notifications[option] = false;
                return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.db, 'guilds', id), { notifications: notifications }, { merge: true })];
            case 2:
                _c.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.db, 'guilds', id), { notifications: (_a = {}, _a[option] = false, _a) }, { merge: true })];
            case 4:
                _c.sent();
                _c.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.disableNotifications = disableNotifications;
