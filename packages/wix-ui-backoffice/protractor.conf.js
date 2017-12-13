exports.config = {
  baseUrl: `http://localhost:6006/`,
  specs: ['src/**/*.e2e.ts'],
  onPrepare() {
    browser.ignoreSynchronization = true;
  }
};
