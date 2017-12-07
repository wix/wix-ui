import {core, ToggleSwitchTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

export const styles = (theme: ToggleSwitchTheme) => {
  theme = (defaultsDeep(theme, core) as ToggleSwitchTheme);

  return {
    root: {
      display: 'inline-block',

      '& input[type=checkbox]': {
        display: 'none'
      },

      '& label': {
        '-webkit-border-radius': theme.borderRadius,
        '-moz-border-radius': theme.borderRadius,
        borderRadius: theme.borderRadius,
        transition: `all ${theme.transitionSpeed} ease`
      },

      '& input[type=checkbox] + $outerLabel': {
        '& $toggleInactive': {
          display: theme.toggleIconDisplay
        }
      },

      '& input[type=checkbox]:checked + $outerLabel': {
        background: theme.backgroundColorChecked,

        '& $innerLabel': {
          left: theme.labelMovementRange,

          '& $toggleActive': {
            display: theme.toggleIconDisplay
          },

          '& $toggleInactive': {
            display: 'none'
          }
        }
      },

      '& input[type=checkbox]:hover + $outerLabel': {
        background: theme.backgroundColorHover,

        '& $toggleInactive': {
          '& path': {
            fill: theme.colorHover
          }
        },

        '& $toggleActive': {
          '& path': {
            fill: theme.colorHover
          }
        }
      },

      '& input[type=checkbox]:disabled + $outerLabel': {
        background: theme.backgroundColorDisabled,
        cursor: 'default',

        '& $innerLabel': {
          cursor: 'default',

          '& $toggleActive': {
            '& path': {
              fill: theme.colorCheckedDisabled
            }
          },

          '& $toggleInactive': {
            '& path': {
              fill: theme.colorDisabled
            }
          }
        }
      }
    },

    outerLabel: {
      display: 'inline-block',
      width: theme.outerLabelWidth,
      height: theme.outerLabelHeight,
      background: theme.backgroundColor,
      position: 'relative',
      cursor: 'pointer'
    },

    innerLabel: {
      display: 'flex',
      width: theme.innerLabelWidth,
      height: theme.innerLabelHeight,
      background: theme.innerLabelBackgroundColor,
      position: 'absolute',
      top: '1px',
      left: '1px',
      zIndex: '1',
      textAlign: 'center',
      cursor: 'pointer',

      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '1.5px 1.5px 1px rgba(0,0,0,0.2)'
    },

    toggleActive: {
      display: 'none',
      width: theme.toggleIconWidth,
      height: theme.toggleIconHeight,
      transition: `all ${theme.transitionSpeed} cubic-bezier(0,1,0,1)`,

      '& path': {
        fill: theme.colorChecked
      }
    },

    toggleInactive: {
      width: theme.toggleIconWidth,
      height: theme.toggleIconHeight,
      transition: `all ${theme.transitionSpeed} cubic-bezier(1,0,1,0)`,

      '& path': {
        fill: theme.color
      }
    }
  };
};
