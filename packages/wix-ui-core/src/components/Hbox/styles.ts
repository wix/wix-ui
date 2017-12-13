import {core, HBoxTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: HBoxTheme) => {
  theme = (defaultsDeep(theme, core) as HBoxTheme);
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: theme.verticalAlignment,
      height: theme.height,
      '& *:not(:last-child)': {
        marginRight: theme.spacing
      }
    }
  };
};
