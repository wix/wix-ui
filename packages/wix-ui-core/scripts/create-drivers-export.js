#!/usr/bin/env bash
const createExports = require('./driver-export');

createExports('vanilla', '.driver');
createExports('protractor', '.protractor.driver');