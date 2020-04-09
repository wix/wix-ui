import { Image } from '../../src/components/image';
import { classes } from '../../src/themes/default/image/style.st.css';
import { Category } from '../utils';

export default {
  category: Category.COMPONENTS,
  storyName: 'image',

  component: Image,
  componentPath: '../../src/components/image',

  componentProps: {
    className: classes.root,
    src:
      'https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg',
    errorImage:
      'https://cdn.pixabay.com/photo/2016/04/24/13/24/error-1349562__340.png',
  },
};
