import * as React from 'react';
import { ButtonNext } from '.';
import More from 'wix-ui-icons-common/More';
import Registry from '@ui-autotools/registry';

const buttonMetadata = Registry.getComponentMetadata(ButtonNext);

buttonMetadata.addSim({
  title: 'Simulation with suffix icon',
  props: {
    suffixIcon: <More />,
    children: 'Button',
  },
});

buttonMetadata.addSim({
  title: 'Simulation with prefix icon',
  props: {
    prefixIcon: <More />,
    children: 'Button',
  },
});

buttonMetadata.addSim({
  title: 'Simulation with prefix and suffix icon',
  props: {
    prefixIcon: <More />,
    suffixIcon: <More />,
    children: 'Button',
  },
});
