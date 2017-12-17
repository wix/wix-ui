import {core, ButtonTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

const contentSelector = '& [data-class="button-content"]';

export const styles = (theme: ButtonTheme) => {
  theme = (defaultsDeep(theme, core) as ButtonTheme);

  return {
    button: {
      minWidth: theme.minWidth,
      width: theme.width,
      height: theme.height,
      padding: theme.padding,
      borderRadius: theme.borderRadius,

      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize,
      lineHeight: theme.lineHeight,
      fontStyle: theme.fontStyle,
      fontWeight: theme.fontWeight,
      textDecoration: theme.textDecoration,

      color: theme.color,
      background: theme.backgroundColor,
      borderColor: theme.borderColor,

      boxSizing: 'border-box',
      '-webkit-font-smoothing': 'antialiased',
      textAlign: 'center',
      border: '1px solid',
      cursor: 'pointer',
      outline: 'none',

      transition: 'background-color 100ms linear, border-color 100ms linear, color 100ms linear',

      [contentSelector]: {
        display: 'block',
        height: '100%',
        padding: theme.contentPadding,
        color: theme.color,
        textDecoration: theme.textDecoration
      },

      '&:hover': {
        color: theme.hover.color,
        backgroundColor: theme.hover.backgroundColor,
        borderColor: theme.hover.borderColor,

        [contentSelector]: {
          color: theme.hover.color
        }
      },

      '&:active': {
        color: theme.active.color,
        backgroundColor: theme.active.backgroundColor,
        borderColor: theme.active.borderColor,

        [contentSelector]: {
          color: theme.active.color
        }
      },

      '&:disabled': {
        pointerEvents: 'none',
        color: theme.disabled.color,
        backgroundColor: theme.disabled.backgroundColor,
        borderColor: theme.disabled.borderColor,

        [contentSelector]: {
          color: theme.disabled.color
        }
      }
    }
  };
};
