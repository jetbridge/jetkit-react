"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toTitleCase = (word) => {
    let i, j, str;
    const lowers = [];
    str = word.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    for (i = 0, j = lowers.length; i < j; i++)
        str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), function (txt) {
            return txt.toLowerCase();
        });
    // Certain words such as initialisms or acronyms should be left uppercase
    const uppers = ['Id', 'Tv'];
    for (i = 0, j = uppers.length; i < j; i++)
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), uppers[i].toUpperCase());
    return str;
};
exports.default = toTitleCase;
//# sourceMappingURL=index.js.map