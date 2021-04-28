import * as React from 'react'
import CategoryList from "../components/category-list";
import * as iconComponents from '../../src/wix-ui-tpa/dist';
import tpaIconsMetadata from '../../src/wix-ui-tpa/metadata';
import { IconMetadata } from "../../src/types";
import { GeneralCategoryListProps, TpaTableRow } from '../types';

const tableHeaderTitles = [
  "24x24",
  "Icon Name",
  "20x20",
  "Icon Name",
  "30x30",
  "Icon Name",
  "16x16",
  "Icon Name",
  "60x60",
  "Icon Name",
  "12x12",
  "Icon Name",
  "Use for",
];

const searchKeys = ["title", "sizes.20", "sizes.24", "sizes.30", "tags", "aliases"];

const wixUiTpaCategoryList: React.FC<GeneralCategoryListProps> = () => {

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
      iconsMetadata={tpaIconsMetadata}
      {...{
        tableHeaderTitles,
        searchKeys,
        mapIconToRow,
      }}
    />
  )
};
export default wixUiTpaCategoryList
