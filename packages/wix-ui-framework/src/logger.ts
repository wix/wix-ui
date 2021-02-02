import * as chalk from 'chalk';
import * as ora from 'ora';

export const error = (msg: string) => console.log(`${chalk.red('✖')} ${msg}`);
export const success = (msg: string) =>
  console.log(`${chalk.green('✔')} ${msg}`);
export const info = (msg: string) => console.log(`${chalk.blue('ℹ')} ${msg}`);
export const divider = () => console.log();
export const spinner = (msg: string) => ora(msg).start();
