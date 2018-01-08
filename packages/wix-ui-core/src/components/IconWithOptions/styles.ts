import {core, IconWithOptionsTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: IconWithOptionsTheme) => {
  theme = (defaultsDeep(theme, core) as IconWithOptionsTheme);

  return {
  };
};
