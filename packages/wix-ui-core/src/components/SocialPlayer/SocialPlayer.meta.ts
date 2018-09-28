import {SocialPlayer} from './SocialPlayer';
import Registry from '@ui-autotools/registry';

const socialPlayerMetadata = Registry.getComponentMetadata(SocialPlayer);
socialPlayerMetadata.reactStrictModeCompliant = false;

socialPlayerMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {}
  });
