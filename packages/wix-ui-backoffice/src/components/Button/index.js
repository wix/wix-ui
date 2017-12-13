import React from 'react';
import {oneOf} from 'prop-types';
import CoreButton from 'wix-ui-core/Button';
import {ThemedComponent} from 'wix-ui-theme';
import {theme} from './theme';
import {appearance} from './appearance';

const Button = ({height: size, theme: skin, ...coreProps}) => (
  <ThemedComponent theme={theme} size={size} skin={skin}>
    <CoreButton {...coreProps}>
      <span data-appearance={appearance(size)}>{coreProps.children}</span> /* waiting for UIText component */
    </CoreButton>
  </ThemedComponent>
);

Button.propTypes = {
  ...CoreButton.propTypes,

  /** The height of the button */
  height: oneOf(['small', 'medium', 'large']),

  /** The theme of the button */
  theme: oneOf([
    'transparent',
    'fullred',
    'fullgreen',
    'fullpurple',
    'emptyred',
    'emptygreen',
    'emptybluesecondary',
    'emptyblue',
    'emptypurple',
    'fullblue',
    'login',
    'emptylogin',
    'transparentblue',
    'whiteblue',
    'whiteblueprimary',
    'whitebluesecondary',
    'close-standard',
    'close-dark',
    'close-transparent',
    'icon-greybackground',
    'icon-standard',
    'icon-standardsecondary',
    'icon-white',
    'icon-whitesecondary'
  ])
};

Button.defaultProps = {
  height: 'medium',
  theme: 'fullblue'
};

export default Button;
