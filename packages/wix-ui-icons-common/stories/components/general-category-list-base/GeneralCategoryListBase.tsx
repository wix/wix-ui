import * as React from "react";
import CategoryList from "../category-list";
import { classes } from "./GeneralCategoryListBase.st.css";
import { IconMetadata } from "../../../src/types";
import { GeneralCategoryListProps, GeneralTableRow } from '../../types'

const tableHeaderTitles = [
  "24x24",
  "Icon Name",
  "18x18",
  "Icon Name",
  "Use for",
];

const searchKeys = ["title", "sizes.18", "sizes.24", "tags", "aliases"];

const GeneralCategoryListBase: React.FC<GeneralCategoryListProps> = ({ iconComponents, iconsMetadata }) => {

  const mapIconToRow = (
    {
      description,
      sizes,
    }: IconMetadata): GeneralTableRow => {
    const Icon = iconComponents[sizes[24]]
    const SmallIcon = iconComponents[sizes[18]]
    return [
      Icon && <Icon/>,
      sizes[24],
      SmallIcon && <SmallIcon/>,
      sizes[18],
      description,
    ]
  }

  return (
    <CategoryList
      className={classes.tableList}
      dataHook="icon-list"
      iconsMetadata={iconsMetadata}
      {...{
        tableHeaderTitles,
        searchKeys,
        mapIconToRow,
      }}
    />
  )
};

export default GeneralCategoryListBase;
