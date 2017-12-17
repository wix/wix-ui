import React from 'react';
import {bool, node, oneOf} from 'prop-types';
import CoreButton from 'wix-ui-core/Button';
import {ThemedComponent} from 'wix-ui-theme';
import {theme} from './theme';
import {appearance, iconSize} from './appearance';
import UIText from '../UIText';

const iconStyle = {
  suffix: {paddingRight: '10px', display: 'flex'},
  prefix: {paddingLeft: '10px', display: 'flex'}
};

const createButtonIcon = (type, icon, size) => (
  icon ?
    <span style={iconStyle[type]}>
      {React.cloneElement(icon, {size})}
    </span> :
    null
);

const Button = ({height: size, theme: skin, isIcon, prefixIcon, suffixIcon, ...coreProps}) => (
  <ThemedComponent theme={theme} size={size} skin={skin} isIcon={isIcon}>
    <CoreButton {...coreProps}>
      <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {prefixIcon && createButtonIcon('prefix', prefixIcon, iconSize(size))}
        <UIText appearance={appearance(size)} dataClass="button-content">{coreProps.children}</UIText>
        {suffixIcon && createButtonIcon('suffix', suffixIcon, iconSize(size))}
      </span>
    </CoreButton>
  </ThemedComponent>
);

Button.propTypes = {
  ...CoreButton.propTypes,

  /** The height of the button */
  height: oneOf(['tiny', 'small', 'medium', 'large']),

  /** The theme of the button */
  theme: oneOf([
    'primaryStandard',
    'primaryError',
    'primaryPremium',
    'primaryWhite',
    'transparentGrey',
    'secondaryGrey',
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

    '************************** BELOW ARE DEPRECATED (supported for wix-style-react) **************************',
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
    'transparentblue',
    'whiteblue',
    'whiteblueprimary',
    'whitebluesecondary',
    'icon-greybackground',
    'icon-standard',
    'icon-standardsecondary',
    'icon-white',
    'icon-whitesecondary'
  ]),

  /** The prefix icon of the button */
  prefixIcon: node,

  /** The suffix icon of the button */
  suffixIcon: node,

  /** Makes the button look like the icon */
  isIcon: bool
};

Button.defaultProps = {
  height: 'medium',
  theme: 'primaryStandard'
};

export default Button;


