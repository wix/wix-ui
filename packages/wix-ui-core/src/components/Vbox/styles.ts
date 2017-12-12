import {core, VboxTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: VboxTheme) => {
  theme = (defaultsDeep(theme, core) as VboxTheme);

  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: `-webkit-${theme.horizontalAlignment}`,
      margin: '0 auto',
      '& *:not(:last-child)': {
        marginBottom: theme.spacing
      }
    }
  };
};
