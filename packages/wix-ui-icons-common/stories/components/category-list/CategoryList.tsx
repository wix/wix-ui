import React from "react";
import { table as Table } from "wix-storybook-utils/dist/src/Sections/views/table";
import SearchInput from "../search-input";
import useCategoryListSearch from "./useCategoryListSearch";
import { Category } from "../../types";
import sectionStyles from "wix-storybook-utils/dist/src/Sections/styles.scss";

const CategoryTable: React.FC<Category> = ({
  title,
  tableHeaderTitles,
  rows,
}) => (
  <>
    <h2 className={sectionStyles["section-title"]}>{title}</h2>
    <Table rows={rows} headerTitles={tableHeaderTitles} transparentHeader />
  </>
);

type CategoryListProps = {
  // Categories to show when query is empty
  initialCategories: Array<Category>;
  // Function that searches categories by text query
  searchCategoryIcons: (query: string) => Array<Category>;
  dataHook?: string;
  className?: string;
};

const CategoryList: React.FC<CategoryListProps> = ({
  initialCategories,
  searchCategoryIcons,
  dataHook,
  className,
}) => {
  const { categories, debouncedSearch } = useCategoryListSearch(
    initialCategories,
    searchCategoryIcons
  );
  return (
    <div className={className} data-hook={dataHook}>
      <SearchInput
        onChange={({ target: { value } }) => debouncedSearch(value)}
      />
      {categories.map((category) => (
        <CategoryTable {...category} key={category.title} />
      ))}
    </div>
  );
};

export default CategoryList;
