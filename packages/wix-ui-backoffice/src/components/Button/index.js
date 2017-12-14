import React from 'react';
import {node, oneOf} from 'prop-types';
import CoreButton from 'wix-ui-core/Button';
import {ThemedComponent} from 'wix-ui-theme';
import {theme} from './theme';
import {appearance, iconSize} from './appearance';
import UIText from '../UIText';

const addPrefix = (icon, size) => (
  icon ?
    <span data-hook="btn-prefix" style={{paddingRight: '10px', display: 'flex'}}>
      {React.cloneElement(icon, {size})}
    </span> :
    null
);

const addSuffix = (icon, size) => (
  icon ?
    <span data-hook="btn-suffix" style={{paddingLeft: '10px', display: 'flex'}}>
      {React.cloneElement(icon, {size})}
    </span> :
    null
);

const Button = ({height: size, theme: skin, prefixIcon, suffixIcon, ...coreProps}) => (
  <ThemedComponent theme={theme} size={size} skin={skin}>
    <CoreButton {...coreProps}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        {addPrefix(prefixIcon, iconSize(size))}
        <UIText appearance={appearance(size)}>{coreProps.children}</UIText>
        {addSuffix(suffixIcon, iconSize(size))}
      </div>
    </CoreButton>
  </ThemedComponent>
);

Button.propTypes = {
  ...CoreButton.propTypes,

  /** The height of the button */
  height: oneOf(['tiny', 'small', 'medium', 'large']),

  /** The theme of the button */
  theme: oneOf([
    'transparentGrey',
    'secondaryGrey',
    'primaryStandard',
    'primaryError',
    'primaryPremium',
    'primaryWhite',
    'secondaryStandard',
    'secondaryError',
    'secondaryPremium',
    'secondaryWhite',
    'tertiaryStandard',

    'close-standard',
    'close-dark',
    'close-white',
    'close-lightBlue',
    'close-transparent',

    'icon-primaryStandard',
    'icon-secondaryStandard',
    'icon-tertiaryStandard',
    'icon-primaryWhite',
    'icon-secondaryWhite',


    '************************** BELOW ARE DEPRECATED (supported for wix-style-react) **************************',
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
  ]),

  prefixIcon: node,
  suffixIcon: node
};

Button.defaultProps = {
  height: 'medium',
  theme: 'primaryStandard'
};

export default Button;
