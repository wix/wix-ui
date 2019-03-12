const {baseProtractorConfig} = require('wix-ui-test-utils/protractor');

baseProtractorConfig.jasmineNodeOpts = baseProtractorConfig.jasmineNodeOpts || {};
baseProtractorConfig.jasmineNodeOpts.defaultTimeoutInterval = 25000;
exports.config = baseProtractorConfig;
