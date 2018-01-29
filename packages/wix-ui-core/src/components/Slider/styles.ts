import {core, SliderTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: SliderTheme) => {
  theme = (defaultsDeep(theme, core) as SliderTheme);

  const handle = {
    '-webkit-appearance': 'none',
    opacity: 0,
  };

  const track = {
    width: theme.trackWidth,
    height: theme.trackHeight,
    cursor: 'pointer',
    background: theme.trackBackground,
    opacity: theme.trackOpacity,
    'border-radius': theme.trackRadius,
    border: {
      width: theme.trackBorderWidth,
      color: theme.trackBorderColor,
      style: 'solid'
    }
  };

  return {
    root: {
      position: 'relative',
      padding: theme.trackBorderWidth,
      boxSizing: 'border-box'
    },
    vertical: {
      '& $slider': {
        'writing-mode': 'bt-lr', /* IE */
        '-webkit-appearance': 'slider-vertical' /* WebKit */
      }
    },
    handleWrapper: {
        position: 'relative',
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
      pointerEvents: 'none',
      border: {
        width: theme.handleBorderWidth,
        color: theme.handleBorderColor,
        style: 'solid'
      },
      cursor: 'pointer',
    },
    slider: {
      //reset styles
      position: 'absolute',
      top: 0,
      left: 0,
      background: 'transparent',
      padding: 0,
      margin: 0,
      'box-sizing': 'border-box',
      cursor: 'pointer',
      height: '100%',
      width: '100%',

      '&:focus': {
        outline: 'none'
      },

      '&::-moz-focus-outer': {
        border: 0
      },

      '&::-webkit-slider-thumb': handle,
      '&::-moz-range-thumb': handle,
      '&::-ms-thumb': {
        ...handle,
        'box-shadow': '0 0 0',
        'box-sizing': 'border-box'
      },
      '&::-webkit-slider-runnable-track': track,
      '&::-moz-range-track': track,

      //Exporer
      '&::-ms-track': {
        ...track,
        cursor: 'pointer',
        background: 'transparent',
        'border-color': 'transparent',
        color: 'transparent',
      },

      '&::-ms-fill-lower': {
        background: theme.trackBackground,
        'border-radius': theme.trackRadius,
        border: track.border
      },

      '&::-ms-fill-upper': {
        background: theme.trackBackground,
        'border-radius': theme.trackRadius,
        border: track.border
      },

      '&::-ms-tooltip': {
        display: 'none'
      }
    }
  };
};
