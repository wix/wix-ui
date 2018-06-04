const path = require('path');
const readline = require('readline');
const glob = require('glob');
const webpack = require('webpack');
const serve = require('webpack-serve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylableWebpackPlugin = require('stylable-webpack-plugin');
const runHeadless = require('./run-headless');

const headless = process.argv.some(arg => arg === '--headless');
const packageDir = path.resolve(__dirname, '..');
const projectDir = process.cwd();
const specDir = path.join(projectDir, 'src');
const specPattern = '*.spec.ts?(x)';
const specFiles = glob.sync(path.join(specDir, '**', specPattern));
const serveDir = path.join(packageDir, 'public');
const host = 'localhost';
const port = 7357;
const testPageUrl = `http://${host}:${port}`;

function webpackLogProgress(percentage) {
  if (webpackLogProgress.enabled) {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    if (percentage < 1) {
      process.stdout.write(`Webpack... ${Math.round(100 * percentage)}%`);
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
      '__HEADLESS__': headless
    }),
    new webpack.ProgressPlugin(webpackLogProgress)
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
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
  hot: headless ? false : {hot: false, reload: true, logLevel: 'info'},
  clipboard: false,
  logLevel: headless ? 'warn' : 'info',
  dev: {
    logLevel: 'warn'
  }
};

serve(webpackServeConfig).then(server => {
  server.on('listening', () => {
    webpackLogProgress.enabled = true;
    if (headless) {
      runHeadless(testPageUrl).then(failures => {
        server.close();
        process.exitCode = failures ? 1 : 0;
      });
    }
  });
});
