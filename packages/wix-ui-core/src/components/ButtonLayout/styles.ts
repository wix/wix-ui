import {core, ButtonTheme} from './../Button/theme';
import * as defaultsDeep from 'lodash/defaultsDeep';
import {styles as buttonStyles} from './../Button/styles';

const contentSelector = '& [data-class="button-layout-content"]';

const stateStyle = (state, theme) => ({
  color: theme[state].color,
  backgroundColor: theme[state].backgroundColor,
  borderColor: theme[state].borderColor,

  [contentSelector]: {
    color: theme[state].color
  }
});

export const styles = (theme: ButtonTheme) => {
  theme = (defaultsDeep(theme, core) as ButtonTheme);
  return {
    buttonLayout: {
      // take the base from button
      ...buttonStyles(theme).button,
      alignItems: 'center',
      display: 'inline-flex',
      '& > *': {
        color: theme.color
      }
    },
    disabled: {
      pointerEvents: 'none',
      ...stateStyle('disabled', theme)
    }
  };
};
