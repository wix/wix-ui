"use strict";
exports.__esModule = true;
exports.objectEntries = function (object) {
    return Object.keys(object).map(function (key) { return [key, object[key]]; });
};
