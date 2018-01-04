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
    }
  };
};
