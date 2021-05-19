import * as React from "react";
import CategoryList from "../category-list";
import { classes } from "./GeneralCategoryListBase.st.css";
import { IconMetadata } from "../../../src/types";
import { GeneralCategoryListProps, GeneralTableRow} from '../../types'


const GeneralCategoryListBase: React.FC<GeneralCategoryListProps> = ({
  iconComponents,
  iconsMetadata,
  iconSizes = {
    smallSize: 18,
    smallTitle: "18",
    mediumSize: 24,
    mediumTitle: "24",
  },
}) => {

  const tableHeaderTitles = [
    `${iconSizes.mediumTitle}x${iconSizes.mediumTitle}`,
    "Icon Name",
    `${iconSizes.smallTitle}x${iconSizes.smallTitle}`,
    "Icon Name",
    "Use for",
  ];

  const searchKeys = ["title", `sizes.${iconSizes.smallSize}`, `sizes.${iconSizes.mediumSize}`, "tags", "aliases"];

  const mapIconToRow = (
    {
      description,
      sizes,
    }: IconMetadata): GeneralTableRow => {
    const Icon = iconComponents[sizes[iconSizes.mediumSize]]
    const SmallIcon = iconComponents[sizes[iconSizes.smallSize]]
    return [
      Icon && <Icon/>,
      sizes[iconSizes.mediumSize],
      SmallIcon && <SmallIcon/>,
      sizes[iconSizes.smallSize],
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
