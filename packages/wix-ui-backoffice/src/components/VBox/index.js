import React from 'react';
import {oneOf, string} from 'prop-types';
import CoreVBox from 'wix-ui-core/VBox';
import {ThemedComponent} from 'wix-ui-theme';
import {theme} from './theme';

const VBox = ({spacing, horizontalAlignment, width, height, ...coreProps}) => (
  <ThemedComponent theme={theme} spacing={spacing} horizontalAlignment={horizontalAlignment} width={width} height={height}>
    <CoreVBox {...coreProps}/>
  </ThemedComponent>
);

VBox.propTypes = {
  ...CoreVBox.propTypes,

  /** spacing between the elements */
  spacing: oneOf(['small', 'medium', 'large']),

  /** Similar to textAlign */
  horizontalAlignment: oneOf(['left', 'center', 'right']),

  /** Width of the HBox container */
  width: string,

  /** Height of the HBox container */
  height: string
};

export default VBox;
