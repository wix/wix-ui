import {PopoverTheme} from './theme';

const arrowPlacement = pos => `&[data-placement="${pos}"]`;

export const styles = (theme: PopoverTheme) => {
  return {
    arrow: {
      width: 0,
      height: 0,
      borderStyle: 'solid',
      position: 'absolute',
      margin: '5px'
    },

    popoverContent: {
      minWidth: '100%',
      [arrowPlacement('right')]: {
        paddingLeft: '5px',

        '& $arrow': {
          borderWidth: '5px 5px 5px 0',
          left: '-5px',
          top: 'calc(50% - 5px)',
          marginLeft: '5px',
          marginRight: '0'
        }
      },

      [arrowPlacement('left')]: {
        paddingRight: '5px',

        '& $arrow': {
          borderWidth: '5px 0 5px 5px',
          right: '-5px',
          top: 'calc(50% - 5px)',
          marginLeft: '0',
          marginRight: '5px'
        }
      },

      [arrowPlacement('bottom')]: {
        paddingTop: '5px',

        '& $arrow': {
          borderWidth: '0 5px 5px 5px',
          top: '-5px',
          left: 'calc(50% - 5px)',
          marginTop: '5px',
          marginBottom: '0'
        }
      },

      [arrowPlacement('top')]: {
        paddingBottom: '5px',

        '& $arrow': {
          borderWidth: '5px 5px 0 5px',
          bottom: '-5px',
          left: 'calc(50% - 5px)',
          marginTop: '0',
          marginBottom: '5px'
        }
      }
    }
  };
};
