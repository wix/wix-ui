import {core, TextTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: TextTheme) => {
  theme = (defaultsDeep(theme, core) as TextTheme);

  return {
    root: {
      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize,
      lineHeight: theme.lineHeight,
      color: theme.color,
      textTransform: theme.textTransform,
      letterSpacing: theme.letterSpacing
    }
  };
};
