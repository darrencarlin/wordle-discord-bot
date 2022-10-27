"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.statsCommand = exports.setChannelCommand = exports.leaderboardCommand = void 0;
var leaderboard_1 = __importDefault(require("./leaderboard"));
exports.leaderboardCommand = leaderboard_1["default"];
var setChannel_1 = __importDefault(require("./setChannel"));
exports.setChannelCommand = setChannel_1["default"];
var stats_1 = __importDefault(require("./stats"));
exports.statsCommand = stats_1["default"];
