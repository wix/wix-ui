import React from 'react';
import {oneOf, string} from 'prop-types';
import CoreHBox from 'wix-ui-core/HBox';
import {ThemedComponent} from 'wix-ui-theme';
import {theme} from './theme';

const HBox = ({spacing, verticalAlignment, height, width, ...coreProps}) => (
  <ThemedComponent theme={theme} spacing={spacing} height={height} width={width} verticalAlignment={verticalAlignment}>
    <CoreHBox {...coreProps}/>
  </ThemedComponent>
);

HBox.propTypes = {
  ...CoreHBox.propTypes,

  /** Spacing between the elements */
  spacing: oneOf(['small', 'medium', 'large']),

  /** Similar to flexbox vertical-align */
  verticalAlignment: oneOf(['top', 'center', 'bottom']),

  /** Height of the HBox container */
  height: string,

  /** Width of the HBox container */
  width: string
};

export default HBox;
