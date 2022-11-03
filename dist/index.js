"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var rest_1 = require("@discordjs/rest");
var discord_js_1 = require("discord.js");
var dotenv_1 = __importDefault(require("dotenv"));
var commands_1 = __importDefault(require("./commands"));
var embeds_1 = require("./embeds");
var constants_1 = require("./util/constants");
var bot_1 = require("./util/functions/bot");
var firebase_1 = require("./util/functions/firebase");
dotenv_1["default"].config();
var client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ]
});
var rest = new rest_1.REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
client.on('ready', function () {
    var _a;
    console.log("".concat((_a = client === null || client === void 0 ? void 0 : client.user) === null || _a === void 0 ? void 0 : _a.username, " has logged in!"));
});
client.on('guildCreate', function (guild) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Joined guild ".concat(guild.name));
                return [4 /*yield*/, (0, firebase_1.createGuild)(guild.id, guild.name)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
client.on('guildDelete', function (guild) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Left guild ".concat(guild.name));
                return [4 /*yield*/, (0, firebase_1.deleteGuild)(guild.id)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
client.on('messageCreate', function (content) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, guildId, channelId, id, username, notifications, serverLimitReached, isWordleChannel, wordles, leaderboards, wordleNumber, _b, isValid, score, _c, completed, total, userData, leaderboardData, _d, newData, newAchievements, error_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 17, , 19]);
                if ((0, bot_1.isRegularMessage)(content))
                    return [2 /*return*/];
                return [4 /*yield*/, (0, bot_1.getMessageVariables)(content)];
            case 1:
                _a = _e.sent(), guildId = _a.guildId, channelId = _a.channelId, id = _a.id, username = _a.username, notifications = _a.notifications, serverLimitReached = _a.serverLimitReached;
                if (!serverLimitReached) return [3 /*break*/, 4];
                if (!notifications['limits']) return [3 /*break*/, 3];
                return [4 /*yield*/, content.reply({ content: constants_1.LIMIT_REACHED })];
            case 2:
                _e.sent();
                return [2 /*return*/];
            case 3: return [2 /*return*/];
            case 4: return [4 /*yield*/, (0, firebase_1.getGuildWordleChannel)(guildId, channelId)];
            case 5:
                isWordleChannel = _e.sent();
                if (!isWordleChannel) return [3 /*break*/, 16];
                return [4 /*yield*/, (0, firebase_1.getGuildWordles)(guildId)];
            case 6:
                wordles = _e.sent();
                return [4 /*yield*/, (0, firebase_1.getGuildLeaderboard)(guildId)];
            case 7:
                leaderboards = _e.sent();
                wordleNumber = (0, bot_1.getWordleNumber)(content);
                _b = (0, bot_1.isValidWordleScore)(content), isValid = _b.isValid, score = _b.score;
                if (!isValid) return [3 /*break*/, 14];
                _c = score.split('/'), completed = _c[0], total = _c[1];
                userData = (0, bot_1.getUserWordleData)(wordles, id, username);
                leaderboardData = (0, bot_1.getUserLeaderboardData)(leaderboards, id, username);
                if (!(wordleNumber <= userData.lastGameNumber)) return [3 /*break*/, 9];
                return [4 /*yield*/, content.reply((0, constants_1.COMPLETED_ALREADY_TEXT)(userData.lastGameNumber.toString()))];
            case 8:
                _e.sent();
                return [2 /*return*/];
            case 9: return [4 /*yield*/, (0, bot_1.updateUserData)({
                    username: username,
                    data: userData,
                    completed: completed,
                    total: total,
                    wordleNumber: wordleNumber,
                    guildId: guildId,
                    id: id
                })];
            case 10:
                _d = _e.sent(), newData = _d.userData, newAchievements = _d.newAchievements;
                return [4 /*yield*/, (0, bot_1.updateLeaderboardData)({
                        username: username,
                        data: leaderboardData,
                        completed: completed,
                        total: total,
                        wordleNumber: wordleNumber,
                        guildId: guildId
                    })];
            case 11:
                _e.sent();
                if (!(newAchievements.length && notifications['achievements'] === true)) return [3 /*break*/, 13];
                return [4 /*yield*/, content.reply({
                        embeds: [(0, embeds_1.achievementsEmbed)(newData, newAchievements)]
                    })];
            case 12:
                _e.sent();
                _e.label = 13;
            case 13: return [3 /*break*/, 16];
            case 14: return [4 /*yield*/, content.reply(constants_1.INVALID_SCORE_TEXT)];
            case 15:
                _e.sent();
                _e.label = 16;
            case 16: return [3 /*break*/, 19];
            case 17:
                error_1 = _e.sent();
                return [4 /*yield*/, content.reply(constants_1.SOMETHING_WENT_WRONG_TEXT)];
            case 18:
                _e.sent();
                (0, firebase_1.logError)(error_1.message, 'messageCreate');
                return [3 /*break*/, 19];
            case 19: return [2 /*return*/];
        }
    });
}); });
client.on('interactionCreate', function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hasValidPermissions, commandName, userId, guildId, channelId, guildName, isPremium, premiumExpires, role, member, count, option, option, data, stats, data, option, wordles, leaderboard, error_2;
    var _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                if (!interaction.isChatInputCommand()) return [3 /*break*/, 62];
                _g.label = 1;
            case 1:
                _g.trys.push([1, 60, , 62]);
                return [4 /*yield*/, (0, bot_1.getCommandVariables)(interaction)];
            case 2:
                _a = _g.sent(), hasValidPermissions = _a.hasValidPermissions, commandName = _a.commandName, userId = _a.userId, guildId = _a.guildId, channelId = _a.channelId, guildName = _a.guildName, isPremium = _a.isPremium, premiumExpires = _a.premiumExpires;
                if (!(commandName === 'set-channel')) return [3 /*break*/, 7];
                if (!(guildId && channelId)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, firebase_1.setWordleChannel)(guildId, channelId, guildName)];
            case 3:
                _g.sent();
                return [4 /*yield*/, interaction.reply({
                        content: 'Wordle channel set!',
                        embeds: [(0, embeds_1.helpEmbed)(hasValidPermissions)]
                    })];
            case 4:
                _g.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, interaction.reply(constants_1.SOMETHING_WENT_WRONG_TEXT)];
            case 6:
                _g.sent();
                _g.label = 7;
            case 7:
                if (!(commandName === 'set-role')) return [3 /*break*/, 12];
                role = interaction.options.getRole('role');
                if (!(hasValidPermissions && role)) return [3 /*break*/, 10];
                return [4 /*yield*/, (0, firebase_1.setAdminRole)(guildId, role.id)];
            case 8:
                _g.sent();
                return [4 /*yield*/, interaction.reply({
                        content: (0, constants_1.SET_WORDLE_ADMIN_ROLE)(role.name),
                        ephemeral: true
                    })];
            case 9:
                _g.sent();
                return [3 /*break*/, 12];
            case 10: return [4 /*yield*/, interaction.reply({
                    content: constants_1.NO_PERMISSION_TEXT,
                    ephemeral: true
                })];
            case 11:
                _g.sent();
                _g.label = 12;
            case 12:
                if (!(commandName === 'purge-user')) return [3 /*break*/, 15];
                member = interaction.options.getUser('user');
                if (!(hasValidPermissions && member)) return [3 /*break*/, 15];
                return [4 /*yield*/, (0, firebase_1.purgeUser)(guildId, member.id)];
            case 13:
                _g.sent();
                return [4 /*yield*/, interaction.reply({
                        content: (0, constants_1.PURGE_USER)(member.username),
                        ephemeral: true
                    })];
            case 14:
                _g.sent();
                _g.label = 15;
            case 15:
                if (!(commandName === 'reset-users')) return [3 /*break*/, 20];
                if (!hasValidPermissions) return [3 /*break*/, 18];
                return [4 /*yield*/, (0, firebase_1.resetUsers)(guildId)];
            case 16:
                _g.sent();
                return [4 /*yield*/, interaction.reply('All users have been reset.')];
            case 17:
                _g.sent();
                return [3 /*break*/, 20];
            case 18: return [4 /*yield*/, interaction.reply({
                    content: constants_1.NO_PERMISSION_TEXT,
                    ephemeral: true
                })];
            case 19:
                _g.sent();
                _g.label = 20;
            case 20:
                if (!(commandName === 'reset-leaderboard')) return [3 /*break*/, 25];
                if (!hasValidPermissions) return [3 /*break*/, 23];
                return [4 /*yield*/, (0, firebase_1.resetLeaderboard)(guildId)];
            case 21:
                _g.sent();
                return [4 /*yield*/, interaction.reply('The leaderboard has been reset.')];
            case 22:
                _g.sent();
                return [3 /*break*/, 25];
            case 23: return [4 /*yield*/, interaction.reply({
                    content: constants_1.NO_PERMISSION_TEXT,
                    ephemeral: true
                })];
            case 24:
                _g.sent();
                _g.label = 25;
            case 25:
                if (!(commandName === 'server-status')) return [3 /*break*/, 30];
                if (!hasValidPermissions) return [3 /*break*/, 28];
                return [4 /*yield*/, (0, firebase_1.getUserCount)(guildId)];
            case 26:
                count = _g.sent();
                return [4 /*yield*/, interaction.reply({
                        embeds: [(0, embeds_1.serverStatusEmbed)(count, isPremium, premiumExpires)],
                        ephemeral: true
                    })];
            case 27:
                _g.sent();
                return [3 /*break*/, 30];
            case 28: return [4 /*yield*/, interaction.reply({
                    content: constants_1.NO_PERMISSION_TEXT,
                    ephemeral: true
                })];
            case 29:
                _g.sent();
                _g.label = 30;
            case 30:
                if (!(commandName === 'upgrade-server')) return [3 /*break*/, 34];
                if (!hasValidPermissions) return [3 /*break*/, 32];
                return [4 /*yield*/, interaction.reply({
                        content: (0, constants_1.UPGRADE_SERVER)(guildId),
                        ephemeral: true
                    })];
            case 31:
                _g.sent();
                return [3 /*break*/, 34];
            case 32: return [4 /*yield*/, interaction.reply({
                    content: constants_1.NO_PERMISSION_TEXT,
                    ephemeral: true
                })];
            case 33:
                _g.sent();
                _g.label = 34;
            case 34:
                if (!(commandName === 'enable-notifications')) return [3 /*break*/, 39];
                if (!hasValidPermissions) return [3 /*break*/, 37];
                option = (_b = interaction.options.getString('type')) !== null && _b !== void 0 ? _b : '';
                return [4 /*yield*/, (0, firebase_1.enableNotifications)(guildId, option)];
            case 35:
                _g.sent();
                return [4 /*yield*/, interaction.reply({
                        content: "You have enabled ".concat(option, " notifications!"),
                        ephemeral: true
                    })];
            case 36:
                _g.sent();
                return [3 /*break*/, 39];
            case 37: return [4 /*yield*/, interaction.reply({
                    content: constants_1.NO_PERMISSION_TEXT,
                    ephemeral: true
                })];
            case 38:
                _g.sent();
                _g.label = 39;
            case 39:
                if (!(commandName === 'disable-notifications')) return [3 /*break*/, 44];
                if (!hasValidPermissions) return [3 /*break*/, 42];
                option = (_c = interaction.options.getString('type')) !== null && _c !== void 0 ? _c : '';
                return [4 /*yield*/, (0, firebase_1.disableNotifications)(guildId, option)];
            case 40:
                _g.sent();
                return [4 /*yield*/, interaction.reply({
                        content: "You have disabled ".concat(option, " notifications!"),
                        ephemeral: true
                    })];
            case 41:
                _g.sent();
                return [3 /*break*/, 44];
            case 42: return [4 /*yield*/, interaction.reply({
                    content: constants_1.NO_PERMISSION_TEXT,
                    ephemeral: true
                })];
            case 43:
                _g.sent();
                _g.label = 44;
            case 44:
                if (!(commandName === 'my-stats')) return [3 /*break*/, 49];
                return [4 /*yield*/, (0, firebase_1.getWordle)(guildId, userId)];
            case 45:
                data = _g.sent();
                if (!data) return [3 /*break*/, 47];
                stats = (0, bot_1.generateUserStats)(data);
                return [4 /*yield*/, interaction.reply({
                        embeds: [(0, embeds_1.statsEmbed)(stats)],
                        ephemeral: (_d = interaction.options.getBoolean('ephemeral')) !== null && _d !== void 0 ? _d : false
                    })];
            case 46:
                _g.sent();
                return [3 /*break*/, 49];
            case 47: return [4 /*yield*/, interaction.reply(constants_1.NOT_PLAYED_TEXT)];
            case 48:
                _g.sent();
                _g.label = 49;
            case 49:
                if (!(commandName === 'my-achievements')) return [3 /*break*/, 54];
                return [4 /*yield*/, (0, firebase_1.getWordle)(guildId, userId)];
            case 50:
                data = _g.sent();
                if (!data) return [3 /*break*/, 52];
                return [4 /*yield*/, interaction.reply({
                        embeds: [(0, embeds_1.achievementsListEmbed)(data)],
                        ephemeral: (_e = interaction.options.getBoolean('ephemeral')) !== null && _e !== void 0 ? _e : false
                    })];
            case 51:
                _g.sent();
                return [3 /*break*/, 54];
            case 52: return [4 /*yield*/, interaction.reply(constants_1.NOT_PLAYED_TEXT)];
            case 53:
                _g.sent();
                _g.label = 54;
            case 54:
                if (!(commandName === 'leaderboard')) return [3 /*break*/, 57];
                option = (_f = interaction.options.getString('sort')) !== null && _f !== void 0 ? _f : '';
                return [4 /*yield*/, (0, firebase_1.getGuildLeaderboard)(guildId)];
            case 55:
                wordles = _g.sent();
                leaderboard = (0, bot_1.generateLeaderboard)(wordles, option);
                return [4 /*yield*/, interaction.reply(leaderboard)];
            case 56:
                _g.sent();
                _g.label = 57;
            case 57:
                if (!(commandName === 'help')) return [3 /*break*/, 59];
                return [4 /*yield*/, interaction.reply({
                        embeds: [(0, embeds_1.helpEmbed)(hasValidPermissions)],
                        ephemeral: true
                    })];
            case 58:
                _g.sent();
                _g.label = 59;
            case 59: return [3 /*break*/, 62];
            case 60:
                error_2 = _g.sent();
                return [4 /*yield*/, interaction.reply({
                        content: constants_1.SOMETHING_WENT_WRONG_TEXT,
                        ephemeral: true
                    })];
            case 61:
                _g.sent();
                (0, firebase_1.logError)(error_2.message, 'interactionCreate');
                return [3 /*break*/, 62];
            case 62: return [2 /*return*/];
        }
    });
}); });
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, rest.put(discord_js_1.Routes.applicationCommands(process.env.CLIENT_ID), {
                        body: commands_1["default"]
                    })];
            case 1:
                _a.sent();
                client.login(process.env.DISCORD_TOKEN);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                (0, firebase_1.logError)(error_3.message, 'applicationCommands');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
