import * as React from 'react'
import GeneralCategoryListBase from '../../components/general-category-list-base/GeneralCategoryListBase'
import * as iconComponents from '../../../src/on-stage/general/dist';
import generalIconsMetadata from '../../../src/on-stage/general/metadata';


const OnStageGeneralCategoryList: React.FC = () =>
  (
    <>
      <GeneralCategoryListBase iconComponents={iconComponents} iconsMetadata={generalIconsMetadata} smallSize={20}/>
    </>
  )
export default OnStageGeneralCategoryList;
