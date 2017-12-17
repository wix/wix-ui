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
    hRoot: {
      display: 'flex',
      alignItems: alignmentMap[theme.verticalAlignment],
      height: '100%',
      width: '100%',
      '& >:not(:last-child)': {
        marginRight: theme.spacing
      }
    }
  };
};
