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
var leaderboard_1 = __importDefault(require("./commands/leaderboard"));
var setChannel_1 = __importDefault(require("./commands/setChannel"));
var stats_1 = __importDefault(require("./commands/stats"));
var constants_1 = require("./util/constants");
var functions_1 = require("./util/functions");
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
                return [4 /*yield*/, (0, functions_1.createGuild)(guild.id, guild.name)];
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
                return [4 /*yield*/, (0, functions_1.deleteGuild)(guild.id)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
client.on("messageCreate", function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var isRegularMessage, _a, guildId, channelId, _b, userId, username, isWordleChannel, wordles, wordleNumber, _c, isValid, score, _d, completed, total, userData;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                isRegularMessage = c.author.bot || !c.content.trim().startsWith("Wordle ");
                if (isRegularMessage)
                    return [2 /*return*/];
                _a = c, guildId = _a.guildId, channelId = _a.channelId;
                _b = c.author, userId = _b.id, username = _b.username;
                return [4 /*yield*/, (0, functions_1.getGuildWordleChannel)(guildId, channelId)];
            case 1:
                isWordleChannel = _e.sent();
                if (!isWordleChannel) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, functions_1.getGuildWordles)(guildId)];
            case 2:
                wordles = _e.sent();
                wordleNumber = (0, functions_1.getWordleNumber)(c.content);
                _c = (0, functions_1.isValidWordleScore)(c.content), isValid = _c.isValid, score = _c.score;
                if (!isValid) return [3 /*break*/, 6];
                _d = score.split("/"), completed = _d[0], total = _d[1];
                userData = (0, functions_1.getUserWordleData)(wordles, userId, username);
                if (!(wordleNumber <= userData.lastGameNumber)) return [3 /*break*/, 4];
                return [4 /*yield*/, c.reply((0, constants_1.COMPLETED_ALREADY_TEXT)(userData.lastGameNumber.toString()))];
            case 3:
                _e.sent();
                return [2 /*return*/];
            case 4:
                // various functions to update the user data
                userData = (0, functions_1.checkForNewUsername)(username, userData);
                userData = (0, functions_1.calculateUpdatedWordleData)(completed, total, userData);
                userData = (0, functions_1.calculateStreak)(completed, userData, wordleNumber);
                userData = (0, functions_1.calculateBestScore)(completed, userData);
                return [4 /*yield*/, (0, functions_1.updateGuildUserData)(guildId, userId, userData)];
            case 5:
                _e.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, c.reply(constants_1.INVALID_SCORE_TEXT)];
            case 7:
                _e.sent();
                _e.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); });
client.on("interactionCreate", function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var commandName, userId, guildId, data, stats, wordles, leaderboard, guildId_1, channelId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!interaction.isChatInputCommand()) return [3 /*break*/, 14];
                commandName = interaction.commandName;
                userId = interaction.user.id;
                guildId = interaction.guildId;
                if (!(commandName === "stats")) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, functions_1.getWordle)(guildId, userId)];
            case 1:
                data = _a.sent();
                if (!data) return [3 /*break*/, 3];
                stats = (0, functions_1.generateUserStats)(data);
                return [4 /*yield*/, interaction.reply(stats)];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, interaction.reply(constants_1.NOT_PLAYED_TEXT)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/];
            case 6:
                if (!(commandName === "leaderboard")) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, functions_1.getWordles)(guildId)];
            case 7:
                wordles = _a.sent();
                leaderboard = (0, functions_1.generateLeaderboard)(wordles);
                return [4 /*yield*/, interaction.reply(leaderboard)];
            case 8:
                _a.sent();
                return [2 /*return*/];
            case 9:
                if (!(commandName === "set-channel")) return [3 /*break*/, 14];
                guildId_1 = interaction.guildId;
                channelId = interaction.channelId;
                if (!(guildId_1 && channelId)) return [3 /*break*/, 12];
                return [4 /*yield*/, (0, functions_1.setWordleChannel)(guildId_1, channelId)];
            case 10:
                _a.sent();
                return [4 /*yield*/, interaction.reply("Wordle channel set!")];
            case 11:
                _a.sent();
                return [2 /*return*/];
            case 12: return [4 /*yield*/, interaction.reply(constants_1.SOMETHING_WENT_WRONG_TEXT)];
            case 13:
                _a.sent();
                return [2 /*return*/];
            case 14: return [2 /*return*/];
        }
    });
}); });
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var commands, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    commands = [leaderboard_1["default"], stats_1["default"], setChannel_1["default"]];
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
