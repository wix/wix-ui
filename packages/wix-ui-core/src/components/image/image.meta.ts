import { Image, ImageStatus} from './image';
import Registry from '@ui-autotools/registry';
import style from '../../../stories/Image/style.st.css';
import { SRC, BROKEN_SRC, ERROR_IMAGE_SRC} from './test-fixtures';

const imageMetadata = Registry.getComponentMetadata(Image);

imageMetadata.addStyle(style, {name: 'style', path: 'stories/Image/style.st.css'});

imageMetadata
  .addSim({
    title: 'renders provided src',
    props: {
      src: SRC,
      alt: 'This is an image of 2 flamingos',
    }
});

imageMetadata
  .addSim({
    title: 'renders a provided srcSet ',
    props: {
      srcSet: SRC,
      alt: 'This is an image of 2 flamingos',
    }
});

imageMetadata
  .addSim({
    title: 'renders a provided srcSet when src is broken ',
    props: {
      src: BROKEN_SRC,
      srcSet: SRC,
      alt: 'This is an image of 2 flamingos',
    }
});


imageMetadata
  .addSim({
    title: 'renders a provided errorImage when src/srcSet is missing',
    props: {
      errorImage: ERROR_IMAGE_SRC,
      alt: 'This is an error image',
    }
});

imageMetadata
  .addSim({
    title: 'renders an empty pixel when src is broken and errorImage is missing', 
    props: {
      src: BROKEN_SRC,
      alt: 'This is an empty pixel',
    }
}); 

imageMetadata
  .addSim({
    title: 'renders an empty pixel when src and srcSet are broken and errorImage is missing', 
    props: {
      src: BROKEN_SRC,
      srcSet: BROKEN_SRC,
      alt: 'This is  an empty pixel',
    }
}); 

imageMetadata
  .addSim({
    title: 'displays a loading state style', 
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
