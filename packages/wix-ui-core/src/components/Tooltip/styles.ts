import {core, TooltipTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: TooltipTheme) => {
  theme = (defaultsDeep(theme, core) as TooltipTheme);

  return {
    tooltip: {
      backgroundColor: theme.backgroundColor,

      borderWidth: theme.borderWidth,
      borderStyle: theme.borderStyle,
      borderColor: theme.borderColor,
      borderRadius: theme.borderRadius,

      padding: theme.contentPadding
    },

    arrow: {
      width: 0,
      height: 0,
      borderStyle: theme.borderStyle,
      position: 'absolute',
      margin: '5px'
    }
  };
};
