import {Image} from '../../src/components/image';
import style from './style.st.css';


export default {
  category: 'Components',
  storyName: 'Image',

  component: Image,
  componentPath: '../../src/components/image',

  componentProps: {
    ...style('root'),
    src:'https://www.gettyimages.com/gi-resources/images/CreativeLandingPage/HP_Sept_24_2018/CR3_GettyImages-159018836.jpg',
    errorImage: 'https://cdn.pixabay.com/photo/2016/04/24/13/24/error-1349562__340.png',
    onError: () => 'On Error!',
    onLoad: () => 'On Load!',
  }
};
