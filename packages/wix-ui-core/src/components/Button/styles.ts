import {core, ButtonTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: ButtonTheme) => {
  theme = (defaultsDeep(theme, core) as ButtonTheme);

  return {
    button: {
      color: theme.color,
      background: theme.backgroundColor,
      borderColor: theme.borderColor,
      height: theme.height,
      borderRadius: theme.borderRadius,
      padding: theme.padding,

      fontFamily: theme.fontFamily,
      fontSize: theme.fontSize,
      lineHeight: theme.lineHeight,
      fontStyle: theme.fontStyle,
      fontWeight: theme.fontWeight,
      textDecoration: theme.textDecoration,

      boxSizing: 'border-box',
      '-webkit-font-smoothing': 'antialiased',
      textAlign: 'center',
      border: '1px solid',
      cursor: 'pointer',
      outline: 'none',

      transition: 'background-color 100ms linear, border-color 100ms linear, color 100ms linear',

      '&:hover': {
        color: theme.hover.color,
        backgroundColor: theme.hover.backgroundColor,
        borderColor: theme.hover.borderColor
      },

      '&:disabled': {
        pointerEvents: 'none',
        backgroundColor: theme.disabled.backgroundColor,
        borderColor: theme.disabled.borderColor
      }
    }
  };
};
