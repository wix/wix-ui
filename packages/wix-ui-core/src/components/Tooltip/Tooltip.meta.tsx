import * as React from 'react';
import {TooltipComponent} from './Tooltip';
import Registry from '@ui-autotools/registry';

const tooltipMetadata = Registry.getComponentMetadata(TooltipComponent);
tooltipMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      // tslint:disable-next-line:no-empty
      disableOnClickOutside: () => {},
      // tslint:disable-next-line:no-empty
      enableOnClickOutside: () => {},
      children: [<div key="1" />]
    }
  });
  