import {hCore, vCore, HBoxTheme, VBoxTheme, BoxTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

const getDefaultTheme = (theme: BoxTheme) => {
  if (theme.boxType === 'vertical') {
    return (defaultsDeep(theme, vCore) as VBoxTheme);
  } else {
    return (defaultsDeep(theme, hCore) as HBoxTheme);
  }
};

export const styles = (theme: BoxTheme) => {
  theme = getDefaultTheme(theme);

  const alignmentMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
    top: 'flex-start',
    bottom: 'flex-end'
  };

  return {
    boxRoot: {
      display: 'flex',
      flexDirection: theme.boxType === 'vertical' ? 'column' : 'row',
      alignItems: alignmentMap[theme.alignment],
      width: '100%',
      height: '100%',
      '& >:not(:last-child)': theme.boxType === 'vertical' ? {
        marginBottom: theme.spacing
      } : {
        marginRight: theme.spacing
      }
    }
  };
};
