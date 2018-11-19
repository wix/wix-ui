# wix-ui-mocha-runner

Run unit tests in headless Chromium using Mocha and Puppeteer. The test results are logged to the terminal, and all console output is redirected from the browser to the terminal as well.

To run tests interactively in watch mode run `npx wix-ui-mocha-runner --watch` in the project root, then open [http//127.0.0.1:7357](http//127.0.0.1:7357). You can click the play icon to the right of the test name or a group of tests to run only a subset of tests. If the test page starts to constantly refresh make sure it's not open in mutliple tabs.
