import * as React from 'react'
import CategoryList from "../components/category-list";
import * as iconComponents from '../../src/on-stage/dist';
import tpaIconsMetadata from '../../src/on-stage/metadata';
import { IconMetadata } from "../../src/types";
import { classes } from "./OnStageCategoryList.st.css";

const tableHeaderTitles = [
  "16x16",
  "Icon Name",
  "12x12",
  "Icon Name",
  "20x20",
  "Icon Name",
  "8x8",
  "Icon Name",
  "48x48",
  "Icon Name",
  "6x6",
  "Icon Name",
  "Use for",
];

/** [icon component, icon name, small icon component,
 * small icon name, large icon component,
 * large icon name, xsmall icon component,
 * xsmall icon name, xlarge icon component,
 * xlarge icon name, xxsmall icon component,
 * xxsmall icon name, description] */
 export type TpaTableRow = [
  React.ReactNode,
  string | undefined,
  React.ReactNode,
  string | undefined,
  React.ReactNode,
  string | undefined,
  React.ReactNode,
  string | undefined,
  React.ReactNode,
  string | undefined,
  React.ReactNode,
  string | undefined,
  string | undefined
];

const searchKeys = ["title", "sizes.20", "sizes.24", "sizes.30", "tags", "aliases"];

const WixUiTpaCategoryList: React.FC = () => {

  const mapIconToRow = (
    {
      description,
      sizes,
    }: IconMetadata): TpaTableRow => {
    const Icon = iconComponents[sizes[24]]
    const SmallIcon = iconComponents[sizes[20]]
    const LargeIcon = iconComponents[sizes[30]]
    const XSmallIcon = iconComponents[sizes[16]]
    const XLargeIcon = iconComponents[sizes[60]]
    const XXSmallIcon = iconComponents[sizes[12]]
    return [
      Icon && <Icon/>,
      sizes[24],
      SmallIcon && <SmallIcon/>,
      sizes[20],
      LargeIcon && <LargeIcon/>,
      sizes[30],
      XSmallIcon && <XSmallIcon/>,
      sizes[16],
      XLargeIcon && <XLargeIcon/>,
      sizes[60],
      XXSmallIcon && <XXSmallIcon/>,
      sizes[12],
      description,
    ]
  }

  return (
    <CategoryList
      dataHook="icon-list"
      className={classes.tableList}
      iconsMetadata={tpaIconsMetadata}
      {...{
        tableHeaderTitles,
        searchKeys,
        mapIconToRow,
      }}
    />
  )
};
export default WixUiTpaCategoryList
