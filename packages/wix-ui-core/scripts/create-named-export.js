#!/usr/bin/env bash
const path = require('path');
const createExports = require('./named-export');

const src = path.resolve(__dirname, '../src');
const deprecatedSrc = path.join(src, 'components/deprecated');

createExports(['components', 'hocs', 'createHOC'], src);
createExports(['*'], deprecatedSrc);
