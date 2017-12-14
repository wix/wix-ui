import {core, ButtonTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

const uiTextSelector = '& [data-class="uitext"]';

export const styles = (theme: ButtonTheme) => {
  theme = (defaultsDeep(theme, core) as ButtonTheme);

  theme.hover = theme.hover || {};
  theme.active = theme.active || {};
  theme.disabled = theme.disabled || {};

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

      background: theme.backgroundColor,
      borderColor: theme.borderColor,

      boxSizing: 'border-box',
      '-webkit-font-smoothing': 'antialiased',
      textAlign: 'center',
      border: '1px solid',
      cursor: 'pointer',
      outline: 'none',

      transition: 'background-color 100ms linear, border-color 100ms linear, color 100ms linear',

      color: theme.color,
      [uiTextSelector]: {
        color: theme.color
      },

      '&:hover': {
        color: theme.hover.color,
        backgroundColor: theme.hover.backgroundColor,
        borderColor: theme.hover.borderColor,

        [uiTextSelector]: {
          color: theme.hover.color
        }
      },

      '&:active': {
        color: theme.active.color,
        backgroundColor: theme.active.backgroundColor,
        borderColor: theme.active.borderColor,

        [uiTextSelector]: {
          color: theme.active.color
        }
      },

      '&:disabled': {
        pointerEvents: 'none',
        color: theme.disabled.color,
        backgroundColor: theme.disabled.backgroundColor,
        borderColor: theme.disabled.borderColor,

        [uiTextSelector]: {
          color: theme.disabled.color
        }
      }
    }
  };
};
