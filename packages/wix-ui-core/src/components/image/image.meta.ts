import { Image } from './image';
import { ImageStatus } from './consts';
import Registry from '@ui-autotools/registry';
import { style } from '../../themes/default/image/style.st.css';
import { SRC, BROKEN_SRC } from './test-fixtures';

const imageMetadata = Registry.getComponentMetadata(Image);

imageMetadata.addStyle(style, {
  name: 'style',
  path: 'src/themes/default/image/style.st.css',
});

imageMetadata.addSim({
  title: 'loading image',
  props: {
    src: SRC,
    alt: 'This is an image of 2 flamingos',
  },
  state: {
    status: ImageStatus.loading,
  },
});

imageMetadata.addSim({
  title: 'succeeded with rendering an image',
  props: {
    src: SRC,
    alt: 'This is an image of 2 flamingos',
  },
  state: {
    status: ImageStatus.loaded,
  },
});

imageMetadata.addSim({
  title: 'failed with rendering an image',
  props: {
    src: BROKEN_SRC,
    alt: 'This is a broken image',
  },
  state: {
    status: ImageStatus.error,
  },
});

imageMetadata.addSim({
  title: 'renders a contain resized image',
  props: {
    src: SRC,
    alt: 'This is an image of 2 flamingos',
    resizeMode: 'contain',
  },
  state: {
    status: ImageStatus.loaded,
  },
});

imageMetadata.addSim({
  title: 'renders a cover resized image',
  props: {
    src: SRC,
    alt: 'This is an image of 2 flamingos',
    resizeMode: 'cover',
  },
  state: {
    status: ImageStatus.loaded,
  },
});

imageMetadata.exportInfo = {
  path: 'src/components/image/image',
  exportName: 'Image',
  baseStylePath: 'src/components/image/image.st.css',
};
