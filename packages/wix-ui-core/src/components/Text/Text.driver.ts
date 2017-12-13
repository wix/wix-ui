// import * as ReactTestUtils from 'react-dom/test-utils';
import * as styles from './styles';

export const textDriverFactory = ({element}) => {
  const getClasses = (element) => {
    const rawCssClasses = element.getAttribute('class');
    let cssClasses = [];
    if(rawCssClasses !== null){
      cssClasses = element.getAttribute('class').split(' ')
    }
    const stylesKeys = styles.styles({});
    console.log('',stylesKeys );
    return cssClasses;
  }
  return {
    exists: () => !!element,
    isEllipsis: className => getClasses(element).indexOf('ellipsis') !== -1
  };
};




