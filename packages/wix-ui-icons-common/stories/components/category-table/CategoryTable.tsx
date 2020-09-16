import React, { useMemo } from "react";
import { table as Table } from "wix-storybook-utils/dist/src/Sections/views/table";
import sectionStyles from "wix-storybook-utils/dist/src/Sections/styles.scss";
import { IconMetadata } from "../../../src/types";
import { CategoryTableRow } from "../../types";
import dataHooks from "../../dataHooks";

export type CategoryTableProps = {
  title: string;
  tableHeaderTitles: Array<string>;
  iconsMetadata: Array<IconMetadata>;
  mapIconToRow: (iconMetadata: IconMetadata) => CategoryTableRow;
};

const CategoryTable: React.FC<CategoryTableProps> = ({
  title,
  tableHeaderTitles,
  iconsMetadata,
  mapIconToRow,
}) => {
  const rows = useMemo(() => iconsMetadata.map(mapIconToRow), [
    iconsMetadata,
    mapIconToRow,
  ]);
  return (
    <>
      <h2
        data-hook={dataHooks.categoryTableTitle}
        className={sectionStyles["section-title"]}
      >
        {title}
      </h2>
      <Table rows={rows} headerTitles={tableHeaderTitles} transparentHeader />
    </>
  );
};

export default CategoryTable;
