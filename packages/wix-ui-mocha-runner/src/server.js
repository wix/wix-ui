const path = require('path');
const readline = require('readline');
const glob = require('glob');
const chalk = require('chalk');
const webpack = require('webpack');
const serve = require('webpack-serve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylableWebpackPlugin = require('stylable-webpack-plugin');
const runTestsInPuppeteer = require('./run-in-puppeteer');

const watchMode = process.argv.some(arg => arg === '--watch');
const packageDir = path.resolve(__dirname, '..');
const projectDir = process.cwd();
const specDir = path.join(projectDir, 'src');
const specPattern = '*.spec.ts?(x)';
const specFiles = glob.sync(path.join(specDir, '**', specPattern));
const serveDir = path.join(packageDir, 'public');

// Don't use 'localhost' because it can either mean IPv4 or IPv6 address. If
// something is listening on the same port on ::1, then `testPageUrl` will be
// ambiguous, and the browser will default to IPv6, and load the wrong page.
const host = '127.0.0.1';
const port = 7357;
const testPageUrl = `http://${host}:${port}`;

let webpackProgressLoggingEnabled = false;

function webpackLogProgress(percentage) {
  if (webpackProgressLoggingEnabled) {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    if (percentage < 1) {
      process.stdout.write(`Webpack... ${Math.round(100 * percentage)}%`);
    } else {
      process.stdout.write(`Ready`);
    }
  }
}

const webpackConfig = {
  mode: 'development',
  context: packageDir,
  entry: [
    path.join(packageDir, 'src', 'test-page.js'),
    ...specFiles
  ],
  output: {
    filename: 'mocha.bundle.js',
    path: serveDir
  },
  plugins: [
    new StylableWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(packageDir, 'src', 'test-page.html'),
    }),
    new webpack.DefinePlugin({
      '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({isDisabled: true})',
      '__HEADLESS__': !watchMode
    }),
    new webpack.ProgressPlugin(webpackLogProgress)
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // wix-ui-core emits TypeScript errors related to Protractor
              // during transpilation if wix-ui-test-utils is a linked
              // dependency. Yoshi ts-loader config silences those errors,
              // which allows the project to compile. Let's do the same here
              // to get this thing up and running, and fix the repo in the
              // distant future.
              happyPackMode: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /\.st\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [
      'node_modules',
      // Dirty hack. Bundling should totally be done in the project, and not in
      // the test runner. There's no guarantee anything will work since the
      // runner might bundle incompatible versions of the testing libraries,
      // use a different Webpack setup with different plugins, etc.
      // But until we figure out how to entirely move bundling to the project
      // let's at least load runtime dependencies from it.
      path.join(projectDir, 'node_modules')
    ]
  }
};

const webpackServeConfig = {
  config: webpackConfig,
  host,
  port,
  content: serveDir,
  hot: watchMode ? {
    hot: false,
    reload: true,
    logLevel: 'warn'
  } : false,
  clipboard: false,
  logLevel: 'warn',
  dev: {
    logLevel: 'warn'
  }
};

function waitForServerListening(server) {
  return new Promise((resolve, reject) => {
    server.on('listening', ({options}) => {
      // The authors of webpack-serve decided it would be cute to silently
      // switch to a random port if the one we requested is in use ಠ_ಠ
      if (options.port === port) {
        resolve();
      } else {
        reject(new Error(`Address ${host}:${port} is in use`));
      }
    });
  });
}

function waitForCompilation(server) {
  return new Promise((resolve, reject) => {
    server.on('compiler-error', () => {
      reject(new Error('Compilation failed'));
    });

    server.on('build-finished', () => {
      resolve();
    });
  });
}

async function runAndQuit() {
  let server;
  try {
    const server = await serve(webpackServeConfig);

    server.on('build-started',  () => console.log('Webpack build started'));
    server.on('build-finished', () => console.log('Webpack build finished'));

    await Promise.all([
      waitForServerListening(server),
      waitForCompilation(server)
    ]);

    const numFailedTests = await runTestsInPuppeteer(testPageUrl);
    process.exitCode = numFailedTests ? 1 : 0;
    server.close();
  } catch (error) {
    process.exitCode = 1;
    console.error(error);
    server.close();
  } finally {
    // Terminate explicitly in case we have any dangling sockets or timers.
    process.exit();
  }
}

async function runInWatchMode() {
  try {
    console.log(`Starting on ${chalk.blue(testPageUrl)}`);
    const server = await serve(webpackServeConfig);
    server.on('compiler-error', () => server.close());
    await waitForServerListening(server);

    // Let's start logging only after the server is listening so we don't get
    // the logger output mixed with the server output.
    webpackProgressLoggingEnabled = true;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

if (watchMode) {
  runInWatchMode();
} else {
  runAndQuit();
}
