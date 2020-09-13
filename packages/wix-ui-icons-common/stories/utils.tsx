import Fuse from "fuse.js";
import { Category, CategoryTableRow } from "./types";
import { IconMetadata } from "../src/types";

export const mapIconsToCategories = (
  iconsMetadata: Array<IconMetadata>,
  tableHeaderTitles: Array<string>,
  mapIconToRow: (icon: IconMetadata) => CategoryTableRow
): Array<Category> => {
  const categoryMap: Record<string, Category> = {};
  for (const icon of iconsMetadata) {
    const { category = "Uncategorized" } = icon;
    // Add category
    if (!categoryMap[category]) {
      categoryMap[category] = {
        title: category,
        tableHeaderTitles,
        rows: [],
      };
    }

    const iconRow = mapIconToRow(icon);
    categoryMap[category].rows.push(iconRow);
  }

  return Object.values(categoryMap);
};

export const getCategoryIconsSearch = (
  initialCategories: Array<Category>,
  iconsMetadata: Array<IconMetadata>,
  mapIconsToCategories: (iconsMetadata: Array<IconMetadata>) => Array<Category>
) => {
  const searchIndex = new Fuse(iconsMetadata, {
    keys: ["title", "sizes.18", "sizes.24", "tags"],
    threshold: 0.2,
  });
  // searches icons by query
  const searchCategoryIcons = (query: string) => {
    if (!query) {
      return initialCategories;
    }
    const searchResults = searchIndex.search(query);
    const filteredIcons = searchResults.map(({ item }) => item);
    const filteredCategories = mapIconsToCategories(filteredIcons);
    return filteredCategories;
  };

  return searchCategoryIcons;
};
