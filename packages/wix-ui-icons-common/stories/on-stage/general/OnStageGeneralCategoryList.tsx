import * as React from 'react'
import GeneralCategoryListBase from '../../components/general-category-list-base/GeneralCategoryListBase'
import * as iconComponents from '../../../src/on-stage/general/dist';
import generalIconsMetadata from '../../../src/on-stage/general/metadata';
import { IconSizesType } from '../../types';


const OnStageGeneralCategoryList: React.FC = () =>{

  const iconSizes: IconSizesType = {
    smallSize: 20,
    mediumSize: 24,
  }

  return (
    <>
    <GeneralCategoryListBase iconComponents={iconComponents} iconsMetadata={generalIconsMetadata} iconSizes={iconSizes}/>
    </>
  )
}
export default OnStageGeneralCategoryList;
