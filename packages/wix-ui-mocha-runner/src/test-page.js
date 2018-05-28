// In headless mode we run Mocha with console reporter and pipe all console
// output into stdout. But passing structures - especially circular - between
// browser and Node is inefficient and can cause Puppeteer to freeze. The
// solution is to wrap console.log with a function that does all formatting
// in the browser. This allows us to pass only primitive values to Node.
// __HEADLESS__ is a boolean value injected by Webpack.

if (__HEADLESS__) {
  require('./patch-console')();
}

// Our tests rely on global `expect` and `jest` variables provided by Jest.
// Since Jest doesn't support browser environment we provide the same
// functionality using standalone packages. We could import them in each test
// file explicitly, but their TypeScript definitions are incomplete, so it's
// easier to rely on @types/jest instead.

window.expect = require('expect');
window.jest = require('jest-mock');

// Some of the tests check for existence of enzyme testkit and need adapter to
// be configured. Once we remove those tests we can remove this block too.
{
  const Enzyme = require('enzyme');
  const Adapter = require('enzyme-adapter-react-16');
  Enzyme.configure({adapter: new Adapter()});
}

// Mocha officially supports these two imports in browser environment.

require('mocha/mocha.css');
require('mocha/mocha.js');

require('./mocha-prettier.css');

mocha.setup({
  ui: 'bdd',
  reporter: __HEADLESS__ ? 'spec' : 'html',
  useColors: true
});

// Alias Mocha globals to their Jest equivalents. We can remove this once we
// start running all the tests in Mocha.

window.beforeAll = window.before;
window.afterAll = window.after;

// Start Mocha in the next tick because we haven't yet included the test files.
// When __MOCHA_RESULT__ gets defined it's a signal to Puppeteer that the test
// suite has completed.

setTimeout(() => {
  mocha.run(failures => window.__MOCHA_RESULT__ = failures);
}, 0);
