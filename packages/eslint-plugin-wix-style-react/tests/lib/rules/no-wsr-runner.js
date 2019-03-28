/**
 * @fileoverview Runs tests on fixtures for specific project environment.
 */
'use strict';

const path = require('path');
const execa = require('execa');

try {
  const test = execa.shellSync('mocha --recursive --colors .', {
    stderr: 'inherit',
    cwd: path.resolve(__dirname, '../../fixtures/no-wsr')
  });
  console.log('Fixtures for `no-wsr` passing: ', test.stdout);
} catch(e) {
  console.log(e);
  throw e.stdout;
}
