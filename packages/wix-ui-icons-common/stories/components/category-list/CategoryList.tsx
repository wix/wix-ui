import React from "react";
import { table as Table } from "wix-storybook-utils/dist/src/Sections/views/table";
import { Category } from "../../types";
import sectionStyles from "wix-storybook-utils/dist/src/Sections/styles.scss";

const CategoryTable: React.FC<Category> = ({
  title,
  tableHeaderTitles,
  rows,
}) => (
  <>
    <h2 className={sectionStyles["section-title"]}>{title}</h2>
    <Table rows={[tableHeaderTitles, ...rows]} />
  </>
);

type CategoryListProps = {
  categories: Array<Category>;
  dataHook?: string;
};

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  dataHook,
}) => {
  return (
    <div data-hook={dataHook}>
      {categories.map((category) => (
        <CategoryTable {...category} key={category.title} />
      ))}
    </div>
  );
};

export default CategoryList;
