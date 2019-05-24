/**
 * @fileoverview Wix Style React Lint Plugin
 * @author YairH
 */
"use strict";

module.exports.rules = {
  'no-full-wsr-lib': require('./rules/no-full-wsr-lib')
};

module.exports.config = {
  recommended: {
    rules: {
      'wix-style-react/no-full-wsr-lib': 2
    }
  }
}

