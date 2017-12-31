import {core, ToggleSwitchTheme} from './theme';
import * as defaultsDeep from 'lodash/defaultsDeep';

const selectors = {
  toggleIconPath: '& ~ $innerLabel > $toggleIcon path',
  outerLabel: '& + $outerLabel',
  innerLabel: '& ~ $innerLabel',
  state: state => `& > input[type=checkbox]:${state}`
};

export const styles = (theme: ToggleSwitchTheme) => {
  theme = (defaultsDeep(theme, core) as ToggleSwitchTheme);

  const labelCommon = {
    '-webkit-border-radius': theme.borderRadius,
    '-moz-border-radius': theme.borderRadius,
    borderRadius: theme.borderRadius,
    transition: `all ${theme.transitionSpeed} ease`
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
        display: 'none'
      },

      [selectors.state('checked')]: {
        [selectors.outerLabel]: {backgroundColor: theme.backgroundColorChecked},
        [selectors.innerLabel]: {
          left: theme.labelMovementRange,
          '& > $toggleIcon': {
            transition: `all ${theme.transitionSpeed} cubic-bezier(0,1,0,1)`,
            '& path': {fill: theme.colorChecked}
          }
        },
      },

      [selectors.state('disabled')]: {
        [selectors.outerLabel]: {backgroundColor: theme.backgroundColorDisabled, cursor: 'default'},
        [selectors.innerLabel]: {cursor: 'default'},
        [selectors.toggleIconPath]: {fill: theme.colorDisabled}
      },

      [selectors.state('checked:disabled')]: {
        [selectors.outerLabel]: {backgroundColor: theme.backgroundColorDisabled, cursor: 'default'},
        [selectors.innerLabel]: {cursor: 'default'},
        [selectors.toggleIconPath]: {fill: theme.colorCheckedDisabled}
      },

      [selectors.state('hover')]: {
        [selectors.outerLabel]: {backgroundColor: theme.backgroundColorHover},
        [selectors.toggleIconPath]: {fill: theme.colorHover}
      },

      [selectors.state('hover:checked')]: {
        [selectors.outerLabel]: {backgroundColor: theme.backgroundColorHover},
        [selectors.toggleIconPath]: {fill: theme.colorHover}
      },

      [selectors.state('hover:disabled')]: {
        [selectors.outerLabel]: {backgroundColor: theme.backgroundColorDisabled, cursor: 'default'},
        [selectors.innerLabel]: {cursor: 'default'},
        [selectors.toggleIconPath]: {fill: theme.colorDisabled}
      },

      [selectors.state('hover:checked:disabled')]: {
        [selectors.outerLabel]: {backgroundColor: theme.backgroundColorDisabled, cursor: 'default'},
        [selectors.innerLabel]: {cursor: 'default'},
        [selectors.toggleIconPath]: {fill: theme.colorCheckedDisabled}
      },

      [selectors.state('focus')]: {
        outline: theme.focusOutline
      },
    },

    outerLabel: {
      ...labelCommon,

      display: 'inline-block',
      width: theme.outerLabelWidth,
      height: theme.outerLabelHeight,
      cursor: 'pointer',
      backgroundColor: theme.backgroundColor
    },

    innerLabel: {
     ...labelCommon,

      display: 'flex',
      width: theme.innerLabelWidth,
      height: theme.innerLabelHeight,

      position: 'absolute',
      left: '1px',
      zIndex: 1,

      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',

      cursor: 'pointer',
      backgroundColor: theme.innerLabelBackgroundColor,
      boxShadow: '1.5px 1.5px 1px rgba(0,0,0,0.2)',

      top: '50%',
      transform: 'translate(0, -50%)'
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
