import { Image ,ImageStatus } from './image';
import Registry from '@ui-autotools/registry';
import style from '../../../stories/Image/style.st.css';

const imageMetadata = Registry.getComponentMetadata(Image);

imageMetadata.addStyle(style, {name: 'style', path: 'stories/Image/style.st.css'});

imageMetadata
  .addSim({
    title: 'renders provided src',
    props: {
      src: 'https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg',
      alt: 'This is an image of 2 flamingos',
    }
  });

imageMetadata
  .addSim({
    title: 'renders a provided errorImage',
    props: {
      errorImage: 'https://cdn.pixabay.com/photo/2016/04/24/13/24/error-1349562__340.png',
      alt: 'This is an image of 2 flamingos',
    }
});

imageMetadata
  .addSim({
    title: 'displays a loading state style', 
    props: {
      src: 'https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg',
      alt: 'This is an image of 2 flamingos',
    },
    state: {
      status: ImageStatus.loading
    }
}); 

imageMetadata
  .addSim({
    title: 'renders an empty pixel', 
    props: {
      src: 'data:image/png;base64,this-is-broken!',
      alt: 'This is an image of 2 flamingos',
    },
    state: {
      status: ImageStatus.loading
    }
}); 

