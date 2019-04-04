import { WixMediaImage } from './wix-media-image';
import Registry from '@ui-autotools/registry';
import style from '../../themes/default/image/style.st.css';
import { SRC, BROKEN_SRC } from './test-fixtures';
import { ImageStatus } from '../image';

const wixMediaImageMetadata = Registry.getComponentMetadata(WixMediaImage);

wixMediaImageMetadata.addStyle(style, {
  name: 'style',
  path: 'src/themes/default/image/style.st.css',
});

wixMediaImageMetadata
  .addSim({
    title: 'loading image',
    props: {
      mediaPlatformItem: SRC,
    },
    state: {
      status: ImageStatus.loading
    }
  });

wixMediaImageMetadata
  .addSim({
    title: 'succeeded with rendering an image',
    props: {
      mediaPlatformItem: SRC,
    },
    state: {
      status: ImageStatus.loaded
    }
  });

wixMediaImageMetadata
  .addSim({
    title: 'failed with rendering an image',
    props: {
      errorMediaPlatformItem: BROKEN_SRC,
    },
    state: {
      status: ImageStatus.error
    }
  });

wixMediaImageMetadata.exportInfo = {
  path: 'src/components/wix-media-image/wix-media-image',
  exportName: 'WixMediaImage',
  baseStylePath: 'src/components/image/image.st.css',
};
