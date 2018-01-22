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
      border: theme.border,
      borderRadius: theme.borderRadius,
      color: theme.color,
      background: theme.backgroundColor,
      borderColor: theme.borderColor,
      cursor: theme.cursor,
      display: theme.display,
      justifyContent: theme.justifyContent,
      alignItems: theme.alignItems,
      boxSizing: 'border-box',

      [contentSelector]: {
        color: theme.color
      }
    }
  };
};
