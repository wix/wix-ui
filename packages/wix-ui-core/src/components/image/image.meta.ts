import { Image, ImageStatus} from './image';
import Registry from '@ui-autotools/registry';
import style from '../../../stories/Image/style.st.css';
import { SRC, BROKEN_SRC, ERROR_IMAGE_SRC} from './test-fixtures';

const imageMetadata = Registry.getComponentMetadata(Image);

imageMetadata.addStyle(style, {name: 'style', path: 'stories/Image/style.st.css'});

imageMetadata
  .addSim({
    title: 'renders an image in a loading stage at first',
    props: {
      src: SRC,
      alt: 'This is an image of 2 flamingos',
    },
    state: {
      status: ImageStatus.loading
    }
});

imageMetadata
  .addSim({
    title: 'succeeded with rendering an image',
    props: {
      src: SRC,
      alt: 'This is an image of 2 flamingos',
    },
    state: {
      status: ImageStatus.loaded
    }
});

imageMetadata
  .addSim({
    title: 'renders an empty pixel', 
    props: {
      src: BROKEN_SRC,
      srcSet: BROKEN_SRC,
      alt: 'This is an empty pixel',
    },
    state: {
      status: ImageStatus.loaded
    }
}); 

imageMetadata
  .addSim({
    title: 'renders an errorImage with error style',
    props: {
      errorImage: ERROR_IMAGE_SRC,
      alt: 'This is an error image',
    },
    state: {
      status: ImageStatus.error
    }
});

imageMetadata
  .addSim({
    title: 'renders a contain resized image', 
    props: {
      src: SRC,
      alt: 'This is an image of 2 flamingos',
      resizeMode: 'contain' 
    }
}); 

imageMetadata
  .addSim({
    title: 'renders a contain resized image', 
    props: {
      src: SRC,
      alt: 'This is an image of 2 flamingos',
      resizeMode: 'cover' 
    }
}); 

imageMetadata.exportedFrom({
  path: 'src/components/image/image',                       
  exportName: 'Image',                              
  baseStylePath: 'src/components/image/image.st.css',
});