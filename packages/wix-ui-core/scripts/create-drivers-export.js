#!/usr/bin/env bash
const createExports = require('./driver-export');

createExports('vanilla', '.driver');
createExports('unidriver', '.uni.driver');
createExports('protractor', '.protractor.driver');