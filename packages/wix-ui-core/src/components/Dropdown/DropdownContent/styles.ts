import {core, DropdownContentTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: DropdownContentTheme) => {
  theme = (defaultsDeep(theme, core) as DropdownContentTheme);

  return {
  };
};
