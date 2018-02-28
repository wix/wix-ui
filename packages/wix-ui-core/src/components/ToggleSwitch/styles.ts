import {core, ToggleSwitchTheme} from './theme';
import defaultsDeep = require('lodash.defaultsdeep');

const selectors = {
  toggleIconPath: '& ~ $innerLabel > $toggleIcon path',
  outerLabel: '& + $outerLabel',
  innerLabel: '& ~ $innerLabel',
  state: state => `& > input[type=checkbox]:${state}, &[data-preview~="${state}"] > input[type=checkbox][type=checkbox]`
};

const borderRadius = radius => ({
    '-webkit-border-radius': radius,
    '-moz-border-radius': radius,
    borderRadius: radius
});

export const styles = (theme: ToggleSwitchTheme) => {
  theme = (defaultsDeep(theme, core) as ToggleSwitchTheme);

  const labelCommon = {
    transition: `all ${theme.transitionSpeed} ease`,
    ...borderRadius(theme.borderRadius)
  };

  return {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      width: theme.rootWidth,
      height: theme.rootHeight,
      position: 'relative',
      outline: 'none',

      '& > input[type=checkbox]': {
        width: 0,
        height: 0,
        opacity: 0,
        margin: 0
      },

      [selectors.state('checked')]: {
        [selectors.outerLabel]: {
          backgroundColor: theme.backgroundColorChecked,
          borderWidth: theme.outerLabelBorderSizeChecked,
          borderColor: theme.outerLabelBorderColorChecked
        },
        [selectors.innerLabel]: {
          backgroundColor: theme.innerLabelBackgroundColorChecked,
          borderWidth: theme.innerLabelBorderSizeChecked,
          borderColor: theme.innerLabelBorderColorChecked,
          left: theme.labelMovementRange,
          '& > $toggleIcon': {
            transition: `all ${theme.transitionSpeed} cubic-bezier(0,1,0,1)`,
            '& path': {fill: theme.colorChecked}
          }
        },
      },

      [selectors.state('disabled')]: {
        [selectors.outerLabel]: {
          backgroundColor: theme.backgroundColorDisabled,
          cursor: 'default',
          borderWidth: theme.outerLabelBorderSizeDisabled,
          borderColor: theme.outerLabelBorderColorDisabled
        },
        [selectors.innerLabel]: {
          backgroundColor: theme.innerLabelBackgroundColorDisabled,
          cursor: 'default',
          borderWidth: theme.innerLabelBorderSizeDisabled,
          borderColor: theme.innerLabelBorderColorDisabled
        },
        [selectors.toggleIconPath]: {fill: theme.colorDisabled}
      },

      [selectors.state('checked:disabled')]: {
        [selectors.outerLabel]: {
          backgroundColor: theme.backgroundColorDisabled,
          cursor: 'default',
          borderWidth: theme.outerLabelBorderSizeDisabled,
          borderColor: theme.outerLabelBorderColorDisabled
        },
        [selectors.innerLabel]: {
          backgroundColor: theme.innerLabelBackgroundColorDisabled,
          cursor: 'default',
          borderWidth: theme.innerLabelBorderSizeDisabled,
          borderColor: theme.innerLabelBorderColorDisabled
        },
        [selectors.toggleIconPath]: {fill: theme.colorCheckedDisabled}
      },

      [selectors.state('hover')]: {
        [selectors.outerLabel]: {
          backgroundColor: theme.backgroundColorHover,
          borderWidth: theme.outerLabelBorderSizeHover,
          borderColor: theme.outerLabelBorderColorHover
        },
        [selectors.innerLabel]: {
          backgroundColor: theme.innerLabelBackgroundColorHover,
          borderWidth: theme.innerLabelBorderSizeHover,
          borderColor: theme.innerLabelBorderColorHover
        },
        [selectors.toggleIconPath]: {fill: theme.colorHover}
      },

      [selectors.state('checked:hover')]: {
        [selectors.outerLabel]: {
          backgroundColor: theme.backgroundColorHoverChecked,
          borderWidth: theme.outerLabelBorderSizeHoverChecked,
          borderColor: theme.outerLabelBorderColorHoverChecked
        },
        [selectors.innerLabel]: {
          backgroundColor: theme.innerLabelBackgroundColorHoverChecked,
          borderWidth: theme.innerLabelBorderSizeHoverChecked,
          borderColor: theme.innerLabelBorderColorHoverChecked
        },
        [selectors.toggleIconPath]: {fill: theme.colorHoverChecked}
      },

      [selectors.state('disabled:hover')]: {
        [selectors.outerLabel]: {
          backgroundColor: theme.backgroundColorDisabled,
          cursor: 'default',
          borderWidth: theme.outerLabelBorderSizeDisabled,
          borderColor: theme.outerLabelBorderColorDisabled
        },
        [selectors.innerLabel]: {
          backgroundColor: theme.innerLabelBackgroundColorDisabled,
          cursor: 'default',
          borderWidth: theme.innerLabelBorderSizeDisabled,
          borderColor: theme.innerLabelBorderColorDisabled
        },
        [selectors.toggleIconPath]: {fill: theme.colorDisabled}
      },

      [selectors.state('checked:disabled:hover')]: {
        [selectors.outerLabel]: {
          backgroundColor: theme.backgroundColorDisabled,
          cursor: 'default',
          borderWidth: theme.outerLabelBorderSizeDisabled,
          borderColor: theme.outerLabelBorderColorDisabled
        },
        [selectors.innerLabel]: {
          backgroundColor: theme.innerLabelBackgroundColorDisabled,
          cursor: 'default',
          borderWidth: theme.innerLabelBorderSizeDisabled,
          borderColor: theme.innerLabelBorderColorDisabled
        },
        [selectors.toggleIconPath]: {fill: theme.colorCheckedDisabled}
      },

      [selectors.state('focus')]: {
        outline: theme.focusOutline,
        [selectors.outerLabel]: {
          backgroundColor: theme.backgroundColorFocus,
          borderWidth: theme.outerLabelBorderSizeFocus,
          borderColor: theme.outerLabelBorderColorFocus
        }
      },

      [selectors.state('checked:focus')]: {
        outline: theme.focusOutline,
        [selectors.outerLabel]: {
          backgroundColor: theme.backgroundColorFocus,
          borderWidth: theme.outerLabelBorderSizeFocus,
          borderColor: theme.outerLabelBorderColorFocus
        }
      },
    },

    outerLabel: {
      ...labelCommon,

      display: 'inline-block',
      width: theme.outerLabelWidth,
      height: theme.outerLabelHeight,
      cursor: 'pointer',
      backgroundColor: theme.backgroundColor,
      borderWidth: theme.outerLabelBorderSize,
      borderColor: theme.outerLabelBorderColor,
      borderStyle: 'solid',
      boxSizing: 'border-box',
      boxShadow: theme.outerLabelBoxShadow
    },

    innerLabel: {
     ...labelCommon,

      display: 'flex',
      width: theme.innerLabelWidth,
      height: theme.innerLabelHeight,

      position: 'absolute',
      left: '1px',

      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',

      cursor: 'pointer',
      backgroundColor: theme.innerLabelBackgroundColor,
      boxShadow: theme.innerLabelBoxShadow,

      top: '50%',
      transform: 'translate(0, -50%)',

      borderWidth: theme.innerLabelBorderSize,
      borderColor: theme.innerLabelBorderColor,
      borderStyle: 'solid',
      boxSizing: 'border-box',
    },

    toggleIcon: {
      display: theme.toggleIconDisplay,
      width: theme.toggleIconWidth,
      height: theme.toggleIconHeight,
      transition: `all ${theme.transitionSpeed} cubic-bezier(1,0,1,0)`,

      '& path': {fill: theme.color}
    }
  };
};
