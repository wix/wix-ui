import {core, BadgeTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: BadgeTheme) => {
  theme = (defaultsDeep(theme, core) as BadgeTheme);

  return {
    badge: {
      minWidth: theme.minWidth,
      width: theme.width,
      height: theme.height,
      padding: theme.padding,
      borderRadius: theme.borderRadius,
      outline: theme.outline,

      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize,
      lineHeight: theme.lineHeight,
      fontStyle: theme.fontStyle,
      fontWeight: theme.fontWeight,
      textDecoration: theme.textDecoration,
      textAlign: theme.textAlign,

      color: theme.color,
      background: theme.backgroundColor,
      borderColor: theme.borderColor,

      cursor: theme.cursor,
      '-webkit-font-smoothing': 'antialiased',

      '&:hover': theme.hover
    }
  };
};
