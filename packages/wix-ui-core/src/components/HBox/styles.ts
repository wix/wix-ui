import {core, HBoxTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: HBoxTheme) => {
  theme = (defaultsDeep(theme, core) as HBoxTheme);

  const alignmentMap = {
    bottom: 'flex-end',
    center: 'center',
    top: 'flex-start'
  };

  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: alignmentMap[theme.verticalAlignment],
      height: theme.height,
      width: theme.width,
      '& *:not(:last-child)': {
        marginRight: theme.spacing
      }
    }
  };
};
