import {core, BadgeTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

const contentSelector = '& [data-class="badge-content"]';

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
      opacity: theme.opacity,

      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize,
      lineHeight: theme.lineHeight,
      fontStyle: theme.fontStyle,
      fontWeight: theme.fontWeight,
      textDecoration: theme.textDecoration,

      color: theme.color,
      background: theme.backgroundColor,
      borderColor: theme.borderColor,

      cursor: theme.cursor,
      '-webkit-font-smoothing': 'antialiased',
      boxSizing: 'border-box',
      textAlign: 'center',

      '&:hover': theme.hover,

      [contentSelector]: {
        color: theme.color
      }
    }
  };
};
