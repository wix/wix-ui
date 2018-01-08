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

      padding: theme.contentPadding,
    },

    rightArrowStyle: {
      borderColor: `transparent ${theme.borderColor} transparent transparent`
    },
    leftArrowStyle: {
      borderColor: `transparent transparent transparent ${theme.borderColor}`
    },
    topArrowStyle: {
      borderColor: `${theme.borderColor} transparent transparent transparent`
    },
    bottomArrowStyle: {
      borderColor: `transparent transparent ${theme.borderColor} transparent`
    }

  };
};
