import * as React from 'react'
import GeneralCategoryListBase from '../../components/general-category-list-base/GeneralCategoryListBase'
import * as iconComponents from '../../../src/classic-editor/general/dist'
import generalIconsMetadata from '../../../src/classic-editor/general/metadata'

const ClassicEditorGeneralCategoryList: React.FC = () =>
  (
    <>
      <GeneralCategoryListBase iconComponents={iconComponents} iconsMetadata={generalIconsMetadata}/>
    </>
  )

export default ClassicEditorGeneralCategoryList
