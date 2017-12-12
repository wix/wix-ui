import {core, HboxTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: HboxTheme) => {
  theme = (defaultsDeep(theme, core) as HboxTheme);
  return {
    root: {
      display: 'flex',
      alignItems: theme.verticalAlignment,
      '& *:not(:last-child)': {
        marginRight: theme.spacing
      }
    }
  };
};
