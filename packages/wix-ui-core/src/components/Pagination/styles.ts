import {core, PaginationTheme} from './theme';
import {defaultsDeep} from 'lodash';

export const styles = theme => {
  theme = defaultsDeep(theme, core) as PaginationTheme;
  return {...theme};
};
