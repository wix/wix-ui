import { SignatureInputTestFixture } from './SignatureInputTestFixture';
import Registry from '@ui-autotools/registry';

const sliderMetadata = Registry.getComponentMetadata(SignatureInputTestFixture);
sliderMetadata.addSim({
  title: 'Simulation with Rendering title, canvas and button',
  props: {},
});
