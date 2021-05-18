import * as React from 'react'
import CategoryList from "../../components/category-list";
import { IconMetadata } from "../../../src/types";
import { classes } from "./OnStageGeneralCategoryList.st.css";
import * as iconComponents from '../../../src/on-stage/general/dist';
import generalIconsMetadata from '../../../src/on-stage/general/metadata';

import { GeneralTableRow } from '../../types'

const tableHeaderTitles = [
  "16x16",
  "Icon Name",
  "12x12",
  "Icon Name",
  "Use for",
];

const searchKeys = ["title", "sizes.20", "sizes.24", "tags", "aliases"];

const OnStageGeneralCategoryList: React.FC = () => {

  const mapIconToRow = (
    {
      description,
      sizes,
    }: IconMetadata): GeneralTableRow => {
    const Icon = iconComponents[sizes[24]]
    const SmallIcon = iconComponents[sizes[20]]
    return [
      Icon && <Icon/>,
      sizes[24],
      SmallIcon && <SmallIcon/>,
      sizes[20],
      description,
    ]
  }

  return (
    <CategoryList
      className={classes.tableList}
      dataHook="icon-list"
      iconsMetadata={generalIconsMetadata}
      {...{
        tableHeaderTitles,
        searchKeys,
        mapIconToRow,
      }}
    />
  )
};
export default OnStageGeneralCategoryList;
