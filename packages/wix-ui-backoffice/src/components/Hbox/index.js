import React from 'react';
import {oneOf} from 'prop-types';
import CoreHbox from 'wix-ui-core/Hbox';
import {ThemedComponent} from 'wix-ui-theme';
import {theme} from './theme';

const Hbox = ({spacing, verticalAlignment, ...coreProps}) => (
  <ThemedComponent theme={theme} spacing={spacing} verticalAlignment={verticalAlignment}>
    <CoreHbox {...coreProps}/>
  </ThemedComponent>
);

Hbox.propTypes = {
  ...CoreHbox.propTypes,

  /** spacing between the elements */
  spacing: oneOf(['small', 'medium', 'large']),

  /** Similar to flexbox vertical-align */
  verticalAlignment: oneOf(['center', 'flex-end', 'flex-start'])
};

Hbox.defaultProps = {
  spacing: 'medium',
  verticalAlignment: 'center'
};

export default Hbox;
