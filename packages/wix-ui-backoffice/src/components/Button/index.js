import React from 'react';
import {bool, node, oneOf} from 'prop-types';
import CoreButton from 'wix-ui-core/Button';
import {ThemedComponent} from 'wix-ui-theme';
import {theme} from './theme';
import {appearance, iconSize} from './appearance';
import UIText from '../UIText';

const createPrefix = (icon, size) => (
  icon ?
    <span data-hook="btn-prefix" style={{paddingRight: '10px', display: 'flex'}}>
      {React.cloneElement(icon, {size})}
    </span> :
    null
);

const createSuffix = (icon, size) => (
  icon ?
    <span data-hook="btn-suffix" style={{paddingLeft: '10px', display: 'flex'}}>
      {React.cloneElement(icon, {size})}
    </span> :
    null
);

const createElement = (element, prefix, suffix, dataClass = '') => {
  const style = {display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'};

  return (
    <span data-class={dataClass} style={style}>
      {prefix}
      {element}
      {suffix}
    </span>
  );
};

const createContent = (element, prefix, suffix) => {
  const dataClass = 'button-content';

  return React.isValidElement(element) ?
    React.cloneElement(element, { 'data-class': dataClass }, createElement(element.props.children, prefix, suffix)) :
    createElement(element, prefix, suffix, dataClass);
};

const Button = ({height: size, theme: skin, isIcon, prefixIcon, suffixIcon, ...coreProps}) => (
  <ThemedComponent theme={theme} size={size} skin={skin} isIcon={isIcon}>
    <CoreButton {...coreProps}>
      <UIText appearance={appearance(size)}>
        {createContent(coreProps.children, createPrefix(prefixIcon, iconSize(size)), createSuffix(suffixIcon, iconSize(size)))}
      </UIText>
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
