import React from 'react';
import {func} from 'prop-types';
import CoreToggleSwitch from 'wix-ui-core/dist/src/components/ToggleSwitch';
import {ThemedComponent} from 'wix-ui-theme/dist/src';

function onLabelClick(e) {
  e.stopPropagation();
}

const ToggleSwitch = ({onFocus, onBlur, ...coreProps}) => (
  <span tabIndex="0" onFocus={onFocus} onBlur={onBlur}>
    <ThemedComponent>
      <CoreToggleSwitch {...coreProps} onLabelClick={onLabelClick}/>
    </ThemedComponent>
  </span>
);

ToggleSwitch.propTypes = {
  onFocus: func,
  onBlur: func,
  ...CoreToggleSwitch.propTypes
};

ToggleSwitch.defaultProps = {
  onFocus: () => {},
  onBlur: () => {}
};

export default ToggleSwitch;
