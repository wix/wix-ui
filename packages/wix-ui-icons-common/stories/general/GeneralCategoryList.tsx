import * as React from 'react'
import GeneralCategoryListBase from '../components/general-category-list-base/GeneralCategoryListBase'
import * as iconComponents from '../../src/general/dist'
import generalIconsMetadata from '../../src/general/metadata'

const ClassicEditorGeneralCategoryList: React.FC = () =>
  (
    <>
      <GeneralCategoryListBase iconComponents={iconComponents} iconsMetadata={generalIconsMetadata}/>
    </>
  )

export default ClassicEditorGeneralCategoryList
