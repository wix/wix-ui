import {core, TooltipTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: TooltipTheme) => {
  theme = (defaultsDeep(theme, core) as TooltipTheme);

  return {
    tooltip: {
      backgroundColor: theme.backgroundColor,

      border: `${theme.borderWidth} ${theme.borderStyle} ${theme.borderColor}`,
      borderRadius: theme.borderRadius,

      padding: theme.contentPadding
    },

    tooltipArrow: {}
  };
};
