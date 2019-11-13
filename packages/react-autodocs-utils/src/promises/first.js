/* global Promise */

const invert = require('./invert');

const first = promises => invert(Promise.all(promises.map(invert)));

module.exports = first;
