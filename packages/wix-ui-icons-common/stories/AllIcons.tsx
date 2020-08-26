import React from "react";
import CategoryTable from "./CategoryTable";
import icons from "./icons.json";
import { mapIconsToCategories } from "./utils";

const categories = mapIconsToCategories(icons);

const AllIcons: React.FC = () => {
  return (
    <div data-hook="icons-list">
      {categories.map(([categoryName, icons]) => (
        <CategoryTable {...{ categoryName, icons }} key={categoryName} />
      ))}
    </div>
  );
};

export default AllIcons;
