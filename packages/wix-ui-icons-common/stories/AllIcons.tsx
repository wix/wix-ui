import React, { useState } from "react";
import Fuse from "fuse.js";
import { useDebouncedCallback } from "use-debounce";
import SearchInput from "./SearchInput";
import CategoryTable from "./CategoryTable";
import icons from "./icons.json";
import { mapIconsToCategories } from "./utils";

const fuse = new Fuse(icons, {
  keys: ["title", "sizes.18", "sizes.24", "tags"],
  threshold: 0.2,
});
const initialCategories = mapIconsToCategories(icons);

const AllIcons: React.FC = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [searchIcons] = useDebouncedCallback((query: string) => {
    if (!query) {
      setCategories(initialCategories);
    } else {
      const res = fuse.search(query).map(({ item }) => item);
      const filteredCategories = mapIconsToCategories(res);
      setCategories(filteredCategories);
    }
  }, 300);
  return (
    <div data-hook="icons-list">
      <SearchInput onChange={({ target: { value } }) => searchIcons(value)} />
      {categories.map(([categoryName, icons]) => (
        <CategoryTable {...{ categoryName, icons }} key={categoryName} />
      ))}
    </div>
  );
};

export default AllIcons;
