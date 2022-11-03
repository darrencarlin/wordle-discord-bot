"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var leaderboard_1 = __importDefault(require("./leaderboard"));
var set_channel_1 = __importDefault(require("./set-channel"));
var my_stats_1 = __importDefault(require("./my-stats"));
var my_achievements_1 = __importDefault(require("./my-achievements"));
var reset_leaderboard_1 = __importDefault(require("./reset-leaderboard"));
var reset_users_1 = __importDefault(require("./reset-users"));
var set_role_1 = __importDefault(require("./set-role"));
var purge_user_1 = __importDefault(require("./purge-user"));
var user_count_1 = __importDefault(require("./user-count"));
var upgrade_server_1 = __importDefault(require("./upgrade-server"));
var help_1 = __importDefault(require("./help"));
var enable_notifications_1 = __importDefault(require("./enable-notifications"));
var disable_notifications_1 = __importDefault(require("./disable-notifications"));
exports["default"] = [
    leaderboard_1["default"],
    set_channel_1["default"],
    my_stats_1["default"],
    my_achievements_1["default"],
    reset_leaderboard_1["default"],
    reset_users_1["default"],
    set_role_1["default"],
    purge_user_1["default"],
    user_count_1["default"],
    upgrade_server_1["default"],
    help_1["default"],
    enable_notifications_1["default"],
    disable_notifications_1["default"],
];
