import {core, InputWithOptionsTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: InputWithOptionsTheme) => {
  theme = (defaultsDeep(theme, core) as InputWithOptionsTheme);

  return {
  };
};
