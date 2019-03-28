/**
 * @fileoverview Runs tests on fixtures for specific project environment.
 */
'use strict';

const path = require('path');
const execa = require('execa');

try {
  const test = execa.shellSync('mocha --recursive --colors .', {
    stderr: 'inherit',
    cwd: path.resolve(__dirname, '../../fixtures/disable-no-full-wsr-lib')
  });
  console.log('Fixtures for `disable-no-full-wsr-lib` passing: ', test.stdout);
} catch(e) {
  throw e.stdout;
}
