import {Video} from './Video';
import Registry from '@ui-autotools/registry';

const videoMetadata = Registry.getComponentMetadata(Video);
videoMetadata.nonReactStrictModeCompliant = true;
videoMetadata.nonA11yCompliant = true;

videoMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      src: 'video.mp4'
    }
  });