import { WixMedia } from '../../src/components/wix-media';

export default {
  category: 'Components',
  storyName: 'Wix Media',

  component: WixMedia,
  componentPath: '../../src/components/wix-media',

  componentProps: {
    errorImage:
      'https://cdn.pixabay.com/photo/2016/04/24/13/24/error-1349562__340.png',
    mediaPlatformItem: {
      width: 400,
      height: 400,
      uri: '506418dbb019414f951a61670f3255a8.jpg',
    },
    width: 400,
    height: 400,
  },
};
