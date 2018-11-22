import {Slider} from './Slider';
import Registry from '@ui-autotools/registry';

const sliderMetadata = Registry.getComponentMetadata(Slider);
sliderMetadata
  .addSim({
    title: 'sliderSim',
    props: {}
  });