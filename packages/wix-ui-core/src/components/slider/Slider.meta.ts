import { Slider } from './Slider';
import Registry from '@ui-autotools/registry';

const sliderMetadata = Registry.getComponentMetadata(Slider);
sliderMetadata.nonA11yCompliant = true;
sliderMetadata.addSim({
  title: 'sliderSim',
  props: {
    'aria-label': 'slider'
  },
});
