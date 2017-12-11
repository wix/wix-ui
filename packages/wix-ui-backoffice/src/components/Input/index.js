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

  /** size of the toggle switch */
  size: oneOf(['x-small', 'small', 'large']),

  /** Color for disabled toggle switch */
  skin: oneOf(['standard', 'error', 'success'])
};

Input.defaultProps = {
  size: 'large',
  skin: 'standard'
};

export default Input;
