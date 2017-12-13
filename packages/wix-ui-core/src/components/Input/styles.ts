import {core, InputTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: InputTheme) => {
  theme = (defaultsDeep(theme, core) as InputTheme);

  return {
    input: {
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
      textAlign: 'left',
      border: '1px solid',
      cursor: 'text',
      outline: 'none',

      transition: 'background-color 100ms linear, border-color 100ms linear, color 100ms linear',

      '&:hover': {
        color: theme.hover.color,
        backgroundColor: theme.hover.backgroundColor,
        borderColor: theme.hover.borderColor
      },

      '&:focus': {
        color: theme.focus.color,
        backgroundColor: theme.focus.backgroundColor,
        borderColor: theme.focus.borderColor,

        '&:hover': {
          backgroundColor: theme.focus.hoverBackgroundColor
        }
      },

      '&:disabled': {
        color: theme.disabled.color,
        backgroundColor: theme.disabled.backgroundColor,
        borderColor: theme.disabled.borderColor,

        '&:hover': {
          borderColor: theme.disabled.hoverBorderColor
        }
      }
    }
  };
};
