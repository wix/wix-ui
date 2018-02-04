import {core, TimePickerTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: TimePickerTheme) => {
  theme = (defaultsDeep(theme, core) as TimePickerTheme);

  return {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      width: theme.rootWidth,
      height: theme.rootHeight,
      position: 'relative',
    }
  };
};
