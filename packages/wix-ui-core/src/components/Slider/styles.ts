import {core, SliderTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: SliderTheme) => {
  theme = (defaultsDeep(theme, core) as SliderTheme);

  return {
    root: {
      position: 'relative',
      padding: theme.trackBorderWidth,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    track: {
      width: '100%',
      height: theme.trackSize,
      cursor: 'pointer',
      background: theme.trackBackground,
      opacity: theme.trackOpacity,
      'border-radius': theme.trackRadius,
      border: {
        width: theme.trackBorderWidth,
        color: theme.trackBorderColor,
        style: 'solid'
      }
    },
    vertical: {
      '& $track': {
        width: theme.trackSize,
        height: '100%'
      }
    },
    handleWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    },
    handle: {
      position: 'absolute',
      boxSizing: 'border-box',
      background: theme.handleBackground,
      'border-radius': theme.handleRadius,
      borderRadius: '50%',
      border: {
        width: theme.handleBorderWidth,
        color: theme.handleBorderColor,
        style: 'solid'
      },
      cursor: 'pointer',
    },
    tooltipWrapper: {
      background: 'navy',
      color: '#fff',
      padding: '2px',
      width: '20px',
      textAlign: 'center'
    }
  };
};
