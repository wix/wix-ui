import {hCore, vCore, HBoxTheme, VBoxTheme, BoxTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';
import * as get from 'lodash/get';

const getDefaultTheme = (theme: BoxTheme) => {
  // any <Box /> which isn't vertical should be horizontal - https://github.com/wix/wix-ui/pull/126#discussion_r159144509
  if (get(theme, 'vertical', false) === true) {
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
      flexDirection: theme.vertical ? 'column' : 'row',
      alignItems: alignmentMap[theme.alignment],
      width: '100%',
      height: '100%',
      '& >:not(:last-child)': theme.vertical ? {
        marginBottom: theme.spacing
      } : {
        marginRight: theme.spacing
      }
    }
  };
};
