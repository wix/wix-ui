/* global Promise */

const { readdir } = require('fs');
const dirname = require('../dirname');
const promise = require('../promises/promise');

const promiseReaddir = promise(readdir);

const readFolder = path => promiseReaddir(dirname(path), 'utf8');

module.exports = readFolder;
