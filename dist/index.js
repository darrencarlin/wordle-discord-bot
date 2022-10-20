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
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var rest_1 = require("@discordjs/rest");
var discord_js_1 = require("discord.js");
var firestore_1 = require("firebase/firestore");
var leaderboard_1 = __importDefault(require("./commands/leaderboard"));
var stats_1 = __importDefault(require("./commands/stats"));
var firebase_1 = require("./util/firebase");
var wordleChannel = process.env.WORDLE_CHANNEL;
var client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ]
});
var rest = new rest_1.REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
client.on("ready", function () { var _a; return console.log("".concat((_a = client === null || client === void 0 ? void 0 : client.user) === null || _a === void 0 ? void 0 : _a.username, " has logged in!")); });
client.on("messageCreate", function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var channel, channelId, wordles_1, usersRef, snapshot, content, firstLine, score, regex, isValidScore, _a, completed, total, userId_1, username, userData;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                // Ignore if it's a bot message
                if (message.author.bot || !message.content.startsWith("Wordle ")) {
                    return [2 /*return*/];
                }
                channel = client.channels.cache.get(wordleChannel);
                channelId = message.channelId;
                if (!(channelId === wordleChannel)) return [3 /*break*/, 5];
                wordles_1 = [];
                usersRef = (0, firestore_1.collection)(firebase_1.db, "users");
                return [4 /*yield*/, (0, firestore_1.getDocs)(usersRef)];
            case 1:
                snapshot = _c.sent();
                snapshot.forEach(function (doc) {
                    wordles_1.push(doc.data());
                });
                content = message.content;
                firstLine = content.split("\n")[0];
                score = firstLine.substring(firstLine.length - 3);
                regex = /^([1-6]|X)+\/[1-6]+$/i;
                isValidScore = regex.test(score);
                if (!isValidScore) return [3 /*break*/, 3];
                _a = score.split("/"), completed = _a[0], total = _a[1];
                userId_1 = message.author.id;
                username = message.author.username;
                userData = (_b = wordles_1.find(function (user) { return user.userId === userId_1; })) !== null && _b !== void 0 ? _b : {
                    usernames: [username],
                    userId: userId_1,
                    wordlesCompleted: 0,
                    wordlesFailed: 0,
                    totalWordles: 0,
                    percentageCompleted: 0,
                    percentageFailed: 0,
                    completionGuesses: [],
                    averageGuesses: 0
                };
                // Check if username has been updated and add to array if so
                // safe guarding against username changes, render the last one in leaderboards
                if (!userData.usernames.includes(username)) {
                    userData.usernames.push(username);
                }
                // If the user completed the wordle
                if (Number(completed) <= Number(total)) {
                    userData.wordlesCompleted++;
                    userData.totalWordles++;
                    userData.percentageCompleted = Math.round((userData.wordlesCompleted / userData.totalWordles) * 100);
                    userData.completionGuesses.push(Number(completed));
                    userData.averageGuesses = Math.round(userData.completionGuesses.reduce(function (a, b) { return a + b; }) /
                        userData.completionGuesses.length);
                }
                // If the user failed the wordle
                if (completed === "X") {
                    userData.wordlesFailed++;
                    userData.totalWordles++;
                    userData.percentageFailed = Math.round((userData.wordlesFailed / userData.totalWordles) * 100);
                }
                // Update the database
                return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.db, "users", userId_1), userData)];
            case 2:
                // Update the database
                _c.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, (channel === null || channel === void 0 ? void 0 : channel.send("That score seems to be invalid, make sure it follows the form of `X/6` or `1-6/6`"))];
            case 4:
                _c.sent();
                _c.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on("interactionCreate", function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var commandName, userId, wordles_2, usersRef, snapshot, leaderboard, str_1, docRef, docSnap, data, str;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!interaction.isChatInputCommand()) return [3 /*break*/, 8];
                commandName = interaction.commandName;
                userId = interaction.user.id;
                if (!(commandName === "leaderboard")) return [3 /*break*/, 3];
                wordles_2 = [];
                usersRef = (0, firestore_1.collection)(firebase_1.db, "users");
                return [4 /*yield*/, (0, firestore_1.getDocs)(usersRef)];
            case 1:
                snapshot = _a.sent();
                snapshot.forEach(function (doc) {
                    wordles_2.push(doc.data());
                });
                leaderboard = wordles_2.sort(function (a, b) {
                    if (a.percentageCompleted === b.percentageCompleted) {
                        if (a.averageGuesses === b.averageGuesses) {
                            return b.totalWordles - a.totalWordles;
                        }
                        return a.averageGuesses - b.averageGuesses;
                    }
                    return b.percentageCompleted - a.percentageCompleted;
                });
                str_1 = "";
                leaderboard.forEach(function (user, index) {
                    str_1 += "** #".concat(index + 1, " **. ").concat(user.usernames[0], " - ").concat(user.percentageCompleted, "% completed / ").concat(user.totalWordles, " games total / average ").concat(user.averageGuesses, " guesses per game.\n");
                });
                // Send the leaderboard message
                return [4 /*yield*/, interaction.reply({
                        content: str_1
                    })];
            case 2:
                // Send the leaderboard message
                _a.sent();
                return [3 /*break*/, 8];
            case 3:
                if (!(commandName === "stats")) return [3 /*break*/, 8];
                docRef = (0, firestore_1.doc)(firebase_1.db, "users", userId);
                return [4 /*yield*/, (0, firestore_1.getDoc)(docRef)];
            case 4:
                docSnap = _a.sent();
                if (!docSnap.exists()) return [3 /*break*/, 6];
                data = docSnap.data();
                str = "**Stats for ".concat(data.usernames[0], "**\n\nTotal Wordles: ").concat(data.totalWordles, "\nWordles Completed: ").concat(data.wordlesCompleted, "\nWordles Failed: ").concat(data.wordlesFailed, "\nPercentage Completed: ").concat(data.percentageCompleted, "%\nPercentage Failed: ").concat(data.percentageFailed, "%\nAverage Guesses Per Wordle: ").concat(data.averageGuesses);
                // Send the stats message
                return [4 /*yield*/, interaction.reply({
                        content: str
                    })];
            case 5:
                // Send the stats message
                _a.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, interaction.reply({
                    content: "You have not played any wordles yet!"
                })];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); });
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var commands, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    commands = [leaderboard_1["default"], stats_1["default"]];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, rest.put(discord_js_1.Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
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
