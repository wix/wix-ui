"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var isObject = function (o) { return o && o.toString() === '[object Object]'; };
/**
 * mapTree is like Array.prototype.map but for objects
 * applies mapping function deeply
 * mapping function allows to change object greatly, so be careful
 *
 * @param input {object}
 * @param fn {function} ({ key: string, value: any, parent: object, path: string }) => any
 * @returns {object}
 * @example
 *
 * const mapped = mapTree({
 *  a: 1,
 *  b: {
 *    c: 2
 *  }
 * }, ({ key, value }) => {
 *   if (key === 'b') {
 *     return { batman: { ...value, c: value.c * 2 } }
 *   }
 * })
 *
 * console.log(mapped) // <=
 * {
 *   a: 1,
 *   batman: {
 *     c: 4
 *   }
 * }
 */
exports.mapTree = function (input, fn, path) {
    if (path === void 0) { path = ''; }
    return typeof fn === 'function' && isObject(input)
        ? Object.keys(input).reduce(function (output, key) {
            var candidate = fn({
                key: key,
                value: input[key],
                parent: input,
                path: path ? path + "." + key : key
            });
            var cases = [
                {
                    when: function () { return candidate === null; },
                    make: function () { return ({}); }
                },
                {
                    when: function () { return isObject(candidate); },
                    make: function () {
                        return Object.keys(candidate).reduce(function (o, k) {
                            var _a;
                            return (__assign({}, o, (_a = {}, _a[k] = exports.mapTree(candidate[k], fn, path ? path + "." + k : k), _a)));
                        }, {});
                    }
                },
                {
                    when: function () {
                        return (!isObject(input[key]) || !isObject(candidate)) &&
                            typeof candidate !== 'undefined';
                    },
                    make: function () {
                        var _a;
                        return (_a = {}, _a[key] = candidate, _a);
                    }
                },
                {
                    when: function () { return isObject(input[key]); },
                    make: function () {
                        var _a;
                        return (_a = {},
                            _a[key] = exports.mapTree(input[key], fn, path ? path + "." + key : key),
                            _a);
                    }
                },
                {
                    when: function () { return true; },
                    make: function () {
                        var _a;
                        return (_a = {}, _a[key] = input[key], _a);
                    }
                },
            ];
            var spread = cases.find(function (_a) {
                var when = _a.when;
                return when();
            }).make();
            return __assign({}, output, spread);
        }, {})
        : input;
};
