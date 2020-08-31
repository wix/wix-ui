import React, { useMemo } from "react";
import { mapIconsToCategories } from "../../utils";
import { Icon, CategoryTableProps } from "../../types";

type Props = {
  icons: Array<Icon>;
  CategoryTable: React.FC<CategoryTableProps>;
};

const CategoryList: React.FC<Props> = ({ icons, CategoryTable }) => {
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
