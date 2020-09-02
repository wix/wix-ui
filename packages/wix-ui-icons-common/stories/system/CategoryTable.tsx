import React from "react";
import { table as Table } from "wix-storybook-utils/dist/src/Sections/views/table";
import { CategoryIcon, IconProps, CategoryTableProps as Props } from "../types";
import sectionStyles from "wix-storybook-utils/dist/src/Sections/styles.scss";
import viewsStyles from "wix-storybook-utils/dist/src/Sections/views/styles.scss";
import { classes } from "./CategoryTable.st.css";

const getIcon = (name: string): React.FC<IconProps> => {
  return require(`../../src/system/dist/components/${name}`).default;
};

const isNumeric = (size: string) => /^\d+$/.test(size);

const Sizes: React.FC<Pick<CategoryIcon, "sizes">> = ({ sizes }) => {
  return (
    <div className={classes.iconsContainer}>
      {Object.entries(sizes).map(([size, name]) => {
        const Icon = getIcon(name);
        const sizeText = isNumeric(size) ? `(${size}x${size})` : `(${size})`;
        return (
          <div className={classes.icon}>
            <Icon className={classes.svg} />
            <div className={viewsStyles["table-markdown"]}>
              {name}
              <div className={classes.size}>{sizeText}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const mapIconToRow = ({ title, sizes, description }: CategoryIcon) => [
  title,
  <Sizes sizes={sizes} />,
  description,
];

const SystemCategoryTable: React.FC<Props> = ({ categoryName, icons }) => {
  const columns = ["Icon Name", "Sizes", "Use for"];
  const rows = icons.map(mapIconToRow);

  return (
    <>
      <h2 className={sectionStyles["section-title"]}>{categoryName}</h2>
      <Table rows={[columns, ...rows]} />
    </>
  );
};

export default SystemCategoryTable;
