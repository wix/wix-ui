import * as React from "react";
import Sizes from "./Sizes";
import CategoryList from "../../components/category-list";
import { IconMetadata } from "../../../src/types";
import { SystemTableRow, IconDescriptor, SystemCategoryListProps } from "../../types";
import { getIconSizeKeys } from '../../utils'

const SystemCategoryListBase: React.FC<SystemCategoryListProps> = ({ iconComponents, iconsMetadata }) => {

  const tableHeaderTitles = ["Icon Name", "Sizes", "Use for"];

  const mapIconToRow = ({
    title,
    sizes,
    description,
  }: IconMetadata): SystemTableRow => {
    const iconDescriptors: Array<IconDescriptor> = [];
    for (const [size, name] of Object.entries(sizes)) {
      const Icon = iconComponents[name];
      iconDescriptors.push({
        size,
        name,
        Icon,
      });
    }
    return [title, <Sizes sizes={iconDescriptors} />, description];
  };

  const iconSizeKeys = getIconSizeKeys(iconsMetadata);
  const searchKeys = ["title", ...iconSizeKeys, "tags", "aliases"];

  return (
    <CategoryList
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

export default SystemCategoryListBase;
