import React from 'react';
import {func, array} from 'prop-types';
import CoreToggleSwitch from 'wix-ui-core/dist/src/components/ToggleSwitch';
import {ResponsiveThemedComponent} from '../../ResponsiveThemedComponent';

const ToggleSwitch = ({themeCreator, events, ...coreProps}) => (
  <ResponsiveThemedComponent themeCreator={themeCreator} events={events}>
    <CoreToggleSwitch {...coreProps}/>
  </ResponsiveThemedComponent>
);

ToggleSwitch.propTypes = {
  ...CoreToggleSwitch.propTypes,
  themeCreator: func,
  events: array
};

export default ToggleSwitch;
