"use strict";
exports.__esModule = true;
exports.achievements = void 0;
exports.achievements = [
    {
        id: 1,
        name: "Getting wordly",
        description: "Played your first wordle",
        check: function (userData) {
            if (userData.totalWordles > 0 &&
                !userData.achievements.find(function (achievement) { return achievement.id === 1; })) {
                return {
                    id: 1,
                    name: "Getting wordly",
                    description: "Played your first wordle"
                };
            }
        }
    },
    {
        id: 2,
        name: "Getting wordly",
        description: "Played 5 wordles",
        check: function (userData) {
            if (userData.totalWordles >= 5 &&
                !userData.achievements.find(function (achievement) { return achievement.id === 2; })) {
                return {
                    id: 2,
                    name: "Getting wordly",
                    description: "Played 5 wordles"
                };
            }
        }
    },
    {
        id: 3,
        name: "Getting wordly",
        description: "Played 10 wordles",
        check: function (userData) {
            if (userData.totalWordles >= 10 &&
                !userData.achievements.find(function (achievement) { return achievement.id === 3; })) {
                return {
                    id: 3,
                    name: "Getting wordly",
                    description: "Played 10 wordles"
                };
            }
        }
    },
    {
        id: 4,
        name: "Getting wordly",
        description: "Played 25 wordles",
        check: function (userData) {
            if (userData.totalWordles >= 25 &&
                !userData.achievements.find(function (achievement) { return achievement.id === 4; })) {
                return {
                    id: 4,
                    name: "Getting wordly",
                    description: "Played 25 wordles"
                };
            }
        }
    },
    {
        id: 5,
        name: "Getting wordly",
        description: "Played 50 wordles",
        check: function (userData) {
            if (userData.totalWordles >= 50 &&
                !userData.achievements.find(function (achievement) { return achievement.id === 5; })) {
                return {
                    id: 5,
                    name: "Getting wordly",
                    description: "Played 50 wordles"
                };
            }
        }
    },
    {
        id: 6,
        name: "Getting wordly",
        description: "Played 100 wordles",
        check: function (userData) {
            if (userData.totalWordles >= 100 &&
                !userData.achievements.find(function (achievement) { return achievement.id === 6; })) {
                return {
                    id: 6,
                    name: "Getting wordly",
                    description: "Played 100 wordles"
                };
            }
        }
    },
    {
        id: 7,
        name: "Streaking",
        description: "Complete 5 wordles in a row",
        check: function (userData) {
            if (userData.currentStreak >= 5 &&
                !userData.achievements.find(function (achievement) { return achievement.id === 7; })) {
                return {
                    id: 7,
                    name: "Streaking",
                    description: "Complete 5 wordles in a row"
                };
            }
        }
    },
    {
        id: 8,
        name: "Streaking",
        description: "Complete 10 wordles in a row",
        check: function (userData) {
            if (userData.currentStreak >= 10 &&
                !userData.achievements.find(function (achievement) { return achievement.id === 8; })) {
                return {
                    id: 8,
                    name: "Streaking",
                    description: "Complete 10 wordles in a row"
                };
            }
        }
    },
    {
        id: 9,
        name: "Streaking",
        description: "Complete 25 wordles in a row",
        check: function (userData) {
            if (userData.currentStreak >= 25 &&
                !userData.achievements.find(function (achievement) { return achievement.id === 9; })) {
                return {
                    id: 9,
                    name: "Streaking",
                    description: "Complete 25 wordles in a row"
                };
            }
        }
    },
    {
        id: 10,
        name: "Streaking",
        description: "Complete 50 wordles in a row",
        check: function (userData) {
            if (userData.currentStreak >= 50 &&
                !userData.achievements.find(function (achievement) { return achievement.id === 10; })) {
                return {
                    id: 10,
                    name: "Streaking",
                    description: "Complete 50 wordles in a row"
                };
            }
        }
    },
    {
        id: 11,
        name: "Streaking",
        description: "Complete 100 wordles in a row",
        check: function (userData) {
            if (userData.currentStreak >= 100 &&
                !userData.achievements.find(function (achievement) { return achievement.id === 11; })) {
                return {
                    id: 11,
                    name: "Streaking",
                    description: "Complete 100 wordles in a row"
                };
            }
        }
    },
    {
        id: 12,
        name: "Hard luck",
        description: "Failed a wordle",
        check: function (userData) {
            if (userData.wordlesFailed > 0 &&
                !userData.achievements.find(function (achievement) { return achievement.id === 12; })) {
                return {
                    id: 12,
                    name: "Hard luck",
                    description: "Failed a wordle"
                };
            }
        }
    },
    {
        id: 13,
        name: "Wordle in 1",
        description: "Complete a wordle in 1 guess",
        check: function (userData) {
            if (userData.completionGuesses.includes(1) &&
                !userData.achievements.find(function (achievement) { return achievement.id === 13; })) {
                return {
                    id: 13,
                    name: "Wordle in 1",
                    description: "Complete a wordle in 1 guess"
                };
            }
        }
    },
    {
        id: 14,
        name: "Wordle in 2",
        description: "Complete a wordle in 2 guesses",
        check: function (userData) {
            if (userData.completionGuesses.includes(2) &&
                !userData.achievements.find(function (achievement) { return achievement.id === 14; })) {
                return {
                    id: 14,
                    name: "Wordle in 2",
                    description: "Complete a wordle in 2 guesses"
                };
            }
        }
    },
    {
        id: 15,
        name: "Wordle in 3",
        description: "Complete a wordle in 3 guesses",
        check: function (userData) {
            if (userData.completionGuesses.includes(3) &&
                !userData.achievements.find(function (achievement) { return achievement.id === 15; })) {
                return {
                    id: 15,
                    name: "Wordle in 3",
                    description: "Complete a wordle in 3 guesses"
                };
            }
        }
    },
    {
        id: 16,
        name: "Triple wordle",
        description: "Complete 3 wordles in a row with 3 guesses or less",
        check: function (userData) {
            var streak = userData.completionGuesses.slice(-3);
            if (streak.length === 3 &&
                streak.every(function (guess) { return guess <= 3; }) &&
                !userData.achievements.find(function (achievement) { return achievement.id === 16; })) {
                return {
                    id: 16,
                    name: "Triple wordle",
                    description: "Complete 3 wordles in a row with 3 guesses or less"
                };
            }
        }
    },
    {
        id: 17,
        name: "Completed all achievements",
        description: "You've completed all the achievements!",
        check: function (userData) {
            if (userData.achievements.length === 17 &&
                !userData.achievements.find(function (achievement) { return achievement.id === 17; })) {
                return {
                    id: 17,
                    name: "Completed all achievements",
                    description: "You've completed all the achievements!"
                };
            }
        }
    },
];
