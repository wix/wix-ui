import {core, InputWithAffixesTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: InputWithAffixesTheme) => {
  theme = (defaultsDeep(theme, core) as InputWithAffixesTheme);

  return {
  };
};
