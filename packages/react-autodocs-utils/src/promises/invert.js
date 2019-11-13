/* global Promise */

const invert = promise => new Promise((resolve, reject) => promise.then(reject).catch(resolve));

module.exports = invert;
