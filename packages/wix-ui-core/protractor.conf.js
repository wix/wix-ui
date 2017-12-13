exports.config = {
  // framework: 'mocha',
  baseUrl: `http://localhost:6006/`,
  specs: ['test/**/*.e2e.ts', 'src/**/*.e2e.ts'],
  onPrepare() {
    browser.ignoreSynchronization = true;
  }
};


// module.exports.config = {

//   baseUrl: `http://localhost:6006/`,

//   onPrepare() {
//     browser.ignoreSynchronization = true;
//   }
// };
