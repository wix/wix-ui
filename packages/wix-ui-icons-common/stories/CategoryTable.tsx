import React from "react";
import { table as Table } from "wix-storybook-utils/dist/src/Sections/views/table";
import sectionStyles from "wix-storybook-utils/dist/src/Sections/styles.scss";
import { CategoryIcon } from "./types";

type Props = {
  categoryName: string;
  icons: Array<CategoryIcon>;
};

const getIcon = (name, system) => {
  if (!name) return;
  if (system) {
    return require(`../src/system/dist/components/${name}`).default;
  }
  return require(`../src/general/dist/components/${name}`).default;
};

export const mapIconToRow = ({ description, system, sizes }) => {
  const Icon = getIcon(sizes[24], system);
  const SmallIcon = getIcon(sizes[18], system);
  return [
    Icon && <Icon />,
    sizes[24],
    SmallIcon && <SmallIcon />,
    sizes[18],
    description,
  ];
};

const CategoryTable: React.FC<Props> = ({ categoryName, icons }) => {
  const columns = ["24x24", "Icon Name", "18x18", "Icon Name", "Use for"];
  const rows = icons.map(mapIconToRow);
  debugger;
  return (
    <>
      <h2 className={sectionStyles["section-title"]}>{categoryName}</h2>
      <Table rows={[columns, ...rows]} />
    </>
  );
};

export default CategoryTable;
