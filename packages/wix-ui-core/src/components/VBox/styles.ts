import {core, VBoxTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: VBoxTheme) => {
  theme = (defaultsDeep(theme, core) as VBoxTheme);

  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: `-webkit-${theme.horizontalAlignment}`,
      margin: '0 auto',
      width: theme.width,
      height: theme.height,
      '& *:not(:last-child)': {
        marginBottom: theme.spacing
      }
    }
  };
};
