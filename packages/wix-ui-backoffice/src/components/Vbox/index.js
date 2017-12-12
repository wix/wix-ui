import React from 'react';
import {oneOf} from 'prop-types';
import CoreVbox from 'wix-ui-core/Vbox';
import {ThemedComponent} from 'wix-ui-theme';
import {theme} from './theme';

const Vbox = ({spacing, horizontalAlignment, ...coreProps}) => (
  <ThemedComponent theme={theme} spacing={spacing} horizontalAlignment={horizontalAlignment}>
    <CoreVbox {...coreProps}/>
  </ThemedComponent>
);

Vbox.propTypes = {
  ...CoreVbox.propTypes,

  /** spacing between the elements */
  spacing: oneOf(['small', 'medium', 'large']),

  /** Similar to textAlign */
  horizontalAlignment: oneOf(['center', 'flex-end', 'flex-start'])
};

Vbox.defaultProps = {
  spacing: 'medium',
  horizontalAlignment: 'center'
};

export default Vbox;
