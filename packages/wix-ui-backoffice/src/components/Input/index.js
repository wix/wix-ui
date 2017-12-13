import React from 'react';
import {oneOf} from 'prop-types';
import CoreInput from 'wix-ui-core/Input';
import {ThemedComponent} from 'wix-ui-theme';
import {theme} from './theme';

const Input = ({size, skin, ...coreProps}) => (
  <ThemedComponent theme={theme} size={size} skin={skin}>
    <CoreInput {...coreProps}/>
  </ThemedComponent>
);

Input.propTypes = {
  ...CoreInput.propTypes,

  /** size of the input component */
  size: oneOf(['small', 'normal', 'large']),

  /** Color schemes for the inpus component */
  skin: oneOf(['standard', 'error', 'disabled'])
};

Input.defaultProps = {
  size: 'normal',
  skin: 'standard'
};

export default Input;
