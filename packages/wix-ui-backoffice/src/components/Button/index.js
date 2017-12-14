import React from 'react';
import {oneOf} from 'prop-types';
import CoreButton from 'wix-ui-core/Button';
import {ThemedComponent} from 'wix-ui-theme';
import {theme} from './theme';
import {appearance} from './appearance';
import UIText from '../UIText'

const Button = ({height: size, theme: skin, ...coreProps}) => (
  <ThemedComponent theme={theme} size={size} skin={skin}>
    <CoreButton {...coreProps}>
      <UIText appearance={appearance(size)}>{coreProps.children}</UIText>
    </CoreButton>
  </ThemedComponent>
);

Button.propTypes = {
  ...CoreButton.propTypes,

  /** The height of the button */
  height: oneOf(['tiny', 'small', 'medium', 'large']),

  /** The theme of the button */
  theme: oneOf([
    'greyscale',
    'secondaryGreyscale',
    'primaryStandard',
    'primaryError',
    'primaryPremium',
    'primaryWhite',
    'secondaryStandard',
    'secondaryError',
    'secondaryPremium',
    'secondaryWhite',
    'tertiaryStandard',

    //**********  deprecated themes ***********
    'fullred',
    'fullgreen',
    'fullpurple',
    'emptyred',
    'emptygreen',
    'emptybluesecondary',
    'emptyblue',
    'emptypurple',
    'fullblue',
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
