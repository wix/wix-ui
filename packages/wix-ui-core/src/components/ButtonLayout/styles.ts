import {core, ButtonLayoutTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

const contentSelector = '& [data-class="button-layout-content"]';

const stateStyle = (state, theme) => ({
  color: theme[state].color,
  backgroundColor: theme[state].backgroundColor,
  borderColor: theme[state].borderColor,

  [contentSelector]: {
    color: theme[state].color
  }
});

export const styles = (theme: ButtonLayoutTheme) => {
  theme = (defaultsDeep(theme, core) as ButtonLayoutTheme);

  return {
    buttonLayout: {
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

      '&:hover': stateStyle('hover', theme),

      '&:active': stateStyle('active', theme),

      '&:[data-disabled=true]': {
        pointerEvents: 'none',
        ...stateStyle('disabled', theme)
      }
    }
  };
};
