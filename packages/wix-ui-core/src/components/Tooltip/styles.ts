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
    // get inspiration for the arrow from this wizardry:
    // https://github.com/wix/wix-style-react/blob/27b48431e4e2b06a27556606d6c717a966009fa8/src/Tooltip/TooltipContent.scss
    tooltipArrow: {}
  };
};
