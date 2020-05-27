import * as chalk from 'chalk';
import * as ora from 'ora';

export const error = msg => console.log(`${chalk.red('✖')} ${msg}`);
export const success = msg => console.log(`${chalk.green('✔')} ${msg}`);
export const info = msg => console.log(`${chalk.blue('ℹ')} ${msg}`);
export const divider = () => console.log();
export const spinner = text => ora(text).start();
