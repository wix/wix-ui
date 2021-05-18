import * as React from "react";
import CategoryList from "../category-list";
import { classes } from "./GeneralCategoryListBase.st.css";
import { IconMetadata } from "../../../src/types";
import { GeneralCategoryListProps, GeneralTableRow} from '../../types'

const GeneralCategoryListBase: React.FC<GeneralCategoryListProps> = ({ iconComponents, iconsMetadata, smallSize }) => {

  const smallIconSize = smallSize? smallSize: 18;
  const smallIconTitle = smallIconSize===20? "12" : "18";

  const tableHeaderTitles = [
    "24x24",
    "Icon Name",
    `${smallIconTitle}x${smallIconTitle}`,
    "Icon Name",
    "Use for",
  ];

  const searchKeys = ["title", `sizes.${smallIconSize}`, "sizes.24", "tags", "aliases"];

  const mapIconToRow = (
    {
      description,
      sizes,
    }: IconMetadata): GeneralTableRow => {
    const Icon = iconComponents[sizes[24]]
    const SmallIcon = iconComponents[sizes[smallIconSize]]
    return [
      Icon && <Icon/>,
      sizes[24],
      SmallIcon && <SmallIcon/>,
      sizes[smallIconSize],
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
