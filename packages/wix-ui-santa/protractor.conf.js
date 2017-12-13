const {server} = require('./scripts/e2e-server');

exports.config = {
  baseUrl: `http://localhost:6006/`,
  specs: ['src/**/*.e2e.ts', 'src/**/*.e2e.js'],
  beforeLaunch() {
    server.start();
  },
  onPrepare() {
    browser.ignoreSynchronization = true;
  },
  afterLaunch() {
    server.stop();
  }
};
