/* eslint-disable no-console */
const chalk = require('chalk');
const ora = require('ora');

module.exports = {
  error: msg => console.log(`${chalk.red('✖')} ${msg}`),
  success: msg => console.log(`${chalk.green('✔')} ${msg}`),
  info: msg => console.log(`${chalk.blue('ℹ')} ${msg}`),
  divider: () => console.log(),
  spinner: text => ora(text).start(),
};
