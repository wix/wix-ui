import * as React from 'react';
import {Thumbnail} from './Thumbnail';
import Registry from '@ui-autotools/registry';

const thumbnailMetadata = Registry.getComponentMetadata(Thumbnail);
thumbnailMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      children: <div />
    }
  });
  