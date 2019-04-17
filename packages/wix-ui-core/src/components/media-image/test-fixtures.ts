import {MediaPlatformItem} from './media-image';

// Valid image
export const SRC: MediaPlatformItem = {
  width: 400,
  height: 400,
  uri: '506418dbb019414f951a61670f3255a8.webp',
};

// Broken image
export const BROKEN_SRC: MediaPlatformItem = {
  width: 400,
  height: 400,
  uri: 'not_a_real_image.jpg',
};
