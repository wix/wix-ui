import {core, SliderTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: SliderTheme) => {
  theme = (defaultsDeep(theme, core) as SliderTheme);

  const handleMarginTop = theme.handleMarginTop || `calc(50% - ${theme.handleSize / 2}px)`;

  const handle = {
    position: 'relative',
    top: handleMarginTop,
    '-webkit-appearance': 'none',
    border: theme.handleBorder,
    height: theme.handleSize,
    width: theme.handleSize,
    'border-radius': theme.handleRadius,
    background: theme.handleBackground,
    cursor: 'pointer',
  };

  const track = {
    width: theme.trackWidth,
    height: theme.trackHeight,
    cursor: 'pointer',
    background: theme.trackBackground,
    opacity: theme.trackOpacity,
    'border-radius': theme.trackRadius,
    border: theme.trackBorder
  };

  return {
    root: {
    },
    slider: {
      //reset styles
      '-webkit-appearance': 'none',
      background: 'transparent',
      padding: 0,
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
        border: theme.trackBorder
      },

      '&::-ms-fill-upper': {
        background: theme.trackBackground,
        'border-radius': theme.trackRadius,
        border: theme.trackBorder
      },

      '&::-ms-tooltip': {
        display: 'none'
      }
    }
  };
};
