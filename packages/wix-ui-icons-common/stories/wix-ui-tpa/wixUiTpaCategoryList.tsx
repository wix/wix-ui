import * as React from 'react'
import GeneralCategoryListBase from '../components/general-category-list-base/GeneralCategoryListBase'
import * as iconComponents from '../../src/wix-ui-tpa/dist'
import generalIconsMetadata from '../../src/wix-ui-tpa/metadata'

const ClassicEditorGeneralCategoryList: React.FC = () =>
  (
    <>
      <GeneralCategoryListBase iconComponents={iconComponents} iconsMetadata={generalIconsMetadata}/>
    </>
  )

export default ClassicEditorGeneralCategoryList
