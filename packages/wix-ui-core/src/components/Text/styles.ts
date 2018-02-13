import {core, TextTheme} from './theme';
import defaultsDeep = require('lodash.defaultsdeep');

export const styles = (theme: TextTheme) => {
  theme = (defaultsDeep(theme, core) as TextTheme);

  return {
    root: {
      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize,
      lineHeight: theme.lineHeight,
      color: theme.color,
      textTransform: theme.textTransform,
      letterSpacing: theme.letterSpacing,
      margin: theme.margin
    },
    ellipsis : {
      textOverflow: 'ellipsis',
      display: 'inline-block',
      width: '100%',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    }
  };
};
