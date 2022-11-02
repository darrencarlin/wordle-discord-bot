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
var commands_1 = require("./commands");
var achievements_1 = __importDefault(require("./embeds/achievements"));
var achievementsList_1 = __importDefault(require("./embeds/achievementsList"));
var help_1 = __importDefault(require("./embeds/help"));
var stats_1 = __importDefault(require("./embeds/stats"));
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
var rest = new rest_1.REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
client.on("ready", function () {
    var _a;
    console.log("".concat((_a = client === null || client === void 0 ? void 0 : client.user) === null || _a === void 0 ? void 0 : _a.username, " has logged in!"));
});
client.on("guildCreate", function (guild) { return __awaiter(void 0, void 0, void 0, function () {
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
client.on("guildDelete", function (guild) { return __awaiter(void 0, void 0, void 0, function () {
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
client.on("messageCreate", function (content) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, guildId, channelId, id, username, isWordleChannel, wordles, leaderboards, wordleNumber, _b, isValid, score, _c, completed, total, userData, leaderboardData, _d, newData, newAchievements;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if ((0, bot_1.isRegularMessage)(content))
                    return [2 /*return*/];
                _a = (0, bot_1.getMessageVariables)(content), guildId = _a.guildId, channelId = _a.channelId, id = _a.id, username = _a.username;
                return [4 /*yield*/, (0, firebase_1.getGuildWordleChannel)(guildId, channelId)];
            case 1:
                isWordleChannel = _e.sent();
                if (!isWordleChannel) return [3 /*break*/, 12];
                return [4 /*yield*/, (0, firebase_1.getGuildWordles)(guildId)];
            case 2:
                wordles = _e.sent();
                return [4 /*yield*/, (0, firebase_1.getGuildLeaderboard)(guildId)];
            case 3:
                leaderboards = _e.sent();
                wordleNumber = (0, bot_1.getWordleNumber)(content);
                _b = (0, bot_1.isValidWordleScore)(content), isValid = _b.isValid, score = _b.score;
                if (!isValid) return [3 /*break*/, 10];
                _c = score.split("/"), completed = _c[0], total = _c[1];
                userData = (0, bot_1.getUserWordleData)(wordles, id, username);
                leaderboardData = (0, bot_1.getUserLeaderboardData)(leaderboards, id, username);
                if (!(wordleNumber <= userData.lastGameNumber)) return [3 /*break*/, 5];
                return [4 /*yield*/, content.reply((0, constants_1.COMPLETED_ALREADY_TEXT)(userData.lastGameNumber.toString()))];
            case 4:
                _e.sent();
                return [2 /*return*/];
            case 5: return [4 /*yield*/, (0, bot_1.updateUserData)({
                    username: username,
                    data: userData,
                    completed: completed,
                    total: total,
                    wordleNumber: wordleNumber,
                    guildId: guildId,
                    id: id
                })];
            case 6:
                _d = _e.sent(), newData = _d.userData, newAchievements = _d.newAchievements;
                return [4 /*yield*/, (0, bot_1.updateLeaderboardData)({
                        username: username,
                        data: leaderboardData,
                        completed: completed,
                        total: total,
                        wordleNumber: wordleNumber,
                        guildId: guildId
                    })];
            case 7:
                _e.sent();
                if (!newAchievements.length) return [3 /*break*/, 9];
                return [4 /*yield*/, content.reply({
                        embeds: [(0, achievements_1["default"])(newData, newAchievements)]
                    })];
            case 8:
                _e.sent();
                _e.label = 9;
            case 9: return [3 /*break*/, 12];
            case 10: return [4 /*yield*/, content.reply(constants_1.INVALID_SCORE_TEXT)];
            case 11:
                _e.sent();
                _e.label = 12;
            case 12: return [2 /*return*/];
        }
    });
}); });
client.on("interactionCreate", function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, hasValidPermissions, commandName, userId, guildId, channelId, guildName, data, stats, option, wordles, leaderboard, role, data, member, count;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (!interaction.isChatInputCommand()) return [3 /*break*/, 48];
                return [4 /*yield*/, (0, bot_1.getCommandVariables)(interaction)];
            case 1:
                _a = _e.sent(), hasValidPermissions = _a.hasValidPermissions, commandName = _a.commandName, userId = _a.userId, guildId = _a.guildId, channelId = _a.channelId, guildName = _a.guildName;
                if (!(commandName === "stats")) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, firebase_1.getWordle)(guildId, userId)];
            case 2:
                data = _e.sent();
                if (!data) return [3 /*break*/, 4];
                stats = (0, bot_1.generateUserStats)(data);
                return [4 /*yield*/, interaction.reply({
                        embeds: [(0, stats_1["default"])(stats)],
                        ephemeral: (_b = interaction.options.getBoolean("ephemeral")) !== null && _b !== void 0 ? _b : false
                    })];
            case 3:
                _e.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, interaction.reply(constants_1.NOT_PLAYED_TEXT)];
            case 5:
                _e.sent();
                _e.label = 6;
            case 6:
                if (!(commandName === "leaderboard")) return [3 /*break*/, 9];
                option = (_c = interaction.options.getString("sort")) !== null && _c !== void 0 ? _c : "";
                return [4 /*yield*/, (0, firebase_1.getGuildLeaderboard)(guildId)];
            case 7:
                wordles = _e.sent();
                leaderboard = (0, bot_1.generateLeaderboard)(wordles, option);
                return [4 /*yield*/, interaction.reply(leaderboard)];
            case 8:
                _e.sent();
                _e.label = 9;
            case 9:
                if (!(commandName === "reset-leaderboard")) return [3 /*break*/, 14];
                if (!hasValidPermissions) return [3 /*break*/, 12];
                return [4 /*yield*/, (0, firebase_1.resetLeaderboard)(guildId)];
            case 10:
                _e.sent();
                return [4 /*yield*/, interaction.reply("The leaderboard has been reset.")];
            case 11:
                _e.sent();
                return [3 /*break*/, 14];
            case 12: return [4 /*yield*/, interaction.reply({
                    content: constants_1.NO_PERMISSION_TEXT,
                    ephemeral: true
                })];
            case 13:
                _e.sent();
                _e.label = 14;
            case 14:
                if (!(commandName === "reset-users")) return [3 /*break*/, 19];
                if (!hasValidPermissions) return [3 /*break*/, 17];
                return [4 /*yield*/, (0, firebase_1.resetUsers)(guildId)];
            case 15:
                _e.sent();
                return [4 /*yield*/, interaction.reply("All users have been reset.")];
            case 16:
                _e.sent();
                return [3 /*break*/, 19];
            case 17: return [4 /*yield*/, interaction.reply({
                    content: constants_1.NO_PERMISSION_TEXT,
                    ephemeral: true
                })];
            case 18:
                _e.sent();
                _e.label = 19;
            case 19:
                if (!(commandName === "set-channel")) return [3 /*break*/, 24];
                if (!(guildId && channelId)) return [3 /*break*/, 22];
                return [4 /*yield*/, (0, firebase_1.setWordleChannel)(guildId, channelId, guildName)];
            case 20:
                _e.sent();
                return [4 /*yield*/, interaction.reply("Wordle channel set!")];
            case 21:
                _e.sent();
                return [3 /*break*/, 24];
            case 22: return [4 /*yield*/, interaction.reply(constants_1.SOMETHING_WENT_WRONG_TEXT)];
            case 23:
                _e.sent();
                _e.label = 24;
            case 24:
                if (!(commandName === "set-admin-role")) return [3 /*break*/, 29];
                role = interaction.options.getRole("role");
                if (!(hasValidPermissions && role)) return [3 /*break*/, 27];
                return [4 /*yield*/, (0, firebase_1.setAdminRole)(guildId, role.id)];
            case 25:
                _e.sent();
                return [4 /*yield*/, interaction.reply({
                        content: (0, constants_1.SET_WORDLE_ADMIN_ROLE)(role.name),
                        ephemeral: true
                    })];
            case 26:
                _e.sent();
                return [3 /*break*/, 29];
            case 27: return [4 /*yield*/, interaction.reply({
                    content: constants_1.NO_PERMISSION_TEXT,
                    ephemeral: true
                })];
            case 28:
                _e.sent();
                _e.label = 29;
            case 29:
                if (!(commandName === "achievements")) return [3 /*break*/, 34];
                return [4 /*yield*/, (0, firebase_1.getWordle)(guildId, userId)];
            case 30:
                data = _e.sent();
                if (!data) return [3 /*break*/, 32];
                return [4 /*yield*/, interaction.reply({
                        embeds: [(0, achievementsList_1["default"])(data)],
                        ephemeral: (_d = interaction.options.getBoolean("ephemeral")) !== null && _d !== void 0 ? _d : false
                    })];
            case 31:
                _e.sent();
                return [3 /*break*/, 34];
            case 32: return [4 /*yield*/, interaction.reply(constants_1.NOT_PLAYED_TEXT)];
            case 33:
                _e.sent();
                _e.label = 34;
            case 34:
                if (!(commandName === "purge-user")) return [3 /*break*/, 37];
                member = interaction.options.getUser("user");
                if (!(hasValidPermissions && member)) return [3 /*break*/, 37];
                return [4 /*yield*/, (0, firebase_1.purgeUser)(guildId, member.id)];
            case 35:
                _e.sent();
                return [4 /*yield*/, interaction.reply({
                        content: (0, constants_1.PURGE_USER)(member.username),
                        ephemeral: true
                    })];
            case 36:
                _e.sent();
                _e.label = 37;
            case 37:
                if (!(commandName === "user-count")) return [3 /*break*/, 42];
                if (!hasValidPermissions) return [3 /*break*/, 40];
                return [4 /*yield*/, (0, firebase_1.getUserCount)(guildId)];
            case 38:
                count = _e.sent();
                return [4 /*yield*/, interaction.reply({
                        content: (0, constants_1.USER_COUNT)(count),
                        ephemeral: true
                    })];
            case 39:
                _e.sent();
                return [3 /*break*/, 42];
            case 40: return [4 /*yield*/, interaction.reply({
                    content: constants_1.NO_PERMISSION_TEXT,
                    ephemeral: true
                })];
            case 41:
                _e.sent();
                _e.label = 42;
            case 42:
                if (!(commandName === "upgrade-server")) return [3 /*break*/, 46];
                if (!hasValidPermissions) return [3 /*break*/, 44];
                return [4 /*yield*/, interaction.reply({
                        content: (0, constants_1.UPGRADE_SERVER)(guildId),
                        ephemeral: true
                    })];
            case 43:
                _e.sent();
                return [3 /*break*/, 46];
            case 44: return [4 /*yield*/, interaction.reply({
                    content: constants_1.NO_PERMISSION_TEXT,
                    ephemeral: true
                })];
            case 45:
                _e.sent();
                _e.label = 46;
            case 46:
                if (!(commandName === "help")) return [3 /*break*/, 48];
                return [4 /*yield*/, interaction.reply({
                        embeds: [(0, help_1["default"])(hasValidPermissions)],
                        ephemeral: true
                    })];
            case 47:
                _e.sent();
                _e.label = 48;
            case 48: return [2 /*return*/];
        }
    });
}); });
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var commands, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    commands = [
                        commands_1.leaderboardCommand,
                        commands_1.resetLeaderboardCommand,
                        commands_1.myStatsCommand,
                        commands_1.setChannelCommand,
                        commands_1.myAchievementsCommand,
                        commands_1.resetUsersCommand,
                        commands_1.setRoleCommand,
                        commands_1.purgeUserCommand,
                        commands_1.userCountCommand,
                        commands_1.upgradeServerCommand,
                        commands_1.helpCommand,
                    ];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, rest.put(discord_js_1.Routes.applicationCommands(process.env.CLIENT_ID), {
                            body: commands
                        })];
                case 2:
                    _a.sent();
                    client.login(process.env.DISCORD_TOKEN);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
main();
