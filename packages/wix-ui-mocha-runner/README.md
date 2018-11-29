# wix-ui-mocha-runner

Run unit tests in headless Chromium using Mocha and Puppeteer.

The package provides `wix-ui-mocha-runner` CLI program which needs to run in the project root. It looks for test files that match `*.spec.ts?(x)` pattern in the `src` folder. The test results are logged to the terminal. All browser console output is redirected to the terminal as well.

To run tests interactively in watch mode with hot reload start `wix-ui-mocha-runner --watch`, and open [http//127.0.0.1:7357](http//127.0.0.1:7357). You can click the play icon to the right of the test name or a group of tests to run only a subset of tests. If the test page starts to constantly refresh make sure it's not open in mutliple tabs.

The tool performs the following setup for you:
* Configures Mocha with "BDD"-style interface
* Configures Enzyme with `enzyme-adapter-react-16` adapter
* Exposes [expect](https://www.npmjs.com/package/expect) assertion library as a global variable
* Adds a level of compatibility with tests written for Jest:
  * Exposes [jest-mock](https://www.npmjs.com/package/jest-mock) as a global named `jest`, which allows to use `jest.fn()`
  * Adds an alias `beforeAll()` for `before()`
  * Adds an alias `afterAll()` for `after()`
* Adds a test reporter for TeamCity
