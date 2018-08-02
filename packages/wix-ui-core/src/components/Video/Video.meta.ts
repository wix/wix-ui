import {Video} from './Video';
import Registry from '@ui-autotools/registry';

const videoMetadata = Registry.getComponentMetadata(Video);
videoMetadata.reactStrictModeCompliant = false;

videoMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {}
  });