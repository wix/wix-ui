#!/usr/bin/env bash
const importPath = require('import-path/dist/src/scan');

importPath('src/components', true);
importPath('src/utils', true);
