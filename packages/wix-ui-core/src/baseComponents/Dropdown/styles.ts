import {core, DropdownTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: DropdownTheme) => {
  theme = (defaultsDeep(theme, core) as DropdownTheme);

  return {
  };
};
