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
  spacing: string,

  /** Similar to flexbox vertical-align */
  verticalAlignment: oneOf(['top', 'center', 'bottom'])
};

export default HBox;
