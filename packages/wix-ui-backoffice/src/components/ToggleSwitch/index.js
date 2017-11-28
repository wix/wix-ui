import React from 'react';
import {oneOf} from 'prop-types';
import CoreToggleSwitch from 'wix-ui-core/dist/src/components/ToggleSwitch';
import {ThemedComponent} from 'wix-ui-core/dist/src/theme';
import {themeCreator} from './theme';

const ToggleSwitch = ({size, skin, ...coreProps}) => (
  <ThemedComponent themeCreator={themeCreator} size={size} skin={skin}>
    <CoreToggleSwitch {...coreProps}/>
  </ThemedComponent>
);

ToggleSwitch.propTypes = {
  ...CoreToggleSwitch.propTypes,

  /** size of the toggle switch */
  size: oneOf(['x-small', 'small', 'large']),

  /** Color for disabled toggle switch */
  skin: oneOf(['standard', 'error', 'success'])
};

ToggleSwitch.defaultProps = {
  size: 'large',
  skin: 'standard'
};

export default ToggleSwitch;
