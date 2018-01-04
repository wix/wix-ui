import {PopoverTheme} from './theme';

const arrowPlacement = pos => `&[data-placement="${pos}"]`;

export const styles = (theme: PopoverTheme) => {

  return {
    arrow: {
      color: 'red'
    },

    popoverContent: {
      [arrowPlacement('right')]: {
        marginLeft: '5px',

        '& $arrow': {
          borderWidth: '5px 5px 5px 0',
          borderColor: 'transparent #222 transparent transparent',
          left: '-5px',
          top: 'calc(50% - 5px)',
          marginLeft: '0',
          marginRight: '0'
        }
      },

      [arrowPlacement('left')]: {
        marginRight: '5px',

        '& $arrow': {
          borderWidth: '5px 0 5px 5px',
          borderColor: 'transparent transparent transparent #222',
          right: '-5px',
          top: 'calc(50% - 5px)',
          marginLeft: '0',
          marginRight: '0'
        }
      },

      [arrowPlacement('bottom')]: {
        marginTop: '5px',

        '& $arrow': {
          borderWidth: '0 5px 5px 5px',
          borderColor: 'transparent transparent #222 transparent',
          top: '-5px',
          left: 'calc(50% - 5px)',
          marginTop: '0',
          marginBottom: '0'
        }
      },

      [arrowPlacement('top')]: {
        marginBottom: '5px',

        '& $arrow': {
          borderWidth: '5px 5px 0 5px',
          borderColor: '#222 transparent transparent transparent',
          bottom: '-5px',
          left: 'calc(50% - 5px)',
          marginTop: '0',
          marginBottom: '0'
        }
      }
    }
  };
};
