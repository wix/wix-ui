/**
 * @fileoverview Wix Style React Lint Plugin
 * @author YairH
 */
"use strict";

var requireIndex = require("requireindex");

module.exports.rules = requireIndex(__dirname + "/rules");

module.exports.config = {
  recommended: {
    rules: {
      'wix-style-react/no-full-wsr-lib': 2
    }
  }
}

