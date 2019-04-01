import * as React from 'react';
import { Tooltip } from './Tooltip';
import Registry from '@ui-autotools/registry';
const noop = require('lodash/noop');

const tooltipMetadata = Registry.getComponentMetadata(Tooltip);
tooltipMetadata.addSim({
  title: 'Simulation with default props',
  props: {
    children: [<div key="1" />],
  },
});
