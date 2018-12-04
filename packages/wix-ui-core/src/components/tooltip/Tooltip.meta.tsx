import * as React from 'react';
import {TooltipComponent} from './Tooltip';
import Registry from '@ui-autotools/registry';
const noop = require('lodash/noop');

const tooltipMetadata = Registry.getComponentMetadata(TooltipComponent);
tooltipMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      disableOnClickOutside: noop,
      enableOnClickOutside: noop,
      children: [<div key="1" />]
    }
  });
  