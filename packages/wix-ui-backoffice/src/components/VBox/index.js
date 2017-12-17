import React from 'react';
import {oneOf, string} from 'prop-types';
import CoreVBox from 'wix-ui-core/VBox';
import {ThemedComponent} from 'wix-ui-theme';
import {theme} from './theme';

const VBox = ({spacing, horizontalAlignment, ...coreProps}) => (
  <ThemedComponent theme={theme} spacing={spacing} horizontalAlignment={horizontalAlignment}>
    <CoreVBox {...coreProps}/>
  </ThemedComponent>
);

VBox.propTypes = {
  ...CoreVBox.propTypes,

  /** spacing between the elements */
  spacing: string,

  /** Similar to textAlign */
  horizontalAlignment: oneOf(['left', 'center', 'right'])
};

export default VBox;
