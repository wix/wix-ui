#!/usr/bin/env bash
const importPath = require('import-path/dist/src/scan');

importPath('src/components', true, {forcePascalCaseFormat: true});
importPath('src/components/deprecated', true, {forcePascalCaseFormat: true});
importPath('src/utils', true);
