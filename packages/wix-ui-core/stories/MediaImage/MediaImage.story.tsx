import { MediaImage } from '../../src/components/media-image';
import {Category} from '../utils';

export default {
  category: Category.COMPONENTS,
  storyName: 'Media Image',

  component: MediaImage,
  componentPath: '../../src/components/media-image',

  componentProps: {
    mediaPlatformItem: {
      width: 400,
      height: 400,
      uri: '506418dbb019414f951a61670f3255a8.jpg',
    },
    errorMediaPlatformItem: {
      width: 400,
      height: 400,
      uri: '34a06998b3dd45e718c519ae53919e5a.jpg',
    },
    width: 400,
    height: 400,
  },

  exampleProps: {
    mediaPlatformItem: [
      {
        label: 'valid',
        value: {
          alt: 'flowers',
          width: 400,
          height: 400,
          uri: '506418dbb019414f951a61670f3255a8.jpg',
        },
      },
      {
        label: 'low quality',
        value: {
          alt: 'flowers',
          width: 400,
          height: 400,
          uri: '506418dbb019414f951a61670f3255a8.jpg',
          options: {
            quality: 5,
          }
        },
      },
      {
        label: 'blurred',
        value: {
          alt: 'flowers',
          width: 400,
          height: 400,
          uri: '506418dbb019414f951a61670f3255a8.jpg',
          options: {
            filters: {
              blur: 100,
            }
          }
        },
      },
      {
        label: 'invalid',
        value: {
          width: 400,
          height: 400,
          uri: 'not_a_real_image.jpg',
        },
      },
    ],
    errorMediaPlatformItem: [
      {
        label: 'valid',
        value: {
          alt: 'flowers',
          width: 400,
          height: 400,
          uri: '34a06998b3dd45e718c519ae53919e5a.jpg',
        },
      },
      {
        label: 'invalid',
        value: {
          width: 400,
          height: 400,
          uri: 'not_a_real_image.jpg',
        },
      },
    ],
  },
};
