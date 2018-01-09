import {core, PaginationTheme} from './theme';
import {defaultsDeep} from 'lodash';

export const styles: (theme: PaginationTheme) => PaginationTheme = (theme) => {
  return defaultsDeep({}, theme, core);
};
