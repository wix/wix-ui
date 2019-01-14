/**
 * @fileoverview Fail if importing all of WSR
 * @author YairH
 */
'use strict';

const path = require('path');
const execa = require('execa');

try {
  const test = execa.shellSync('mocha --recursive --colors .', {
    stderr: 'inherit',
    cwd: path.resolve(__dirname, '../../fixtures/disable-no-full-wsr-lib')
  });
  console.log('Fixtures passing: ', test.stdout);
} catch(e) {
  throw e.stdout;
}
