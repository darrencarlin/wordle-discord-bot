"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
exports.calculateBestScore =
  exports.calculateStreak =
  exports.calculateUpdatedWordleData =
  exports.checkForNewUsername =
  exports.getWordleNumber =
  exports.generateUserStats =
  exports.generateLeaderboard =
  exports.isValidWordleScore =
  exports.getUserWordleData =
  exports.updateGuildUserData =
  exports.getGuildWordles =
  exports.getGuildWordleChannel =
  exports.setWordleChannel =
  exports.deleteGuild =
  exports.createGuild =
  exports.getWordle =
  exports.getWordles =
    void 0;
// Firebase functions
var firestore_1 = require("firebase/firestore");
var constants_1 = require("./constants");
var firebase_1 = require("./firebase");
var getWordles = function (id) {
  return __awaiter(void 0, void 0, void 0, function () {
    var wordles, usersSubcollection, usersSnapshot;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          wordles = [];
          usersSubcollection = (0, firestore_1.collection)(
            firebase_1.db,
            "guilds",
            id,
            "users"
          );
          return [4 /*yield*/, (0, firestore_1.getDocs)(usersSubcollection)];
        case 1:
          usersSnapshot = _a.sent();
          usersSnapshot.forEach(function (doc) {
            wordles.push(doc.data());
          });
          return [
            2 /*return*/,
            wordles !== null && wordles !== void 0 ? wordles : [],
          ];
      }
    });
  });
};
exports.getWordles = getWordles;
var getWordle = function (id, userId) {
  return __awaiter(void 0, void 0, void 0, function () {
    var usersSubcollection, userDoc, userDocSnap;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          usersSubcollection = (0, firestore_1.collection)(
            firebase_1.db,
            "guilds",
            id,
            "users"
          );
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
  });
};
exports.getWordle = getWordle;
var createGuild = function (id, name) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            (0, firestore_1.setDoc)(
              (0, firestore_1.doc)(firebase_1.db, "guilds", id),
              { guildId: id, name: name }
            ),
          ];
        case 1:
          _a.sent();
          return [2 /*return*/];
      }
    });
  });
};
exports.createGuild = createGuild;
var deleteGuild = function (id) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            (0, firestore_1.deleteDoc)(
              (0, firestore_1.doc)(firebase_1.db, "guilds", id)
            ),
          ];
        case 1:
          _a.sent();
          return [2 /*return*/];
      }
    });
  });
};
exports.deleteGuild = deleteGuild;
var setWordleChannel = function (id, channelId, guildName) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            (0, firestore_1.setDoc)(
              (0, firestore_1.doc)(firebase_1.db, "guilds", id),
              { channelId: channelId, guildId: id, name: guildName },
              { merge: true }
            ),
          ];
        case 1:
          _a.sent();
          return [2 /*return*/];
      }
    });
  });
};
exports.setWordleChannel = setWordleChannel;
var getGuildWordleChannel = function (id, channelId) {
  return __awaiter(void 0, void 0, void 0, function () {
    var docRef, docSnap;
    var _a;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          docRef = (0, firestore_1.doc)(firebase_1.db, "guilds", id);
          return [4 /*yield*/, (0, firestore_1.getDoc)(docRef)];
        case 1:
          docSnap = _b.sent();
          if (docSnap.exists()) {
            return [
              2 /*return*/,
              ((_a = docSnap.data()) === null || _a === void 0
                ? void 0
                : _a.channelId) === channelId,
            ];
          } else {
            return [2 /*return*/, false];
          }
          return [2 /*return*/];
      }
    });
  });
};
exports.getGuildWordleChannel = getGuildWordleChannel;
var getGuildWordles = function (id) {
  return __awaiter(void 0, void 0, void 0, function () {
    var usersSubcollection, usersSnapshot, wordles;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          usersSubcollection = (0, firestore_1.collection)(
            firebase_1.db,
            "guilds",
            id,
            "users"
          );
          return [4 /*yield*/, (0, firestore_1.getDocs)(usersSubcollection)];
        case 1:
          usersSnapshot = _a.sent();
          wordles = [];
          usersSnapshot.forEach(function (doc) {
            wordles.push(doc.data());
          });
          return [
            2 /*return*/,
            wordles !== null && wordles !== void 0 ? wordles : [],
          ];
      }
    });
  });
};
exports.getGuildWordles = getGuildWordles;
var updateGuildUserData = function (id, userId, userData) {
  return __awaiter(void 0, void 0, void 0, function () {
    var usersSubcollection;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          usersSubcollection = (0, firestore_1.collection)(
            firebase_1.db,
            "guilds",
            id,
            "users"
          );
          return [
            4 /*yield*/,
            (0, firestore_1.setDoc)(
              (0, firestore_1.doc)(usersSubcollection, userId),
              userData,
              { merge: true }
            ),
          ];
        case 1:
          _a.sent();
          return [2 /*return*/];
      }
    });
  });
};
exports.updateGuildUserData = updateGuildUserData;
// Discord bot functions
var getUserWordleData = function (wordles, id, username) {
  var user = wordles.find(function (user) {
    return user.userId === id;
  });
  return __assign(__assign({}, (0, constants_1.USER)(id, username)), user);
};
exports.getUserWordleData = getUserWordleData;
var isValidWordleScore = function (data) {
  var firstLine = data.split("\n")[0];
  // Get the score
  var score = firstLine.substring(firstLine.length - 3);
  // Regex to test score
  var regex = /^([1-6]{1}|X)+\/[1-6]+$/i;
  // Test it
  var isValid = regex.test(score);
  return { isValid: isValid, score: score };
};
exports.isValidWordleScore = isValidWordleScore;
var generateLeaderboard = function (wordles) {
  var str = "";
  // Sort the leaderboard by percentageCompleted if the totalWordles are the same, then by averageGuesses, then by totalWordles, then by currentStreak, then by bestScore.
  var leaderboard = wordles.sort(function (a, b) {
    if (a.percentageCompleted === b.percentageCompleted) {
      if (a.averageGuesses === b.averageGuesses) {
        if (a.totalWordles === b.totalWordles) {
          if (a.currentStreak === b.currentStreak) {
            return b.bestScore - a.bestScore;
          }
          return b.currentStreak - a.currentStreak;
        }
        return b.totalWordles - a.totalWordles;
      }
      return a.averageGuesses - b.averageGuesses;
    }
    return b.percentageCompleted - a.percentageCompleted;
  });
  leaderboard.forEach(function (user, index) {
    str += "** #"
      .concat(index + 1, " **. ")
      .concat(user.usernames[0], " - ")
      .concat(user.percentageCompleted, "% completed / ")
      .concat(user.totalWordles, " games total / average ")
      .concat(user.averageGuesses, " guesses per game.\n");
  });
  return str;
};
exports.generateLeaderboard = generateLeaderboard;
var generateUserStats = function (stats) {
  var str = "\n**Stats for "
    .concat(stats.usernames[0], "**\n\nTotal Wordles: ")
    .concat(stats.totalWordles, "\nWordles Completed: ")
    .concat(stats.wordlesCompleted, "\nWordles Failed: ")
    .concat(stats.wordlesFailed, "\nPercentage Completed: ")
    .concat(stats.percentageCompleted, "%\nPercentage Failed: ")
    .concat(stats.percentageFailed, "%\nAverage Guesses Per Wordle: ")
    .concat(stats.averageGuesses, "\nCurrent Streak ")
    .concat(stats.currentStreak, "\nLongest Streak: ")
    .concat(stats.longestStreak, "\nBest Score: ")
    .concat(stats.bestScore, "\n\n**Score Breakdown**:\n\n")
    .concat(
      stats.scores
        .map(function (score, index) {
          return "".concat(index + 1, " word gueses x ").concat(score);
        })
        .join("\n")
    );
  return str;
};
exports.generateUserStats = generateUserStats;
var getWordleNumber = function (content) {
  var wordleNumber = content.split(" ")[1];
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
    userData.averageGuesses = Math.round(
      userData.completionGuesses.reduce(function (a, b) {
        return a + b;
      }) / userData.completionGuesses.length
    );
  }
  // If the user failed the wordle
  if (completed === "X") {
    userData.wordlesFailed++;
    userData.totalWordles++;
  }
  userData.percentageCompleted = Math.round(
    (userData.wordlesCompleted / userData.totalWordles) * 100
  );
  userData.percentageFailed = Math.round(
    (userData.wordlesFailed / userData.totalWordles) * 100
  );
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
  var isStreak =
    (userData.lastGameNumber + 1 === wordleNumber && completed !== "X") ||
    completed === "x";

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
  if (Number(completed) !== NaN) {
    userData.scores[Number(completed) - 1]++;
  }
  return userData;
};
exports.calculateBestScore = calculateBestScore;
