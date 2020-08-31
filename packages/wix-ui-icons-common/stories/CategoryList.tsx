import React, { useMemo } from "react";
import GeneralCategoryTable from "./CategoryTable";
import { mapIconsToCategories } from "./utils";
import { Icon } from "./types";
import SystemCategoryTable from "./SystemCategoryTable";

type Props = {
  icons: Array<Icon>;
  system?: boolean;
};

const CategoryList: React.FC<Props> = ({ icons, system }) => {
  const CategoryTable = system ? SystemCategoryTable : GeneralCategoryTable;
  const categories = useMemo(() => mapIconsToCategories(icons), [icons]);
  return (
    <div data-hook="icons-list">
      {categories.map(([categoryName, icons]) => (
        <CategoryTable {...{ categoryName, icons }} key={categoryName} />
      ))}
    </div>
  );
};

export default CategoryList;
