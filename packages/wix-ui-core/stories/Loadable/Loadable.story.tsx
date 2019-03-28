import * as React from 'react';
import { Loadable } from '../../src/components/loadable';

export default {
  category: 'Components',
  storyName: 'Loadable',

  component: Loadable,
  componentPath: '../../src/components/loadable',

  componentProps: () => ({
    'data-hook': 'storybook-loadable',
    loader: () => import('./loaded'),
    defaultComponent: <span>Not loaded yet...</span>,
    componentKey: 'Loaded',
    shouldLoadComponent: false,
    children(Loaded) {
      return <Loaded />;
    },
  }),
};
