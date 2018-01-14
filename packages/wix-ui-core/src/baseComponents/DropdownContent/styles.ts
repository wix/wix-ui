import {core, DropdownContentTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: DropdownContentTheme) => {
  theme = (defaultsDeep(theme, core) as DropdownContentTheme);

  return {
    optionsContainer: {
      outline: 0,
      border: '1px solid',
      borderColor: theme.borderColor,
      backgroundColor: theme.backgroundColor,
      borderRadius: theme.borderRadius,
      overflow: 'auto'
    },

    option: {
      '&.hover': {
        backgroundColor: 'red'
      },

      '&.selected': {
        backgroundColor: 'blue'
      }
    }
  };
};
