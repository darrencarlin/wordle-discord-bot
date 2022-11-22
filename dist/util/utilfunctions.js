"use strict";
exports.__esModule = true;
exports.capitalizeEachWord = void 0;
var capitalizeEachWord = function (str) {
    return str
        .split(' ')
        .map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); })
        .join(' ');
};
exports.capitalizeEachWord = capitalizeEachWord;
