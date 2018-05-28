const path = require('path');
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
const specPattern = '*.test.ts?(x)';
const specFiles = glob.sync(path.join(specDir, '**', specPattern));
const serveDir = path.join(packageDir, 'public');
const host = 'localhost';
const port = 7357;
const testPageUrl = `http://${host}:${port}`;

function webpackLogProgress(percentage) {
  if (webpackLogProgress.enabled) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
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
        test: /(?<!\.st)\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [
      'node_modules',
      // Don't use our own copies of testing libraries, require them from the
      // project.
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
