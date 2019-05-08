#!/usr/bin/env bash
const path = require('path');
const createExports = require('./named-export');

const src = path.resolve(__dirname, '../src');
const deprecatedSrc = path.join(src, 'components/deprecated');
const ignoreDeprecated = `${deprecatedSrc}/**/*`;

createExports(['components', 'hocs', 'createHOC'], src, { ignore: ignoreDeprecated });
createExports(['*'], deprecatedSrc);
