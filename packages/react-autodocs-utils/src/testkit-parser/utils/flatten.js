const flatten = arr => arr.reduce((acc, x) => acc.concat(x), []);

module.exports = flatten;
