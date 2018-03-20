import {core, BadgeTheme} from './theme';
const defaultsDeep = require('lodash/defaultsDeep');

const contentSelector = '& [data-class="badge-content"]';

export const styles = (theme: BadgeTheme) => {
  theme = (defaultsDeep(theme, core) as BadgeTheme);

  return {
    badge: {
      width: theme.width,
      minWidth: theme.minWidth,
      height: theme.height,
      lineHeight: theme.lineHeight,
      padding: theme.padding,
      border: theme.border,
      borderRadius: theme.borderRadius,
      color: theme.color,
      background: theme.backgroundColor,
      borderColor: theme.borderColor,
      cursor: theme.cursor,
      display: theme.display,
      textAlign: theme.textAlign,
      verticalAlign: theme.verticalAlign,
      boxSizing: 'border-box',

      [contentSelector]: {
        color: theme.color
      }
    }
  };
};
