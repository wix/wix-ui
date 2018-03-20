import {core, VBoxTheme} from './theme';
const defaultsDeep = require('lodash/defaultsDeep');

export const styles = (theme: VBoxTheme) => {
  theme = (defaultsDeep(theme, core) as VBoxTheme);

  const alignmentMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end'
  };

  return {
    vRoot: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: alignmentMap[theme.horizontalAlignment],
      width: '100%',
      height: '100%',
      '& >:not(:last-child)': {
        marginBottom: theme.spacing
      }
    }
  };
};
