import {core, PaginationTheme} from './theme';
import defaultsDeep = require('lodash.defaultsdeep');

export const styles: (theme: PaginationTheme) => PaginationTheme = (theme) => {
  return defaultsDeep({}, theme, core);
};
