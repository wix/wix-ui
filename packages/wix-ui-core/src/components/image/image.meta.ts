import {Image} from './image';
import Registry from '@ui-autotools/registry';
const noop = require('lodash/noop');
import style from '../../../stories/Image/style.st.css';

const imageMetadata = Registry.getComponentMetadata(Image);

imageMetadata.addStyle(style, {name: 'style', path: 'stories/Image/style.st.css'});

imageMetadata
  .addSim({
    title: 'Simulation with default props',
    props: {
      src: 'https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg',
      errorImage: 'https://cdn.pixabay.com/photo/2016/04/24/13/24/error-1349562__340.png',
      onError: noop,
      onLoad: noop,
    }
  });