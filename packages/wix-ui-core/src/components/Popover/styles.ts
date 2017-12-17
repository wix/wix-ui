import {core, PopoverTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: PopoverTheme) => {
  theme = (defaultsDeep(theme, core) as PopoverTheme);

  return {
  };
};
