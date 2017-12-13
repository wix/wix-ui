import React from 'react';
import {oneOf} from 'prop-types';
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
  spacing: oneOf(['small', 'medium', 'large']),

  /** Similar to textAlign */
  horizontalAlignment: oneOf(['left', 'center', 'right'])
};

VBox.defaultProps = {
  spacing: 'medium',
  horizontalAlignment: 'center'
};

export default VBox;
