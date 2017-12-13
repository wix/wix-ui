import React from 'react';
import {oneOf, string} from 'prop-types';
import CoreHBox from 'wix-ui-core/HBox';
import {ThemedComponent} from 'wix-ui-theme';
import {theme} from './theme';

const HBox = ({spacing, verticalAlignment, ...coreProps}) => (
  <ThemedComponent theme={theme} spacing={spacing} verticalAlignment={verticalAlignment}>
    <CoreHBox {...coreProps}/>
  </ThemedComponent>
);

HBox.propTypes = {
  ...CoreHBox.propTypes,

  /** Spacing between the elements */
  spacing: oneOf(['small', 'medium', 'large']),

  /** Similar to flexbox vertical-align */
  verticalAlignment: oneOf(['center', 'flex-end', 'flex-start']),

  /** Height of the HBox container */
  height: string
};

HBox.defaultProps = {
  spacing: 'medium',
  verticalAlignment: 'center',
  height: '100px'
};

export default HBox;

