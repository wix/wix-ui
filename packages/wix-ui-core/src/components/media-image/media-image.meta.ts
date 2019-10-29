import { MediaImage } from './media-image';
import Registry from '@ui-autotools/registry';
import style from '../../themes/default/image/style.st.css';
import { SRC, BROKEN_SRC } from './test-fixtures';
import { ImageStatus } from '../image';

const mediaImageMetadata = Registry.getComponentMetadata(MediaImage);

mediaImageMetadata.addStyle(style, {
  name: 'style',
  path: 'src/themes/default/image/style.st.css',
});

mediaImageMetadata.addSim({
  title: 'loading image',
  props: {
    mediaPlatformItem: SRC,
    alt: 'This is an image of 2 flamingos',
  },
  state: {
    status: ImageStatus.loading,
  },
});

mediaImageMetadata.addSim({
  title: 'succeeded with rendering an image',
  props: {
    mediaPlatformItem: SRC,
    alt: 'This is an image of 2 flamingos',
  },
  state: {
    status: ImageStatus.loaded,
  },
});

mediaImageMetadata.addSim({
  title: 'failed with rendering an image',
  props: {
    errorMediaPlatformItem: BROKEN_SRC,
    alt: 'This is a broken image',
  },
  state: {
    status: ImageStatus.error,
  },
});

mediaImageMetadata.exportInfo = {
  path: 'src/components/media-image/media-image',
  exportName: 'MediaImage',
  baseStylePath: 'src/components/image/image.st.css',
};
