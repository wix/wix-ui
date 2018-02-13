import {core, SliderTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: SliderTheme) => {
  theme = (defaultsDeep(theme, core) as SliderTheme);

  return {
    root: {
      position: 'relative',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      '& *': {
        boxSizing: 'border-box',
      },
    },
    track: {
      width: '100%',
      height: theme.trackSize,
      cursor: 'pointer',
      background: theme.trackBackground,
      opacity: theme.trackOpacity,
      'border-radius': theme.trackRadius,
      overflow: 'hidden',
      border: {
        width: theme.trackBorderWidth,
        color: theme.trackBorderColor,
        style: 'solid'
      },
      position: 'relative'
    },
    inner: {
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%'
    },
    highlightedTrack: {
      position: 'absolute',
      background: 'linear-gradient(to right, #4992e3, #70bff3)',
      height: '100%',
      width: '100%'
    },
    withTicks: {
      '& $inner': {
        height: '88.888%',
        width: '100%'
      }
    },
    vertical: {
      '& $track': {
        width: theme.trackSize,
        height: '100%'
      },
      '& $highlightedTrack': {
        background: 'linear-gradient(to top, #4992e3, #70bff3)',
      },
      '&$withTicks': {
        '& $inner': {
          width: '88.888%',
          height: '100%'
        }
      },
    },
    handle: {
      position: 'absolute',
      zIndex: 1,
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
    },
    tick: {
      display: 'inline-block',
      position: 'absolute',
      background: '#000',
      cursor: 'pointer'
    }
  };
};
