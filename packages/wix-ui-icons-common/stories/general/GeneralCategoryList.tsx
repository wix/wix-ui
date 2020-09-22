import * as React from "react";
import CategoryList from "../components/category-list";
import generalIconsMetadata from "../../src/general/metadata";
import * as iconComponents from "../../src/general/dist";
import { classes } from "./GeneralCategoryList.st.css";
import { IconMetadata } from "../../src/types";
import { GeneralTableRow } from "../types";

const mapIconToRow = ({
  description,
  sizes,
}: IconMetadata): GeneralTableRow => {
  const Icon = iconComponents[sizes[24]];
  const SmallIcon = iconComponents[sizes[18]];
  return [
    Icon && <Icon />,
    sizes[24],
    SmallIcon && <SmallIcon />,
    sizes[18],
    description,
  ];
};

const tableHeaderTitles = [
  "24x24",
  "Icon Name",
  "18x18",
  "Icon Name",
  "Use for",
];

const searchKeys = ["title", "sizes.18", "sizes.24", "tags", "aliases"];

const GeneralCategoryList: React.FC = () => (
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
);

export default GeneralCategoryList;
