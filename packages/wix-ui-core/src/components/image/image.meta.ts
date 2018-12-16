import {Image} from './image';
import Registry from '@ui-autotools/registry';

const imageMetadata = Registry.getComponentMetadata(Image);

imageMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      src: 'https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg',
      alt: 'blabla'
    }
  });