import * as React from "react";
import { useMemo } from "react";
import CategoryTable from "../category-table";
import SearchInput from "wix-storybook-utils/dist/src/ui/search-input";
import useSearchIcons from "./useSearchIcons";
import { IconMetadata } from "../../../src/types";
import { Category, CategoryTableRow } from "../../types";
import dataHooks from "../../dataHooks";
import { classes } from "./CategoryList.st.css";

// Splits icons into categories
export const mapIconsToCategories = (
  iconsMetadata: Array<IconMetadata>
): Array<Category> => {
  const categoryMap: Record<string, Category> = {};
  for (const icon of iconsMetadata) {
    const { category = "Uncategorized" } = icon;
    // Add category
    if (!categoryMap[category]) {
      categoryMap[category] = {
        title: category,
        iconsMetadata: [],
      };
    }

    categoryMap[category].iconsMetadata.push(icon);
  }

  return Object.values(categoryMap);
};

type CategoryListProps = {
  iconsMetadata: Array<IconMetadata>;
  tableHeaderTitles: Array<string>;
  mapIconToRow: (iconMetadata: IconMetadata) => CategoryTableRow;
  searchKeys: Array<string>;
  dataHook?: string;
  className?: string;
};

const CategoryList: React.FC<CategoryListProps> = ({
  iconsMetadata,
  tableHeaderTitles,
  mapIconToRow,
  searchKeys,
  dataHook,
  className,
}) => {
  const { filteredIconsMetadata, debouncedSearch } = useSearchIcons(
    iconsMetadata,
    searchKeys
  );
  const categories = useMemo(
    () => mapIconsToCategories(filteredIconsMetadata),
    [filteredIconsMetadata]
  );

  return (
    <div className={className} data-hook={dataHook}>
      <SearchInput
        className={classes.searchInput}
        onChange={({ target: { value } }) => debouncedSearch(value)}
        dataHook={dataHooks.categorySearchInput}
      />
      {categories.map((category) => (
        <CategoryTable
          {...category}
          {...{ tableHeaderTitles, mapIconToRow }}
          key={category.title}
        />
      ))}
    </div>
  );
};

export default CategoryList;
