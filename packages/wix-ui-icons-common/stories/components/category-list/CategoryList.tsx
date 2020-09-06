import React from "react";
import { table as Table } from "wix-storybook-utils/dist/src/Sections/views/table";
import { Category } from "../../types";
import sectionStyles from "wix-storybook-utils/dist/src/Sections/styles.scss";

const CategoryTable: React.FC<Category> = ({ title, columns, rows }) => (
  <>
    <h2 className={sectionStyles["section-title"]}>{title}</h2>
    <Table rows={[columns, ...rows]} />
  </>
);

type Props = {
  categories: Array<Category>;
};

const CategoryList: React.FC<Props> = ({ categories }) => {
  return (
    <div data-hook="icons-list">
      {categories.map((category) => (
        <CategoryTable {...category} key={category.title} />
      ))}
    </div>
  );
};

export default CategoryList;