import React from 'react';
import CoreToggleSwitch from 'wix-ui-core/dist/src/components/ToggleSwitch/ToggleSwitch';
import {ThemedComponent} from 'wix-ui-theme/dist/src';

const ToggleSwitch = ({...coreProps}) => (
  <ThemedComponent>
    <CoreToggleSwitch {...coreProps}/>
  </ThemedComponent>
);

ToggleSwitch.propTypes = {
  ...CoreToggleSwitch.propTypes
};

export default ToggleSwitch;
