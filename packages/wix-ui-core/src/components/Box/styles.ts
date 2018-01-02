import {hCore, vCore, BoxTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';
import * as get from 'lodash/get';

const getDefaultTheme = (theme: BoxTheme) => {
  // any <Box /> which isn't vertical should be horizontal - https://github.com/wix/wix-ui/pull/126#discussion_r159144509
  theme; /*?*/
  if (theme && theme.vertical) {
    console.log('vCore');
    return (defaultsDeep(theme, vCore));
  } else {
    console.log('hCore');
    return (defaultsDeep(theme, hCore));
  }
};

export const styles = (theme: BoxTheme) => {
  theme = getDefaultTheme(theme);

  const crossAxisAlignmentMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end'
  };

  return {
    boxRoot: {
      display: 'flex',
      alignItems: crossAxisAlignmentMap[theme.crossAxisAlignment],
      width: '100%',
      height: '100%',
    },
    vertical: {
      flexDirection: 'column',
      '& >:not(:last-child)': {
        marginBottom: theme.spacing || '20px'
      }
    },
    horizontal: {
      flexDirection: 'row',
      '& >:not(:last-child)': {
        marginRight: theme.spacing || '0px'
      }
    }
  };
};
