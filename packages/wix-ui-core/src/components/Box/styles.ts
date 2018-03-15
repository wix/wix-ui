import {horizontalCore, verticalCore, BoxTheme} from './theme';
const defaultsDeep = require('lodash/defaultsDeep');

export const styles = (theme: BoxTheme) => {
  const verticalTheme = defaultsDeep({...theme}, verticalCore);
  const horizontalTheme = defaultsDeep({...theme}, horizontalCore);

  const crossAxisAlignmentMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end'
  };

  return {
    boxRoot: {
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    vertical: {
      alignItems: crossAxisAlignmentMap[verticalTheme.crossAxisAlignment],
      flexDirection: 'column',
      '& >:not(:last-child)': {
        marginBottom: verticalTheme.spacing
      }
    },
    horizontal: {
      alignItems: crossAxisAlignmentMap[horizontalTheme.crossAxisAlignment],
      flexDirection: 'row',
      '& >:not(:last-child)': {
        marginRight: horizontalTheme.spacing
      }
    },
    lastItemTakesRemainingWidth: {
      '& >:last-child': {
        flexGrow: 1,
      },
      '& >:not(:last-child)': {
        flexGrow: 0,
      }
    }
  };
};
