import * as React from 'react';
import { Tooltip } from './';
import Registry from '@ui-autotools/registry';

const tooltipMetadata = Registry.getComponentMetadata(Tooltip);

tooltipMetadata.addSim({
  title: 'Simulation with default props',
  props: { children: <div>hello</div> },
});
